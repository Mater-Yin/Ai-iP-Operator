"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Check, Target, BookOpen, TrendingUp, DollarSign, Star, Lightbulb, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const SKILLS = [
  {
    id: "viewpoint",
    name: "观点型",
    icon: Lightbulb,
    desc: "鲜明观点 + 论证支撑",
    recommended: true,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    id: "story",
    name: "故事型",
    icon: BookOpen,
    desc: "故事引入 + 情感共鸣",
    recommended: true,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    id: "case",
    name: "案例拆解型",
    icon: Target,
    desc: "案例复盘 + 方法提炼",
    recommended: true,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    id: "sales",
    name: "成交型",
    icon: DollarSign,
    desc: "痛点挖掘 + 成交主张",
    recommended: false,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    id: "brand",
    name: "品牌型",
    icon: Star,
    desc: "品牌故事 + 价值输出",
    recommended: false,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    id: "anti_common",
    name: "反常识型",
    icon: TrendingUp,
    desc: "颠覆认知 + 新角度",
    recommended: false,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    id: "emotion",
    name: "情绪表达型",
    icon: MessageCircle,
    desc: "情绪驱动 + 共鸣传播",
    recommended: false,
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-500/10",
  },
];

export default function SkillsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h1 className="text-h1 text-foreground mb-2">选择表达方式</h1>
          <p className="text-body text-muted-foreground">
            AI 根据你的内容推荐了以下表达结构
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            const isSelected = selected === skill.id;
            return (
              <div
                key={skill.id}
                onClick={() => setSelected(skill.id)}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {skill.recommended && (
                  <Badge className="absolute top-3 right-3 rounded-full text-xs" variant="secondary">
                    <Sparkles className="h-3 w-3 mr-1 text-primary" />
                    推荐
                  </Badge>
                )}
                <div className={`h-12 w-12 rounded-xl ${skill.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${skill.color}`} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{skill.name}</h3>
                <p className="text-sm text-muted-foreground">{skill.desc}</p>
                {isSelected && (
                  <div className="mt-3">
                    <Badge className="rounded-full">
                      <Check className="h-3 w-3 mr-1" />
                      已选择
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button
          onClick={() => router.push("/content/generate")}
          disabled={!selected}
          className="rounded-xl h-12 px-8"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          生成内容
        </Button>
      </div>
    </DashboardLayout>
  );
}
