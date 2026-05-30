from typing import Any
from openai import AsyncOpenAI
from app.core.config import settings


class BaseAgent:
    """Base class for all AI Agents"""

    def __init__(self, name: str):
        self.name = name
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.AI_MODEL

    async def _call_llm(self, system_prompt: str, user_prompt: str) -> str:
        """Call the LLM with system and user prompts"""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content or ""

    async def _call_llm_json(self, system_prompt: str, user_prompt: str) -> dict[str, Any]:
        """Call the LLM and parse JSON response"""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": f"{system_prompt}\n\nAlways respond in valid JSON format."},
                {"role": "user", "content": user_prompt},
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
        )
        content = response.choices[0].message.content or "{}"
        import json
        return json.loads(content)
