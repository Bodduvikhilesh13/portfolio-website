/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, Sparkles, Plus, Minus, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // expand Google Cloud internship by default

  return (
    <section id="experience" className="py-24 bg-[#050505] text-white relative font-sans border-t border-white/5">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-950/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-950/10 blur-[120px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
            04 // INTERNSHIP CHRONICLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
            Practical Industry <span className="italic font-serif text-cyan-400">Footprints</span>
          </h2>
          <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
        </div>

        {/* Timeline Structure */}
        <div className="relative border-l border-white/5 max-w-4xl mx-auto text-left pl-6 sm:pl-10 space-y-12">
          
          {PORTFOLIO_DATA.experiences.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;

            // Compute theme-specific coloring
            const isGoogle = exp.company.toLowerCase().includes("google");
            const isSiemens = exp.company.toLowerCase().includes("siemens");
            const accentClass = "border-white/10 text-white/80 bg-white/5";

            return (
              <div key={idx} className="relative group">
                
                {/* Custom glowing node pin on vertical list line */}
                <div className={`absolute -left-[31px] sm:-left-[47px] top-2.5 w-[10px] h-[10px] rounded-full bg-[#050505] border-2 group-hover:scale-110 transition-all duration-300 ${
                  isGoogle 
                    ? "border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                    : isSiemens 
                    ? "border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" 
                    : "border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                }`} />

                {/* Main Card */}
                <div
                  className={`p-6 rounded-3xl border transition-all duration-300 overflow-hidden relative cursor-pointer ${
                    isExpanded
                      ? "bg-[#0c0c0c] border-white/10 shadow-lg shadow-black/80"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-[#0c0c0c]/40"
                  }`}
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                >
                  {/* Glowing header accents */}
                  {isExpanded && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400" />
                  )}

                  {/* Header Grid */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      {/* Meta information row */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${accentClass}`}>
                          {exp.company}
                        </span>
                        <span className="text-[9px] font-mono text-white/40 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-white text-base sm:text-lg font-bold tracking-tight font-sans">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-[10px] font-mono text-white/50 flex items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                        <span>{exp.duration}</span>
                      </div>

                      <span className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/40 group-hover:text-white transition-colors duration-300">
                        {isExpanded ? <Minus className="w-3.5 h-3.5 animate-pulse" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </div>

                  {/* Detailed descriptions */}
                  <div
                    className={`transition-all duration-350 overflow-hidden ${
                      isExpanded ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3.5 pl-1">
                      {exp.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${
                            isGoogle ? "bg-cyan-400" : isSiemens ? "bg-purple-400" : "bg-emerald-400"
                          }`} />
                          <p>{pt}</p>
                        </div>
                      ))}
                    </div>

                    {/* Technologies tags */}
                    <div className="mt-6 pt-5 border-t border-white/5 pl-1">
                      <span className="text-[10px] font-mono text-white/30 block uppercase tracking-wide mb-3">
                        Acquired Vetted Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-[9px] font-mono bg-white/5 text-white/50 border border-white/5 hover:text-white hover:border-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
