from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.models import (
    DailyRecord, Topic, Hotspot, TopicHotspotRelation,
    Skill, GeneratedContent, ContentAsset,
)
from app.schemas.schemas import (
    AnalysisResponse, TopicResponse, SkillResponse,
    ContentGenerateRequest, ContentGenerateResponse,
    OptimizeRequest,
)

router = APIRouter(prefix="", tags=["内容"])


# ===== Analysis =====
@router.post("/records/{record_id}/analyze", response_model=AnalysisResponse)
async def analyze_record(
    record_id: str,
    db: AsyncSession = Depends(get_db),
):
    """AI分析记录内容 - 实际会调用 Insight Agent"""
    result = await db.execute(
        select(DailyRecord).where(DailyRecord.id == record_id)
    )
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="记录不存在")

    # TODO: call Insight Agent for real analysis
    analysis = AnalysisResponse(
        core_viewpoint="AI分析的核心观点",
        core_method="AI分析的核心方法",
        core_story="相关故事",
        target_audience="目标受众",
        value_score=85,
        tags=["标签1", "标签2"],
        extendable_topics=["延伸选题1", "延伸选题2"],
    )

    # Update record status
    record.status = "analyzed"
    await db.commit()

    return analysis


# ===== Topics =====
@router.post("/records/{record_id}/topics", response_model=list[TopicResponse])
async def generate_topics(
    record_id: str,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    """生成选题 - 调用 Topic Agent"""
    # TODO: call Topic Agent
    topics = [
        Topic(user_id=user_id, record_id=record_id, topic_title="示例选题1", score=92),
        Topic(user_id=user_id, record_id=record_id, topic_title="示例选题2", score=88),
    ]
    for t in topics:
        db.add(t)
    await db.commit()
    return topics


# ===== Hotspots =====
@router.post("/topics/{topic_id}/hotspots")
async def match_hotspots(topic_id: str, db: AsyncSession = Depends(get_db)):
    """匹配热点 - 调用 Hotspot Agent"""
    # TODO: call Hotspot Agent
    return [
        {"hotspot": {"title": "热点1", "platform": "抖音", "hot_score": 95}, "match_score": 90},
    ]


# ===== Skills =====
@router.post("/topics/{topic_id}/skills", response_model=list[SkillResponse])
async def recommend_skills(topic_id: str, db: AsyncSession = Depends(get_db)):
    """推荐表达结构 - 调用 Skill Agent"""
    result = await db.execute(select(Skill).where(Skill.is_system == True))
    skills = result.scalars().all()
    return skills


# ===== Content Generation =====
@router.post("/content/generate", response_model=ContentGenerateResponse)
async def generate_content(
    req: ContentGenerateRequest,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    """生成完整内容 - 调用 Script Agent"""
    # TODO: call Script Agent with persona + topic + skill
    content = GeneratedContent(
        user_id=user_id,
        record_id=req.record_id,
        topic_id=req.topic_id,
        skill_id=req.skill_id,
        title="生成的标题",
        outline="内容结构",
        script="完整脚本",
        shooting_suggestion="拍摄建议",
        emotion_suggestion="情绪建议",
        cover_copy="封面文案",
        comment_copy="评论区引导",
        teleprompter_text="提词器文本",
    )
    db.add(content)
    await db.commit()
    await db.refresh(content)

    # Also create asset entry
    asset = ContentAsset(
        user_id=user_id,
        content_id=content.id,
        category="viewpoint",
        publish_status="draft",
    )
    db.add(asset)
    await db.commit()

    return content


# ===== Content Optimization =====
@router.post("/content/{content_id}/optimize")
async def optimize_content(
    content_id: str,
    req: OptimizeRequest,
    db: AsyncSession = Depends(get_db),
):
    """优化内容"""
    result = await db.execute(
        select(GeneratedContent).where(GeneratedContent.id == content_id)
    )
    content = result.scalar_one_or_none()
    if not content:
        raise HTTPException(status_code=404, detail="内容不存在")

    # TODO: call optimization agent
    content.status = "optimized"
    await db.commit()

    return {"message": f"已优化：{req.optimize_type}", "content_id": content_id}


# ===== Teleprompter =====
@router.get("/content/{content_id}/teleprompter")
async def get_teleprompter(content_id: str, db: AsyncSession = Depends(get_db)):
    """获取提词器文本"""
    result = await db.execute(
        select(GeneratedContent).where(GeneratedContent.id == content_id)
    )
    content = result.scalar_one_or_none()
    if not content:
        raise HTTPException(status_code=404, detail="内容不存在")
    return {"teleprompter_text": content.teleprompter_text or content.script}
