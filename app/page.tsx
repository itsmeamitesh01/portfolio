"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  num: string;
  title: string;
  year: string;
  category: string;
  tags: string[];
  description: string;
  highlights: string[];
  github: string;
};

type TimelineItem = {
  type: string;
  year: string;
  title: string;
  org: string;
  desc: string;
  cgpa?: string;
};

const NAV = ["About", "Skills", "Projects", "Experience", "Education", "Certifications", "Contact"];

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Digital Transaction Fraud Detection System",
    year: "2025",
    category: "Fintech",
    tags: ["C++", "Rule-based Engine", "Risk Scoring"],
    description:
      "Developed a rule-based fraud monitoring system in C++ with a 0–100 risk scoring model. Transactions above a defined threshold were automatically blocked, with a rolling daily limit and a simple admin interface for monitoring and review.",   
    highlights: [
       "Rule-based risk scoring (0–100)",
        "Auto-blocking above threshold",
        "Rolling transaction limit logic"
    ],
    github: "https://github.com/itsmeamitesh01/digital-fraud-detection",
  },
  {
    num: "02",
    title: "RFM Segmentation Pipeline",
    year: "2025",
    category: "Data Engineering",
    tags: ["SQL", "Python", "Google BigQuery (GCP)", "Docker"],
    description:
    "Built an automated customer segmentation pipeline using Python and BigQuery to process 540K+ transactions. Implemented RFM logic to group users based on behavior and reduced processing time compared to manual workflows.",

    highlights: [
    "540K+ transactions processed",
    "RFM-based segmentation",
    "Automated pipeline with BigQuery"
    ],
    github: "https://github.com/itsmeamitesh01/automated-rfm-pipeline",
  },
  {
    num: "03",
    title: "E-commerce Sales Analysis",
    year: "2025",
    category: "Data Analytics",
    tags: ["SQL", "Google BigQuery (GCP)", "Looker Studio", "Reporting"],
    description:
    "Wrote SQL queries across multiple datasets to analyze 95,000+ transactions and identify inconsistencies. Created dashboards in Looker Studio to present key sales metrics for reporting.",

    highlights: [
      "95K+ transactions analyzed",
      "Data validation using SQL",
      "Dashboard reporting"
    ],
    github: "https://github.com/itsmeamitesh01/E-commerce-SQL-Analysis",
  },
];

const SKILLS = [
  {
    label: "Languages",
    items: ["SQL", "Python", "C++"],
  },
  {
    label: "Databases & Cloud",
    items: ["Google BigQuery (GCP)", "MySQL", "PostgreSQL"],
  },
  {
    label: "BI & Analytics",
    items: ["Power BI", "Looker Studio", "Microsoft Excel"],
  },
  {
    label: "Tools & Version Control",
    items: ["Docker", "ETL Pipelines", "Git", "GitHub"],
  },
  {
    label: "Domain Knowledge",
    items: ["Campaign Analytics", "Performance Reporting", "Customer Segmentation", "Technical Documentation"],
  },
  {
    label: "Marquee",
    items: ["· Software Engineering ·", "· Data Analytics ·", "· C++ Systems ·", "· ETL Pipelines ·", "· Database Management ·", "· Data Visualization ·","· Backend Architecture ·", "· System Design ·", "· Data Engineering ·","· Project Management ·"],
  },
];

const EXPERIENCE = [
  {
    type: "Internship",
    year: "Jan 2025 - Jun 2025",
    title: "Data Analyst Intern",
    org: "M/s Pragatee Enterprises",
    points: [
    "Analyzed large transaction datasets to identify patterns and anomalies using SQL and Python, improving data quality and reporting accuracy.",
    "Built dashboards using SQL and Power BI for real-time performance tracking and executive reporting, enabling data-driven decision-making.",
    "Automated reporting workflows to improve efficiency and reduce manual effort, resulting in faster insights delivery.",
    "Enabled faster decision-making through clear data insights and visualizations, contributing to improved business outcomes."
]
  }
];

const EDUCATION: TimelineItem[] = [
  {
    type: "Undergraduate",
    year: "2020 – 2024",
    title: "B.Tech in Computer Science and Engineering",
    org: "Jaypee University of Engineering and Technology · Guna",
    desc: "Focused on core computer science fundamentals including data structures, database systems, and object-oriented design. Applied these concepts through coursework and independent projects in data analysis and software development.",
    cgpa: "CGPA:8.6"
  },
];

