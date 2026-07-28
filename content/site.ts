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
 * Section order, which the epoch bar reads so the two can never drift apart.
 *
 * These labels used to borrow model card vocabulary: fine tuning for research,
 * training data for education, inference for the contact form. That only made
 * sense while the hero announced the conceit, and announcing it framed the page
 * as a gimmick before a reader had any reason to care. The structure the model
 * card actually contributed, a page that states its own limitations, is still
 * here. The costume is not.
 */
export const epochs = [
  { id: 'signal', label: 'Overview' },
  { id: 'about', label: 'What I work on' },
  { id: 'architecture', label: 'Stack' },
  { id: 'work', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Coursework' },
  { id: 'achievements', label: 'Achievements' },
] as const

export type EpochId = (typeof epochs)[number]['id']
