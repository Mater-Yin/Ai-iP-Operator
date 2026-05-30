"use client";

import { Brain, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAssistantProps {
  reminders?: string[];
}

const DEFAULT_REMINDERS = [
  "今天还没有记录内容",
  "建议先记录今天的学习",
  "你的连续记录已达 15 天，继续保持！",
];

export function AIAssistant({ reminders = DEFAULT_REMINDERS }: AIAssistantProps) {
  return (
    <div className="h-full flex flex-col p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">AI 操盘手</h3>
          <p className="text-xs text-muted-foreground">你的专属内容助手</p>
        </div>
        <Sparkles className="h-4 w-4 text-primary ml-auto" />
      </div>

      {/* Reminders */}
      <div className="space-y-3 mb-6">
        {reminders.map((reminder, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-secondary/50 border border-border/50 text-sm text-foreground leading-relaxed"
          >
            💡 {reminder}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2 mb-6">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          快捷操作
        </h4>
        <Button variant="outline" size="sm" className="w-full justify-between rounded-xl">
          <span className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            记录今天的学习
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-between rounded-xl">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            生成一条内容
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </div>

      {/* Tips */}
      <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10">
        <h4 className="text-xs font-medium text-primary mb-2">💎 今日提示</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          持续记录是打造个人 IP 的关键。每天花 5 分钟记录一个想法，AI 会帮你发现内容价值。
        </p>
      </div>
    </div>
  );
}
