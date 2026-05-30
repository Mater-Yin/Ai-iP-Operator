from app.agents.base import BaseAgent

INSIGHT_SYSTEM_PROMPT = """你是一个内容价值提炼专家。
分析用户的记录，提取：
1. 核心观点 - 最重要的洞察
2. 核心方法 - 可复用的方法论
3. 核心故事 - 有传播力的故事
4. 目标受众 - 哪些人会感兴趣
5. 价值评分 - 1-100分
6. 内容标签 - 3-5个标签
7. 可延伸选题 - 3个相关选题"""


class InsightAgent(BaseAgent):
    """Agent 2: 提炼内容价值"""

    def __init__(self):
        super().__init__("InsightAgent")

    async def process(self, record_text: str, persona_info: dict | None = None) -> dict:
        context = f"用户信息：{persona_info}\n" if persona_info else ""
        result = await self._call_llm_json(
            INSIGHT_SYSTEM_PROMPT,
            f"{context}记录内容：{record_text}",
        )
        return {
            "core_viewpoint": result.get("核心观点", ""),
            "core_method": result.get("核心方法", ""),
            "core_story": result.get("核心故事", ""),
            "target_audience": result.get("目标受众", ""),
            "value_score": result.get("价值评分", 70),
            "tags": result.get("内容标签", []),
            "extendable_topics": result.get("可延伸选题", []),
        }
