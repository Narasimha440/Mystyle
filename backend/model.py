from __future__ import annotations

import copy
import logging
import os
from pathlib import Path
from typing import Optional

import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

logger = logging.getLogger(__name__)


def _load_env_file() -> None:
    env_path = Path(__file__).resolve().parent / ".env"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


_load_env_file()

BASE_MODEL = os.getenv("BASE_MODEL", "Qwen/Qwen2.5-1.5B-Instruct")
LORA_PATH = os.getenv("LORA_PATH", "/content/drive/MyDrive/Screencastify/mystyle-writer-lora/mystyle-writer-lora")
MAX_NEW_TOKENS = int(os.getenv("MAX_NEW_TOKENS", "350"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))
TOP_P = float(os.getenv("TOP_P", "0.9"))
SYSTEM_PROMPT = "You are a helpful assistant that answers clearly and directly."


tokenizer: Optional[AutoTokenizer] = None
base_model: Optional[AutoModelForCausalLM] = None
lora_model: Optional[PeftModel] = None
device: Optional[torch.device] = None


def _resolve_device() -> torch.device:
    if torch.cuda.is_available():
        return torch.device("cuda")
    if hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")


def _torch_dtype() -> torch.dtype:
    if torch.cuda.is_available() or (hasattr(torch.backends, "mps") and torch.backends.mps.is_available()):
        return torch.float16
    return torch.float32


def load_models() -> None:
    global tokenizer, base_model, lora_model, device

    if tokenizer is not None and base_model is not None and lora_model is not None:
        return

    if not Path(LORA_PATH).exists():
        raise FileNotFoundError(
            f"LoRA adapter not found at '{LORA_PATH}'. Mount Google Drive and set LORA_PATH to the adapter folder."
        )

    device = _resolve_device()
    dtype = _torch_dtype()

    tokenizer = AutoTokenizer.from_pretrained(
        BASE_MODEL,
        trust_remote_code=True,
    )

    if tokenizer.pad_token_id is None:
        tokenizer.pad_token = tokenizer.eos_token

    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=dtype,
        low_cpu_mem_usage=True,
        trust_remote_code=True,
    ).to(device)
    base_model.eval()
    print("\u2713 Base Model Loaded")

    lora_model = PeftModel.from_pretrained(copy.deepcopy(base_model), LORA_PATH)
    lora_model.to(device)
    lora_model.eval()
    print("\u2713 LoRA Loaded")


def _generate(model: AutoModelForCausalLM, prompt: str) -> str:
    if tokenizer is None or device is None:
        raise RuntimeError("Tokenizer or device is not initialized")

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": prompt},
    ]
    formatted_prompt = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True,
    )

    inputs = tokenizer(formatted_prompt, return_tensors="pt").to(device)

    generation_kwargs = {
        "max_new_tokens": MAX_NEW_TOKENS,
        "temperature": TEMPERATURE,
        "top_p": TOP_P,
        "do_sample": True,
        "pad_token_id": tokenizer.eos_token_id,
    }

    with torch.inference_mode():
        output_ids = model.generate(**inputs, **generation_kwargs)

    prompt_length = inputs["input_ids"].shape[-1]
    generated_ids = output_ids[0][prompt_length:]
    text = tokenizer.decode(generated_ids, skip_special_tokens=True)
    return text.strip()


def generate_base(prompt: str) -> str:
    if base_model is None:
        raise RuntimeError("Base model is not loaded")
    return _generate(base_model, prompt)


def generate_lora(prompt: str) -> str:
    if lora_model is None:
        raise RuntimeError("LoRA model is not loaded")
    return _generate(lora_model, prompt)
