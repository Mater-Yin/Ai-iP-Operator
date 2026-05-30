"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, Play, Pause, Sun, Moon, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const MOCK_TELEPROMPTER = `很多人问我：做个人IP最难的是什么？

我的答案是：不是不会写，是不知道写什么。

其实打造IP的秘密很简单——先记录，再创作。

我们每天都在学习、工作、思考，这些都是内容素材。关键是你有没有把它们记录下来。

我的方法特别简单：每天花5分钟，用语音记录今天的3个收获。

AI会自动分析，找出值得展开的内容。然后匹配热点和表达结构，生成完整脚本。

坚持3个月后，我的素材库积累了200+条记录。从这些记录里，AI帮我生成了50+条内容。

我再也不用担心"今天发什么"了。

所以，如果你也想做个人IP，从今天开始，先记录，再创作。`;

export default function TeleprompterPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(28);
  const [isDark, setIsDark] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setScrollPosition((prev) => {
          const next = prev + speed * 0.01;
          if (contentRef.current) {
            const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
            if (next >= maxScroll) {
              setIsPlaying(false);
              return maxScroll;
            }
            contentRef.current.scrollTop = next;
          }
          return next;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    setScrollPosition(0);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300",
      isDark ? "bg-[#0F172A] text-[#F8FAFC]" : "bg-white text-[#111827]"
    )}>
      {/* Toolbar */}
      <header className={cn(
        "flex items-center justify-between px-6 py-3 border-b",
        isDark ? "border-[#334155]" : "border-[#E5E7EB]"
      )}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className={cn("p-2 rounded-xl transition-colors",
              isDark ? "hover:bg-[#1E293B] text-[#94A3B8]" : "hover:bg-[#F7F7F8] text-[#6B7280]"
            )}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-semibold">提词器</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize((s) => Math.max(16, s - 2))}
              className={cn("p-1.5 rounded-lg transition-colors",
                isDark ? "hover:bg-[#1E293B] text-[#94A3B8]" : "hover:bg-[#F7F7F8] text-[#6B7280]"
              )}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className={cn("text-xs w-8 text-center",
              isDark ? "text-[#94A3B8]" : "text-[#6B7280]"
            )}>{fontSize}px</span>
            <button
              onClick={() => setFontSize((s) => Math.min(48, s + 2))}
              className={cn("p-1.5 rounded-lg transition-colors",
                isDark ? "hover:bg-[#1E293B] text-[#94A3B8]" : "hover:bg-[#F7F7F8] text-[#6B7280]"
              )}
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={cn("p-2 rounded-xl transition-colors",
              isDark ? "hover:bg-[#1E293B] text-[#94A3B8]" : "hover:bg-[#F7F7F8] text-[#6B7280]"
            )}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Speed Control */}
      <div className={cn(
        "px-6 py-2 flex items-center gap-4 border-b",
        isDark ? "border-[#334155]" : "border-[#E5E7EB]"
      )}>
        <span className={cn("text-xs", isDark ? "text-[#94A3B8]" : "text-[#6B7280]")}>
          滚动速度
        </span>
        <Slider
          value={[speed]}
          onValueChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            setSpeed(val ?? 50);
          }}
          min={10}
          max={100}
          step={1}
          className="flex-1 max-w-xs"
        />
        <span className={cn("text-xs font-mono", isDark ? "text-[#94A3B8]" : "text-[#6B7280]")}>
          {speed}%
        </span>
      </div>

      {/* Teleprompter Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-hidden">
        <div
          ref={contentRef}
          className="max-w-2xl w-full h-full overflow-y-auto scroll-smooth px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <div style={{ fontSize: `${fontSize}px` }} className="leading-relaxed space-y-6 text-center">
            {MOCK_TELEPROMPTER.split("\n\n").map((paragraph, i) => (
              <p key={i} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      </main>

      {/* Controls */}
      <footer className={cn(
        "px-6 py-4 border-t flex items-center justify-center gap-4",
        isDark ? "border-[#334155]" : "border-[#E5E7EB]"
      )}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className={cn("rounded-xl",
            isDark ? "border-[#334155] text-[#94A3B8]" : ""
          )}
        >
          重置
        </Button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center transition-all",
            isDark
              ? "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0]"
              : "bg-[#111827] text-white hover:bg-[#1E293B]"
          )}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/assets")}
          className={cn("rounded-xl",
            isDark ? "border-[#334155] text-[#94A3B8]" : ""
          )}
        >
          拍摄完成
        </Button>
      </footer>
    </div>
  );
}
