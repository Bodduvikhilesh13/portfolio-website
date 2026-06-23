/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Code, Brain, BarChart3, Database, Cloud, Terminal, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const skillCategories = [
    { id: "ALL", label: "ALL SKILLS", icon: Sparkles },
    { id: "AI_ML", label: "AI & ML", icon: Brain },
    { id: "ANALYTICS", label: "DATA ANALYTICS", icon: BarChart3 },
    { id: "PROGRAMMING", label: "LANGUAGES & BACKEND", icon: Code },
    { id: "INFRASTRUCTURE", label: "CLOUD & TOOLS", icon: Cloud },
  ];

  const skillsData = [
    // Programming
    { name: "Python", category: "PROGRAMMING", proficiency: 95, description: "Advanced scripting, data pipelines & ML modeling (Sanfoundry certified)" },
    { name: "SQL", category: "PROGRAMMING", proficiency: 88, description: "Declarative modeling, complex joins, indexing, and store query setups" },
    { name: "HTML5 / CSS3", category: "PROGRAMMING", proficiency: 90, description: "Responsive layouts, mobile-first design, flexbox grid alignments" },
    { name: "JavaScript", category: "PROGRAMMING", proficiency: 80, description: "Interactive client-side behaviors, node operations & data integrations" },

    // AI & ML
    { name: "Generative AI", category: "AI_ML", proficiency: 94, description: "LLM tuning, temperature optimization, semantic pipelines (Google Cloud vetted)" },
    { name: "Prompt Engineering", category: "AI_ML", proficiency: 95, description: "Few-shot techniques, system framing, context truncation, structured outputs" },
    { name: "LLMs (Gemini / Vertex)", category: "AI_ML", proficiency: 92, description: "Google Vertex AI model setup, Gemini API, model endpoint hosting" },
    { name: "Machine Learning Core", category: "AI_ML", proficiency: 90, description: "Supervised and unsupervised architectures, classification modeling" },
    { name: "Scikit-Learn", category: "AI_ML", proficiency: 90, description: "Feature engineering, cross-validation, hyperparameter grid search schemes" },

    // Data Analytics
    { name: "Power BI", category: "ANALYTICS", proficiency: 94, description: "BI execution, comprehensive star schema modelling, operational hubs" },
    { name: "Power Query / ETL", category: "ANALYTICS", proficiency: 92, description: "Data loading, cleansing, columns parsing, complex multi-file merging" },
    { name: "DAX Formulas", category: "ANALYTICS", proficiency: 88, description: "Calculating rolling averages, quick metrics, context transitions" },
    { name: "MySQL / relational databases", category: "ANALYTICS", proficiency: 89, description: "Database design, indexing, view triggers, transactional operations" },
    { name: "Exploratory Data Analysis", category: "ANALYTICS", proficiency: 92, description: "Statistical sampling, outlier detection, visual correlation grids" },
    { name: "Advanced Excel", category: "ANALYTICS", proficiency: 90, description: "Pivot reporting, matrix formulations, conditional auditing matrices" },

    // Infrastructure & Tools
    { name: "Google Cloud Platform", category: "INFRASTRUCTURE", proficiency: 88, description: "Vertex AI interfaces, serverless triggers, cloud storage management" },
    { name: "Git / GitHub", category: "INFRASTRUCTURE", proficiency: 91, description: "Collaborative trunk development, branch locking, release tag pipelines" },
    { name: "Junos OS Routing", category: "INFRASTRUCTURE", proficiency: 85, description: "Juniper OS mechanics, secure interfaces config, monitoring (JNCIA)" },
    { name: "Cisco Networking", category: "INFRASTRUCTURE", proficiency: 86, description: "OSI subnet calculations, secure switching configurations (CCNA)" },
  ];

  const filteredSkills =
    selectedCategory === "ALL"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-[#050505] text-white relative font-sans border-t border-white/5">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-950/20 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-950/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
            02 // TECH MATRIX
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
            Vetted Competencies & <span className="italic font-serif text-cyan-400">Capabilities</span>
          </h2>
          <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12" id="skills-filter-nav">
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[10px] font-semibold tracking-widest transition-all uppercase flex items-center space-x-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-white text-black shadow-lg shadow-white/5"
                    : "bg-white/5 text-white/50 hover:text-white border border-white/5 hover:border-white/10"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-grid">
          {filteredSkills.map((skill, idx) => {
            return (
              <div
                key={idx}
                id={`skill-card-${idx}`}
                className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.03] transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Background glow node */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/1 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm font-bold tracking-wide font-sans">
                      {skill.name}
                    </span>
                    <span className="text-[9px] font-mono font-medium text-cyan-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">
                      {skill.category.replace("_", "+")}
                    </span>
                  </div>

                  <p className="text-xs text-white/50 font-light leading-relaxed min-h-[32px]">
                    {skill.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
