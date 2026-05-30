import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, func, Text, Integer, Float, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Enum as SAEnum
import enum


class Base(DeclarativeBase):
    pass


# ===== Enums =====
class UserRole(str, enum.Enum):
    IP = "ip"
    OPERATOR = "operator"
    ADMIN = "admin"


class RecordType(str, enum.Enum):
    LEARNING = "learning"
    WORK = "work"
    CONVERSATION = "conversation"
    DEAL = "deal"
    PROBLEM = "problem"
    INSIGHT = "insight"
    INSPIRATION = "inspiration"
    FREE = "free"


class RecordStatus(str, enum.Enum):
    DRAFT = "draft"
    ANALYZED = "analyzed"
    GENERATED = "generated"
    PUBLISHED = "published"


class SkillCategory(str, enum.Enum):
    VIEWPOINT = "viewpoint"
    STORY = "story"
    SALES = "sales"
    BRAND = "brand"
    CASE = "case"
    ANTI_COMMON = "anti_common"
    EMOTION = "emotion"


class ContentStatus(str, enum.Enum):
    DRAFT = "draft"
    OPTIMIZED = "optimized"
    RECORDED = "recorded"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class AssetCategory(str, enum.Enum):
    LEARNING = "learning"
    CASE = "case"
    VIEWPOINT = "viewpoint"
    STORY = "story"
    HOTSPOT = "hotspot"


# ===== Mixins =====
class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class UUIDMixin:
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )


# ===== User Model =====


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        SAEnum(UserRole), default=UserRole.IP, nullable=False
    )
    avatar: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    onboarded: Mapped[bool] = mapped_column(Boolean, default=False)


class PersonaProfile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "persona_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    nickname: Mapped[str] = mapped_column(String(100), nullable=False)
    industry: Mapped[str] = mapped_column(String(100), nullable=False)
    occupation: Mapped[str] = mapped_column(String(100), nullable=False)
    experience_years: Mapped[int] = mapped_column(Integer, default=0)
    bio: Mapped[str] = mapped_column(Text, nullable=True)
    content_direction: Mapped[str] = mapped_column(String(100), nullable=True)
    professional_score: Mapped[int] = mapped_column(Integer, default=50)
    story_score: Mapped[int] = mapped_column(Integer, default=50)
    emotion_score: Mapped[int] = mapped_column(Integer, default=50)
    sales_score: Mapped[int] = mapped_column(Integer, default=50)


class UserProduct(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "user_products"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    product_name: Mapped[str] = mapped_column(String(200), nullable=False)
    product_price: Mapped[float] = mapped_column(Float, default=0)
    product_desc: Mapped[str] = mapped_column(Text, nullable=True)
    target_customer: Mapped[str] = mapped_column(String(500), nullable=True)
    selling_points: Mapped[str] = mapped_column(Text, nullable=True)


class DailyRecord(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "daily_records"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    record_type: Mapped[RecordType] = mapped_column(
        SAEnum(RecordType), nullable=False
    )
    title: Mapped[str] = mapped_column(String(200), default="")
    content: Mapped[str] = mapped_column(Text, nullable=False)
    voice_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    video_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    core_viewpoint: Mapped[str | None] = mapped_column(Text, nullable=True)
    core_method: Mapped[str | None] = mapped_column(Text, nullable=True)
    target_audience: Mapped[str | None] = mapped_column(String(500), nullable=True)
    value_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    status: Mapped[RecordStatus] = mapped_column(
        SAEnum(RecordStatus), default=RecordStatus.DRAFT
    )


class RecordTag(Base, UUIDMixin):
    __tablename__ = "record_tags"

    record_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    tag_name: Mapped[str] = mapped_column(String(50), nullable=False)


class Topic(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "topics"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    record_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False
    )
    topic_title: Mapped[str] = mapped_column(String(200), nullable=False)
    topic_desc: Mapped[str] = mapped_column(Text, nullable=True)
    topic_type: Mapped[str] = mapped_column(String(50), nullable=True)
    score: Mapped[float] = mapped_column(Float, default=0)


class Hotspot(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "hotspots"

    title: Mapped[str] = mapped_column(String(200), nullable=False)
    platform: Mapped[str] = mapped_column(String(50), nullable=True)
    summary: Mapped[str] = mapped_column(Text, nullable=True)
    hot_score: Mapped[float] = mapped_column(Float, default=0)
    url: Mapped[str | None] = mapped_column(String(500), nullable=True)


class TopicHotspotRelation(Base, UUIDMixin):
    __tablename__ = "topic_hotspot_relations"

    topic_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    hotspot_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False
    )
    match_score: Mapped[float] = mapped_column(Float, default=0)


class Skill(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "skills"

    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[SkillCategory] = mapped_column(
        SAEnum(SkillCategory), nullable=False
    )
    description: Mapped[str] = mapped_column(Text, nullable=True)
    prompt_template: Mapped[str | None] = mapped_column(Text, nullable=True)
    structure_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    is_system: Mapped[bool] = mapped_column(Boolean, default=False)


class GeneratedContent(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "generated_contents"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    record_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False
    )
    topic_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    skill_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), nullable=True
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    outline: Mapped[str] = mapped_column(Text, nullable=True)
    script: Mapped[str] = mapped_column(Text, nullable=True)
    shooting_suggestion: Mapped[str | None] = mapped_column(Text, nullable=True)
    emotion_suggestion: Mapped[str | None] = mapped_column(Text, nullable=True)
    cover_copy: Mapped[str | None] = mapped_column(Text, nullable=True)
    comment_copy: Mapped[str | None] = mapped_column(Text, nullable=True)
    teleprompter_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[ContentStatus] = mapped_column(
        SAEnum(ContentStatus), default=ContentStatus.DRAFT
    )


class KnowledgeFile(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "knowledge_files"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    file_type: Mapped[str] = mapped_column(String(50), nullable=False)
    file_url: Mapped[str] = mapped_column(String(500), nullable=False)
    content_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    embedding_status: Mapped[bool] = mapped_column(Boolean, default=False)


class ContentAsset(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "content_assets"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    content_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False
    )
    category: Mapped[AssetCategory] = mapped_column(
        SAEnum(AssetCategory), nullable=False
    )
    publish_status: Mapped[str] = mapped_column(
        String(20), default="draft"
    )


class AiLog(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "ai_logs"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True
    )
    agent_name: Mapped[str] = mapped_column(String(50), nullable=False)
    input_tokens: Mapped[int] = mapped_column(Integer, default=0)
    output_tokens: Mapped[int] = mapped_column(Integer, default=0)
    cost: Mapped[float] = mapped_column(Float, default=0)
