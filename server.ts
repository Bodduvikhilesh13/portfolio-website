/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_DATA } from "./src/types"; // Wait, in ESM, use standard imports or ts files since it's compiled
import nodemailer from "nodemailer";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Apply JSON body parser middleware
app.use(express.json());

// Nodemailer Helper for direct route mailing
async function sendOpportunityEmail(details: any) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const notifyEmail = process.env.NOTIFY_EMAIL || "bodduvikhilesh@gmail.com";

  if (!user || !pass) {
    console.warn("⚠️ SMTP_USER and/or SMTP_PASS variables are missing! Email notification was skipped. Details saved in submissions.json locally.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Portal" <${user}>`,
      to: notifyEmail,
      subject: `🚨 New Opportunity Submitted: ${details.jobRole} at ${details.companyName}`,
      text: `Hello Vikhilesh,\n\nA new recruitment opportunity has been submitted via your portfolio co-pilot portal!\n\n=======================================================\n💼 JOB DETAILS\n=======================================================\n🏢 Company Name: ${details.companyName}\n👤 Recruiter Name: ${details.recruiterName || "Anonymous"}\n🎯 Job Role/Position: ${details.jobRole}\n📧 HR Email: ${details.hrEmail}\n🔗 Job Link: ${details.jobLink || "None"}\n💵 Estimated Salary: ${details.salaryRange || "Not Specified"}\n📍 Location Structure: ${details.location || "Remote/Hybrid"}\n📅 Estimated Deadline: ${details.deadline || "Not Specified"}\n\n=======================================================\n📝 MESSAGE / REQUIREMENTS\n=======================================================\n${details.message || "(No message provided)"}\n\n=======================================================\nSubmitted At: ${new Date(details.submittedAt).toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; padding: 24px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.025em;">🚨 New Opportunity Received!</h2>
            <p style="margin: 4px 0 0; opacity: 0.85; font-size: 13px;">Submitted via your Smart Portfolio Portal</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #1e293b;">
            <h3 style="margin-top: 0; color: #7c3aed; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">💼 Role Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">🏢 Company:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${details.companyName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">🎯 Position Role:</td>
                <td style="padding: 6px 0; color: #06b6d4; font-weight: 700;">${details.jobRole}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">👤 Contact Name:</td>
                <td style="padding: 6px 0; color: #0f172a;">${details.recruiterName || "Anonymous"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">📧 HR Email:</td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${details.hrEmail}" style="color: #7c3aed; text-decoration: none;">${details.hrEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">🔗 JD Link:</td>
                <td style="padding: 6px 0; color: #0f172a;">
                  ${details.jobLink ? `<a href="${details.jobLink}" target="_blank" style="color: #7c3aed; text-decoration: underline;">View JD Link</a>` : '<span style="color: #94a3b8;">None</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">💵 Salary Range:</td>
                <td style="padding: 6px 0; color: #10b981; font-weight: 600;">${details.salaryRange || "Not Specified"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">📍 Location Mode:</td>
                <td style="padding: 6px 0; color: #0f172a;">${details.location || "Remote/Hybrid"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">📅 Deadline Limit:</td>
                <td style="padding: 6px 0; color: #0f172a;">${details.deadline || "Not Specified"}</td>
              </tr>
            </table>

            <h3 style="color: #7c3aed; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">📝 Recruiter Message</h3>
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; font-size: 13.5px; color: #334155; line-height: 1.6; margin-bottom: 24px; border: 1px solid #f1f5f9; white-space: pre-wrap;">${details.message || "(No message entered)"}</div>
            
            <div style="text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 12px;">
              This email was generated automatically by Vikhilesh Boddu's Portfolio server system.
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`🌐 Notification e-mail successfully sent! Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to transmit opportunity email:", error);
    return false;
  }
}

// Prepare assets submission directory
const SUBMISSIONS_FILE = path.join(process.cwd(), "assets", "submissions.json");
if (!fs.existsSync(path.dirname(SUBMISSIONS_FILE))) {
  fs.mkdirSync(path.dirname(SUBMISSIONS_FILE), { recursive: true });
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
}

// System Instruction for Vikhilesh's AI Assistant Co-pilot
const SYSTEM_INSTRUCTION = `You are Vikhilesh's Intelligent Portfolio Co-Pilot (built as an AI agent avatar on his portfolio).
Your goal is to represent Vikhilesh Boddu to recruiters, engineering managers, and visitors with utmost professional confidence, charm, and authenticity.

Vikhilesh is a Computer Science and Engineering graduate-in-training (and Engineer, class of 2027) from Marri Laxman Reddy Institute of Technology and Management (CGPA: 7.66/10).
Position him as:
1. An AI Engineer Aspirant and Generative AI Developer.
2. A Data Analyst and Business Intelligence Enthusiast.
3. A Machine Learning Engineer with practical intern experience.

Key qualities to highlight:
- Has completed three impactful internships (Google Cloud GenAI Intern using Vertex AI, Siemens Data Science Master Intern with RapidMiner AI Hub, and Juniper Networks Network Intern).
- Developed key high-caliber projects: "StyleSense" (Generative AI fashion advisor utilizing Gemini API & FastAPI, 1st place in GenAI Forge Hackathon).
- Holds prestigious certifications like JNCIA-Junos Associate, CCNA, and C2 Proficiency in English (EF SET 85/100).
- Very proactive, friendly, and open for internships, freelance work, and full-time opportunities.

GUIDELINES FOR YOUR RESPONSES:
- Speak as Vikhilesh's advanced technical AI agent. You can refer to Vikhilesh in the third person (e.g., "Vikhilesh developed...") or speak on his behalf with a technical, high-tech, and polite conversational tone.
- Keep your answers highly concise, direct, recruiter-optimized, structured with clear bullet points, and free of filler words.
- Do NOT make up any details or hallucinate projects, grades, or experience not mentioned in his core data.
- If anyone asks about salary or job offers, encourage them to submit the 'Submit Opportunity' form directly on the website page.
- Limit responses to maximum 150-200 words. Keep comments readable and highly scannable.`;

// Lazy Gemini API Client Initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Serve the profile image directly from the workspace root if requested
app.get("/my_profile.png", (req, res) => {
  const filePath = path.join(process.cwd(), "my_profile.png");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Not Found");
  }
});

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 2. API: AI Chatbot Assistant Core Route
app.post("/api/chatbot", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message input is required." });
    return;
  }

  // Retrieve the lazy Gemini client
  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback mock chatbot logic for evaluation when API keys are not supplied.
    // It scans the user prompt for project names, internships, or contact info and replies intelligently using Vikhilesh's real data.
    const lowercaseMessage = message.toLowerCase();
    let reply = "";

    if (lowercaseMessage.includes("project") || lowercaseMessage.includes("stylesense") || lowercaseMessage.includes("rmt") || lowercaseMessage.includes("fashion")) {
      reply = `### Vikhilesh's Key Projects 🚀

1. **StyleSense (GenAI Fashion Advisor)**: An end-to-end recommendation workflow integration using Gemini API & FastAPI. Built for the GenAI Forge Hackathon (Winner!). It analyzes weather & styling contexts to suggest custom matching outfits with a responsive web front-end.
2. **RMT-Net (Credit Risk ML)**: A multi-branch deep neural network built on Keras/Python achieving **91.2% classification accuracy** on highly-skewed loan application datasets under SMOTE sampling.
3. **Insurance Analytics Dashboard**: A Power BI star-schema command center integrated with MySQL, enabling real-time claims anomaly detection and automated metric calculations.

Would you like to examine any of these in closer detail? Let me know which one interests you!`;
    } else if (lowercaseMessage.includes("intern") || lowercaseMessage.includes("experience") || lowercaseMessage.includes("google") || lowercaseMessage.includes("siemens")) {
      reply = `### Vikhilesh's Internships 💼

- **Google Cloud Generative AI Intern (Jan 2026 – Mar 2026)**: Leveraged Google Cloud Vertex AI to architect scalable Generative AI prompt pipelines and explored RAG architectures and multi-modal models.
- **Siemens Data Science Graduate Intern (April 2026)**: Designed complex ETL pipelines, handled advanced data cleaning, and automated enterprise model auditing on RapidMiner AI Hub.
- **Networking Virtual Intern (Jul 2025 – Sept 2025)**: Configured simulated routing environments, examined Junos OS parameters, and troubleshot network policies.

Vikhilesh's internship duration has prepared him for active roles in industry pipelines. Can I clarify any details about these internships?`;
    } else if (lowercaseMessage.includes("contact") || lowercaseMessage.includes("email") || lowercaseMessage.includes("hire") || lowercaseMessage.includes("phone")) {
      reply = `### Get in Touch with Vikhilesh 📬

You can reach Vikhilesh directly:
- **Email**: [bodduvikhilesh@gmail.com](mailto:bodduvikhilesh@gmail.com)
- **Phone**: +91-7993950228
- **Location**: Hyderabad, India
- **LinkedIn**: [linkedin.com/in/Bodduvikhilesh13](https://linkedin.com/in/Bodduvikhilesh13)

Alternatively, you can submit details of your opening in the **Recruiter Opportunity Portal** at the bottom of the page, and Vikhilesh will be notified immediately!`;
    } else if (lowercaseMessage.includes("skill") || lowercaseMessage.includes("python") || lowercaseMessage.includes("tech") || lowercaseMessage.includes("cert")) {
      reply = `### Vikhilesh's Technical Toolkit 🛠️

- **Languages & Backend**: Python, SQL, FastAPI, REST APIs
- **Generative AI & ML**: Gemini API, Vertex AI, LLMs, RAG, Prompt Design, Scikit-learn, Keras
- **Data Analytics / BI**: Power BI, Power Query, DAX, MySQL, Advanced Excel
- **Certs & Networks**: Cisco CCNA, Juniper JNCIA-Junos Associate, Altair Data Engineering Professional

These skills represent a strong mix of data analytics and hands-on AI deployment. Let me know if you would like info on a specific certification!`;
    } else {
      reply = `Hello! I am Vikhilesh's AI Portfolio Co-Pilot. 😊

I can tell you all about Vikhilesh's competencies, achievements, and technical background! For example, ask me is he available for internships, details on his **StyleSense** hackathon-winning model, or his experience deploying LLM workflows at **Google Cloud**.

How can I assist your recruiting efforts today?`;
    }

    res.json({
      reply,
      isFallback: true,
      notice: "Serving via local intelligence model (API key was not supplied).",
    });
    return;
  }

  try {
    // Generate streaming content using Gemini 3.5 Flash
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }],
    }));

    // Add current context
    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message });
    res.json({
      reply: response.text || "I apologize, I generated an empty response. Please try again.",
      isFallback: false,
    });
  } catch (error: any) {
    console.error("Gemini API Error in backend chatbot endpoint:", error);
    res.status(500).json({
      error: "Error communicating with AI assistant services.",
      details: error.message,
    });
  }
});

