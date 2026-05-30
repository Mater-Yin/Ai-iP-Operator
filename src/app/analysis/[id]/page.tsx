"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Target, Users, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_ANALYSIS = {
  core_viewpoint: "持续记录是打造个人IP最有效的方式，AI可以帮助创作者发现记录中的内容价值。",
  core_method: "每天花5分钟记录一个想法或案例，AI自动分析提炼核心观点，匹配热点和表达结构，生成完整内容。",
  core_story: "一个创业者通过每天记录，3个月后建立了自己的内容资产库，实现了持续输出。",
  target_audience: "知识博主、创业者、个人IP打造者",
  value_score: 88,
  tags: ["个人IP", "内容创作", "效率提升", "知识管理"],
  extendable_topics: [
    "如何建立每日记录的习惯",
    "AI如何帮助创作者提升效率",
    "从0到1打造个人IP的完整路径",
  ],
};

export default function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-secondary rounded-xl transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-foreground">内容分析</h1>
            <p className="text-xs text-muted-foreground">AI 已分析完成</p>
          </div>
        </div>
        <Badge variant="secondary" className="rounded-full">
          <Sparkles className="h-3 w-3 mr-1 text-primary" />
          价值评分 {MOCK_ANALYSIS.value_score}
        </Badge>
      </header>

      <main className="flex-1 overflow-auto p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          {/* Core Viewpoint */}
          <Card className="p-6 rounded-2xl border-border">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">核心观点</h2>
            </div>
            <p className="text-body text-foreground leading-relaxed">
              {MOCK_ANALYSIS.core_viewpoint}
            </p>
          </Card>

          {/* Core Method */}
          <Card className="p-6 rounded-2xl border-border">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">核心方法</h2>
            </div>
            <p className="text-body text-foreground leading-relaxed">
              {MOCK_ANALYSIS.core_method}
            </p>
          </Card>

          {/* Target Audience + Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 rounded-2xl border-border">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">适合人群</h2>
              </div>
              <p className="text-sm text-foreground">{MOCK_ANALYSIS.target_audience}</p>
            </Card>
            <Card className="p-5 rounded-2xl border-border">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">内容价值评分</h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">{MOCK_ANALYSIS.value_score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
            </Card>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {MOCK_ANALYSIS.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Extendable Topics */}
          <Card className="p-6 rounded-2xl border-border">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">可延伸选题</h2>
            </div>
            <div className="space-y-3">
              {MOCK_ANALYSIS.extendable_topics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 text-sm cursor-pointer hover:bg-secondary group"
                >
                  <span className="text-foreground">{topic}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </Card>

          {/* Action */}
          <Button
            onClick={() => router.push("/skills")}
            className="w-full rounded-xl h-12 text-base"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            继续生成内容
          </Button>
        </div>
      </main>
    </div>
  );
}
