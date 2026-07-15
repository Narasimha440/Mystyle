from pydantic import BaseModel, ConfigDict, Field, field_validator


class PromptRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    prompt: str = Field(..., min_length=1, description="User prompt")

    @field_validator("prompt")
    @classmethod
    def normalize_prompt(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("prompt cannot be empty")
        return value


class GenerateResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    base: str
    lora: str
