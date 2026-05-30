from app.agents.base import BaseAgent

HOTSPOT_SYSTEM_PROMPT = """你是一个热点匹配专家。
分析选题，从热点库中找到与该选题相关的内容热点。
如果没有热点库数据，根据你的知识推荐当前相关的行业/平台热点。
输出格式：热点标题、匹配原因、匹配度评分（1-100）。"""


class HotspotAgent(BaseAgent):
    """Agent 4: 匹配热点"""

    def __init__(self):
        super().__init__("HotspotAgent")

    async def process(self, topic: dict, hotspots: list[dict] | None = None) -> list[dict]:
        context = f"热点库：{hotspots}\n" if hotspots else ""
        result = await self._call_llm_json(
            HOTSPOT_SYSTEM_PROMPT,
            f"{context}选题：{topic}",
        )
        matches = result.get("matches", result.get("热点匹配", []))
        return [
            {
                "hotspot": m.get("hotspot", m.get("热点", "")),
                "match_reason": m.get("match_reason", m.get("匹配原因", "")),
                "score": m.get("score", m.get("匹配度", 0)),
            }
            for m in matches
        ]
