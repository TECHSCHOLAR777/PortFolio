export interface Project {
  title: string
  description: string
  techStack: string[]
  link?: string
}

export interface Achievement {
  title: string
  year: string
  description: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Thought {
  problem: string
  mistake: string
  insight: string
  fix: string
}

export interface PortfolioData {
  personalInfo: {
    name: string
    title: string
    bio: string[]
    contactEmail: string
    github?: string
    linkedin?: string
  }
  projects: Project[]
  achievements: Achievement[]
  skills: SkillCategory[]
  thoughts: Thought[]
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Rishi Garg",
    title: "AI-ML Engineer | Building Real-Time Systems that Understand Human Behavior",
    bio: [
      "I am a Software Engineering student at Delhi Technological University (DTU SE '29) and a member of AIMS-DTU, specializing in Artificial Intelligence, Machine Learning, and multi-modal systems.",
      "My work focuses on architecting high-performance applications from autonomous voice-driven agents to low-latency hybrid tech stacks, driven by a deep passion for research and system foresight.",
      "As an active open-source contributor (GSSoC '26), I am dedicated to pushing the boundaries of human-computer interaction and collaborating with the broader engineering community."
    ],
    contactEmail: "rishiguruji2901@gmail.com",
    github: "https://github.com/TECHSCHOLAR777",
    linkedin: "https://linkedin.com/in/rishigarg2901",
  },
  projects: [
    {
      title: "Octave (Spatial OS)",
      description: "An advanced Spatial OS that transforms ordinary webcams into a hands-free, context-aware computer control interface.\n\nEngineered with a dual-brain architecture bridging a custom Python ML pipeline (PyTorch/LSTM) and a high-performance C++ decision engine via real-time IPC.\n\nKey Innovation: Controls maximum desktop functionalities with minimal gestures by intelligently reading the active screen state to dynamically map a unified gesture library to application-specific actions, secured by a stateful two-hand clutch mechanism.",
      techStack: ["C++", "Python", "PyTorch", "LSTM", "Real-time IPC"],
      link: "https://github.com/nonlinearbranch/Octave-Gesture-Control-Application",
    },
    {
      title: "Gesture-Controlled Drone System",
      description: "An edge-optimized, multimodal drone control interface fusing gesture, voice, and facial recognition (smile-based speed modulation).\n\nProcesses 7 distinct hand gestures at ~30 FPS.\n\nPerformance: Implemented temporal smoothing to eliminate prediction jitter, achieving ~36ms end-to-end latency and ~93% accuracy via a custom ANN/CNN architecture.",
      techStack: ["Python", "ANN/CNN", "Computer Vision", "Edge AI"],
      link: "https://github.com/TECHSCHOLAR777/GESTURE-CONTROLLED-DRONE",
    },
    {
      title: "Bandhu.AI",
      description: "An interactive voice-to-web agent bridging 100M+ rural citizens to government portals by processing DTMF and 22+ dialects.\n\nPerformance: Achieved <3s response and <150ms API latency to map unstructured audio into stateful JSON.\n\nImpact: Engineered an autonomous FastAPI/Playwright backend that reduces a 3-hour physical registration process to a 5-minute automated call.",
      techStack: ["FastAPI", "Playwright", "Whisper", "Vosk", "Python"],
      link: "https://github.com/TECHSCHOLAR777/Bandhu.AI",
    },
    {
      title: "Foresight CLI",
      description: "An open-source system resource forecaster published on PyPI (2k+ downloads) for live terminal monitoring.\n\nUtilizes a custom ARIMA and Holt-Winters ensemble model to predict CPU/RAM/Disk exhaustion 2 hours ahead with <3.5s latency.\n\nPerformance: Engineered a highly optimized local data pipeline ensuring zero-lag terminal execution under 100% CPU stress with a sub-5 MB memory footprint.",
      techStack: ["Python", "SQLite", "Typer", "Statsmodels", "psutil"],
      link: "https://pypi.org/project/foresight-cli",
    },
    {
      title: "SafeSphere AI",
      description: "A public safety platform integrating Whisper and computer vision to continuously detect proximity and escalation threats.\n\nGenerates dynamic risk heatmaps with <3ms voice-trigger latency.\n\nEngineered a graph-based Safe Route Engine for dynamic, risk-aware path optimization, executing sub-2s recalculations to reroute users away from flagged zones during live inference.",
      techStack: ["Python", "OpenCV", "Whisper", "Graph Algorithms"],
      link: "https://github.com/TECHSCHOLAR777/Project-SafeSphere",
    }
  ],
  achievements: [
    {
      title: "Department Rank 2, Software Engineering",
      year: "2025-2026",
      description: "Secured 2nd rank academically in the Software Engineering Department with a 9.9 SGPA."
    },
    {
      title: "Top 10 Finalist, KRITI Social Impact Challenge",
      year: "2026",
      description: "Recognized as a Top 10 Finalist at the KRITI Social Impact Challenge '26 at BITS Pilani (APOGEE 2026)."
    },
    {
      title: "JEE Main Top 1% Nationwide",
      year: "2025",
      description: "Achieved 99+ Percentile (Top 1%) nationwide, securing AIR 14,182 among 1M+ candidates."
    },
    {
      title: "Top 20 teams, AM HACKS 2.0",
      year: "2026",
      description: "Selected as a Top 20 Team at AM HACKS 2.0 organized by AssetMerkle IGDTUW."
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["C", "C++", "Python", "SQL", "TypeScript"]
    },
    {
      category: "AI, ML & Computer Vision",
      items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Statsmodels", "OpenCV", "MediaPipe", "Pandas", "NumPy"]
    },
    {
      category: "Tools, Frameworks & Architecture",
      items: ["Git/GitHub", "Typer", "SQLite", "FastAPI", "Whisper", "Vosk", "Playwright", "Real-time IPC"]
    }
  ],
  thoughts: [
    {
      problem: "How do you control an entire operating system hands-free without overwhelming the user with a massive dictionary of complex gestures?",
      mistake: "Assigning a unique, rigid gesture to every single desktop action, which inevitably leads to cognitive overload for the user and frequent false-positive triggers for the system.",
      insight: "The context of the screen should dictate the action. A 'swipe' gesture should naturally mean something completely different in a browser versus a media player.",
      fix: "Implement context-aware gesture mapping. By intelligently reading the active screen state, you can map a unified, minimal gesture library to application-specific actions, secured by a stateful two-hand clutch mechanism.",
    },
    {
      problem: "Digital infrastructure remains inaccessible to users who rely entirely on voice and regional dialects.",
      mistake: "Building increasingly complex web interfaces and expecting digital literacy to catch up to the technology.",
      insight: "Technology must adapt to the user. Mapping unstructured, dialect-heavy audio to stateful data is the key to bridging the digital divide.",
      fix: "Deploy interactive voice-to-web agents that parse regional audio into structured JSON, driving headless browsers to autonomously navigate legacy portals.",
    },
    {
      problem: "Standard system monitoring tools report current states but fail to provide actionable lead time for critical resource exhaustion.",
      mistake: "Relying purely on threshold alerts, which only notify engineers when a system is already in the process of failing.",
      insight: "Historical performance data contains the signatures of future failures. Time-series forecasting can transform reactive monitoring into proactive defense.",
      fix: "Implement ensemble models (like ARIMA/Holt-Winters) on local data pipelines to predict CPU/RAM spikes hours before they cause system downtime.",
    }
  ]
}