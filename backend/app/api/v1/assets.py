from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.models import ContentAsset, GeneratedContent
from app.schemas.schemas import AssetResponse

router = APIRouter(prefix="/assets", tags=["内容资产"])


@router.get("", response_model=list[AssetResponse])
async def list_assets(
    category: str | None = None,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    query = select(ContentAsset).where(ContentAsset.user_id == user_id)
    if category:
        query = query.where(ContentAsset.category == category)
    query = query.order_by(ContentAsset.created_at.desc())

    result = await db.execute(query)
    assets = result.scalars().all()
    return assets


@router.get("/{asset_id}", response_model=AssetResponse)
async def get_asset(asset_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ContentAsset).where(ContentAsset.id == asset_id)
    )
    asset = result.scalar_one_or_none()
    return asset
