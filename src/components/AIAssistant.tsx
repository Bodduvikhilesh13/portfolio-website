/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Terminal, ShieldAlert, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_init",
      role: "assistant",
      content: "Hello! I am Vikhilesh's AI Portfolio Co-Pilot. I can answer your questions regarding his background, certifications, academic performance, and hackathon projects. What would you like to know?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "Tell me about StyleSense project",
    "What did he do at Google Cloud?",
    "Show Vikhilesh's skill stack",
    "Is he available for internships?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessageId = "msg_user_" + Date.now();
    const newUserMessage: Message = {
      id: userMessageId,
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Gather raw conversational context from the current dialogue stack
      const chatHistory = messages
        .filter((m) => m.id !== "msg_init")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
        }),
      });

      if (!res.ok) {
        throw new Error("Endpoint connection failed.");
      }

      const data = await res.json();
      const aiMessageId = "msg_ai_" + Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          role: "assistant",
          content: data.reply || "I encountered an error formulating a response.",
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: "msg_error_" + Date.now(),
          role: "assistant",
          content: "I apologize, my central response node failed to connect. Please verify your internet connection or check the backend server state.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-assistant-wrapper" className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Glow effect surrounding float bubble */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg animate-pulse" />
      )}

      {/* Launcher Bubble */}
      {!isOpen && (
        <button
          id="ai-assistant-launcher"
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.65)] hover:scale-105 transition-all duration-350 cursor-pointer flex items-center justify-center group"
          title="Talk with Vikhilesh's AI Assistant"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
          </span>
        </button>
      )}

      {/* Conversational Window */}
      {isOpen && (
        <div
          id="ai-assistant-window"
          className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl bg-slate-950/95 border border-purple-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col overflow-hidden animate-slideUp"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 to-indigo-950 border-b border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold tracking-wide flex items-center space-x-1">
                  <span>Vikhilesh Co-Pilot</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                </h4>
                <p className="text-[10px] text-gray-400 font-mono flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping" />
                  <span>ONLINE // GEMINI 3.5 FLASH</span>
                </p>
              </div>
            </div>
            <button
              id="ai-assistant-close"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Stream */}
          <div
            id="ai-chat-thread"
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-purple-900"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-br-none shadow-[2px_2px_10px_rgba(147,51,234,0.15)]"
                      : "bg-slate-900 text-gray-200 border border-slate-800 rounded-bl-none shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  {/* Handle basic markdown formatting from fallback reply strictly */}
                  {msg.content.split("\n").map((line, idx) => {
                    if (line.startsWith("###")) {
                      return <h5 key={idx} className="font-semibold text-cyan-300 mt-2 mb-1">{line.replace("###", "")}</h5>;
                    }
                    if (line.startsWith("-") || line.startsWith("*")) {
                      return (
                        <p key={idx} className="pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-cyan-400">
                          {line.substring(2)}
                        </p>
                      );
                    }
                    if (/^\d+\./.test(line)) {
                      return <p key={idx} className="pl-1 mt-1 font-sans">{line}</p>;
                    }
                    return <p key={idx} className="mb-1">{line}</p>;
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-none px-3.5 py-3 text-sm flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-950 border-t border-purple-500/10 flex flex-wrap gap-1.5">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="text-[10px] font-medium text-slate-300 hover:text-cyan-300 bg-purple-950/30 hover:bg-purple-900/40 border border-purple-900/40 hover:border-cyan-500/30 px-2 py-1 rounded-full text-left transition-all cursor-pointer truncate max-w-[200px]"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Field Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-slate-900 border-t border-purple-500/20 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-950 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 border border-purple-900/40 focus:border-cyan-500 focus:outline-none transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 rounded-xl text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
