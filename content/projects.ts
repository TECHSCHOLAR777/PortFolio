/**
 * Projects.
 *
 * Rule that governs this file: every number traces to one of three sources,
 * the resume PDFs, BAH/RESULTS_AND_CONCLUSIONS.md, the public Codabench
 * leaderboard for RealPDE, or a live API. Where a
 * quantity was never measured, the eval row says so rather than guessing.
 *
 * PT-JEPA is the only project with training artifacts on disk, so it is the
 * only one that gets a chart.
 */

export type EvalRow = {
  metric: string
  value: string
  dataset: string
  method: string
}

export type ProjectImage = {
  src: string
  alt: string
  width: number
  height: number
  /** Wide, text dense diagrams get a zoom dialog instead of a carousel slot. */
  kind?: 'diagram' | 'screenshot'
  /** Low resolution captures are framed in a laptop so they render downscaled. */
  frame?: 'laptop'
}

export type Project = {
  slug: string
  title: string
  tagline: string
  period: string
  domain:
    | 'representation learning'
    | 'scientific ml'
    | 'human interfaces'
    | 'agents'
    | 'edge'
    | 'systems'
  featured: boolean
  /** Plain prose used by scripts/embed_projects.py to build the latent map. */
  summary: string
  contribution: string[]
  stack: string[]
  evals: EvalRow[]
  evalNote?: string
  images: ProjectImage[]
  links: { label: string; url: string }[]
  /** Shown under the links on the case study when the work was a team effort. */
  teamNote?: string
}

