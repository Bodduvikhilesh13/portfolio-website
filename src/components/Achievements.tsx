/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, ShieldAlert, Sparkles, Trophy, Space, Flag } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

export default function Achievements() {
  const getIcon = (type: string) => {
    switch (type) {
      case "hackathon":
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case "space":
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case "language":
        return <Award className="w-5 h-5 text-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="achievements" className="py-24 bg-[#050505] text-white relative font-sans border-t border-white/5">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-950/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-950/10 blur-[120px] pointer-events-none" style={{ animationDuration: "10s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Editorial Header */}
        <div className="text-left max-w-3xl mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
            06 // COMPETITIONS & METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
            Milestones and <span className="italic font-serif text-cyan-400">Honors</span>
          </h2>
          <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="achievements-cards-grid">
          {PORTFOLIO_DATA.achievements.map((ach, idx) => (
            <div
              key={idx}
              id={`achievement-card-${idx}`}
              className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 group hover:border-[#ffffff10] hover:bg-[#0c0c0c] hover:shadow-lg hover:shadow-black/85 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header with Type Icon & Value/Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-white/10 transition-colors">
                    {getIcon(ach.iconType)}
                  </div>
                  {ach.metric && (
                    <span className="text-[9px] font-mono font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {ach.metric}
                    </span>
                  )}
                </div>

                <h3 className="text-white text-base font-bold tracking-tight mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                  {ach.title}
                </h3>

                <p className="text-xs text-white/50 font-light leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Verified Badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-white/30 tracking-wider">
                  VERIFIED ACHIEVEMENT
                </span>
                <span className="text-[8px] font-mono text-emerald-400 flex items-center bg-white/5 px-2.5 py-1 rounded border border-white/5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 mr-1" />
                  BOARD APPROVED
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
