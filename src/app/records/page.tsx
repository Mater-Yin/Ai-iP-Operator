"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  MessageCircle,
  DollarSign,
  AlertTriangle,
  Lightbulb,
  Video,
  Edit3,
  Mic,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AIAssistant } from "@/components/layout/ai-assistant";
import { Card } from "@/components/ui/card";

const RECORD_TYPES = [
  { type: "learning", label: "学习", icon: BookOpen, desc: "今天学到了什么？", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { type: "work", label: "工作", icon: Briefcase, desc: "今天做了什么？", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { type: "conversation", label: "对话", icon: MessageCircle, desc: "今天和谁聊了什么？", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
  { type: "deal", label: "成交案例", icon: DollarSign, desc: "今天成交了谁？", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { type: "problem", label: "问题", icon: AlertTriangle, desc: "今天遇到什么问题？", color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
  { type: "insight", label: "感悟", icon: Lightbulb, desc: "今天有什么新认知？", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
  { type: "inspiration", label: "视频启发", icon: Video, desc: "今天看到了什么内容？", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { type: "free", label: "自由记录", icon: Edit3, desc: "任何内容都可以记录", color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
];

export default function RecordsPage() {
  const router = useRouter();

  return (
    <DashboardLayout aiAssistant={<AIAssistant />}>
      <div className="p-6 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-h1 text-foreground mb-2">今天记点什么？</h1>
          <p className="text-body text-muted-foreground">
            选择一个类别，开始记录你的想法。AI 会帮你提炼价值。
          </p>
        </div>

        {/* Recording Entry Point */}
        <div
          onClick={() => router.push("/records/record")}
          className="flex items-center gap-4 p-6 mb-8 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-all group"
        >
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Mic className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              点击开始录音记录
            </p>
            <p className="text-sm text-muted-foreground">
              支持语音转文字，也可以直接输入文字
            </p>
          </div>
        </div>

        {/* Record Type Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {RECORD_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.type}
                onClick={() => router.push(`/records/record?type=${item.type}`)}
                className="p-6 rounded-2xl border-border hover:border-primary/30 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className={`h-12 w-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
