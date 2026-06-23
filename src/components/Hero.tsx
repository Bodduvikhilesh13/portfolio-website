/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowDown, ChevronRight, Briefcase, Mail, FileText, X, Code } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedResumeType, setSelectedResumeType] = useState<"AI Engineer" | "Data Analyst" | "">("");
  const [showResumeOptions, setShowResumeOptions] = useState(false);

  const badges = [
    "AI Developer",
    "AI Engineer Aspirant",
    "Data Analyst",
    "GenAI Enthusiast",
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#050505] text-white font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-950/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-950/20 rounded-full blur-[100px] pointer-events-none animate-bounce" style={{ animationDuration: "15s" }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-20 right-10 w-24 h-24 border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-white/5 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Editorial Introduction & Badges */}
          <div className="lg:col-span-7 space-y-8 text-left order-2 lg:order-1">
            {/* Animated Badges Row */}
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, idx) => {
                const colorClasses = [
                  "text-cyan-400 border-cyan-500/20",
                  "text-purple-400 border-purple-500/20",
                  "text-blue-400 border-indigo-500/20",
                  "text-emerald-400 border-emerald-500/20"
                ][idx % 4];
                return (
                  <span
                    key={idx}
                    className={`px-3 py-1 bg-white/5 border rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center space-x-1.5 ${colorClasses}`}
                  >
                    <Sparkles className="w-3 h-3 animate-spin shrink-0" style={{ animationDuration: "8s" }} />
                    <span>{badge}</span>
                  </span>
                );
              })}
            </div>
 
            {/* Core Human Statement Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.2] text-white tracking-tight">
              Building <span className="italic font-serif text-cyan-400">AI-powered</span> solutions using machine learning, data analytics, and intelligent automation.
            </h1>

            {/* Structured Academic Subtitle */}
            <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              I am a Computer Science professional passionate about Artificial Intelligence, Machine Learning, Data Analytics, and Generative AI. I enjoy building real-world products that transform raw data into intelligent decisions.
            </p>

            {/* Clean Spaced Call-to-Actions */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  id="hero-view-projects"
                  onClick={() => onNavClick("projects")}
                  className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-colors shadow-lg hover:shadow-cyan-400/20 transition-all cursor-pointer flex items-center space-x-1.5 group"
                >
                  <span>View Projects</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </button>

                <button
                  id="hero-contact-hire"
                  onClick={() => onNavClick("contact")}
                  className="px-6 py-3 bg-cyan-500 text-black text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Contact & Hire</span>
                </button>
              </div>

              {/* Resume download section directly below primary actions, with interactive toggle click to open options */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="hero-resume-trigger"
                  onClick={() => setShowResumeOptions(!showResumeOptions)}
                  className={`px-5 py-3 hover:text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center space-x-1.5 ${
                    showResumeOptions 
                      ? "bg-purple-500/15 border border-purple-500/40 text-purple-200 shadow-md shadow-purple-500/10" 
                      : "bg-white/5 border border-white/10 text-white/70 hover:border-white/20"
                  }`}
                >
                  <FileText className={`w-3.5 h-3.5 transition-colors ${showResumeOptions ? "text-purple-400" : "text-white/40"}`} />
                  <span>Resume</span>
                  <span className={`text-[9px] px-1 bg-white/5 text-white/40 rounded transition-transform duration-200 ${showResumeOptions ? "rotate-90" : ""}`}>
                    {showResumeOptions ? "◀" : "▼"}
                  </span>
                </button>

                {showResumeOptions && (
                  <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-3xl animate-in fade-in slide-in-from-left-3 duration-250">
                    <a
                      href={(PORTFOLIO_DATA.personal as any).resumeAiUrl || undefined}
                      target={(PORTFOLIO_DATA.personal as any).resumeAiUrl ? "_blank" : undefined}
                      rel={(PORTFOLIO_DATA.personal as any).resumeAiUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!(PORTFOLIO_DATA.personal as any).resumeAiUrl) {
                          e.preventDefault();
                          setSelectedResumeType("AI Engineer");
                          setShowConfigModal(true);
                        }
                      }}
                      className="px-3.5 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 border border-purple-500/20 hover:border-purple-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center space-x-1.5 group/res animate-in fade-in slide-in-from-left-1 duration-150"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      <span>AI Engineer</span>
                    </a>
                    <a
                      href={(PORTFOLIO_DATA.personal as any).resumeDataUrl || undefined}
                      target={(PORTFOLIO_DATA.personal as any).resumeDataUrl ? "_blank" : undefined}
                      rel={(PORTFOLIO_DATA.personal as any).resumeDataUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!(PORTFOLIO_DATA.personal as any).resumeDataUrl) {
                          e.preventDefault();
                          setSelectedResumeType("Data Analyst");
                          setShowConfigModal(true);
                        }
                      }}
                      className="px-3.5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/20 hover:border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center space-x-1.5 group/res animate-in fade-in slide-in-from-left-1 duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Data Analyst</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Portrait Image & Floating Opportunity Card */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-72 sm:w-80 lg:w-[380px] h-72 sm:h-80 lg:h-[480px] rounded-[40px] overflow-hidden border border-white/10 group shadow-2xl">
              
              {/* Profile Photo Container */}
              <div className="absolute inset-0 bg-[#0c0c0c] flex items-center justify-center">
                {imageError ? (
                  // Futuristic Glowing Initials Avatar Fallback
                  <div className="w-full h-full bg-[#121212] flex flex-col items-center justify-center p-8 text-center select-none relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
                    <div className="w-24 h-24 rounded-full bg-purple-500/10 border border-cyan-400/25 flex items-center justify-center text-3xl font-light text-cyan-300 tracking-wider shadow-[0_0_45px_rgba(6,182,212,0.15)] mb-4 font-mono">
                      VB
                    </div>
                    <span className="text-white text-base tracking-wide font-medium">Vikhilesh Boddu</span>
                    <span className="text-purple-400 text-[10px] font-mono tracking-widest mt-1">AI ENGINEER ASPIRANT</span>
                    
                    <div className="mt-6 flex space-x-1 text-[8px] font-mono text-gray-500 bg-black/60 border border-white/5 rounded-md px-3 py-1.5">
                      <span className="text-emerald-400">●</span> <span>MARRI LAXMAN REDDY INST</span>
                    </div>
                  </div>
                ) : (
                  // Load actual original photo with graceful fail triggers
                  <img
                    id="hero-portrait-photo"
                    src={(PORTFOLIO_DATA.personal as any).avatarUrl || "/my_profile.png"}
                    onError={() => {
                      setImageError(true);
                    }}
                    alt={PORTFOLIO_DATA.personal.fullName}
                    className="w-full h-full object-cover object-center filter contrast-[1.05] transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Gradient shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

                {/* Name & Title overlay at bottom of photo card */}
                {!imageError && (
                  <div className="absolute bottom-6 left-0 right-0 z-20 text-center px-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h3 className="text-white text-lg sm:text-xl font-bold tracking-wide drop-shadow-md">
                      {PORTFOLIO_DATA.personal.fullName}
                    </h3>
                    <p className="text-cyan-400 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mt-1 drop-shadow-sm font-semibold">
                      Computer Science Engineering
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Resume Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowConfigModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/80 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Soft Glow */}
            <div className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 ${selectedResumeType === "AI Engineer" ? "bg-purple-500/30" : "bg-cyan-500/30"}`} />
            
            {/* Close Button */}
            <button 
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/5 p-1.5 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2.5 rounded-2xl border ${selectedResumeType === "AI Engineer" ? "bg-purple-950/20 border-purple-500/20 text-purple-400" : "bg-cyan-950/20 border-cyan-500/20 text-cyan-400"}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {selectedResumeType} Resume
                </h3>
                <p className="text-[10px] text-white/40 font-mono">LINK SETUP INSTRUCTIONS</p>
              </div>
            </div>

            {/* Instruction Body */}
            <div className="space-y-4 text-left">
              <p className="text-white/70 text-xs leading-relaxed">
                Hi, Vikhilesh! To view or download your real <strong className="text-white font-semibold">{selectedResumeType}</strong> resume, you should link your public PDF document in <code className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-white text-[11px] border border-white/5">src/types.ts</code>.
              </p>

              {/* Live Preview Codeblock */}
              <div className="bg-[#050505] border border-white/5 rounded-xl p-3 font-mono text-[10px] text-white/50 space-y-1 relative group/code overflow-x-auto">
                <div className="absolute right-2.5 top-2.5 flex items-center space-x-1.5 bg-white/5 rounded px-2 py-0.5 border border-white/5 pointer-events-none">
                  <Code className="w-3 h-3 text-cyan-400" />
                  <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-bold">Config</span>
                </div>
                <div className="text-gray-600">// Open /src/types.ts around line 77</div>
                <div><span className="text-purple-400">const</span> PORTFOLIO_DATA = &#123;</div>
                <div className="pl-3">personal: &#123;</div>
                <div className={`pl-6 ${selectedResumeType === "AI Engineer" ? "text-purple-300 font-medium bg-purple-500/5 rounded" : ""}`}>
                  resumeAiUrl: <span className="text-emerald-400">"https://drive.google.com/...pdf"</span>,
                </div>
                <div className={`pl-6 ${selectedResumeType === "Data Analyst" ? "text-cyan-300 font-medium bg-cyan-500/5 rounded" : ""}`}>
                  resumeDataUrl: <span className="text-emerald-400">"https://drive.google.com/...pdf"</span>,
                </div>
                <div className="pl-3">&#125;</div>
                <div>&#125;</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2 mt-2">
                <h4 className="text-[11px] font-bold text-white/80 uppercase tracking-widest flex items-center space-x-1.5">
                  <span className="text-emerald-400 animate-pulse">●</span>
                  <span>Interactive Live Preview</span>
                </h4>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Currently, this button loops back to help visitors get in touch with you. You can request Vikhilesh's resume right now using the contact section!
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  onNavClick("contact");
                }}
                className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-cyan-500/10 transition-all text-center"
              >
                Go to Contact Form
              </button>
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
