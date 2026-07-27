/**
 * Everything that is not a project: capability matrix, experience, education,
 * certifications, achievements, and the honest limitations block.
 *
 * All of it comes from the two resume PDFs. Levels below are self assessed and
 * labelled as such on the page, because a claimed level with no evidence is
 * exactly the kind of unsourced assertion this rebuild set out to remove.
 */

export type Level = 'working' | 'comfortable' | 'learning'

export type SkillGroup = {
  /** Grouped by where the tool sits in the machine learning lifecycle. */
  stage: string
  note: string
  items: { name: string; level: Level }[]
}

export const skillGroups: SkillGroup[] = [
  {
    stage: 'Languages',
    note: 'What the systems are written in.',
    items: [
      { name: 'Python', level: 'working' },
      { name: 'C++', level: 'comfortable' },
      { name: 'C', level: 'comfortable' },
      { name: 'TypeScript', level: 'comfortable' },
      { name: 'SQL', level: 'comfortable' },
    ],
  },
  {
    stage: 'Modelling',
    note: 'Training, adapting and evaluating models.',
    items: [
      { name: 'PyTorch', level: 'working' },
      { name: 'LoRA and PEFT', level: 'comfortable' },
      { name: 'Scikit-learn', level: 'working' },
      { name: 'Statsmodels', level: 'comfortable' },
      { name: 'TensorFlow', level: 'learning' },
      { name: 'Hugging Face', level: 'comfortable' },
    ],
  },
  {
    stage: 'Perception',
    note: 'Getting signal out of pixels and audio.',
    items: [
      { name: 'OpenCV', level: 'working' },
      { name: 'MediaPipe', level: 'working' },
      { name: 'Whisper', level: 'comfortable' },
      { name: 'Vosk', level: 'comfortable' },
      { name: 'Chatterbox TTS', level: 'comfortable' },
    ],
  },
  {
    stage: 'Retrieval and data',
    note: 'Embedding, indexing and moving data around.',
    items: [
      { name: 'RAG', level: 'working' },
      { name: 'pgvector', level: 'comfortable' },
      { name: 'FAISS', level: 'comfortable' },
      { name: 'Pandas', level: 'working' },
      { name: 'NumPy', level: 'working' },
      { name: 'PostgreSQL', level: 'comfortable' },
      { name: 'SQLite', level: 'comfortable' },
    ],
  },
  {
    stage: 'Serving and systems',
    note: 'Making the model reachable and keeping it fast.',
    items: [
      { name: 'FastAPI', level: 'working' },
      { name: 'Real time IPC', level: 'comfortable' },
      { name: 'Playwright', level: 'comfortable' },
      { name: 'Docker', level: 'learning' },
      { name: 'Vercel', level: 'comfortable' },
      { name: 'Git and GitHub', level: 'working' },
    ],
  },
  {
    stage: 'Interfaces',
    note: 'The surface a person actually touches.',
    items: [
      { name: 'React', level: 'comfortable' },
      { name: 'Next.js', level: 'comfortable' },
      { name: 'Electron', level: 'comfortable' },
      { name: 'Typer', level: 'comfortable' },
    ],
  },
]

export const levelCopy: Record<Level, string> = {
  working: 'Used to ship something that other people ran.',
  comfortable: 'Used in a project, still building depth.',
  learning: 'Actively learning, not yet load bearing.',
}

export type Experience = {
  role: string
  org: string
  period: string
  status: 'ongoing' | 'completed'
  detail: string
}

export const experience: Experience[] = [
  {
    role: 'AI and ML research intern',
    org: 'Delhi Technological University',
    period: 'From June 2026',
    status: 'ongoing',
    detail:
      'Research in representation learning, working on efficiency of architectures for multimodal sequence data.',
  },
  {
    role: 'AI and ML research intern',
    org: 'Netaji Subhas University of Technology',
    period: 'June 2026 to July 2026',
    status: 'completed',
    detail: 'Research in representation learning applied to video understanding.',
  },
  {
    role: 'Member',
    org: 'AIMS-DTU',
    period: '2025 to present',
    status: 'ongoing',
    detail:
      'Study group where I worked through classical machine learning and deep learning with the university artificial intelligence society.',
  },
]

export type Education = {
  qualification: string
  institution: string
  period: string
  result: string
}

