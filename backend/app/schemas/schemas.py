from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr


# ===== Auth =====
class RegisterRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ===== User =====
class UserResponse(BaseModel):
    id: UUID
    email: str
    role: str
    avatar: Optional[str] = None
    onboarded: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Persona =====
class PersonaCreate(BaseModel):
    nickname: str
    industry: str
    occupation: str
    experience_years: int = 0
    bio: Optional[str] = None
    content_direction: Optional[str] = None
    professional_score: int = 50
    story_score: int = 50
    emotion_score: int = 50
    sales_score: int = 50


class PersonaResponse(PersonaCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ===== Product =====
class ProductCreate(BaseModel):
    product_name: str
    product_price: float = 0
    product_desc: Optional[str] = None
    target_customer: Optional[str] = None
    selling_points: Optional[str] = None


class ProductResponse(ProductCreate):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True


# ===== Daily Record =====
class RecordCreate(BaseModel):
    record_type: str
    title: str = ""
    content: str
    voice_url: Optional[str] = None


class RecordResponse(BaseModel):
    id: UUID
    user_id: UUID
    record_type: str
    title: str
    content: str
    summary: Optional[str] = None
    core_viewpoint: Optional[str] = None
    core_method: Optional[str] = None
    target_audience: Optional[str] = None
    value_score: Optional[int] = None
    status: str
    tags: list[str] = []
    created_at: datetime

    class Config:
        from_attributes = True


# ===== Analysis =====
class AnalysisResponse(BaseModel):
    core_viewpoint: str
    core_method: str
    core_story: Optional[str] = None
    target_audience: str
    value_score: int
    tags: list[str]
    extendable_topics: list[str]


# ===== Topic =====
class TopicResponse(BaseModel):
    id: UUID
    topic_title: str
    topic_desc: Optional[str] = None
    score: float

    class Config:
        from_attributes = True


# ===== Skill =====
class SkillResponse(BaseModel):
    id: UUID
    name: str
    category: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


# ===== Content Generation =====
class ContentGenerateRequest(BaseModel):
    record_id: str
    topic_id: Optional[str] = None
    skill_id: Optional[str] = None


class ContentGenerateResponse(BaseModel):
    id: UUID
    title: str
    outline: Optional[str] = None
    script: Optional[str] = None
    shooting_suggestion: Optional[str] = None
    emotion_suggestion: Optional[str] = None
    cover_copy: Optional[str] = None
    comment_copy: Optional[str] = None
    teleprompter_text: Optional[str] = None
    status: str

    class Config:
        from_attributes = True


# ===== Content Optimize =====
class OptimizeRequest(BaseModel):
    optimize_type: str  # professional, story, sales, short_video


# ===== Knowledge =====
class KnowledgeUploadResponse(BaseModel):
    id: UUID
    file_name: str
    file_type: str
    summary: Optional[str] = None

    class Config:
        from_attributes = True


# ===== Asset =====
class AssetResponse(BaseModel):
    id: UUID
    content_id: UUID
    category: str
    publish_status: str
    created_at: datetime

    class Config:
        from_attributes = True
