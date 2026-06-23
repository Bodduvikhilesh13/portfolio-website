/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, ExternalLink, Search, Sparkles, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

export default function Certifications() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCerts = PORTFOLIO_DATA.certifications.filter((cert) => {
    const searchString = `${cert.name} ${cert.issuer} ${cert.skillsCovered.join(" ")}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <section id="certifications" className="py-24 bg-[#070707] text-white relative font-sans border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-950/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header and Search Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div className="text-left max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
              05 // ACCREDITATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
              Professional <span className="italic font-serif text-cyan-400 font-extralight">Certifications</span>
            </h2>
            <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
          </div>

          {/* Search bar inside certifications */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-white/30" />
            </span>
            <input
              type="text"
              id="certs-search-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search certifications or skills..."
              className="w-full bg-white/5 border border-white/5 focus:border-cyan-400 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Certifications Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="certs-grid">
          {filteredCerts.map((cert, idx) => (
            <div
              key={idx}
              id={`cert-card-${idx}`}
              className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.03] transition-all duration-300 relative group flex flex-col justify-between"
            >
              
              {/* Card top elements */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-cyan-400 group-hover:text-cyan-300 group-hover:border-white/20 transition-all">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-white text-sm font-bold leading-snug tracking-wide group-hover:text-cyan-300 transition-colors font-sans min-h-[40px]">
                  {cert.name}
                </h3>

                <p className="text-[10px] text-purple-400 font-mono font-semibold mt-2.5">
                  ISSUER: <span className="text-white/50">{cert.issuer}</span>
                </p>
              </div>

              {/* Verified tag / metrics */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skillsCovered.map((sk) => (
                    <span
                      key={sk}
                      className="text-[9px] font-mono bg-white/5 border border-white/5 text-white/40 px-2 py-0.5 rounded-md hover:text-cyan-400 hover:border-cyan-400/20 transition-colors duration-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}

          {filteredCerts.length === 0 && (
            <div className="col-span-full py-12 text-center text-white/40 font-mono text-xs tracking-wider">
              No matching certifications found for "{searchTerm}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
