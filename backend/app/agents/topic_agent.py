from app.agents.base import BaseAgent

TOPIC_SYSTEM_PROMPT = """你是一个选题策划专家。
基于内容洞察结果和用户人格模型，推荐3-5个适合该用户创作的内容选题。
每个选题需包含：
- title: 选题标题（吸引人）
- reason: 为什么适合该用户
- score: 选题价值评分（1-100）"""


class TopicAgent(BaseAgent):
    """Agent 3: 发现选题"""

    def __init__(self):
        super().__init__("TopicAgent")

    async def process(self, insight: dict, persona: dict | None = None) -> list[dict]:
        context = f"用户人格模型：{persona}\n" if persona else ""
        result = await self._call_llm_json(
            TOPIC_SYSTEM_PROMPT,
            f"{context}内容洞察：{insight}",
        )
        topics = result.get("topics", result.get("选题", []))
        return [
            {
                "title": t.get("title", ""),
                "reason": t.get("reason", ""),
                "score": t.get("score", 0),
            }
            for t in topics
        ]
