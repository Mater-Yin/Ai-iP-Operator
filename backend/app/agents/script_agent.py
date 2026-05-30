from app.agents.base import BaseAgent

SCRIPT_SYSTEM_PROMPT = """你是一个专业短视频脚本创作专家。
基于用户人格模型、知识库内容、选题、热点和Skill结构，生成完整的短视频内容。
输出必须包含：
1. 标题 - 吸引人的标题
2. 结构 - 内容结构框架
3. 脚本 - 完整的口播脚本
4. 拍摄建议 - 镜头、场景、动作
5. 情绪建议 - 语速、语调、情绪
6. 封面文案 - 封面标题+副标题
7. 评论区引导 - 3条引导评论
8. 提词器文本 - 简化的提词器版本"""


class ScriptAgent(BaseAgent):
    """Agent 6: 生成内容脚本"""

    def __init__(self):
        super().__init__("ScriptAgent")

    async def process(
        self,
        persona: dict,
        topic: dict,
        hotspot: dict | None = None,
        skill: dict | None = None,
        knowledge: list[dict] | None = None,
    ) -> dict:
        context = (
            f"用户人格：{persona}\n"
            f"选题：{topic}\n"
            f"热点：{hotspot}\n"
            f"Skill：{skill}\n"
            f"知识库：{knowledge}\n"
        )
        result = await self._call_llm_json(
            SCRIPT_SYSTEM_PROMPT,
            context,
        )
        return {
            "title": result.get("标题", ""),
            "outline": result.get("结构", ""),
            "script": result.get("脚本", ""),
            "shooting": result.get("拍摄建议", ""),
            "emotion": result.get("情绪建议", ""),
            "cover": result.get("封面文案", ""),
            "comments": result.get("评论区引导", ""),
            "teleprompter": result.get("提词器文本", ""),
        }
