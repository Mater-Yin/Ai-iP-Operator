"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, Check, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Occupation options
const OCCUPATIONS = [
  "大学生", "创业者", "老板", "主播", "知识博主",
  "培训机构", "教练", "讲师", "销售", "电商",
  "实体商家", "自媒体人", "其他",
];

// Content direction options
const CONTENT_DIRECTIONS = [
  "教育", "商业", "成长", "创业", "销售", "职场", "生活",
];

// Step labels
const STEPS = ["选择身份", "基本信息", "产品信息", "内容方向", "表达风格"];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "ip";

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    occupation: "",
    name: "",
    industry: "",
    profession: "",
    experience_years: 0,
    bio: "",
    product_name: "",
    product_price: 0,
    target_customer: "",
    deal_method: "",
    selling_points: "",
    content_direction: "",
    professional_score: 50,
    story_score: 50,
    emotion_score: 50,
    sales_score: 50,
  });

  const updateField = useCallback((field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const canProceed = () => {
    switch (step) {
      case 0: return formData.occupation !== "";
      case 1: return formData.name !== "" && formData.industry !== "" && formData.bio !== "";
      case 2: return formData.product_name !== "";
      case 3: return formData.content_direction !== "";
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 4) setStep((s) => s + 1);
    else {
      // Submit - navigate to dashboard
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else router.push("/");
  };

  const renderStepIndicator = () => (
    <div className="flex items-center gap-2 mb-12">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              i === step
                ? "bg-primary text-primary-foreground"
                : i < step
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {i < step ? <Check className="h-3.5 w-3.5" /> : <span>{i + 1}</span>}
            <span className="hidden sm:inline">{label}</span>
          </div>
          {i < 4 && <div className="h-px w-8 bg-border" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-8 py-6 border-b border-border">
        <button onClick={handleBack} className="p-2 hover:bg-secondary rounded-xl transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-foreground">完善人格档案</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-2xl">
          {renderStepIndicator()}

          {/* Step 0: Occupation Selection */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-h1 text-foreground mb-2">请选择你的身份</h2>
                <p className="text-body text-muted-foreground">
                  帮助我们更好地了解你
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OCCUPATIONS.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => updateField("occupation", occ)}
                    className={`p-4 rounded-xl border text-center text-sm font-medium transition-all ${
                      formData.occupation === occ
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/30"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-h1 text-foreground mb-2">基本信息</h2>
                <p className="text-body text-muted-foreground">让我们认识你</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="你的姓名"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">行业</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => updateField("industry", e.target.value)}
                      placeholder="所在行业"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profession">职业</Label>
                    <Input
                      id="profession"
                      value={formData.profession}
                      onChange={(e) => updateField("profession", e.target.value)}
                      placeholder="具体职业"
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience">从业时间（年）</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience_years || ""}
                    onChange={(e) => updateField("experience_years", parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    placeholder="简单介绍你自己..."
                    className="mt-1.5 h-24"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Product Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-h1 text-foreground mb-2">产品信息</h2>
                <p className="text-body text-muted-foreground">你的产品/服务是什么？</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product_name">产品名称</Label>
                  <Input
                    id="product_name"
                    value={formData.product_name}
                    onChange={(e) => updateField("product_name", e.target.value)}
                    placeholder="产品/服务名称"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="product_price">价格</Label>
                  <Input
                    id="product_price"
                    type="number"
                    value={formData.product_price || ""}
                    onChange={(e) => updateField("product_price", parseInt(e.target.value) || 0)}
                    placeholder="产品价格"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="target_customer">目标客户</Label>
                  <Input
                    id="target_customer"
                    value={formData.target_customer}
                    onChange={(e) => updateField("target_customer", e.target.value)}
                    placeholder="谁是你的目标客户？"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="deal_method">成交方式</Label>
                  <Input
                    id="deal_method"
                    value={formData.deal_method}
                    onChange={(e) => updateField("deal_method", e.target.value)}
                    placeholder="如何成交？（私域/直播/课程等）"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="selling_points">核心卖点</Label>
                  <Textarea
                    id="selling_points"
                    value={formData.selling_points}
                    onChange={(e) => updateField("selling_points", e.target.value)}
                    placeholder="产品的核心卖点是什么？"
                    className="mt-1.5 h-20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Content Direction */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-h1 text-foreground mb-2">内容方向</h2>
                <p className="text-body text-muted-foreground">想打造什么类型的 IP？</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CONTENT_DIRECTIONS.map((dir) => (
                  <button
                    key={dir}
                    onClick={() => updateField("content_direction", dir)}
                    className={`p-4 rounded-xl border text-center text-sm font-medium transition-all ${
                      formData.content_direction === dir
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/30"
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Expression Style */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-h1 text-foreground mb-2">表达风格</h2>
                <p className="text-body text-muted-foreground">调整滑杆，定义你的表达方式</p>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>专业度</Label>
                    <Badge variant="secondary" className="font-mono">
                      {formData.professional_score}
                    </Badge>
                  </div>
                  <Slider
                    value={[formData.professional_score]}
                    onValueChange={(v) => {
                      const val = Array.isArray(v) ? v[0] : v;
                      updateField("professional_score", val ?? 50);
                    }}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>通俗易懂</span>
                    <span>专业深度</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>故事感</Label>
                    <Badge variant="secondary" className="font-mono">
                      {formData.story_score}
                    </Badge>
                  </div>
                  <Slider
                    value={[formData.story_score]}
                    onValueChange={(v) => {
                      const val = Array.isArray(v) ? v[0] : v;
                      updateField("story_score", val ?? 50);
                    }}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>直接表达</span>
                    <span>故事讲述</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>情绪感</Label>
                    <Badge variant="secondary" className="font-mono">
                      {formData.emotion_score}
                    </Badge>
                  </div>
                  <Slider
                    value={[formData.emotion_score]}
                    onValueChange={(v) => {
                      const val = Array.isArray(v) ? v[0] : v;
                      updateField("emotion_score", val ?? 50);
                    }}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>理性克制</span>
                    <span>情绪共鸣</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>销售感</Label>
                    <Badge variant="secondary" className="font-mono">
                      {formData.sales_score}
                    </Badge>
                  </div>
                  <Slider
                    value={[formData.sales_score]}
                    onValueChange={(v) => {
                      const val = Array.isArray(v) ? v[0] : v;
                      updateField("sales_score", val ?? 50);
                    }}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>价值输出</span>
                    <span>成交导向</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button variant="outline" onClick={handleBack} className="rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一步
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()} className="rounded-xl">
              {step === 4 ? "完成设置" : "下一步"}
              {step < 4 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">加载中...</div>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