export const education: Education[] = [
  {
    qualification: 'B.Tech, Software Engineering',
    institution: 'Delhi Technological University, New Delhi',
    period: '2025 to 2029',
    result: 'SGPA 9.90, second in the department',
  },
  {
    qualification: 'CBSE Class XII',
    institution: 'Yuvashakti Model School',
    period: '2025',
    result: '96.4%',
  },
  {
    qualification: 'CBSE Class X',
    institution: 'Yuvashakti Model School',
    period: '2023',
    result: '95.4%',
  },
]

export type Certification = {
  title: string
  issuer: string
  url: string
}

export const certifications: Certification[] = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI on Coursera',
    url: 'https://www.coursera.org/account/accomplishments/specialization/U8YCK8NPL0N8',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI on Coursera',
    url: 'https://www.coursera.org/account/accomplishments/specialization/9Q9ORMQB6H8O',
  },
  {
    title: 'Sequence Models',
    issuer: 'DeepLearning.AI on Coursera',
    url: 'https://www.coursera.org/account/accomplishments/verify/H7PK64QOZ50A',
  },
  {
    title: 'Convolutional Neural Networks',
    issuer: 'DeepLearning.AI on Coursera',
    url: 'https://www.coursera.org/account/accomplishments/verify/ABTXPULR65FB',
  },
  {
    title: 'Basics of Quantum Information',
    issuer: 'IBM, verified on Credly',
    url: 'https://www.credly.com/badges/0fe2fbd2-e33d-4379-8af3-33afcc498fbf/linked_in_profile',
  },
]

export type Achievement = {
  title: string
  detail: string
  year: string
  url?: string
}

export const achievements: Achievement[] = [
  {
    title: 'Top 10 nationally, ISRO Bharatiya Antariksh Hackathon 2026',
    detail: 'Problem statement 11, cross modal satellite image retrieval. Built PT-JEPA.',
    year: '2026',
  },
  {
    title: 'Top 30 nationally, SahAI for Shiksha Hackathon 2026',
    detail: 'Run by Wadhwani AI and Google.org.',
    year: '2026',
    url: 'https://drive.google.com/file/d/1ILuX2DRhxxUDthJHDUWUDzzRyfZHhaY5/view?usp=sharing',
  },
  {
    title: 'Second in the Software Engineering department',
    detail: 'Delhi Technological University, SGPA 9.90.',
    year: '2025 to 2026',
  },
  {
    title: 'Top 10, KRITI Social Impact Challenge 2026',
    detail: 'BITS Pilani, APOGEE 2026.',
    year: '2026',
    url: 'https://drive.google.com/file/d/12lQjNB9bhzkrthgY9lsqdUbBi9t-A02V/view?usp=drive_link',
  },
  {
    title: 'Top 20, AM HACKS 2.0',
    detail: 'Organised by AssetMerkle at IGDTUW.',
    year: '2026',
    url: 'https://drive.google.com/file/d/1-D-0KAr0_DOOEZyBJEsUH3UGa1JjCJfW/view?usp=sharing',
  },
  {
    title: 'JEE Main 2025, top 1% nationally',
    detail: 'All India Rank 14,182 among more than a million candidates.',
    year: '2025',
  },
]

/**
 * Model cards state what a model cannot do. So does this one.
 * Being second year is not a weakness worth hiding, but pretending otherwise
 * would be, so this section is deliberately specific.
 */
export const limitations: string[] = [
  'I am two years into a four year degree. Everything here was built as a student, not inside a production engineering organisation.',
  'Nothing I have shipped has carried sustained real user traffic. Load behaviour, on call and incident response are gaps.',
  'My largest training run was 50 epochs on a single T4. I have not trained across multiple GPUs, and distributed training is next on my list.',
  'Only PT-JEPA has retained training logs. For earlier projects I recorded headline numbers and not the artifacts behind them, which is a habit I have since changed.',
  'I have read considerably more about systems at scale than I have operated. I would rather say that plainly than imply otherwise.',
]

export const about: string[] = [
  'I am a software engineering student at Delhi Technological University, two years in, working on representation learning and multimodal systems.',
  'Most of what I build has the same shape: a model that has to make a decision quickly, and a person waiting on the other side of it. A gesture has to become a command in under a tenth of a second. A spoken sentence in a regional dialect has to become a filled government form. A radar image has to find its optical counterpart in a gallery of hundreds.',
  'I spend as much time on the part after the model as on the model itself, because that is usually where the latency and the failure modes actually live.',
]
