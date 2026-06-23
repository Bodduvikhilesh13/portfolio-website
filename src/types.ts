/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-100%
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  problemStatement: string;
  realWorldUseCase: string;
  datasetUsed: string;
  dataPreprocessing: string;
  modelAlgorithm: string;
  features: string[];
  challenges: string[];
  metrics: string;
  results: string;
  businessImpact: string;
  futureImprovements: string;
  githubLink?: string;
  demoLink?: string;
  isEnhanced?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
  technologies: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialLink?: string;
  skillsCovered: string[];
}

export interface Achievement {
  title: string;
  description: string;
  iconType: "hackathon" | "space" | "badge" | "language";
  metric?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  score: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    fullName: "Vikhilesh Boddu",
    email: "bodduvikhilesh@gmail.com",
    phone: "+91-7993950228",
    location: "Hyderabad, India",
    avatarUrl: "/my_profile.png",
    socials: {
      linkedin: "https://linkedin.com/in/Bodduvikhilesh13",
      github: "https://github.com/Bodduvikhilesh13",
      kaggle: "https://www.kaggle.com/bodduvikhilesh",
      leetcode: "https://leetcode.com/u/Vikky13",
    },
    resumeAiUrl: "https://drive.google.com/file/d/1Osgdvk9xWNjOTpstMFqCIOgs8scqMUSE/view?usp=sharing", // Add public Google Drive, Dropbox, or OneDrive PDF link for AI Engineer Resume here
    resumeDataUrl: "https://drive.google.com/file/d/1i-iNQuN1ZzgoPAmBqFsW1XPJ3h4zHvTC/view?usp=sharing", // Add public Google Drive, Dropbox, or OneDrive PDF link for Data Analyst Resume here
    bio: "I am Vikhilesh Boddu, a high-potential Computer Science and Engineering student passionate about Artificial Intelligence, Machine Learning, Data Analytics, and Generative AI. I excel at building real-world products that transform raw data into intelligent, structured, and actionable decisions.",
  },
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Marri Laxman Reddy Institute of Technology and Management",
      duration: "2024 – 2027",
      score: "CGPA: 7.66 / 10",
    },
    {
      degree: "Diploma in Engineering",
      institution: "Govt. Polytechnic, Masab Tank",
      duration: "2021 – 2024",
      score: "CGPA: 7.51 / 10",
    },
    {
      degree: "Secondary School Certificate",
      institution: "Sri Chaitanya School",
      duration: "2021",
      score: "CGPA: 10 / 10",
    },
  ] as Education[],
  experiences: [
    {
      company: "Google Cloud (EduSkills Virtual Internship)",
      role: "Google Cloud Generative AI Intern",
      duration: "Jan 2026 – March 2026",
      location: "Remote",
      points: [
        "Built and deployed scalable Generative AI models utilizing Google Cloud Vertex AI and managed prompt engineering workflows.",
        "Worked on Prompt Engineering optimization techniques, key Large Language Model (LLM) concepts, and complex cloud-based AI automation workflows.",
        "Explored transformer architectures, multimodal AI networks, and advanced Retrieval-Augmented Generation (RAG) pipelines.",
        "Applied responsible AI principles, data governance guidelines, and structured cloud-based AI development workflows.",
      ],
      technologies: ["Vertex AI", "Prompt Engineering", "LLMs", "RAG Pipeline", "Google Cloud Platform", "Multimodal AI"],
    },
    {
      company: "Siemens (EduSkills Academy)",
      role: "Siemens Data Science Master Virtual Intern",
      duration: "April 2026",
      location: "Remote",
      points: [
        "Mastered advanced data handling, ETL pipelines, automatic data preparation, and cleaning strategies.",
        "Built foundational and advanced machine learning models, focusing on robust deployment, accuracy monitoring, and drift detection.",
        "Gained direct hands-on experience in Data Engineering to query, clean, transform, and calculate complex relational data schemas.",
        "Configured and managed enterprise-level enterprise platform operations using RapidMiner AI Hub.",
      ],
      technologies: ["RapidMiner AI Hub", "Machine Learning", "Data Engineering", "Data ETL", "Scikit-Learn", "Model Deployment"],
    },
    {
      company: "Juniper Networks (EduSkills Academy)",
      role: "Networking Virtual Intern",
      duration: "July 2025 – Sept 2025",
      location: "Remote",
      points: [
        "Mastered Junos OS fundamentals, focusing on the Junos CLI, unit system configuration, and operational state monitoring.",
        "Configured and managed enterprise network test environments with secure virtual routing structures.",
        "Performed intensive routing, switching configuration operations, and network infrastructure troubleshooting.",
        "Gained hands-on experience in Junos OS interfaces, topology troubleshooting, and secure remote-access protocols.",
      ],
      technologies: ["Junos OS", "CCNA Essentials", "Routing & Switching", "Network Troubleshooting", "Infrastructure Security"],
    },
  ] as Experience[],
  projects: [
    {
      id: "stylesense",
      title: "StyleSense | Generative AI Fashion Advisor",
      category: "Generative AI",
      technologies: ["FastAPI", "Gemini API", "Hugging Face", "Tailwind CSS", "React"],
      problemStatement: "Traditional fashion e-commerce lack personalized context, leaving users overwhelmed by choice and struggling to synthesize outfits based on the user's personal body shape, current weather, or specific events.",
      realWorldUseCase: "Hyper-personalized AI shopping assistant that integrates real-time contextual variables (weather forecast, event type, tone preference) to assemble cohesive style options of matching apparel and accessories.",
      datasetUsed: "Custom synthesized subset of DeepFashion, combined with real-time web style schemas via Hugging Face fashion attributes.",
      dataPreprocessing: "Feature normalization, image attribute extraction via Hugging Face CLIP embeddings, and custom text cleaning for style prompts.",
      modelAlgorithm: "Google Gemini 3.5 Flash for high-level outfit reasoning and synthesis, paired with Hugging Face Zero-Shot image classification for dress category matching.",
      features: [
        "Interactive fashion chat interface mimicking an expert stylist co-pilot",
        "Weather-grounded recommendations (automatically queries location characteristics for outfit layering)",
        "Multi-aspect outfit breakdown featuring matching shoes, jewelry, top, and bottoms",
        "High-performance FastAPI gateway handling asynchronous concurrency with sub-150ms processing times",
      ],
      challenges: [
        "Ensuring the recommendation engine doesn't design hallucinated fashion elements that don't exist.",
        "Synchronizing model output attributes securely across the interface.",
      ],
      metrics: "Average Latency: ~180ms per response, User Satisfaction Score: 94.6% in localized hackathon testing.",
      results: "Awarded top honor at the Gen AI Forge Hackathon for its clean layout, practical commercial applicability, and clever architectural workflow.",
      businessImpact: "Transforms typical searching behaviors. Potential to increase average order visual item size by 24% and double customer engagement durations.",
      futureImprovements: "Incorporate robust multi-modal user photo upload to analyze existing closets and suggest corresponding matching items dynamically.",
      githubLink: "https://github.com/vikhilesh-boddu/StyleSense-AI-Fashion",
      demoLink: "#stylesense-preview",
      isEnhanced: true,
    },
    {
      id: "rmtnet",
      title: "RMT-Net | Deep Learning for Credit Risk",
      category: "Deep Learning & ML",
      technologies: ["Python", "Keras", "Scikit-learn", "Pandas", "Matplotlib"],
      problemStatement: "Financial institutions face extreme multi-class credit scoring challenges where standard single-factor classifiers miss intricate correlation patterns, increasing default prediction errors.",
      realWorldUseCase: "Enterprise-grade automated risk evaluation system that computes loan approval probabilities and recommends scoring brackets simultaneously using a multi-branch neural network.",
      datasetUsed: "Kaggle Home Credit Default Risk dataset (over 300,000 credit applications with target default markers).",
      dataPreprocessing: "Extensive SMOTE sampling to remedy high class-imbalance, numerical scaling, categorical one-hot encoding, and Recursive Feature Elimination.",
      modelAlgorithm: "Multi-branch Multi-Task Deep Neural Network (RMT-Net) built using Keras with custom dropout regularizations and Adam optimization.",
      features: [
        "Asynchronous risk tier division (instantly divides applications into Low, Mid, and High-Risk categories)",
        "Custom regularizers to combat training overfit across highly skewed loan histories",
        "Interactive feature correlation analysis with comprehensive ROC-AUC curve rendering",
      ],
      challenges: [
        "Extremely skewed class imbalance (default instances were under 8% of the dataset), leading to naive model bias.",
        "Overfitting on highly correlated financial indicators.",
      ],
      metrics: "Accuracy: 91.2%, ROC-AUC Score: 0.887, False Negatives reduced by 18.3% compared to baseline Random Forest model.",
      results: "Delivered highly generalizable classification boundaries that remain robust under varying financial stress tests.",
      businessImpact: "Improves banking credit decisions, significantly lowering loan default losses while keeping loan approval pipelines fully automated.",
      futureImprovements: "Port the core model into Google Cloud Vertex AI pipelines to benefit from scalable continuous retraining and monitoring dashboards.",
      githubLink: "https://github.com/vikhilesh-boddu/RMT-Net-Credit-Risk",
      demoLink: "#rmtnet-preview",
      isEnhanced: true,
    },
    {
      id: "insurance-dashboard",
      title: "Insurance Claim Analytics Dashboard",
      category: "Data Analytics & BI",
      technologies: ["Power BI", "MySQL", "Power Query", "Excel", "DAX Formulas"],
      problemStatement: "Operations heads suffer from delayed decision metrics due to siloed claim records, obscure fraudulent behaviors, and outdated paper trails.",
      realWorldUseCase: "Interactive operational command center that dynamically visualizes claims pipelines, detects claims anomalies, and estimates settlement speed indexes.",
      datasetUsed: "Synthesized historical insurance data featuring 50,000 records containing claims costs, demographic splits, and claims indicators.",
      dataPreprocessing: "Schema modeling on MySQL, star schema structuring, clearing nulls, creating date lookup dimensions, and custom measures.",
      modelAlgorithm: "Robust ETL pipeline and custom DAX metrics computation (Rolling settlement average, anomaly alerts, settlement speed ratio).",
      features: [
        "Drill-down claims summary metrics (total counts, total payout amounts, averages, rejection rates)",
        "Dynamic fraud detector flagging multi-event claimants with atypical cost anomalies",
        "Time-series settlement velocity gauges automatically highlighting processing bottlenecks by team",
        "Role-based view filters enabling deep analysis across multiple claim lines (Auto, Health, Home)",
      ],
      challenges: [
        "Unifying asynchronous database attributes with varying timestamps into a high-performance star schema model.",
        "Optimizing Power Query transformations to maintain clean updates under heavy refresh workloads.",
      ],
      metrics: "Dashboard load speed: under 1.2s, automated settlements data refresh intervals reduced to sub-hour frequencies.",
      results: "Constructed an elite operational interface that allows executive level stakeholders to instantly identify operational inefficiencies.",
      businessImpact: "Enables business analysts to discover duplicate claiming events, accelerating valid processing timelines by 15% and saving up to 8% in fraudulent payouts.",
      futureImprovements: "Implement automated regression components in Power BI to forecast monthly claim counts and budget resources safely.",
      githubLink: "https://github.com/vikhilesh-boddu/Insurance-Claim-Dashboard",
      demoLink: "#dashboard-preview",
      isEnhanced: true,
    },
  ] as Project[],
  certifications: [
    {
      name: "Google Cloud Generative AI Master Certificate",
      issuer: "Google Cloud / EduSkills",
      date: "March 2026",
      skillsCovered: ["Vertex AI", "Prompt Optimization", "Large Language Models", "Responsible AI"],
    },
    {
      name: "Siemens Data Science Graduate Certificate",
      issuer: "Siemens / EduSkills Academy",
      date: "April 2026",
      skillsCovered: ["Machine Learning", "Data Engineering", "RapidMiner AI Hub", "Advanced Data Prep"],
    },
    {
      name: "Data Analytics Essentials",
      issuer: "Cisco Networking Academy",
      date: "2025",
      skillsCovered: ["Exploratory Data Analysis", "Excel", "Data Wrangling", "Statistical Insights"],
    },
    {
      name: "Python Programming Professional (Grade A)",
      issuer: "Sanfoundry National Certification",
      date: "2025",
      skillsCovered: ["Data Structures", "Functional Programming", "Algorithm Design", "Object-Oriented Python"],
    },
    {
      name: "JNCIA-Junos Associate Core Routing",
      issuer: "Juniper Networks",
      date: "2025",
      skillsCovered: ["Junos OS", "Routing Frameworks", "VLAN Switching", "Operational Monitoring"],
    },
    {
      name: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "2025",
      skillsCovered: ["IP Addressing", "Subnetting", "Routing Protocols", "Network Security Fundamentals"],
    },
    {
      name: "EF SET English Certification C2 Proficient (85/100)",
      issuer: "EF Standard English Test",
      date: "2025",
      skillsCovered: ["Advanced Writing", "Executive Communication", "C2 Level Listening & Comprehension"],
    },
  ] as Certification[],
  achievements: [
    {
      title: "GenAI Forge Hackathon Participant",
      description: "Designed and engineered the end-to-end StyleSense AI fashion assistant using FastAPI and Gemini, demonstrating secure real-time generative AI recommendation pipelines.",
      iconType: "hackathon",
      metric: "GenAI Forge",
    },
    {
      title: "CloudQuest Hackathon Contributor",
      description: "Spearheaded secure cloud-architecture configurations and serverless deployment scaling tests during the cloud-intelligence hackathon.",
      iconType: "hackathon",
      metric: "CloudQuest",
    },
    {
      title: "ISRO START Graduate",
      description: "Successfully selected and graduated from ISRO START's 'Scientific Observations from Space' program, learning space-data analytics and advanced satellite modeling pipelines.",
      iconType: "space",
      metric: "ISRO Cert",
    },
    {
      title: "C2 Expert Communicator",
      description: "Achieved the highest possible score band on the EF SET English Proficiency Test, certifying full executive-ready professional English articulation (C2 proficiency).",
      iconType: "language",
      metric: "C2 Mastery",
    },
  ] as Achievement[],
};
