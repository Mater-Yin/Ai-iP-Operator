// ===== User & Auth =====
export type UserRole = "ip" | "operator" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
}

// ===== Persona Profile =====
export interface PersonaProfile {
  id: string;
  user_id: string;
  nickname: string;
  industry: string;
  occupation: string;
  experience_years: number;
  bio: string;
  content_direction: string;
  professional_score: number;
  story_score: number;
  emotion_score: number;
  sales_score: number;
  created_at: string;
  updated_at: string;
}

// ===== Product Info =====
export interface UserProduct {
  id: string;
  user_id: string;
  product_name: string;
  product_price: number;
  product_desc: string;
  target_customer: string;
  selling_points: string;
}

// ===== Daily Records =====
export type RecordType =
  | "learning"
  | "work"
  | "conversation"
  | "deal"
  | "problem"
  | "insight"
  | "inspiration"
  | "free";

export type RecordStatus = "draft" | "analyzed" | "generated" | "published";

export interface DailyRecord {
  id: string;
  user_id: string;
  record_type: RecordType;
  title: string;
  content: string;
  voice_url?: string;
  image_url?: string;
  video_url?: string;
  summary?: string;
  core_viewpoint?: string;
  core_method?: string;
  target_audience?: string;
  value_score?: number;
  status: RecordStatus;
  tags: string[];
  created_at: string;
}

// ===== Skills =====
export type SkillCategory =
  | "viewpoint"
  | "story"
  | "sales"
  | "brand"
  | "case"
  | "anti_common"
  | "emotion";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  prompt_template?: string;
  structure_json?: Record<string, unknown>;
  is_system: boolean;
}

// ===== Topics =====
export interface Topic {
  id: string;
  user_id: string;
  record_id: string;
  topic_title: string;
  topic_desc: string;
  topic_type: string;
  score: number;
}

// ===== Hotspots =====
export interface Hotspot {
  id: string;
  title: string;
  platform: string;
  summary: string;
  hot_score: number;
  url: string;
}

// ===== Generated Content =====
export type ContentStatus = "draft" | "optimized" | "recorded" | "published" | "archived";

export interface GeneratedContent {
  id: string;
  user_id: string;
  record_id: string;
  topic_id: string;
  skill_id: string;
  title: string;
  outline: string;
  script: string;
  shooting_suggestion: string;
  emotion_suggestion: string;
  cover_copy: string;
  comment_copy: string;
  teleprompter_text: string;
  status: ContentStatus;
  created_at: string;
}

// ===== Knowledge Files =====
export interface KnowledgeFile {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  content_text?: string;
  summary?: string;
  embedding_status: boolean;
  created_at: string;
}

// ===== Content Assets =====
export type AssetCategory = "learning" | "case" | "viewpoint" | "story" | "hotspot";

export interface ContentAsset {
  id: string;
  user_id: string;
  content_id: string;
  category: AssetCategory;
  tags: string[];
  publish_status: "draft" | "recorded" | "published";
  created_at: string;
}

// ===== AI Analysis =====
export interface ContentAnalysis {
  core_viewpoint: string;
  core_method: string;
  core_story?: string;
  target_audience: string;
  value_score: number;
  tags: string[];
  extendable_topics: string[];
}

// ===== Onboarding =====
export interface OnboardingData {
  role: UserRole;
  occupation: string;
  // Step 1: Basic info
  name: string;
  industry: string;
  profession: string;
  experience_years: number;
  bio: string;
  // Step 2: Product info
  product_name: string;
  product_price: number;
  target_customer: string;
  deal_method: string;
  selling_points: string;
  // Step 3: Content direction
  content_direction: string;
  // Step 4: Expression style (sliders)
  professional_score: number;
  story_score: number;
  emotion_score: number;
  sales_score: number;
}

// ===== Dashboard =====
export interface DashboardData {
  today_growth: {
    consecutive_days: number;
    today_recorded: boolean;
  };
  today_tasks: {
    record: boolean;
    analyze: boolean;
    generate: boolean;
    shoot: boolean;
  };
  today_materials: {
    learning: number;
    cases: number;
    insights: number;
  };
  recommended_topics: Topic[];
  ai_reminder: string;
}
