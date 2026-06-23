/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "../types";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Certifications", id: "certifications" },
    { label: "Achievements", id: "achievements" },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-purple-500/15 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo / Brand Name */}
          <div
            id="nav-logo"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleItemClick("home")}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {PORTFOLIO_DATA.personal.fullName}
              </span>
              <div className="text-[10px] font-mono text-purple-400 leading-none tracking-wider">
                AI & DATA ENGINEER
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div id="desktop-menu" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 relative group cursor-pointer ${
                  activeSection === item.id
                    ? "text-cyan-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute inset-0 bg-purple-500/10 border border-purple-500/30 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.15)]" />
                )}
                {activeSection !== item.id && (
                  <span className="absolute inset-0 scale-75 opacity-0 bg-white/5 rounded-full transition-all group-hover:scale-100 group-hover:opacity-100" />
                )}
              </button>
            ))}

            <button
              id="nav-cta-button"
              onClick={() => handleItemClick("contact")}
              className="ml-4 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-tight bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] focus:outline-none transition-all duration-300 group flex items-center space-x-1 cursor-pointer"
            >
              <span>CONTACT & HIRE</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggler */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-all"
            >
              {isOpen ? <X className="h-6 w-6 text-cyan-400" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu-drawer"
        className={`lg:hidden fixed top-20 left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl transition-all duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-purple-500/15 to-cyan-500/15 text-cyan-300 border-l-2 border-cyan-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-800/60 px-4">
            <button
              id="mobile-nav-cta"
              onClick={() => handleItemClick("contact")}
              className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-mono font-bold text-sm tracking-wide shadow-lg"
            >
              SUBMIT OPPORTUNITY 🚀
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