const CERTIFICATIONS = [
  {
    name: "Google Data Analytics Professional Certificate",
    year: "2025",
    url: "https://drive.google.com/file/d/1bPdJuyfHFuPwSlZ6Ao7Iru_taLhZqZo0/view",
    desc: "Focused on SQL, data cleaning, and building end-to-end analytics workflows used in real-world scenarios."
  },
  {
    name: "Deloitte Data Analytics Job Simulation - Forage",
    year: "2025",
    url: "https://drive.google.com/file/d/1Cy1gOlTarNvz5eQNKmGqnQUAzGKOBaE5/view",
    desc: "Worked on real-world business cases involving data analysis and decision-making."
  },
];

export default function Home() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState("About");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [introGone, setIntroGone] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const sections = useMemo(
    () => ["about", "skills", "projects", "experience", "education", "certifications","contact"],
    []
  );
  
const projectsRef = useRef<HTMLDivElement | null>(null);
const transactionsRef = useRef<HTMLDivElement | null>(null);
const speedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const animate = (
    el: HTMLElement | null,
    end: number,
    suffix: string = ""
  ) => {
    if (!el) return; // ✅ safety fix

    const duration = 1200;
    const startTime = performance.now();

    const format = (num: number) => {
      if (num >= 1000) return Math.floor(num / 1000) + "K";
      return num.toString();
    };

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);

      // ✅ easing (feels smoother)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easeOut * end);

      el.textContent = format(value) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ✅ stagger (premium feel)
          animate(projectsRef.current, 3, "+");

          setTimeout(() => {
            animate(transactionsRef.current, 540000, "+");
          }, 150);

          setTimeout(() => {
            animate(speedRef.current, 96, "%");
          }, 300);

          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.4, // ✅ important fix (prevents early trigger)
    }
  );

  if (statsRef.current) {
  observer.observe(statsRef.current);
  }

  return () => observer.disconnect();
}, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroGone(true), 250);
    return () => window.clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.left = `${e.clientX}px`;
        cursorDot.current.style.top = `${e.clientY}px`;
      }
      window.setTimeout(() => {
        if (cursorRing.current) {
          cursorRing.current.style.left = `${e.clientX}px`;
          cursorRing.current.style.top = `${e.clientY}px`;
        }
      }, 40);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
  let timeout: ReturnType<typeof setTimeout>;
  const scrollThreshold = 8;

  const onScroll = () => {
    const y = window.scrollY;
    const diff = y - lastScrollY.current;

    setNavScrolled(y > 10);

    // 🔥 SCROLL DOWN → hide
    if (diff > scrollThreshold && y > 120) {
      setNavHidden(true);
    }

    // 🔥 SCROLL UP → show immediately (KEY FIX)
    if (diff < -scrollThreshold) {
      setNavHidden(false);
    }

    // 🔥 fallback: show after scroll stops
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setNavHidden(false);
    }, 180);

    lastScrollY.current = y;

    // section highlight logic (unchanged)
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight * 0.45 &&
        rect.bottom > window.innerHeight * 0.2
      ) {
        setActive(id.charAt(0).toUpperCase() + id.slice(1));
        break;
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(timeout);
  };
}, [sections]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    },
    { threshold: 0.12 }
  );

    const targets = document.querySelectorAll("[data-reveal]");
    targets.forEach((el) => observer.observe(el));

