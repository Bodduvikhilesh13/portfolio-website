/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Github, ExternalLink, Code2, Database, Layers, ArrowUpRight, CheckCircle2, AlertTriangle, Play, Plus, Minus } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "../types";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("stylesense"); // default expanded to show content density

  const categories = ["ALL", "Generative AI", "Deep Learning & ML", "Data Analytics & BI"];

  const filteredProjects =
    activeCategory === "ALL"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Generative AI":
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case "Deep Learning & ML":
        return <Code2 className="w-4 h-4 text-purple-400" />;
      case "Data Analytics & BI":
        return <Database className="w-4 h-4 text-indigo-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#070707] text-white relative font-sans border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-950/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-950/15 blur-[120px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Title */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
            03 // PROJECT PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
            Intelligent Products & <span className="italic font-serif text-cyan-400">Interactive Systems</span>
          </h2>
          <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap gap-2 mb-12" id="projects-filter-nav">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const matched = PORTFOLIO_DATA.projects.find((p) => cat === "ALL" || p.category === cat);
                  if (matched) setExpandedProjectId(matched.id);
                }}
                className={`px-4 py-2 rounded-full text-[10px] font-semibold tracking-widest transition-all uppercase cursor-pointer ${
                  isSelected
                    ? "bg-white text-black shadow-lg shadow-white/5"
                    : "bg-white/5 text-white/50 hover:text-white border border-white/5 hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List Container */}
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {filteredProjects.map((proj) => {
            const isSelected = expandedProjectId === proj.id;
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? "bg-[#0c0c0c] border-white/10 shadow-lg shadow-black/80"
                    : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-[#0c0c0c]/40"
                }`}
                onClick={() => setExpandedProjectId(isSelected ? null : proj.id)}
              >
                {/* Selected Accent Line */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400" />
                )}

                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                      <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                        {getCategoryIcon(proj.category)}
                        <span className="ml-1.5">{proj.category}</span>
                      </span>
                      <span className="text-[9px] font-mono text-white/30">
                        {proj.technologies.slice(0, 3).join(" | ")}
                      </span>
                    </div>

                    <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight font-sans transition-colors group-hover:text-cyan-300">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    {/* Repo Link */}
                    {proj.githubLink && (
                      <a
                        id={`repo-link-${proj.id}`}
                        href={proj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()} // don't toggle accordion
                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/50 hover:text-white hover:border-white/10 transition-all text-[10px] font-mono font-bold tracking-wider flex items-center space-x-1.5"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>REPO</span>
                      </a>
                    )}

                    <span className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/40 group-hover:text-white transition-colors duration-300">
                      {isSelected ? <Minus className="w-4 h-4 animate-pulse" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* Short Brief (always visible or just shown as introduction) */}
                <p className="text-xs text-white/50 mt-3 font-light leading-relaxed max-w-3xl">
                  {proj.problemStatement}
                </p>

                {/* EXPANDABLE BODY: Technical Specifications (Inline accordion style) */}
                <div
                  className={`transition-all duration-350 overflow-hidden ${
                    isSelected ? "max-h-[1600px] opacity-100 mt-6 pt-6 border-t border-white/5" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-6 text-sm text-left">
                    
                    {/* Technologies Row (expanded) */}
                    <div>
                      <h4 className="text-white/30 text-[9px] font-mono font-bold tracking-widest mb-2 uppercase">
                        Technologies Deployed
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-[9px] font-mono bg-white/5 text-white/70 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Problem vs Use Case */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-white/5 pt-5">
                      <div>
                        <h4 className="text-purple-400 text-[10px] font-mono font-bold tracking-widest mb-1.5 uppercase">
                          The Problem Statement
                        </h4>
                        <p className="text-white/60 text-xs leading-relaxed font-light">
                          {proj.problemStatement}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 text-[10px] font-mono font-bold tracking-widest mb-1.5 uppercase">
                          Real-world Use Case
                        </h4>
                        <p className="text-white/60 text-xs leading-relaxed font-light">
                          {proj.realWorldUseCase}
                        </p>
                      </div>
                    </div>

                    {/* Data Pipeline Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-white/5 pt-5">
                      <div>
                        <h4 className="text-white/40 text-[10px] font-mono font-bold tracking-widest mb-1.5 uppercase">
                          Dataset Evaluated
                        </h4>
                        <p className="text-white/70 text-xs font-light leading-snug">
                          {proj.datasetUsed}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white/40 text-[10px] font-mono font-bold tracking-widest mb-1.5 uppercase">
                          Preprocessing Pipeline
                        </h4>
                        <p className="text-white/70 text-xs font-light leading-snug">
                          {proj.dataPreprocessing}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white/40 text-[10px] font-mono font-bold tracking-widest mb-1.5 uppercase">
                          Core Algorithm
                        </h4>
                        <p className="text-cyan-400 text-xs font-mono font-light leading-snug">
                          {proj.modelAlgorithm}
                        </p>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="border-t border-white/5 pt-5">
                      <h4 className="text-white text-[10px] font-mono font-bold tracking-widest mb-3 uppercase">
                        Product Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {proj.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-white/70">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="font-light leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges Overcome */}
                    <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                      <h4 className="text-purple-300 text-[10px] font-mono font-bold tracking-widest mb-2.5 uppercase flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Core Engineering Challenges Overcome</span>
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-white/50 font-light">
                        {proj.challenges.map((chal, idx) => (
                          <li key={idx} className="leading-normal">{chal}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes Block */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                        <div>
                          <span className="text-white/30 font-mono block text-[9px] tracking-wider uppercase">
                            Operational Performance Metric:
                          </span>
                          <span className="text-cyan-400 font-mono font-bold text-sm block mt-1.5 uppercase tracking-wide">
                            {proj.metrics}
                          </span>
                          <span className="text-white/50 block mt-1 font-light leading-relaxed">
                            {proj.results}
                          </span>
                        </div>
                        <div>
                          <span className="text-white/30 font-mono block text-[9px] tracking-wider uppercase">
                            Key Business Impact:
                          </span>
                          <span className="text-emerald-400 font-sans font-bold block mt-1.5 leading-normal">
                            {proj.businessImpact}
                          </span>
                          <span className="text-white/40 block text-[10px] mt-1.5 italic font-light">
                            Future Iteration: {proj.futureImprovements}
                          </span>
                        </div>
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
