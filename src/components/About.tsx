/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, Award, GraduationCap, Target } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#070707] text-white relative border-y border-white/5 font-sans">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-950/20 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-950/15 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Title */}
        <div className="text-left max-w-3xl mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
            01 // PROFILE SUMMARY
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
            A Combined <span className="italic font-serif text-cyan-400">Engineering & Analytics</span> Identity
          </h2>
          <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Core Combined Editorial (8 Columns on Large Screens) */}
          <div className="lg:col-span-8 space-y-6 text-white/60 font-light text-base leading-relaxed">
            <h3 className="text-white text-xl font-medium tracking-wide">
              Who is Vikhilesh Boddu?
            </h3>
            
            <p className="font-light">
              I am a results-driven <strong className="font-semibold text-white">Computer Science Engineer</strong> (2024 - 2027) with hands-on expertise building models and workflows across both <strong className="font-semibold text-white">Generative AI</strong> and <strong className="font-semibold text-white">Data Analytics</strong>. By combining these distinct roles, I bridge the gap between building raw mathematical algorithms and extracting actionable visual intelligence for business problems.
            </p>

            <p className="font-light">
              My professional footprint includes designing end-to-end generative recommendation networks (using standard APIs like the <strong className="font-semibold text-white">Gemini API</strong> and high-concurrency <strong className="font-semibold text-white">FastAPI</strong> backends), tuning multi-task deep neural networks, and creating rich Power BI star schemas backed by robust MySQL architectures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Target className="w-5 h-5" />
                  </span>
                  <h4 className="text-white text-sm font-semibold tracking-wide">Technical Mission</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  To deploy scalable ML pipelines, structure modern Retrieval-Augmented Generation (RAG) agents, and transform raw unformatted data schemas into intelligent corporate dashboards.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Award className="w-5 h-5" />
                  </span>
                  <h4 className="text-white text-sm font-semibold tracking-wide">Core Tenets</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Passionate about engineering clean APIs, hyper-tuning hyperparameters, optimizing data warehouses, and presenting intuitive dashboards with sub-second reload metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Educational Timelines (4 Columns on Large Screens) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-white text-lg font-medium tracking-wide flex items-center space-x-2 mb-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Academic Timeline</span>
            </h3>

            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-cyan-400/25 hover:bg-[#0f0f0f] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle progress indicator */}
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold block mb-1.5 uppercase tracking-wider">
                    {edu.duration}
                  </span>
                  <h4 className="text-white text-sm font-bold leading-tight font-sans">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-light">
                    {edu.institution}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-white/5 hover:bg-white/10 text-white px-2 py-0.5 rounded border border-white/10 font-bold">
                      {edu.score}
                    </span>
                    <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">
                      VERIFIED ACADEMICS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
