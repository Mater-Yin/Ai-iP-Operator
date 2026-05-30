from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.models import PersonaProfile, UserProduct
from app.schemas.schemas import PersonaCreate, PersonaResponse, ProductCreate, ProductResponse

router = APIRouter(prefix="/persona", tags=["人格档案"])


@router.get("", response_model=PersonaResponse)
async def get_persona(
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(PersonaProfile).where(PersonaProfile.user_id == user_id)
    )
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="人格档案不存在")
    return profile


@router.post("", response_model=PersonaResponse)
async def create_persona(
    data: PersonaCreate,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    profile = PersonaProfile(user_id=user_id, **data.model_dump())
    db.add(profile)
    await db.commit()
    await db.refresh(profile)
    return profile


@router.put("", response_model=PersonaResponse)
async def update_persona(
    data: PersonaCreate,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(PersonaProfile).where(PersonaProfile.user_id == user_id)
    )
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="人格档案不存在")

    for key, val in data.model_dump().items():
        setattr(profile, key, val)
    await db.commit()
    await db.refresh(profile)
    return profile


@router.post("/products", response_model=ProductResponse)
async def create_product(
    data: ProductCreate,
    user_id: str = Depends(lambda: "user-id"),
    db: AsyncSession = Depends(get_db),
):
    product = UserProduct(user_id=user_id, **data.model_dump())
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product