// Prevents unnecessary future triggers and potential performance issues as more sections are revealed.
//     entries.forEach((entry) => {
//   if (entry.isIntersecting) {
//     entry.target.classList.add("in");
//     observer.unobserve(entry.target); // 🔥 important
//   }
// });

    const heroTimer = window.setTimeout(() => setHeroIn(true), 150);

    return () => {
      observer.disconnect();
      window.clearTimeout(heroTimer);
  };
}, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addHover = () => {
    cursorRing.current?.classList.add("hover");
  };

  const removeHover = () => {
    cursorRing.current?.classList.remove("hover");
  };

  const revealClass = (base: string) => `${base} reveal`;

  return (
    <>
      <div id="intro-overlay" className={introGone ? "gone" : ""} aria-hidden="true">
        <div id="intro-top" />
        <div id="intro-bottom" />
      </div>

      <div id="cursor-dot" ref={cursorDot} />
      <div id="cursor-ring" ref={cursorRing} />

      <nav className={`${navScrolled ? "scrolled" : ""} ${navHidden ? "hidden" : ""}`}>
        <button
          className="nav-logo"
          onClick={() => scrollTo("about")}
          onMouseEnter={addHover}
          onMouseLeave={removeHover}
          type="button"
        >
          AS.
        </button>

        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={active === item ? "active" : ""}
                onMouseEnter={addHover}
                onMouseLeave={removeHover}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <section id="hero">
          <img className="hero-mascot" src="/prof.jpg" alt="Amitesh Singh" />

          <div className="hero-name-wrap">
            <h1 className="hero-name-line">
              <span className={heroIn ? "in" : ""}>AMITESH</span>
            </h1>
            {/* <div className={`hero-slash ${heroIn ? "in" : ""}`}>/</div> */}
            <h1 className="hero-name-line" style={{ marginTop: "-20px" }}>
              <span className={heroIn ? "in" : ""}>SINGH</span>
            </h1>

            <div className="hero-role " data-reveal> 
              <div className="role-title reveal" data-reveal style={{ transitionDelay: "0.6s" }}>
                    Data Analyst & Engineer
              </div>
              <div className="role-sub reveal" data-reveal style={{ transitionDelay: "0.7s" }}>
                      Turning messy data into clear insights and reliable systems.
              </div>
            </div>
            
          </div>

          <a
            href="#about"
            className={`hero-scroll-hint ${heroIn ? "in" : ""}`}
            onMouseEnter={addHover}
            onMouseLeave={removeHover}
            aria-label="Scroll to about"
          >
            ↓
          </a>

          <div className={`hero-bottom ${heroIn ? "in" : ""}`}>
            <div className="hero-bottom-left">Based in Prayagraj, India</div>
            <div className="hero-bottom-right">
              <span className="status-dot" />
              Available for opportunities
            </div>
          </div>
        </section>

        <section id="about">
          <div className="section-meta reveal" data-reveal>
            01 / About
          </div>
          <div className="about-grid">
            <div className="about-label reveal" data-reveal>
              Who I am
            </div>
            <div className="about-content">
              <p className="reveal" data-reveal style={{ transitionDelay: "0.1s" }}>
                I work with data - cleaning it, analyzing it, and turning it into decisions that actually get used.
              </p>
              <p className="reveal" data-reveal style={{ transitionDelay: "0.25s" }}>
                My focus is on practical analytics: SQL, Python, and BI tools to solve real problems - not just build dashboards, but make them meaningful.
                I've worked on projects involving large datasets, performance tracking, and anomaly detection - where clarity and reliability matter more than complexity.

              </p>

              <p className="reveal" data-reveal style={{ transitionDelay: "0.4s" }}>
                I'm early in my career, but I value clean logic, solid fundamentals, and outputs that non-technical users can trust.
              </p>

              <div className="stats-row" ref={statsRef}>
  <div>
    <div
      ref={projectsRef}
      className="stat-num reveal"
      data-reveal
      style={{ transitionDelay: "0.4s" }}
    >
      0
    </div>
    <div className="stat-label reveal" data-reveal style={{ transitionDelay: "0.4s" }}>
      Projects
    </div>
  </div>

  <div>
    <div
      ref={transactionsRef}
      className="stat-num reveal"
      data-reveal
      style={{ transitionDelay: "0.5s" }}
    >
      0
    </div>
    <div className="stat-label reveal" data-reveal style={{ transitionDelay: "0.5s" }}>
      Transactions Processed
    </div>
  </div>

  <div>
    <div
      ref={speedRef}
      className="stat-num reveal"
      data-reveal
      style={{ transitionDelay: "0.6s" }}
    >
      0
    </div>
    <div className="stat-label reveal" data-reveal style={{ transitionDelay: "0.6s" }}>
      Faster Execution
    </div>
  </div>
</div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-meta reveal" data-reveal>
            02 / Skills
          </div>
          <div className="skills-grid">
            <div className="about-label reveal" data-reveal>
              What I use
            </div>
            <div className="skills-cols">
              <div>
                {SKILLS.slice(0, 3).map((group) => (
                  <div key={group.label} data-reveal className="reveal" style={{ marginBottom: 28 }}>
                    <div className="timeline-type" style={{ marginBottom: 10, opacity: 1 }}>
                      {group.label}
                    </div>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item} className="skill-item reveal" data-reveal>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                {SKILLS.slice(3, 5).map((group) => (
                  <div key={group.label} data-reveal className="reveal" style={{ marginBottom: 28 }}>
                    <div className="timeline-type" style={{ marginBottom: 10, opacity: 1 }}>
                      {group.label}
                    </div>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item} className="skill-item reveal" data-reveal>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-wrap" data-reveal>
          <div className="marquee-track">
            {[...SKILLS[5].items, ...SKILLS[5].items].map((item, index) => (
              <span key={`${item}-${index}`} className="marquee-text">
                {item}
                <span style={{ opacity: 0.35, padding: "0 22px" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        <section id="projects">
  <div className="section-meta reveal" data-reveal>
    03 / Projects
  </div>

  <div className="projects-list">
    {PROJECTS.map((project) => {
      const open = openProject === project.num;

      return (
        <div key={project.num} className="project-item reveal" data-reveal>

          {/* ROW */}
          <div
    className="project-row"
    role="button"
    onClick={() => setOpenProject(open ? null : project.num)}
    onMouseEnter={addHover}
    onMouseLeave={removeHover}
    > 
            <span className="project-num">{project.num}</span>

            <div className="project-main">
              <div className="project-title">{project.title}</div>

              <div className="project-tags">
                <span className="project-tag">{project.category}</span>
              </div>
            </div>

            <span className="project-meta">
              {project.year}
            </span>

            <span className={`project-arrow ${open ? "open" : ""}`}>
              →
            </span>
          </div>

          {/* EXPAND */}
          <div className={`project-detail ${open ? "open" : ""}`}>
            <div className="project-detail-inner">

              <div className="project-left">
                <p className="project-desc">{project.description}</p>

                <div className="project-stack">
                  {project.tags.map((tech) => (
                    <span key={tech} className="stack-chip">
                        {tech}
                      </span>
                  ))}
                </div>
              </div>

              <div className="project-right">
                <a
                  className="project-link"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={addHover}
                  onMouseLeave={removeHover}
                >
                      GitHub ↗
                    </a>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>
      </section>

             <section id="experience">
  <div className="section-meta reveal" data-reveal>
    04 / Experience
  </div>

  <div className="timeline">
    {EXPERIENCE.map((item) => (
      <div className="exp-item reveal" data-reveal key={item.title}>
        
        <div className="exp-left">
          <div className="timeline-type">{item.type}</div>
          <div className="timeline-year">{item.year}</div>
        </div>

        <div className="exp-right">
          <div className="exp-title">{item.title}</div>
          <div className="exp-org">{item.org}</div>

          <ul className="exp-list">
            {item.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

      </div>
    ))}
  </div>
</section>

        <section id="education">
          <div className="section-meta reveal" data-reveal>
            05 / Education
          </div>
          <div className="timeline">
            {EDUCATION.map((item) => (
              <div className="timeline-item reveal" data-reveal key={item.title}>
                <div>
                  <div className="timeline-type">{item.type}</div>
                  <div className="timeline-year">{item.year}</div>
                </div>
                <div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-org">{item.org}</div>
                  <p className="timeline-desc">{item.desc}</p>
                  {item.cgpa && <p className="cgpa">{item.cgpa}</p>}
                  </div>
                </div>
            ))}
          </div>
        </section>

        <section id="certifications">
  <div className="section-meta reveal" data-reveal>
    06 / Certifications
  </div>

  <div>
    {CERTIFICATIONS.map((cert, index) => (
      <div
        key={cert.name}
        className="timeline-item reveal" data-reveal
        style={{ borderTop: index === 0 ? "1px solid var(--border)" : undefined }}
        onMouseEnter={addHover}
        onMouseLeave={removeHover}
      >
        {/* LEFT */}
        <div>
          <div className="timeline-type">Certificate</div>
          <div className="timeline-year">{cert.year}</div>
        </div>

        {/* RIGHT */}
        <div>
          {/* HEADER ROW */}
          <div className="cert-header">
            <div className="timeline-title">{cert.name}</div>

            <a href={cert.url}
              target="_blank"
              rel="noreferrer"
              className="cert-link"
            >
              Open credential ↗
            </a>
          </div>

          {/* DESCRIPTION */}
          <p className="timeline-desc">
            {cert.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

        <section id="contact">
          <div className="section-meta reveal" data-reveal>
            07 / Contact
          </div>
          <h2 className="contact-headline reveal" data-reveal>
            <span>Let&apos;s work</span>
            <span className="italic">together</span>
          </h2>
            <p className="contact-subtext reveal" data-reveal>
                    If you're looking for someone who can work with data and deliver clear, reliable insights — let's connect.
            </p>
          <div className="contact-row reveal" data-reveal>
            <a
              className="contact-email"
              href="mailto:amitesh.ks2001@gmail.com"
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              → amitesh.ks2001@gmail.com
            </a>

            <div className="contact-socials">
              {[
                { label: "GitHub", href: "https://github.com/itsmeamitesh01" },
                { label: "LinkedIn", href: "https://linkedin.com/in/amiteshsingh2001" },
                { label: "Resume", href: "/resume.pdf" },
              ].map((link) => (
                <a
                  key={link.label}
                  className="contact-social-link"
                  href={link.href}
                  target={link.href.startsWith("/") ? undefined : "_blank"}
                  rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                  onMouseEnter={addHover}
                  onMouseLeave={removeHover}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer>
          <span>Built by Amitesh Singh with ❤️</span>
          <span>© 2026</span>
        </footer>
      </main>
    </>
  );
}