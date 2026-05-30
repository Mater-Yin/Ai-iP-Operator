"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
        <span className="sr-only">切换主题</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl"
      title={theme === "dark" ? "切换浅色模式" : "切换深色模式"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[#94A3B8] hover:text-[#F8FAFC]" />
      ) : (
        <Moon className="h-5 w-5 text-[#6B7280] hover:text-[#111827]" />
      )}
      <span className="sr-only">切换主题</span>
    </Button>
  );
}
