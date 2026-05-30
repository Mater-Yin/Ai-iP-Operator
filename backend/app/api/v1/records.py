from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.models import DailyRecord, RecordTag
from app.schemas.schemas import RecordCreate, RecordResponse

router = APIRouter(prefix="/records", tags=["每日记录"])


@router.post("", response_model=RecordResponse)
async def create_record(
    data: RecordCreate,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    record = DailyRecord(
        user_id=user_id,
        record_type=data.record_type,
        title=data.title,
        content=data.content,
        voice_url=data.voice_url,
    )
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return record


@router.get("", response_model=list[RecordResponse])
async def list_records(
    page: int = 1,
    page_size: int = 20,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(DailyRecord)
        .where(DailyRecord.user_id == user_id)
        .order_by(DailyRecord.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    records = result.scalars().all()

    # Fetch tags for each record
    record_ids = [r.id for r in records]
    if record_ids:
        tag_result = await db.execute(
            select(RecordTag).where(RecordTag.record_id.in_(record_ids))
        )
        tags = tag_result.scalars().all()
        tag_map: dict = {}
        for t in tags:
            tag_map.setdefault(str(t.record_id), []).append(t.tag_name)

        result_list = []
        for r in records:
            r_dict = RecordResponse.model_validate(r).model_dump()
            r_dict["tags"] = tag_map.get(str(r.id), [])
            result_list.append(r_dict)
        return result_list

    return records


@router.get("/{record_id}", response_model=RecordResponse)
async def get_record(
    record_id: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(DailyRecord).where(DailyRecord.id == record_id)
    )
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="记录不存在")

    tag_result = await db.execute(
        select(RecordTag).where(RecordTag.record_id == record_id)
    )
    tags = [t.tag_name for t in tag_result.scalars().all()]

    r_dict = RecordResponse.model_validate(record).model_dump()
    r_dict["tags"] = tags
    return r_dict


@router.delete("/{record_id}")
async def delete_record(
    record_id: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(DailyRecord).where(DailyRecord.id == record_id)
    )
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="记录不存在")

    await db.delete(record)
    await db.commit()
    return {"message": "删除成功"}
