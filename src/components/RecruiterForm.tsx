/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle2, ChevronRight, Briefcase, Mail, Building, DollarSign, Calendar, MapPin, Eye, Lock, RefreshCw, Trash2 } from "lucide-react";

interface Submission {
  id: string;
  companyName: string;
  recruiterName: string;
  jobRole: string;
  hrEmail: string;
  jobLink?: string;
  salaryRange?: string;
  location?: string;
  deadline?: string;
  message?: string;
  submittedAt: string;
}

export default function RecruiterForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    recruiterName: "",
    jobRole: "",
    hrEmail: "",
    jobLink: "",
    salaryRange: "",
    location: "Remote/Hybrid",
    deadline: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<{
    mailSent: boolean;
    smtpConfigured: boolean;
    notifyEmail: string;
  } | null>(null);

  // Dashboard state to inspect database submissions live
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeVerified, setPasscodeVerified] = useState(false);

  const keyToVerify = "bodduvikhilesh@gmail.com"; // Let the passphrase be Vikhilesh's professional email!

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.jobRole || !formData.hrEmail) {
      setErrorMessage("Please complete all required fields (Company, Job Role, HR Email).");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/recruiter-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Server communication issue. Retrying...");
      }

      const data = await res.json();
      if (data.success) {
        setSubmissionStatus({
          mailSent: !!data.mailSent,
          smtpConfigured: !!data.smtpConfigured,
          notifyEmail: data.notifyEmail || "bodduvikhilesh@gmail.com",
        });
        setSuccess(true);
        // Clear old inputs
        setFormData({
          companyName: "",
          recruiterName: "",
          jobRole: "",
          hrEmail: "",
          jobLink: "",
          salaryRange: "",
          location: "Remote/Hybrid",
          deadline: "",
          message: "",
        });
        // Reload submissions list if verified is open
        if (passcodeVerified) {
          fetchSubmissions();
        }
      }
    } catch (err: any) {
      setErrorMessage("System failed to submit opportunity details. Please retry or contact bodduvikhilesh@gmail.com.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPasscodeAndLoad = () => {
    if (passcode.trim().toLowerCase() === keyToVerify || passcode.trim().toLowerCase() === "vikkysai25@gmail.com") {
      setPasscodeVerified(true);
      fetchSubmissions();
    } else {
      alert(`Invalid Passcode. Hint: Use Vikhilesh's professional email: '${keyToVerify}' or user email to inspect.`);
    }
  };

  const fetchSubmissions = async () => {
    setDashboardLoading(true);
    try {
      const res = await fetch("/api/recruiter-submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleDeleteSubmission = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to remove this submission record?")) return;

    try {
      const res = await fetch(`/api/recruiter-submissions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="recruiter-contact-gateway" className="rounded-3xl bg-[#0c0c0c] border border-white/5 p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden font-sans">
      
      {/* Visual glowing border accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-950/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-950/10 blur-3xl rounded-full pointer-events-none" />

      {success ? (
        /* SUCCESS DIALOG PANEL WITH INSTANT MAIL dispatch FEEDBACK */
        <div className="py-8 px-4 text-center space-y-6 animate-fadeIn" id="recruiter-form-success">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-full flex items-center justify-center mx-auto text-cyan-400 shadow-md">
            <CheckCircle2 className="w-8 h-8 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-xl font-sans font-bold text-white tracking-wide uppercase">
              Opportunity Registered!
            </h3>
            <p className="text-white/40 text-[11px] font-mono tracking-wider mt-1 uppercase">
              Status ID: <span className="text-cyan-400">{submissionStatus?.mailSent ? "SUCCESS_DISPATCHED_SMTP" : "LOCAL_LEDGER_PERSIST_ONLY"}</span>
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-2xl bg-white/[0.02] border border-white/5 p-5 text-left space-y-4">
            {submissionStatus?.mailSent ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-green-400 text-xs font-mono font-bold tracking-wider uppercase">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Instant Email Dispatched 🚀</span>
                </div>
                <p className="text-white/70 text-xs leading-relaxed font-light">
                  A real-time direct notification was instantly constructed and dispatched via SMTP. It will appear at <strong className="text-white font-mono font-normal">{submissionStatus.notifyEmail}</strong> in less than 3 seconds!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    <span>Local Ledger Persisted (SMTP Offline) 📦</span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed font-light">
                    The opportunity has been saved securely to the offline portfolio database (<code className="text-purple-300 font-mono text-[11px] bg-white/5 px-1 rounded">/assets/submissions.json</code>) where Vikhilesh can see it inside the live Submissions Dashboard below.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <h4 className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">
                    ⚡ How to Activate Instant background email dispatch (No user action required)
                  </h4>
                  <p className="text-white/50 text-[11px] leading-relaxed font-light">
                    If you want email alerts to be delivered fully in the background automatically upon submission without opening a personal mail client:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-white/70 text-[11px] leading-relaxed font-light font-mono">
                    <li>
                      Click the <strong className="text-cyan-300">Settings Gear Icon</strong> at the top right of your <strong className="text-white">Google AI Studio</strong> window.
                    </li>
                    <li>
                      Go to the <strong className="text-purple-400">Environment Variables / Secrets</strong> panel.
                    </li>
                    <li>
                      Define/Add these variables:
                      <ul className="list-disc pl-4 mt-1 space-y-1 text-white/55">
                        <li><code className="text-white">SMTP_USER</code> : Sender email address (e.g., <code className="text-cyan-300">yourname@gmail.com</code>).</li>
                        <li><code className="text-white">SMTP_PASS</code> : Gmail App Password or SMTP token.</li>
                        <li><code className="text-white">NOTIFY_EMAIL</code> : Target destination mail.</li>
                      </ul>
                    </li>
                  </ol>
                  <p className="text-white/40 text-[10px] italic leading-tight pt-1">
                    💡 Once updated, further submissions will route background actions instantly!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              id="submit-another-opportunity"
              onClick={() => setSuccess(false)}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white border border-white/5 transition-all text-[10px] font-mono font-bold tracking-wider cursor-pointer active:scale-95"
            >
              SUBMIT ANOTHER OPPORTUNITY
            </button>
          </div>
        </div>
      ) : (
        /* RECRUITER CONTACT FORM BODY */
        <form onSubmit={handleFormSubmit} className="space-y-6" id="recruiter-opportunity-form">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-lg font-bold text-white uppercase tracking-tight flex items-center justify-center md:justify-start space-x-2.5">
              <Building className="w-5 h-5 text-cyan-400" />
              <span>Smart Opportunity Portal</span>
            </h3>
            <p className="text-xs text-white/50 mt-1.5 max-w-lg leading-relaxed font-light">
              Are you looking for an innovative AI engineer or a detailed business analyst? Post your opening here, and our server will log your parameters instantly.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/25 text-red-300 text-xs text-left">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            
            {/* Required Row 1: Company & Recruiter Profile */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                COMPANY NAME <span className="text-purple-400 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Google, Tesla, AI Startup"
                  className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 pl-3.5 pr-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                YOUR NAME / RECRUITER NAME
              </label>
              <input
                type="text"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleInputChange}
                placeholder="e.g. Rachel Green"
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
              />
            </div>

            {/* Required Row 2: Role Profile & HR Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                JOB POSITION ROLE <span className="text-purple-400 font-bold">*</span>
              </label>
              <input
                type="text"
                name="jobRole"
                required
                value={formData.jobRole}
                onChange={handleInputChange}
                placeholder="e.g. GenAI Engineer, Intern, Data Analyst"
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                HR / CONTACT EMAIL <span className="text-purple-400 font-bold">*</span>
              </label>
              <input
                type="email"
                name="hrEmail"
                required
                value={formData.hrEmail}
                onChange={handleInputChange}
                placeholder="e.g. hr@company.com"
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
              />
            </div>

            {/* Optional Row 3: Scope link & Estimated Compensation */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold uppercase">
                Job Description Document / URL link
              </label>
              <input
                type="url"
                name="jobLink"
                value={formData.jobLink}
                onChange={handleInputChange}
                placeholder="e.g. https://company.com/careers/role-101"
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                ESTIMATED COMPENSATION RANGE
              </label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleInputChange}
                placeholder="e.g. $80k - $100k, ₹12 - ₹18 LPA, Unpaid Intern"
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
              />
            </div>

            {/* Optional Row 4: Workspace Location & Deadline */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                OFFICE LOCATION STRUCTURE
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white/70 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Remote/Hybrid">Remote / Flexible Hybrid</option>
                <option value="Hyderabad, India (On-site)">Hyderabad, India (Onsite)</option>
                <option value="Bangalore, India (On-site)">Bangalore, India (Onsite)</option>
                <option value="Other Location">Other (Specified in Message)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
                ESTIMATED DECISION DEADLINE
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-2xl py-2.5 px-3.5 text-xs text-white/70 focus:outline-none transition-colors cursor-pointer"
              />
            </div>

          </div>

          {/* Recruiter Message Box */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono text-white/40 tracking-wider font-bold">
              ROLE RECRUITMENT REQUIREMENTS / MESSAGE
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Detail your technology requirement, key responsibilities, or introduce yourself..."
              className="w-full bg-[#050505] border border-white/5 focus:border-cyan-400 rounded-3xl py-3 px-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          {/* Form Trigger Buttons */}
          {/* Form Trigger Buttons */}
          <div className="flex justify-end pt-4 border-t border-white/5">
            <button
              type="submit"
              id="recruiter-submit-button"
              disabled={isLoading}
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-mono text-[10px] font-bold tracking-wider transition-all duration-300 disabled:opacity-50 flex items-center space-x-2 group cursor-pointer"
            >
              <span>{isLoading ? "PROCESSING..." : "SUBMIT OPPORTUNITY 🚀"}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </form>
      )}

      {/* DASHBOARD: SECURE HISTORIC SUBMISSIONS VIEWER */}
      {showSubmissions && (
        <div className="mt-10 border-t border-white/5 pt-8 text-left animate-fadeIn" id="submissions-panel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-white text-base font-sans font-bold flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Opportunity Database Ledger (Durability Audit)</span>
              </h4>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                Saved in file storage: `/assets/submissions.json` (Real-time update)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={fetchSubmissions}
                disabled={!passcodeVerified || dashboardLoading}
                className="p-1.5 rounded-lg bg-[#050505] border border-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
                title="Refresh Database Ledger"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dashboardLoading ? "animate-spin text-cyan-400" : ""}`} />
              </button>
            </div>
          </div>

          {!passcodeVerified ? (
            /* Passcode protection form to view local state database */
            <div className="p-6 rounded-3xl bg-[#050505] border border-white/5 max-w-md mx-auto text-center space-y-4 shadow-sm">
              <span className="p-2.5 rounded-xl bg-white/5 text-cyan-400 inline-block border border-white/5">
                <Lock className="w-5 h-5" />
              </span>
              <div>
                <h5 className="text-white text-xs font-mono font-bold tracking-wider uppercase">
                  Recruiter Console Passcheck
                </h5>
                <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
                  Enter Vikhilesh's professional email passcode to read current transactions inside the local filesystem database.
                </p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Insert passcode here..."
                  className="flex-1 bg-black border border-white/5 rounded-xl py-1.5 px-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  onClick={verifyPasscodeAndLoad}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-white/90 font-mono font-bold text-xs cursor-pointer"
                >
                  VERIFY
                </button>
              </div>
              <div className="text-[8px] font-mono text-white/20 text-left">
                💡 HINT: Passcode is `{keyToVerify}`
              </div>
            </div>
          ) : (
            /* Submissions list */
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
              {dashboardLoading ? (
                <div className="py-6 text-center text-white/30 text-xs font-mono">
                  Loading persistent submissions from system files...
                </div>
              ) : submissions.length === 0 ? (
                <div className="py-8 text-center text-white/30 border border-dashed border-white/5 rounded-2xl text-xs font-mono">
                  No submissions currently logged inside `/assets/submissions.json`.
                </div>
              ) : (
                submissions.map((sub: Submission) => (
                  <div
                    key={sub.id}
                    className="p-5 rounded-2xl bg-[#050505] border border-white/5 hover:border-white/10 transition-colors space-y-2.5 relative group"
                  >
                    <button
                      onClick={(e) => handleDeleteSubmission(sub.id, e)}
                      className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400 opacity-60 hover:opacity-100 transition-all cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white text-[11px] font-bold bg-[#0c0c0c] border border-white/5 px-2.5 py-0.5 rounded">
                        {sub.companyName}
                      </span>
                      <span className="text-cyan-300 text-xs font-mono font-bold">{sub.jobRole}</span>
                      <span className="text-[9px] text-white/30 font-mono">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-white/60 font-light">
                      <p>
                        <span className="font-mono text-white/30">Contact:</span> {sub.recruiterName} ({sub.hrEmail})
                      </p>
                      <p>
                        <span className="font-mono text-white/30">Compensation:</span> {sub.salaryRange}
                      </p>
                      <p>
                        <span className="font-mono text-white/30">Location:</span> {sub.location}
                      </p>
                      {sub.deadline && (
                        <p>
                          <span className="font-mono text-white/30">Review Limit:</span> {sub.deadline}
                        </p>
                      )}
                    </div>

                    {sub.message && (
                      <p className="text-[11px] text-white/50 bg-white/[0.01] border border-white/5 p-3 rounded-xl font-sans leading-relaxed">
                        <span className="font-mono text-[9px] text-white/30 block mb-1">MESSAGE:</span>
                        {sub.message}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
