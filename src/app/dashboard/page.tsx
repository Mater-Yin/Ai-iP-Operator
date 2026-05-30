"use client";

import { Calendar, CheckCircle2, Clock, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AIAssistant } from "@/components/layout/ai-assistant";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_RECOMMENDED_TOPICS = [
  { title: "如何从0到1打造个人IP", reason: "基于你最近的行业思考", score: 92 },
  { title: "创业者必须避开的3个坑", reason: "结合你的创业经验", score: 88 },
  { title: "2026年内容创作新趋势", reason: "匹配行业热点", score: 85 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout aiAssistant={<AIAssistant />}>
      <div className="p-6 space-y-8 max-w-[1440px] mx-auto">
        {/* Today's Growth */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-5 rounded-2xl border-border col-span-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                连续记录
              </div>
              <Badge variant="secondary" className="rounded-full">
                <Sparkles className="h-3 w-3 mr-1 text-primary" />
                <span className="text-primary font-semibold">15天</span>
              </Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">持续成长中</p>
          </Card>

          {/* Today's Tasks */}
          <Card className="p-5 rounded-2xl border-border col-span-1 md:col-span-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CheckCircle2 className="h-4 w-4" />
              今日任务
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "记录学习", done: true },
                { label: "记录案例", done: false },
                { label: "生成内容", done: false },
                { label: "拍摄视频", done: false },
              ].map((task) => (
                <div
                  key={task.label}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-sm border transition-colors ${
                    task.done
                      ? "border-success/20 bg-success/5 text-success"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {task.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <Clock className="h-4 w-4 shrink-0" />
                  )}
                  <span className={task.done ? "" : "text-foreground"}>{task.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Today's Materials + Recommended Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Materials */}
          <Card className="p-5 rounded-2xl border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              今日素材
            </div>
            <div className="space-y-3">
              {[
                { label: "学习内容", count: 3 },
                { label: "客户案例", count: 1 },
                { label: "思考感悟", count: 2 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 text-sm"
                >
                  <span className="text-foreground">{item.label}</span>
                  <Badge variant="secondary" className="font-mono">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Topics */}
          <Card className="p-5 rounded-2xl border-border lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                AI 推荐选题
              </div>
              <Button variant="ghost" size="sm" className="text-xs rounded-xl">
                查看更多 <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {MOCK_RECOMMENDED_TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {topic.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{topic.reason}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-3 shrink-0 font-mono text-xs"
                  >
                    {topic.score}分
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                今天想记录什么？
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                记录是内容创作的起点。AI 会帮你发现记录中的内容价值，生成属于你的专属内容。
              </p>
              <div className="flex gap-3">
                <Button className="rounded-xl">
                  <Sparkles className="h-4 w-4 mr-2" />
                  开始记录
                </Button>
                <Button variant="outline" className="rounded-xl">
                  查看所有素材
                </Button>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
