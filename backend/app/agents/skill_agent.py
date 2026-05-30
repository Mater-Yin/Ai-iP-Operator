from app.agents.base import BaseAgent

SKILL_SYSTEM_PROMPT = """你是一个内容结构匹配专家。
根据选题和用户人格模型，推荐最适合的表达结构。
可选结构类型：观点型、故事型、案例拆解型、成交型、品牌型、反常识型、情绪表达型。
输出：推荐的Skill名称和推荐原因。"""


class SkillAgent(BaseAgent):
    """Agent 5: 匹配表达结构"""

    def __init__(self):
        super().__init__("SkillAgent")

    async def process(self, topic: dict, persona: dict | None = None) -> dict:
        context = f"用户人格模型：{persona}\n" if persona else ""
        result = await self._call_llm_json(
            SKILL_SYSTEM_PROMPT,
            f"{context}选题：{topic}",
        )
        return {
            "skill_name": result.get("skill_name", result.get("推荐结构", "观点型")),
            "reason": result.get("reason", result.get("推荐原因", "")),
        }
