import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import generate_base, generate_lora, load_models
from schemas import GenerateResponse, PromptRequest

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_models()
    yield


app = FastAPI(
    title="MyStyle Writer API",
    description="Single-endpoint local backend for the MyStyle Writer demo.",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)


@app.post("/generate", response_model=GenerateResponse)
def generate(request: PromptRequest) -> GenerateResponse:
    try:
        base_text = generate_base(request.prompt)
        lora_text = generate_lora(request.prompt)
        return GenerateResponse(base=base_text, lora=lora_text)
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Generation failed")
        raise HTTPException(status_code=500, detail=f"Failed to generate responses: {exc}") from exc
