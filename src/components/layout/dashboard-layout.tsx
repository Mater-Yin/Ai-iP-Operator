"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Lightbulb,
  PenSquare,
  Target,
  BookOpen,
  Library,
  Video,
  Settings,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "操盘中心", icon: LayoutDashboard },
  { href: "/records", label: "每日记录", icon: Calendar },
  { href: "/topics", label: "AI选题", icon: Lightbulb },
  { href: "/content/generate", label: "内容生成", icon: PenSquare },
  { href: "/skills", label: "Skill库", icon: Target },
  { href: "/knowledge", label: "知识库", icon: BookOpen },
  { href: "/assets", label: "内容资产", icon: Library },
  { href: "/teleprompter", label: "提词器", icon: Video },
  { href: "/settings", label: "设置", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  aiAssistant?: React.ReactNode;
}

export function DashboardLayout({ children, aiAssistant }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-sidebar transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[280px]"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <Link
            href="/dashboard"
            className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}
          >
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-base font-semibold text-foreground whitespace-nowrap">
                AI IP操盘手
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-border">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && <ThemeToggle />}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-foreground">
              {NAV_ITEMS.find((item) => item.href === pathname || pathname.startsWith(item.href + "/"))?.label || "操盘中心"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {collapsed && <ThemeToggle />}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* AI Assistant Panel */}
      {aiAssistant && (
        <aside className="w-[320px] border-l border-border bg-card hidden xl:block">
          {aiAssistant}
        </aside>
      )}
    </div>
  );
}
