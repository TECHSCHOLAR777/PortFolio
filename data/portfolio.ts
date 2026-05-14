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
      title: "OCTAVE - Context-Aware Spatial Interface",
      description: "An advanced Python/C++ spatial interface combining offline NLP and computer vision to transform standard webcams into hands-free, intelligent desktop controllers.\n\nArchitecture: Engineered a dual-brain system decoupling Python ML inference from a native C++ execution core via asynchronous TCP sockets, ensuring the heavy AI logic never blocks the operating system's main thread.\n\nKey Innovation (Context Routing): Solved the 'cognitive overload' problem of standard gesture tools. Instead of forcing users to memorize dozens of actions, the system dynamically reads the active OS environment (Browser, IDE, Media Player). It translates just 8 intuitive base gestures into 15+ application-specific actions based entirely on context.\n\nLive Retraining: Developed a user-friendly React/Electron dashboard allowing users to record custom gestures. It utilizes Transfer Learning in the background to seamlessly merge new data without catastrophic forgetting, hot-swapping PyTorch weights with zero system downtime.\n\nPerformance: The default PyTorch LSTMs and FFNNs achieve ~99% static accuracy (2,100 samples) and ~95.8% dynamic accuracy (120 sequences), while the C++ execution engine maintains a blistering <5ms IPC latency and <80ms end-to-end hardware delay.",
      techStack: ["C++", "Python", "PyTorch", "React", "Electron", "Transfer Learning", "Real-time IPC"],
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
      problem: "I was given a task to build a hands free operating system interface, but typical approaches force users to memorize a massive list of complicated gestures. This makes the system mentally exhausting and frustrating to use.",
      mistake: "At first, I assigned a unique gesture to every single computer action. It seemed organized, but it quickly fell apart. Users could not remember all the movements, and the system kept confusing everyday body language with actual commands.",
      insight: "The breakthrough came from imagining a simple situation. I am standing in a room with two friends. One friend is next to a speaker. The other friend is next to a window. I make a vertical sliding motion with my hand. The friend by the speaker instantly thinks I want to turn up the music. The friend by the window thinks I want to open the blinds for more light. The exact same hand movement means two completely different things based on who is looking at it. This showed me that a gesture does not need a strict, permanent definition. The meaning can change based on the user's current environment.",
      fix: "I rebuilt the system to understand context. Instead of a hundred different gestures, my system uses just a few simple ones. The computer looks at what application is currently open on the screen and changes what the gesture does accordingly. To stop the system from accidentally clicking things when the user is just moving their hands naturally, I added a two hand locking mechanism. The user has to intentionally engage the system, making it feel safe and reliable."
    },
    {
      problem: "Essential digital services are completely out of reach for people who rely entirely on voice communication and speak in heavy regional dialects.",
      mistake: "My initial approach was to keep designing complex visual websites, hoping that people would simply learn how to use them over time. This was a naive assumption. It completely ignored users whose primary way of communicating is speaking.",
      insight: "I realized technology should adapt to how people naturally behave, not the other way around. When people speak in regional dialects, they often mix words and use sentence structures that do not fit neatly into standard voice commands. This is not a weakness. It is just raw information waiting to be organized. If a system can understand that audio and turn it into structured data, it removes the barrier entirely.",
      fix: "I built voice to web agents to solve this. These systems listen to spoken regional dialects, convert the messy audio into organized data, and use that data to automatically navigate old or complex websites in the background. Suddenly, speaking in a local dialect was no longer a limitation. It became the exact tool needed to access the internet."
    },
    {
      problem: "Standard computer monitoring tools are great at reporting what is happening right now, but they give engineers zero warning before a system runs out of memory and crashes.",
      mistake: "I originally relied on basic alarms. These alarms only triggered when the system was already hitting maximum capacity. Because of this, my team and I were always reacting to problems that were already causing damage.",
      insight: "I realized that past performance data contains hidden warning signs. If I study how the system behaved right before it crashed in the past, I can spot those exact same patterns forming in the present. The clues to future failures are already recorded in the history logs. I just needed to know how to read them.",
      fix: "I added statistical forecasting models directly to our local data systems. Now, the software looks at historical trends to predict exactly when the computer will run out of resources. We receive warnings about CPU and memory spikes hours before they actually happen. This completely changed our engineering culture from fighting immediate fires to preventing them from starting."
    }
  ]
}