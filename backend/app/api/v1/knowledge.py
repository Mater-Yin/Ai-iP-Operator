from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.models import KnowledgeFile
from app.schemas.schemas import KnowledgeUploadResponse

router = APIRouter(prefix="/knowledge", tags=["知识库"])


@router.post("/upload", response_model=KnowledgeUploadResponse)
async def upload_knowledge(
    file: UploadFile = File(...),
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    # TODO: save file to storage, extract text, generate summary
    kf = KnowledgeFile(
        user_id=user_id,
        file_name=file.filename or "unknown",
        file_type=file.content_type or "unknown",
        file_url=f"/uploads/{file.filename}",
        summary="文件摘要",
    )
    db.add(kf)
    await db.commit()
    await db.refresh(kf)
    return kf


@router.get("", response_model=list[KnowledgeUploadResponse])
async def list_knowledge(
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(KnowledgeFile)
        .where(KnowledgeFile.user_id == user_id)
        .order_by(KnowledgeFile.created_at.desc())
    )
    return result.scalars().all()