// 3. API: Recruiter Contact Form Handler
app.post("/api/recruiter-contact", async (req, res) => {
  const {
    companyName,
    recruiterName,
    jobRole,
    hrEmail,
    jobLink,
    salaryRange,
    location,
    deadline,
    message,
  } = req.body;

  if (!companyName || !jobRole || !hrEmail) {
    res.status(400).json({ error: "Company Name, Job Role, and Email are required fields." });
    return;
  }

  try {
    // Read existing recruiter database submissions
    const fileContent = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const submissions = JSON.parse(fileContent);

    const newSubmission = {
      id: "sub_" + Math.random().toString(36).substr(2, 9),
      companyName,
      recruiterName: recruiterName || "Anonymous Recruiter",
      jobRole,
      hrEmail,
      jobLink: jobLink || "",
      salaryRange: salaryRange || "Not Specified",
      location: location || "Remote/Not Specified",
      deadline: deadline || "",
      message: message || "",
      submittedAt: new Date().toISOString(),
    };

    submissions.unshift(newSubmission); // Add to beginning
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

    // Log the opportunity clearly in terminal for recruiters and builders
    console.log(`\n========================================================`);
    console.log(`🚀 NEW OPPORTUNITY SUBMITTED FOR VIKHILESH BODDU`);
    console.log(`========================================================`);
    console.log(`🏢 Company: ${companyName}`);
    console.log(`👤 Recruiter: ${recruiterName}`);
    console.log(`💼 Role: ${jobRole}`);
    console.log(`📧 HR Email: ${hrEmail}`);
    console.log(`💵 Salary: ${salaryRange}`);
    console.log(`📅 Timeline/Deadline: ${deadline}`);
    console.log(`📍 Location: ${location}`);
    console.log(`📝 Message: ${message}`);
    console.log(`========================================================\n`);

    // Async mail transmission
    const mailSent = await sendOpportunityEmail(newSubmission);

    res.json({
      success: true,
      message: mailSent 
        ? "Opportunity successfully recorded and dispatched directly via email."
        : "Opportunity successfully recorded in local ledger database.",
      submission: newSubmission,
      mailSent: !!mailSent,
      smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
      notifyEmail: process.env.NOTIFY_EMAIL || "bodduvikhilesh@gmail.com",
    });
  } catch (error: any) {
    console.error("Failed to persist recruiter submission:", error);
    res.status(500).json({ error: "Failed to store opportunity. Please try again." });
  }
});

// 4. API: Retrieve Recruiter Submissions (For Vikhilesh's Recruiter dashboard / secure viewing)
app.get("/api/recruiter-submissions", (req, res) => {
  try {
    const fileContent = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    res.json(JSON.parse(fileContent));
  } catch (err) {
    res.status(500).json({ error: "Could not read submissions storage." });
  }
});

// 5. API: Remove Recruiter Submission
app.delete("/api/recruiter-submissions/:id", (req, res) => {
  const { id } = req.params;
  try {
    const fileContent = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    let submissions = JSON.parse(fileContent);
    submissions = submissions.filter((sub: any) => sub.id !== id);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed." });
  }
});

// Start the production static serving & bundler management
async function startServer() {
  // Vite dev server mounting in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static build serving initialized.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
