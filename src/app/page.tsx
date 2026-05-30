"use client";

import { Brain, Rocket } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            AI IP操盘手
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-16">
          <h1 className="text-title mb-4 text-foreground">
            欢迎来到 AI IP操盘手
          </h1>
          <p className="text-body text-muted-foreground max-w-lg mx-auto">
            打造属于你的数字内容团队
            <br />
            通过人格建模、知识沉淀、内容分析，持续输出高质量内容
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
          {/* IP Card */}
          <Link
            href="/onboarding?role=ip"
            className="group relative flex flex-col items-center text-center p-10 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-h2 mb-3 text-foreground">我是 IP</h2>
            <ul className="space-y-2 text-caption text-muted-foreground">
              <li>打造个人 IP</li>
              <li>持续输出内容</li>
              <li>建立人格模型</li>
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              立即开始
              <Rocket className="h-4 w-4" />
            </span>
          </Link>

          {/* Operator Card */}
          <Link
            href="/onboarding?role=operator"
            className="group relative flex flex-col items-center text-center p-10 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-h2 mb-3 text-foreground">我是操盘手</h2>
            <ul className="space-y-2 text-caption text-muted-foreground">
              <li>管理多个账号</li>
              <li>规划内容矩阵</li>
              <li>操盘内容团队</li>
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              立即开始
              <Rocket className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center">
        <p className="text-caption text-muted-foreground">
          AI IP操盘手 v1.0 — 专属于每个创作者的 AI 操盘团队
        </p>
      </footer>
    </div>
  );
}
