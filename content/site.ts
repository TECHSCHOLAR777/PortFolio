/**
 * Single source of truth for identity and links.
 *
 * Every link here was extracted from the two resume PDFs, so nothing on the
 * site points at a URL Rishi has not already published.
 */

export const site = {
  name: 'Rishi Garg',
  role: 'AI and ML engineer',
  url: 'https://rishigarg.vercel.app',
  description:
    'Second year software engineering student at Delhi Technological University. I train representation models and build multimodal systems that run in real time.',
  location: 'New Delhi, India',
  email: 'rishiguruji2901@gmail.com',
  phone: '+91 9555377700',
  resume: '/rishi-garg-resume.pdf',
  links: {
    github: 'https://github.com/TECHSCHOLAR777',
    linkedin: 'https://www.linkedin.com/in/rishigarg2901/',
    leetcode: 'https://leetcode.com/u/Rishicoder_777/',
    // TODO: Rishi to supply the real Kaggle handle before deploy.
    kaggle: null as string | null,
  },
  githubUser: 'TECHSCHOLAR777',
  pypiPackage: 'foresight-cli',
} as const

/**
 * The page is laid out as a model card. Each section is an epoch, and the
 * epoch bar reads its progress from this list, so section order and epoch
 * count never drift apart.
 */
export const epochs = [
  { id: 'signal', label: 'Signal' },
  { id: 'about', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'work', label: 'Selected work' },
  { id: 'experience', label: 'Fine tuning' },
  { id: 'education', label: 'Training data' },
  { id: 'certifications', label: 'Pretraining' },
  { id: 'achievements', label: 'Eval results' },
] as const

export type EpochId = (typeof epochs)[number]['id']
