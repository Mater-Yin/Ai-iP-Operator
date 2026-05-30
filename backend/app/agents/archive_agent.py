from app.agents.base import BaseAgent

ARCHIVE_SYSTEM_PROMPT = """你是一个内容归档专家。
分析生成的完整内容，自动完成：
1. 分类（learning/case/viewpoint/story/hotspot）
2. 打标签（3-5个相关标签）
3. 总结归档信息"""


class ArchiveAgent(BaseAgent):
    """Agent 7: 自动归档"""

    def __init__(self):
        super().__init__("ArchiveAgent")

    async def process(self, content: dict) -> dict:
        result = await self._call_llm_json(
            ARCHIVE_SYSTEM_PROMPT,
            f"生成的内容：{content}",
        )
        return {
            "category": result.get("category", result.get("分类", "viewpoint")),
            "tags": result.get("tags", result.get("标签", [])),
            "summary": result.get("summary", result.get("摘要", "")),
        }
