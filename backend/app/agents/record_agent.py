from app.agents.base import BaseAgent

RECORD_SYSTEM_PROMPT = """你是一个记录整理助手。用户的输入可能是语音转文字的结果，包含口语化表达、重复、停顿等。
你需要：
1. 整理成通顺的文字
2. 提取核心摘要（50字以内）
3. 打标签（2-5个）
4. 分类（learning/work/conversation/deal/problem/insight/inspiration/free）"""


class RecordAgent(BaseAgent):
    """Agent 1: 整理用户记录"""

    def __init__(self):
        super().__init__("RecordAgent")

    async def process(self, raw_text: str, record_type: str) -> dict:
        result = await self._call_llm_json(
            RECORD_SYSTEM_PROMPT,
            f"记录类型：{record_type}\n原始内容：{raw_text}",
        )
        return {
            "summary": result.get("summary", raw_text[:100]),
            "tags": result.get("tags", []),
            "category": result.get("category", record_type),
        }
