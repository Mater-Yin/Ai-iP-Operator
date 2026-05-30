"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Briefcase, Target, Star, TrendingUp, Video, CheckCircle2, Clock, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const MOCK_ASSETS = [
  { id: 1, title: "如何从0到1打造个人IP", category: "viewpoint", status: "published", tags: ["个人IP", "创业"], date: "2026-05-28", score: 92 },
  { id: 2, title: "创业者必须避开的3个坑", category: "story", status: "recorded", tags: ["创业", "经验"], date: "2026-05-27", score: 88 },
  { id: 3, title: "一个成交案例的完整复盘", category: "case", status: "draft", tags: ["成交", "复盘"], date: "2026-05-26", score: 85 },
  { id: 4, title: "2026年内容创作新趋势", category: "hotspot", status: "published", tags: ["趋势", "内容"], date: "2026-05-25", score: 90 },
  { id: 5, title: "每天记录5分钟，3个月后的变化", category: "story", status: "published", tags: ["习惯", "成长"], date: "2026-05-24", score: 87 },
  { id: 6, title: "知识博主的变现路径分析", category: "viewpoint", status: "recorded", tags: ["变现", "知识付费"], date: "2026-05-23", score: 83 },
];

const CATEGORY_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  learning: { label: "学习", icon: BookOpen, color: "text-blue-500" },
  case: { label: "案例", icon: Target, color: "text-emerald-500" },
  viewpoint: { label: "观点", icon: Star, color: "text-purple-500" },
  story: { label: "故事", icon: Briefcase, color: "text-amber-500" },
  hotspot: { label: "热点", icon: TrendingUp, color: "text-rose-500" },
};

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  draft: { label: "待拍摄", icon: Clock, color: "text-yellow-500" },
  recorded: { label: "已拍摄", icon: Video, color: "text-blue-500" },
  published: { label: "已发布", icon: CheckCircle2, color: "text-success" },
  archived: { label: "已归档", icon: Archive, color: "text-muted-foreground" },
};

export default function AssetsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_ASSETS.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-h1 text-foreground mb-1">内容资产库</h1>
            <p className="text-sm text-muted-foreground">
              共 {MOCK_ASSETS.length} 条内容资产
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索内容..."
              className="pl-10 rounded-xl"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="rounded-xl mb-6">
            <TabsTrigger value="all" className="rounded-lg">全部</TabsTrigger>
            <TabsTrigger value="viewpoint" className="rounded-lg">观点</TabsTrigger>
            <TabsTrigger value="story" className="rounded-lg">故事</TabsTrigger>
            <TabsTrigger value="case" className="rounded-lg">案例</TabsTrigger>
            <TabsTrigger value="hotspot" className="rounded-lg">热点</TabsTrigger>
            <TabsTrigger value="learning" className="rounded-lg">学习</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-3">
              {filtered.map((asset) => {
                const cat = CATEGORY_CONFIG[asset.category] || CATEGORY_CONFIG.viewpoint;
                const stat = STATUS_CONFIG[asset.status] || STATUS_CONFIG.draft;
                const CatIcon = cat.icon;
                const StatIcon = stat.icon;
                return (
                  <Card
                    key={asset.id}
                    className="p-4 rounded-2xl border-border hover:border-primary/30 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                          <CatIcon className={`h-5 w-5 ${cat.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {asset.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs rounded-full">
                              {cat.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{asset.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden sm:flex flex-wrap gap-1 max-w-[200px]">
                          {asset.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs rounded-full">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-xs font-mono"
                          >
                            {asset.score}分
                          </Badge>
                          <div className={`flex items-center gap-1 text-xs ${stat.color}`}>
                            <StatIcon className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{stat.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {["viewpoint", "story", "case", "hotspot", "learning"].map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <div className="space-y-3">
                {filtered
                  .filter((a) => a.category === cat)
                  .map((asset) => (
                    <Card key={asset.id} className="p-4 rounded-2xl border-border">
                      <p className="text-sm font-medium text-foreground">{asset.title}</p>
                    </Card>
                  ))}
                {filtered.filter((a) => a.category === cat).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">暂无内容</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
