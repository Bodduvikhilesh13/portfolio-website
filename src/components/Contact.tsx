/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, MessageSquare, Twitter, Instagram, Send, Sparkles, BookOpen, Database, Code2 } from "lucide-react";
import RecruiterForm from "./RecruiterForm";
import { PORTFOLIO_DATA } from "../types";

export default function Contact() {
  const contactChannels = [
    {
      title: "Direct Email",
      value: PORTFOLIO_DATA.personal.email,
      href: `mailto:${PORTFOLIO_DATA.personal.email}`,
      icon: Mail,
      accent: "text-purple-400 border-purple-500/20 bg-purple-950/20",
    },
    {
      title: "Mobile Contact",
      value: PORTFOLIO_DATA.personal.phone,
      href: `tel:${PORTFOLIO_DATA.personal.phone.replace("+91-", "+91")}`,
      icon: Phone,
      accent: "text-cyan-400 border-cyan-500/20 bg-cyan-950/20",
    },
    {
      title: "Location",
      value: PORTFOLIO_DATA.personal.location,
      href: "https://maps.google.com/?q=Hyderabad,+India",
      icon: MapPin,
      accent: "text-indigo-400 border-indigo-500/20 bg-indigo-950/20",
    },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: PORTFOLIO_DATA.personal.socials.linkedin, icon: Linkedin, color: "hover:text-blue-400" },
    { name: "GitHub", href: PORTFOLIO_DATA.personal.socials.github, icon: Github, color: "hover:text-gray-300" },
    { name: "Kaggle", href: PORTFOLIO_DATA.personal.socials.kaggle, icon: Database, color: "hover:text-[#20BEFF]" },
    { name: "LeetCode", href: PORTFOLIO_DATA.personal.socials.leetcode, icon: Code2, color: "hover:text-[#FFA116]" },
  ];

  return (
    <section id="contact" className="py-24 bg-[#050505] text-white relative font-sans border-t border-white/5">
      
      {/* Editorial Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-left max-w-3xl mb-16 font-sans">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
            07 // DISPATCH & CONTRACT
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 text-white">
            Let's Formulate <span className="italic font-serif text-cyan-400 font-extralight">Alignment</span>
          </h2>
          <div className="w-12 h-[2px] bg-cyan-400 mt-5 rounded-full" />
        </div>

        {/* Contact page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact info cards */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div>
              <h3 className="text-xl font-sans font-bold text-white tracking-wide uppercase">
                Vikhilesh Boddu
              </h3>
              <p className="text-xs font-mono text-purple-450 uppercase tracking-widest mt-1">
                AI Engineer / Analyst Enthusiast
              </p>
              
              <div className="mt-5 p-5 rounded-3xl bg-white/[0.01] border border-white/5 text-xs text-white/50 leading-relaxed font-light font-sans">
                🟢 Availability Status: Open for internships, hackathon teams, and direct recruiter conversations.
              </div>
            </div>

            {/* Core Info Threads */}
            <div className="space-y-4">
              {contactChannels.map((chan, idx) => {
                const IconComp = chan.icon;
                return (
                  <a
                    key={idx}
                    href={chan.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-4 p-5 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-[#0c0c0c] hover:shadow-lg hover:shadow-black/80 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="p-3 rounded-2xl border border-white/10 text-cyan-400 bg-white/5 shrink-0">
                      <IconComp className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-white/30 block uppercase tracking-wider font-bold mb-0.5">
                        {chan.title}
                      </span>
                      <span className="text-white text-xs sm:text-sm font-medium tracking-wide break-all font-mono group-hover:text-cyan-300 transition-colors">
                        {chan.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social handles row */}
            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] font-mono text-white/30 block uppercase mb-4 tracking-wider">
                Digital Social Ensembles:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((soc, idx) => {
                  const IconC = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 text-white/50 ${soc.color} transition-all duration-350 cursor-pointer`}
                      title={soc.name}
                    >
                      <IconC className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footnote copyright info */}
            <div className="pt-6 text-[10px] font-mono text-white/20 leading-normal border-t border-white/5">
              <p>© {new Date().getFullYear()} Vikhilesh Boddu.</p>
              <p className="mt-1">Created using AI with React, Vite + Express Server, and Google Gemini.</p>
            </div>
          </div>

          {/* Right: Embedded Recruiter Form */}
          <div className="lg:col-span-8">
            <RecruiterForm />
          </div>

        </div>

      </div>
    </section>
  );
}
