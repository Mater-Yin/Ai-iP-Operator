"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Video, Camera, MessageCircle, FileText, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const MOCK_CONTENT = {
  title: "记录3个月，我发现了打造个人IP的终极秘密",
  outline: `1. 开场钩子：为什么很多人做不好IP？
2. 核心观点：持续记录比创作更重要
3. 方法拆解：如何建立记录系统
4. 案例分享：我的3个月实践
5. 结尾行动：号召开始记录`,
  script: `【开场】
很多人问我：做个人IP最难的是什么？
我的答案是：不是不会写，是不知道写什么。

【观点】
其实打造IP的秘密很简单——先记录，再创作。
我们每天都在学习、工作、思考，这些都是内容素材。
关键是你有没有把它们记录下来。

【方法】
我的方法特别简单：
每天花5分钟，用语音记录今天的3个收获。
AI会自动分析，找出值得展开的内容。
然后匹配热点和表达结构，生成完整脚本。

【案例】
坚持3个月后，我的素材库积累了200+条记录。
从这些记录里，AI帮我生成了50+条内容。
我再也不用担心"今天发什么"了。

【结尾】
所以，如果你也想做个人IP，
从今天开始，先记录，再创作。`,
  shooting: "中近景切换，开场正面特写，观点部分用手势强调，可配合屏幕录制展示记录界面",
  emotion: "真诚、分享感，语速中等偏快，关键观点处停顿强调",
  cover: "《记录3个月，我发现了IP打造的终极秘密》/ 副标题：先记录，再创作",
  comments: "1. 你平时有记录的习惯吗？\n2. 记录3个月就有这么多素材，太厉害了\n3. 这个方法适合所有人吗？",
  teleprompter: "很多人问我：做个人IP最难的是什么？我的答案是：不是不会写，是不知道写什么。其实打造IP的秘密很简单——先记录，再创作。",
};

export default function ContentGeneratePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[1440px] mx-auto">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 text-foreground">{MOCK_CONTENT.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="rounded-full">观点型</Badge>
            <Badge variant="secondary" className="rounded-full">价值评分 88</Badge>
          </div>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Script */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 rounded-2xl border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">脚本</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(MOCK_CONTENT.script)}
                  className="rounded-xl"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {MOCK_CONTENT.script.split("\n").map((line, i) => {
                  if (line.startsWith("【")) {
                    return (
                      <h3 key={i} className="text-sm font-semibold text-foreground mt-4 mb-2">
                        {line}
                      </h3>
                    );
                  }
                  if (!line.trim()) return null;
                  return (
                    <p key={i} className="text-sm text-foreground/80 leading-relaxed mb-2">
                      {line}
                    </p>
                  );
                })}
              </div>
            </Card>

            {/* Shooting & Emotion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 rounded-2xl border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">镜头建议</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {MOCK_CONTENT.shooting}
                </p>
              </Card>
              <Card className="p-5 rounded-2xl border-border">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">情绪建议</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {MOCK_CONTENT.emotion}
                </p>
              </Card>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Outline */}
            <Card className="p-5 rounded-2xl border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">内容结构</h3>
              <div className="space-y-2">
                {MOCK_CONTENT.outline.split("\n").filter(Boolean).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {item.replace(/^\d+\.\s*/, "")}
                  </div>
                ))}
              </div>
            </Card>

            {/* Cover */}
            <Card className="p-5 rounded-2xl border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">封面文案</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {MOCK_CONTENT.cover}
              </p>
            </Card>

            {/* Comments */}
            <Card className="p-5 rounded-2xl border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">评论区引导</h3>
              <div className="space-y-2">
                {MOCK_CONTENT.comments.split("\n").filter(Boolean).map((comment, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{comment}</p>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full rounded-xl h-11"
                onClick={() => router.push("/teleprompter")}
              >
                <Video className="h-4 w-4 mr-2" />
                打开提词器拍摄
              </Button>
              <Button variant="outline" className="w-full rounded-xl h-11">
                <Sparkles className="h-4 w-4 mr-2" />
                优化内容
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
