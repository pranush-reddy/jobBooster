import React, { useEffect, useState, useRef } from "react";
import "./ApplicationFitUI.css";
import { useDataStore } from "../DataStore";

export default function ApplicationFitUI() {
  const [activeTab, setActiveTab] = useState("resume");
  const [Clip, SetClip] = useState("📋 Copy");
  const [isCopied, setIsCopied] = useState(false);
  const { llmData } = useDataStore();
  const contentRef = useRef(null); 
const SAMPLE_DATA = {
    "overall_fit_score": 78,
    "project_score": 85,
    "role_overview": "We are seeking a Full Stack Developer with expertise in modern JavaScript frameworks, cloud infrastructure, and scalable application architecture. The role involves building end-to-end web applications, optimizing database queries, implementing CI/CD pipelines, and collaborating with cross-functional teams to deliver high-quality software solutions.",
    "resume_highlights": "Strong proficiency in React, Node.js, and TypeScript. Experience with AWS services including EC2, S3, and Lambda. Knowledge of database design with PostgreSQL and MongoDB. Familiarity with Docker containerization and RESTful API development.",
    "missing_keywords": [
        "GraphQL",
        "Kubernetes",
        "Terraform",
        "Redis",
        "WebSocket",
        "microservices architecture"
    ],
    "matching_strengths": [
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "RESTful APIs"
    ],
    "actionable_tips": [
        "Build a project demonstrating GraphQL implementation with Apollo Server",
        "Gain hands-on experience with Kubernetes for container orchestration",
        "Learn Redis for caching and real-time data processing",
        "Study microservices design patterns and implement a sample distributed system"
    ],
    "recruiter_email": "Subject: Application for Full Stack Developer Position - 4+ Years Experience\n\nHi Hiring Manager,\n\nI'm excited to apply for the Full Stack Developer role at [Company]. With 4+ years of experience building scalable web applications using React, Node.js, and AWS, I'm confident I can hit the ground running and contribute to your team from day one.\n\nQuick highlights from my background:\n• Led microservices migration, improving deployment frequency by 40%\n• Built real-time systems handling 50K+ concurrent users with WebSocket\n• AWS Certified Developer with hands-on experience in EC2, S3, and Lambda\n• Reduced API response times by 65% through query optimization and caching\n\nI've attached my resume and portfolio for your review. I'd love to connect and discuss how my experience aligns with your team's goals.\n\nBest regards,\nSoftware Engineer Candidate\nhttps://www.linkedin.com/in/candidate-profile/\n(555) 123-4567",
    
    "cover_letter": "Dear Hiring Manager,\n\nI am writing to formally express my strong interest in the Full Stack Developer position at [Company]. With over four years of experience in modern web development and a proven track record of delivering scalable, high-performance applications, I am confident in my ability to make meaningful contributions to your engineering team.\n\nThroughout my career, I have focused on building robust end-to-end solutions that prioritize both user experience and technical excellence. In my most recent role, I led the migration of a monolithic application to a microservices architecture, a project that improved deployment frequency by 40% and significantly reduced system downtime. This experience deepened my expertise in containerization with Docker and service orchestration patterns.\n\nOne of my proudest achievements was architecting a real-time notification system that efficiently handled over 50,000 concurrent users. By implementing WebSocket connections and optimizing database queries, I reduced latency by 65% and delivered a seamless user experience. This project reinforced my passion for performance optimization and my ability to solve complex technical challenges at scale.\n\nMy technical toolkit includes React with TypeScript for frontend development, Node.js with Express for backend services, and both PostgreSQL and MongoDB for data persistence. I am well-versed in AWS cloud services including EC2, S3, Lambda, and have implemented CI/CD pipelines to streamline deployment processes. I hold an AWS Certified Developer – Associate certification and continuously invest time in learning emerging technologies.\n\nI am particularly drawn to [Company] because of your innovative approach to [specific project/technology mentioned in job description]. I admire your commitment to [company value or mission] and would welcome the opportunity to contribute my skills to such impactful work.\n\nThank you for considering my application. I would greatly appreciate the opportunity to discuss how my experience and passion for full-stack development align with your team's needs. I am available for an interview at your earliest convenience.\n\nSincerely,\nSoftware Engineer Candidate\nhttps://www.linkedin.com/in/candidate-profile/\nhttps://github.com/candidate-portfolio\n(555) 123-4567",
    
    "optimized_resume_structure": {
        "summary": "Full Stack Developer with 4+ years of experience building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code, performance optimization, and delivering exceptional user experiences. Proven track record of leading feature development and mentoring junior developers.",
        "skills": [
            "React",
            "Node.js",
            "TypeScript",
            "AWS (EC2, S3, Lambda)",
            "PostgreSQL",
            "MongoDB",
            "Docker",
            "RESTful APIs",
            "Git",
            "Jest"
        ],
        "achievements": [
            "Led migration of monolithic application to microservices architecture, resulting in 40% improved deployment frequency",
            "Reduced API response time by 65% through database query optimization and Redis caching implementation",
            "Architected and deployed a real-time notification system serving 50K+ concurrent users using WebSocket connections",
            "Mentored 3 junior developers, conducting code reviews and leading knowledge-sharing sessions"
        ],
        "certifications": [
            "AWS Certified Developer – Associate",
            "MongoDB Certified Developer Associate",
            "Meta Frontend Developer Professional Certificate"
        ],
        "projects": [
            {
                "Name": "EcoTrack - Carbon Footprint Analyzer",
                "description": "Built a full-stack sustainability application enabling users to calculate and track their carbon footprint. Implemented React with TypeScript for frontend, Node.js/Express for backend API, and PostgreSQL for data persistence. Integrated Chart.js for data visualization and deployed on AWS ECS with Docker containers, achieving 99.9% uptime."
            },
            {
                "Name": "TaskFlow - Collaborative Project Management Tool",
                "description": "Developed a real-time project management platform with kanban boards and team collaboration features. Utilized React with Redux Toolkit for state management, Node.js with Socket.io for real-time updates, and MongoDB for flexible data storage. Implemented JWT authentication, role-based access control, and achieved 200+ active users within first month of launch."
            },
            {
                "Name": "DevOps Pipeline Dashboard",
                "description": "Created a monitoring dashboard to visualize CI/CD pipeline metrics and deployment statuses. Built with Next.js for server-side rendering and SEO optimization, integrated with GitHub API and Jenkins webhooks. Deployed on AWS Lambda with CloudFront CDN, achieving sub-100ms load times globally and reducing deployment monitoring time by 70%."
            }
        ]
    },
    "keywordmatch_score": 85
};

  const Data = llmData && Object.keys(llmData).length > 0 ? llmData : SAMPLE_DATA;

  const ClipIt = async () => {
    let textToCopy = "";
    
    switch (activeTab) {
      case "resume":
        textToCopy = `Optimized Resume\n\n${Data.optimized_resume_structure?.summary || ""}\n\nSkills:\n${Data.optimized_resume_structure?.skills?.join(", ") || ""}\n\nAchievements:\n${Data.optimized_resume_structure?.achievements?.join("\n") || ""}\n\nCertifications:\n${Data.optimized_resume_structure?.certifications?.join("\n") || ""}\n\nProjects:\n${Data.optimized_resume_structure?.projects?.map(p => `${p.project_name}\n${p.project_description}\nTechnologies: ${p.technologies_used?.join(", ")}\n`).join("\n") || ""}`;
        break;
      case "cover":
        textToCopy = Data.cover_letter;
        break;
      case "email":
        textToCopy = `Subject: Application for Back End Developer Position\n\n${Data.recruiter_email}`;
        break;
      case "strengths":
        textToCopy = `Matching Strengths (${Data.matching_strengths?.length || 0} skills):\n${Data.matching_strengths?.join("\n") || ""}\n\nMissing Keywords (${Data.missing_keywords?.length || 0} gaps):\n${Data.missing_keywords?.join("\n") || ""}`;
        break;
      case "tips":
        textToCopy = `Actionable Tips:\n\n${Data.actionable_tips?.map((tip, i) => `${i + 1}. ${tip}`).join("\n\n") || ""}`;
        break;
      case "insights":
        textToCopy = `Resume Insights:\n\n${Data.resume_highlights}\n\nRole Overview:\n${Data.role_overview}`;
        break;
      default:
        textToCopy = "";
    }
    
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      SetClip("✅ Copied!");
      setIsCopied(true);
      setTimeout(() => {
        SetClip("📋 Copy");
        setIsCopied(false);
      }, 2000);
    }
  };

  const tabs = [
    { key: "resume", label: " Resume", icon: "📄" },
    { key: "cover", label: " Cover Letter", icon: "✍️" },
    { key: "email", label: " Email", icon: "📧" },
    { key: "strengths", label: " Strengths", icon: "⭐" },
    { key: "tips", label: " Tips", icon: "💡" },
    { key: "insights", label: " Insights", icon: "🔍" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "resume":
        return (
          <div className="content-card" ref={contentRef}>
            <div className="card-header">
              <h3 className="card-title">📄 Optimized Resume</h3>
              <button className={`clip-btn ${isCopied ? 'copied' : ''}`} onClick={ClipIt}>
                {Clip}
              </button>
            </div>

            <div className="resume-sections">
              <div className="section-block">
                <h4 className="section-subtitle">⭐ Professional Summary</h4>
                <p className="section-text">{Data.optimized_resume_structure?.summary}</p>
              </div>

              <div className="section-block">
                <h4 className="section-subtitle">🛠️ Core Skills</h4>
                <div className="skills-grid">
                  {Data.optimized_resume_structure?.skills?.map((s, i) => (
                    <span key={i} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>

              <div className="section-block">
                <h4 className="section-subtitle">🏆 Key Achievements</h4>
                <ul className="achievement-list">
                  {Data.optimized_resume_structure?.achievements?.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="section-block">
                <h4 className="section-subtitle">📜 Certifications</h4>
                <ul className="certification-list">
                  {Data.optimized_resume_structure?.certifications?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
        <div className="section-block">
  <h4 className="section-subtitle">🧩 Projects</h4>
  <ul className="certification-list" >
    {Data.optimized_resume_structure?.projects?.map((element) => (
      <>
      <li key={element.Name} style={{color:'#101010'}}><strong>{element.Name}</strong></li>
        <p style={{color:'#6b7280'}} key={element.description}>{element.description}</p>
      </>
    ))}
  </ul>
</div>

            
            </div>
          </div>
        );

      case "cover":
        return (
          <div className="content-card" ref={contentRef}>
            <div className="card-header">
              <h3 className="card-title">✍️ AI-Generated Cover Letter</h3>
              <button className={`clip-btn ${isCopied ? 'copied' : ''}`} onClick={ClipIt}>
                {Clip}
              </button>
            </div>
            <div className="letter-wrapper">
              <pre className="letter-pre">{Data.cover_letter}</pre>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="content-card" ref={contentRef}>
            <div className="card-header">
              <h3 className="card-title">📧 Recruiter Email</h3>
              <button className={`clip-btn ${isCopied ? 'copied' : ''}`} onClick={ClipIt}>
                {Clip}
              </button>
            </div>
            <div className="email-wrapper">
              <div className="email-subject-line">
                <strong>Subject:</strong> Application for Back End Developer Position
              </div>
              <pre className="email-pre">{Data.recruiter_email}</pre>
            </div>
          </div>
        );

      case "strengths":
        return (
          <div className="strengths-dashboard" ref={contentRef}>
            <div className="content-card">
              <div className="card-header">
                <h3 className="card-title">⭐ Matching Strengths</h3>
                <span className="badge success">{Data.matching_strengths?.length} Skills Matched</span>
              </div>
              <div className="strengths-grid">
                {Data.matching_strengths?.map((v, i) => (
                  <div key={i} className="strength-card">
                    <span className="strength-icon">✓</span>
                    <span className="strength-name">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <h3 className="card-title">⚠️ Missing Keywords</h3>
                <span className="badge warning">{Data.missing_keywords?.length} Gaps Found</span>
              </div>
              <div className="missing-grid">
                {Data.missing_keywords?.map((v, i) => (
                  <div key={i} className="missing-card">
                    <span className="missing-icon">⚠️</span>
                    <span className="missing-name">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "tips":
        return (
          <div className="content-card" ref={contentRef}>
            <div className="card-header">
              <h3 className="card-title">💡 Actionable Tips</h3>
              <button className={`clip-btn ${isCopied ? 'copied' : ''}`} onClick={ClipIt}>
                {Clip}
              </button>
            </div>
            <div className="tips-container">
              {Data.actionable_tips?.map((tip, i) => (
                <div key={i} className="tip-card">
                  <div className="tip-number">{i + 1}</div>
                  <p className="tip-text">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "insights":
        return (
          <div className="content-card" ref={contentRef}>
            <div className="card-header">
              <h3 className="card-title">🔍 Resume Insights</h3>
              <span className="badge info">AI Analysis</span>
            </div>
            <div className="insights-wrapper">
              <div className="insight-highlight">
                <p>{Data.resume_highlights}</p>
              </div>
              <div className="role-overview">
                <h4>📋 Role Overview</h4>
                <p>{Data.role_overview}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Calculate interview likelihood
  const getInterviewLikelihood = () => {
    const score = Data.overall_fit_score || 0;
    if (score >= 80) return { range: "75-85%", label: "High" };
    if (score >= 70) return { range: "65-75%", label: "Good" };
    if (score >= 60) return { range: "55-65%", label: "Moderate" };
    if (score >= 50) return { range: "45-55%", label: "Fair" };
    return { range: "<45%", label: "Needs" };
  };

  const interviewData = getInterviewLikelihood();

  return (
    <div className="app-fit-container">
      <div className="page-header">
        <h1 className="main-heading"> Application Fit Analysis</h1>
        <p className="sub-heading">AI-Powered Resume & Job Description Matching</p>
      </div>

      {/* Score Cards */}
      <div className="score-grid">
        <div className="score-card match-score">
          <div className="score-icon">🎯</div>
          <div className="score-content">
            <p className="score-number">{Data.overall_fit_score}%</p>
            <p className="score-title">Match Score</p>
            <div className="progress-bar">
              <div className="progress-fill match-fill" style={{ width: `${Data.overall_fit_score}%` }} />
            </div>
          </div>
        </div>

        <div className="score-card project-score">
          <div className="score-icon">📊</div>
          <div className="score-content">
            <p className="score-number">{Data.project_score || 0}%</p>
            <p className="score-title">Project Score</p>
            <div className="progress-bar">
              <div className="progress-fill project-fill" style={{ width: `${Data.project_score || 0}%` }} />
            </div>
          </div>
        </div>

        <div className="score-card keyword-score">
          <div className="score-icon">🔑</div>
          <div className="score-content">
            <p className="score-number">{Data.keywordmatch_score}%</p>
            <p className="score-title">Keyword Coverage</p>
            <div className="progress-bar">
              <div className="progress-fill keyword-fill" style={{ width: `${Data.keywordmatch_score}%` }} />
            </div>
          </div>
        </div>

        <div className="score-card interview-score">
          <div className="score-icon">📞</div>
          <div className="score-content">
            <p className="score-number">{interviewData.range}</p>
            <p className="score-title">Interview Likelihood</p>
            <span className={`likelihood-badge ${interviewData.label.toLowerCase()}`}>
              {interviewData.label} Chance
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-nav">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              <span className="tab-icon">{t.icon}</span>
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}