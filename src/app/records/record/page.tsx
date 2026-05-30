"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Mic, Square, Loader2, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const RECORD_TYPE_LABELS: Record<string, string> = {
  learning: "学习",
  work: "工作",
  conversation: "对话",
  deal: "成交案例",
  problem: "问题",
  insight: "感悟",
  inspiration: "视频启发",
  free: "自由记录",
};

function RecordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "free";
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        // In production, send blob to backend for ASR
        // setTranscript("...");
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setElapsed(seconds);
      }, 1000);
    } catch (err) {
      console.error("Recording failed:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

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
            <h1 className="text-base font-semibold text-foreground">
              {RECORD_TYPE_LABELS[type] || "自由记录"}
            </h1>
            <p className="text-xs text-muted-foreground">录音记录</p>
          </div>
        </div>
        <Badge variant="secondary" className="rounded-full">
          语音转文字
        </Badge>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Recording Button */}
        <div className="text-center mb-10">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
              isRecording
                ? "bg-red-500 shadow-lg shadow-red-500/30 scale-105"
                : "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            }`}
          >
            {isRecording ? (
              <Square className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-10 w-10 text-white" />
            )}
            {/* Recording pulse animation */}
            {isRecording && (
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
            )}
          </button>
          <p className="mt-4 text-sm text-muted-foreground">
            {isRecording ? "点击停止录音" : "点击开始录音"}
          </p>
          {isRecording && (
            <p className="mt-2 text-2xl font-mono font-semibold text-red-500">
              {formatTime(elapsed)}
            </p>
          )}
        </div>

        {/* Transcription Area */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {isRecording ? "实时转文字..." : "记录内容"}
            </label>
            {transcript && (
              <Badge variant="secondary" className="text-xs">
                <Check className="h-3 w-3 mr-1 text-success" />
                已记录
              </Badge>
            )}
          </div>
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={
              isRecording
                ? "录音中，说话内容将实时转为文字..."
                : "输入你的记录内容，或点击上方麦克风开始录音"
            }
            className="min-h-[200px] rounded-2xl text-body resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 w-full">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 rounded-xl"
          >
            取消
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            disabled={!transcript.trim()}
            className="flex-1 rounded-xl"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            完成记录
          </Button>
        </div>
      </main>
    </div>
  );
}

export default function RecordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <RecordContent />
    </Suspense>
  );
}