export const projects: Project[] = [
  {
    slug: 'realpde',
    title: 'RealPDE, NeurIPS 2026',
    tagline: 'Forecasting real turbulent airflow with a model that adapts while it runs.',
    period: 'August to September 2026, with VAIL',
    domain: 'scientific ml',
    featured: true,
    summary:
      'Competition entry for both tracks of the NeurIPS 2026 RealPDE Competition, built with the Vision and Interpretability Lab under the team name probability. The task is to forecast real flow around a NACA 4418 airfoil, measured with particle image velocimetry and paired with CFD simulations. Track 2 asks a model to forecast the measured flow far ahead and adapt to each trajectory at test time, under a fixed time budget per step, scored on hidden data for error, turbulent kinetic energy, mean velocity profile, speed and calibrated uncertainty bands.',
    contribution: [
      'Moved from the organisers frozen Fourier neural operator to a team trained line, then to a from scratch U-Net that carried the whole forecast and cut the graded step time from 8.78 ms to 5.61 ms.',
      'Captured the full forecast and output stage in a single CUDA graph, so every per step correction runs inside the time budget.',
      'Added small causal output heads that read only the input window and its history: a variance net, a mean corrector and a band net, trained on out of fold replay so their gains transferred to the hidden set.',
      'Built local held out test beds and gated every idea on them before spending the one submission allowed per day.',
    ],
    stack: ['PyTorch', 'CUDA Graphs', 'U-Net', 'Fourier neural operator', 'Python', 'Codabench'],
    evals: [
      {
        metric: 'Track 2 rank',
        value: '18th of 98 teams',
        dataset: 'final development leaderboard, hidden validation data',
        method: 'read from the public Codabench leaderboard at phase close',
      },
      {
        metric: 'Track 2 final score',
        value: '81.82',
        dataset: 'hidden validation data',
        method: 'organiser composite of the five subscores below',
      },
      {
        metric: 'Relative L2 score',
        value: '94.73',
        dataset: 'hidden validation data',
        method: 'organiser scorer, Codabench detailed result',
      },
      {
        metric: 'Turbulent kinetic energy score',
        value: '79.84',
        dataset: 'hidden validation data',
        method: 'organiser scorer, Codabench detailed result',
      },
      {
        metric: 'Mean velocity profile score',
        value: '94.35',
        dataset: 'hidden validation data',
        method: 'organiser scorer, Codabench detailed result',
      },
      {
        metric: 'Uncertainty band score',
        value: '43.44',
        dataset: 'hidden validation data',
        method: 'organiser scorer, Codabench detailed result',
      },
      {
        metric: 'Progress over the phase',
        value: '76.49 to 81.82',
        dataset: 'Track 2 leaderboard',
        method: 'first scored submission on 23 August against the final one',
      },
      {
        metric: 'Track 1 rank',
        value: '34th of 182 teams, score 81.28',
        dataset: 'simulation to real transfer, hidden validation data',
        method: 'read from the public Codabench leaderboard at phase close',
      },
    ],
    evalNote:
      'All scores come from the organiser scorer on the hidden leaderboard set. The private test set is scored only for the top 10 after a retrain, so no private number exists for this entry.',
    images: [],
    links: [
      { label: 'Track 2 leaderboard', url: 'https://www.codabench.org/competitions/17385/' },
      { label: 'Track 1 leaderboard', url: 'https://www.codabench.org/competitions/17363/' },
      { label: 'VAIL', url: 'https://www.vai-lab.org/research' },
    ],
    teamNote:
      'Built as a team entry for VAIL with Taher Merchant and Aarush Mahajan. The competition code lives in a private team repository.',
  },
  {
    slug: 'pt-jepa',
    title: 'PT-JEPA',
    tagline: 'Cross modal satellite retrieval trained on SAR and optical imagery.',
    period: 'ISRO Bharatiya Antariksh Hackathon 2026, PS-11',
    domain: 'representation learning',
    featured: true,
    summary:
      'Physics aware joint embedding predictive architecture for cross modal satellite image retrieval. Pretrains a RemoteCLIP vision transformer with LoRA adapters on paired Sentinel-1 SAR and Sentinel-2 multispectral patches, combining a JEPA latent prediction objective with a geography aware contrastive loss and a spectral unmixing regulariser, so radar and optical views of the same place land in one embedding neighbourhood.',
    contribution: [
      'Adapted a RemoteCLIP ViT-B/32 backbone with rank 16 LoRA on layers 10 and 11, keeping the rest of the encoder frozen.',
      'Combined four objectives in one run: JEPA latent prediction, geography aware InfoNCE that masks same tile false negatives, spectral unmixing, and a temporal consistency term held at zero because BEN-14K carries no multi temporal pairs.',
      'Injected physics derived features ahead of the encoder: radar vegetation index, co-polarization ratio, normalized difference SAR, and directional wavelet tokenization of the SAR channels.',
      'Trained 50 epochs on a single Tesla T4, with gradient accumulation giving an effective batch of 96 after data parallel had to be disabled for PEFT compatibility.',
      'Read the failure mode from the retrieval boards: wrong top ranks are geometrically similar patches from the same tile, which is why exact match and label overlap scores diverge so widely.',
    ],
    stack: [
      'PyTorch',
      'RemoteCLIP ViT-B/32',
      'LoRA / PEFT',
      'FAISS',
      'Sentinel-1 SAR',
      'Sentinel-2 MSI',
      'NumPy',
    ],
    evals: [
      {
        metric: 'multilabel F1@5, SAR to MS',
        value: '0.7147',
        dataset: 'BEN-14K test tile 34TCS, 628 samples',
        method: 'ISRO label overlap metric, the official ranking score',
      },
      {
        metric: 'multilabel F1@5, MS to SAR',
        value: '0.7135',
        dataset: 'BEN-14K test tile 34TCS, 628 samples',
        method: 'ISRO label overlap metric',
      },
      {
        metric: 'Hit@10, SAR and MS',
        value: 'about 78%',
        dataset: 'BEN-14K test tile 34TCS, 628 samples',
        method: 'exact paired counterpart retrieval, stricter internal diagnostic',
      },
      {
        metric: 'Median rank, SAR to MS',
        value: '3',
        dataset: 'gallery of 627 distractors',
        method: 'rank of the true paired counterpart',
      },
      {
        metric: 'Paired cosine, SAR and MS',
        value: '0.587',
        dataset: 'test split embeddings',
        method: 'mean cosine between co-located SAR and optical pairs',
      },
      {
        metric: 'Final total training loss',
        value: '0.923, from 4.078',
        dataset: 'BEN-14K train split, 13,103 samples',
        method: 'logged per epoch, 50 of 50 epochs completed',
      },
      {
        metric: 'Contrastive loss reduction',
        value: '96%, 2.812 to 0.068',
        dataset: 'BEN-14K train split',
        method: 'logged per epoch',
      },
    ],
    evalNote:
      'These numbers come from the pretraining evaluation on the held out test tile. The manifold aware retrieval subsystem shown in the architecture diagram is the deployment design and was not the path used to compute them.',
    images: [
      {
        src: '/shots/ptjepa-architecture.webp',
        alt: 'PT-JEPA system diagram covering data preprocessing, physics aware feature injection, the JEPA training core, and the manifold aware retrieval subsystem',
        width: 1800,
        height: 876,
        kind: 'diagram',
      },
      {
        src: '/shots/ptjepa-retrieval-ui.webp',
        alt: 'Cross modal retrieval interface showing a Sentinel-2 multispectral query and the top five retrieved Sentinel-1 SAR results',
        width: 788,
        height: 437,
        frame: 'laptop',
      },
      {
        src: '/shots/ptjepa-tsne-modality.webp',
        alt: 'Two dimensional t-SNE of test embeddings coloured by modality, showing SAR, multispectral and RGB points fully interleaved',
        width: 1800,
        height: 1440,
      },
      {
        src: '/shots/ptjepa-retrieval-sar-to-ms.webp',
        alt: 'Qualitative retrieval board showing SAR queries and their top ranked multispectral matches',
        width: 1800,
        height: 1445,
      },
    ],
    links: [
      { label: 'Training notebook', url: 'https://github.com/Rudransh-1508/ISRO-BAH' },
      { label: 'Video demo', url: 'https://youtu.be/DiAUPrpIJ04' },
    ],
    teamNote:
      'Built as a team entry. The training notebook lives in a teammate repository, so it does not appear under my own GitHub activity.',
  },
  {
    slug: 'octave',
    title: 'Octave',
    tagline:
      'Eight gestures control any application, because the active window decides what each one means.',
    period: 'May 2026',
    domain: 'human interfaces',
    featured: true,
    summary:
      'Context aware spatial interface combining offline natural language processing and computer vision, turning a standard webcam into a hands free desktop controller. Splits Python machine learning inference from a native C++ execution core over asynchronous sockets, and routes a small set of base gestures to different actions depending on which application currently holds focus.',
    contribution: [
      'Split the system in two: Python holds the models, a native C++ core executes input events, and the two talk over asynchronous TCP so inference never blocks the operating system thread.',
      'Solved the memorisation problem in gesture interfaces by routing on context. The active application decides what a gesture means, so 8 base gesture families cover more than 15 actions without the user learning a larger vocabulary.',
      'Built a React and Electron dashboard for recording custom gestures, using transfer learning to fold new classes in without catastrophic forgetting and hot swapping PyTorch weights with no restart.',
      'Added a two hand engage lock so ordinary hand movement near the camera cannot fire commands by accident.',
    ],
    stack: ['C++', 'Python', 'PyTorch', 'LSTM', 'React', 'Electron', 'MediaPipe', 'Real time IPC'],
    evals: [
      {
        metric: 'Static gesture accuracy',
        value: 'about 99%',
        dataset: '2,100 samples',
        method: 'held out split at build time, split definition not retained',
      },
      {
        metric: 'Dynamic sequence accuracy',
        value: 'about 95.8%',
        dataset: '120 sequences',
        method: 'held out split at build time, split definition not retained',
      },
      {
        metric: 'IPC latency',
        value: 'under 5 ms',
        dataset: 'development machine',
        method: 'timed during development, log not retained',
      },
      {
        metric: 'End to end hardware latency',
        value: 'under 80 ms',
        dataset: 'development machine',
        method: 'timed during development, log not retained',
      },
      {
        metric: 'Gesture families to actions',
        value: '8 to more than 15',
        dataset: 'not applicable',
        method: 'counted from the shipped gesture library',
      },
    ],
    evalNote:
      'These figures were measured while building the system, but the runs were not archived, so there is no curve to show here. PT-JEPA is the project where I started keeping the logs.',
    images: [
      {
        src: '/shots/octave-dashboard.webp',
        alt: 'Octave gesture library dashboard listing context aware gesture families with the contexts each one applies to',
        width: 1722,
        height: 1030,
        frame: 'laptop',
      },
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/TECHSCHOLAR777/Octave-Gesture-Control-Application',
      },
      {
        label: 'Video demo',
        url: 'https://drive.google.com/file/d/1_uG8TEFys0DrUkyh_EtHL8aS3x_ULgkH/view?usp=drive_link',
      },
    ],
  },
  {
    slug: 'andrew-ng-digital-twin',
    title: 'Andrew Ng Digital Twin',
    tagline: 'A grounded conversational twin with memory that persists across sessions.',
    period: 'July 2026',
    domain: 'agents',
    featured: true,
    summary:
      'Persistent scientist artificial intelligence system holding citation backed multi turn conversations grounded in 529 public sources. Adapts its answers to the reader, keeps a timeline aware graph memory that recalls context within and across sessions, exposes that memory in a live dashboard, and can answer in a streamed synthetic cloned voice.',
    contribution: [
      'Built role adaptive retrieval and response orchestration, so the same question answered for a researcher and for a founder returns different framing from the same grounded sources.',
      'Engineered a timeline aware graph memory with in session and cross session recall, and a live dashboard that shows what the system remembers and how those memories connect.',
      'Added streaming synthetic cloned voice with a graceful browser fallback when audio is unavailable.',
      'Wrote deterministic persona and response structure checks so regressions in voice or format fail loudly instead of drifting.',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
      'Gemini',
      'Chatterbox TTS',
      'RAG',
    ],
    evals: [
      {
        metric: 'Grounding sources',
        value: '529',
        dataset: 'public lectures, courses and letters',
        method: 'counted at ingest',
      },
      {
        metric: 'Evaluation answers completed',
        value: '21 of 21',
        dataset: 'internal evaluation set',
        method: 'deterministic persona and response structure checks',
      },
      {
        metric: 'Memory scenarios passed',
        value: '93.3% of 15',
        dataset: 'memory scenario suite',
        method: 'scripted recall assertions',
      },
      {
        metric: 'Assertions passed',
        value: '95.2% of 21',
        dataset: 'assertion suite',
        method: 'scripted assertions',
      },
      {
        metric: 'Production streams completed',
        value: '30 of 30',
        dataset: 'streaming smoke run',
        method: 'completed stream count',
      },
      {
        metric: 'Security checks passed',
        value: '7 of 7',
        dataset: 'internal checklist',
        method: 'manual review against the checklist',
      },
    ],
    images: [
      {
        src: '/shots/twin-landing.webp',
        alt: 'Landing page for the Andrew Ng digital twin, introducing it as an unofficial grounded recreation',
        width: 1432,
        height: 900,
      },
      {
        src: '/shots/twin-chat-graph.webp',
        alt: 'Three panel interface showing conversation history, a grounded answer, and a context graph linking people, concepts and organisations',
        width: 1800,
        height: 977,
      },
    ],
    links: [
      { label: 'Live demo', url: 'https://digital-twin-kohl-six.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/TECHSCHOLAR777/ANDREW-NG-DIGITAL-TWIN' },
      {
        label: 'Video demo',
        url: 'https://drive.google.com/file/d/1uGfpMV7wFNYtOnz5YeO5fRRJtNhca9tU/view?usp=sharing',
      },
    ],
  },
  {
    slug: 'bandhu-ai',
    title: 'Bandhu.AI',
    tagline: 'Voice driven access to government portals for people who do not use the web.',
    period: 'April 2026',
    domain: 'agents',
    featured: false,
    summary:
      'Voice to web agent that bridges rural citizens to government portals over an ordinary phone call. Accepts dual tone multi frequency input and more than 22 regional dialects, maps unstructured speech into stateful structured data, then drives the target website in the background to submit the form on the caller behalf.',
    contribution: [
      'Mapped unstructured dialect speech into stateful structured records, so a conversation can be paused, resumed and validated like a form.',
      'Built an autonomous backend that parses those records and fills more than 20 dynamic form fields on the live portal.',
      'Reduced a three hour physical registration process to a five minute automated call.',
    ],
    stack: ['FastAPI', 'Playwright', 'Whisper', 'Vosk', 'Python'],
    evals: [
      {
        metric: 'Dialects supported',
        value: 'more than 22',
        dataset: 'development machine',
        method: 'stated in resume',
      },
      {
        metric: 'Response time',
        value: 'under 3 s',
        dataset: 'development machine',
        method: 'timed during development, log not retained',
      },
      {
        metric: 'API latency',
        value: 'under 150 ms',
        dataset: 'development machine',
        method: 'timed during development, log not retained',
      },
      {
        metric: 'Form fields submitted',
        value: 'more than 20 in under 45 s',
        dataset: 'target government portal',
        method: 'stated in resume',
      },
    ],
    images: [],
    links: [
      { label: 'GitHub', url: 'https://github.com/TECHSCHOLAR777/Bandhu.AI' },
      {
        label: 'Video demo',
        url: 'https://drive.google.com/file/d/106FDWr6rJIEjK2tVxZ7BQF5V_ZFoQ7gl/view?usp=sharing',
      },
    ],
  },
  {
    slug: 'gesture-controlled-drone',
    title: 'Gesture Controlled Drone',
    tagline: 'Multimodal drone control fusing gesture, voice and facial expression.',
    period: 'January 2026',
    domain: 'edge',
    featured: false,
    summary:
      'Edge optimised multimodal drone control interface fusing hand gesture, voice command and facial recognition, where a smile modulates flight speed. Runs seven distinct gestures in real time on device and uses temporal smoothing across frames to stop prediction jitter turning into unwanted flight commands.',
    contribution: [
      'Fused three input channels, gesture, voice and facial expression, into one command stream running on device.',
      'Added temporal smoothing across frames so single frame misclassification cannot become a flight command.',
    ],
    stack: ['Python', 'ANN', 'CNN', 'OpenCV', 'MediaPipe', 'Edge inference'],
    evals: [
      {
        metric: 'Gestures recognised',
        value: '7',
        dataset: 'custom capture set',
        method: 'counted from the shipped class list',
      },
      {
        metric: 'Throughput',
        value: 'about 30 FPS',
        dataset: 'laptop webcam',
        method: 'on screen frame counter, visible in the capture',
      },
      {
        metric: 'End to end latency',
        value: 'about 36 ms',
        dataset: 'development machine',
        method: 'timed during development, log not retained',
      },
      {
        metric: 'Accuracy',
        value: 'about 93%',
        dataset: 'development machine',
        method: 'held out split at build time, split definition not retained',
      },
    ],
    images: [
      {
        src: '/shots/drone-gesture.webp',
        alt: 'Live drone control window showing a recognised gesture, the detected sequence, speed, frame rate, voice command and the resulting flight command',
        width: 1800,
        height: 996,
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/TECHSCHOLAR777/GESTURE-CONTROLLED-DRONE' },
      {
        label: 'Video demo',
        url: 'https://drive.google.com/file/d/1lvifRkR8lF-3WTV3Dp1U_VlbICON0mLG/view?usp=drivesdk',
      },
    ],
  },
  {
    slug: 'foresight-cli',
    title: 'Foresight CLI',
    tagline: 'Forecasts resource exhaustion instead of reporting it after the fact.',
    period: 'March 2026',
    domain: 'systems',
    featured: false,
    summary:
      'Open source system resource forecaster published on the Python package index. Watches processor, memory and disk usage from the terminal and fits a statistical ensemble over the recorded history to predict exhaustion hours ahead, turning monitoring from a report on the present into a warning about the future.',
    contribution: [
      'Fitted an ARIMA and Holt-Winters ensemble over local history to predict processor, memory and disk exhaustion about two hours ahead.',
      'Kept the collection pipeline small enough that the tool stays responsive under full processor load.',
      'Published to the Python package index, where the download count is read live on this site.',
    ],
    stack: ['Python', 'Statsmodels', 'SQLite', 'Typer', 'Rich', 'psutil'],
    evals: [
      {
        metric: 'Downloads',
        value: 'more than 2,800 lifetime',
        dataset: 'PyPI, including mirrors',
        method:
          'summed from the pypistats daily series and read live on this site, so the figure here rises over time',
      },
      {
        metric: 'Forecast horizon',
        value: 'about 2 hours ahead',
        dataset: 'local resource history',
        method: 'ARIMA and Holt-Winters ensemble',
      },
      {
        metric: 'Prediction latency',
        value: 'under 3.5 s',
        dataset: 'development machine',
        method: 'timed during development, log not retained',
      },
      {
        metric: 'Memory footprint',
        value: 'under 5 MB',
        dataset: 'local run',
        method: 'stated in resume',
      },
      {
        metric: 'Behaviour under load',
        value: 'no terminal lag at 100% processor',
        dataset: 'stress test',
        method: 'stated in resume',
      },
    ],
    images: [],
    links: [
      { label: 'PyPI', url: 'https://pypi.org/project/foresight-cli/' },
      { label: 'GitHub', url: 'https://github.com/TECHSCHOLAR777/foresight' },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
