/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import AIAssistant from "./components/AIAssistant";
import { Terminal, Shield, ArrowUp, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { PORTFOLIO_DATA } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [bootText, setBootText] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visitCount, setVisitCount] = useState(1);

  // Custom high-tech boot log sequence
  useEffect(() => {
    const lines = [
      "SYSTEM INIT: PORTFOLIO COEFFICIENT ENGINE v2.5",
      "CORE_DATABASE_MOUNT: [OK] /types.ts LOADED",
      "MERGING_RESERVES: AI Engineer + Data Analyst Resumes...",
      "COMPILING_MATRICES: styleSense, rmtNet, insuranceClaims...",
      "SECURE_SERVER_HANDSHAKE: [HEALTHY] status is 200",
      "LAUNCHING: Vikhilesh Boddu Portfolio Co-Pilot...",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setBootText((prev) => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // graceful boot sequence finished
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  // Window viewport tracker for active highlights
  useEffect(() => {
    const handleScroll = () => {
      // Manage scroll top visibility
      setShowScrollTop(window.scrollY > 400);

      const sections = ["home", "about", "skills", "projects", "experience", "certifications", "achievements", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Visitor Counter tick (using LocalStorage client persistent model safely)
  useEffect(() => {
    try {
      const storedCount = localStorage.getItem("vikhilesh_portfolio_ticks");
      let count = 1;
      if (storedCount) {
        count = parseInt(storedCount, 10) + 1;
      }
      localStorage.setItem("vikhilesh_portfolio_ticks", count.toString());
      setVisitCount(count);
    } catch (e) {
      console.warn("Cookies / local storage permissions isolated in iframe.", e);
    }
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  if (isLoading) {
    return (
      /* STUNNING FUTURISTIC TERMINAL INITIALIZATION SCREEN */
      <div className="fixed inset-0 z-50 bg-[#050505] text-cyan-400 font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-6 rounded-3xl bg-[#0c0c0c] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10" />
            </div>
            <span className="text-[9px] text-white/30 tracking-wider">BOOT_TERMINAL_V2.5</span>
          </div>

          <div className="space-y-2 h-[180px] overflow-hidden text-xs text-left">
            {bootText.map((text, idx) => (
              <p key={idx} className="flex items-center space-x-2">
                <span className="text-white/20 select-none">&gt;&gt;</span>
                <span className={idx === bootText.length - 1 ? "text-cyan-300" : "text-white/60"}>{text}</span>
              </p>
            ))}
            <div className="flex items-center space-x-1.5 pt-1.5">
              <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[9px] text-white/30 uppercase tracking-[0.2em]">
            <span>SECURE INBOUND PROTOCOL</span>
            <span className="animate-pulse text-cyan-400 font-bold">LOADING METRICS...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen relative font-sans selection:bg-cyan-400 selection:text-black" id="portfolio-app-root">
      
      {/* Absolute Ambient Background Star Matrix / Grid */}
      <div className="fixed inset-0 pointer-events-none bg-[#050505] -z-10" />

      {/* Primary Navigation */}
      <Navbar onNavClick={handleScrollToSection} activeSection={activeSection} />

      {/* Main Chapters */}
      <main className="relative">
        <Hero onNavClick={handleScrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      {/* AI Assistant Chat Agent */}
      <AIAssistant />

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={() => handleScrollToSection("home")}
          className="fixed bottom-24 right-6 p-2.5 rounded-full bg-white/5 text-white/40 hover:text-white border border-white/5 hover:border-white/10 shadow-lg cursor-pointer hover:scale-105 transition-all duration-350 z-30"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
