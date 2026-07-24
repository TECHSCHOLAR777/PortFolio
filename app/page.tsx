import CustomCursor from '@/components/CustomCursor'
import BootSequence from '@/components/BootSequence'
import { portfolioData } from '@/data/portfolio'

const projectMeta = [
  {
    code: 'CV / HCI / 001',
    status: 'Active research',
    metrics: ['<80 ms end-to-end', '99% static accuracy', '15+ routed actions'],
  },
  {
    code: 'EDGE / CV / 002',
    status: 'Prototype',
    metrics: ['~30 FPS', '~36 ms latency', '~93% accuracy'],
  },
  {
    code: 'VOICE / AGENT / 003',
    status: 'Field prototype',
    metrics: ['22+ dialects', '<150 ms API', '3 hr → 5 min'],
  },
  {
    code: 'FORECAST / CLI / 004',
    status: 'Published',
    metrics: ['2k+ downloads', '<5 MB memory', '2 hr forecast'],
  },
  {
    code: 'MULTIMODAL / 005',
    status: 'Prototype',
    metrics: ['<3 ms trigger', '<2 sec reroute', 'Live inference'],
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function PortfolioPage() {
  const { personalInfo, projects, thoughts, achievements, skills } = portfolioData

  return (
    <>
      <BootSequence />
      <CustomCursor />

      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Rishi Garg, home">
          <span>RG</span>
          <span className="wordmark-copy">AI systems<br />engineer</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#method">Method</a>
          <a href="#profile">Profile</a>
        </nav>
        <a className="header-contact" href={`mailto:${personalInfo.contactEmail}`}>
          Start a conversation <Arrow />
        </a>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="live-dot" /> Available for research & engineering work</p>
            <h1>
              I build AI systems<br />
              that <em>perceive, reason</em><br />
              and act in real time.
            </h1>
            <p className="hero-deck">
              {personalInfo.name} is an AI/ML engineer working across multimodal
              interaction, computer vision, voice agents, and low-latency systems.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore selected work <span>↓</span></a>
              <a className="text-link" href={personalInfo.github} target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <a className="text-link" href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
            </div>
          </div>

          <aside className="system-card" aria-label="Current engineering profile">
            <div className="system-card-head">
              <span>ENGINEER_PROFILE.JSON</span>
              <span className="system-state">● ONLINE</span>
            </div>
            <div className="system-orbit" aria-hidden="true">
              <span className="orbit orbit-a" />
              <span className="orbit orbit-b" />
              <span className="orbit-core">RG</span>
            </div>
            <dl className="system-data">
              <div><dt>Focus</dt><dd>Human-centered AI</dd></div>
              <div><dt>Mode</dt><dd>Research → Production</dd></div>
              <div><dt>Stack</dt><dd>Python · C++ · PyTorch</dd></div>
              <div><dt>Base</dt><dd>New Delhi, India</dd></div>
            </dl>
            <div className="signal-strip" aria-hidden="true">
              {[34, 62, 46, 78, 58, 92, 68, 45, 84, 56, 72, 38, 64, 88, 52, 76].map((height, i) => (
                <i key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
          </aside>
        </section>

        <div className="proof-strip" aria-label="Selected capabilities">
          <span>01</span><p>Real-time multimodal inference</p>
          <span>02</span><p>Human-computer interaction</p>
          <span>03</span><p>Production ML systems</p>
          <span>04</span><p>Edge AI & forecasting</p>
        </div>

        <section id="work" className="section">
          <div className="section-intro">
            <p className="section-index">01 / SELECTED WORK</p>
            <div>
              <h2>Systems, not demos.</h2>
              <p>Selected projects are framed by the engineering problem, the system decisions, and the result—not a wall of technology logos.</p>
            </div>
          </div>

          <div className="project-list">
            {projects.map((project, index) => {
              const paragraphs = project.description.split('\n\n')
              const meta = projectMeta[index]
              return (
                <article className={`project ${index === 0 ? 'project-featured' : ''}`} key={project.title}>
                  <div className="project-rail">
                    <span>{meta.code}</span>
                    <span className="project-status">{meta.status}</span>
                  </div>
                  <div className="project-main">
                    <div className="project-heading">
                      <h3>{project.title}</h3>
                      <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                        View project <Arrow />
                      </a>
                    </div>
                    <p className="project-summary">{paragraphs[0]}</p>
                    <div className="metrics">
                      {meta.metrics.map(metric => <span key={metric}>{metric}</span>)}
                    </div>
                    {paragraphs.length > 1 && (
                      <details className="engineering-notes">
                        <summary>Read engineering notes <span>+</span></summary>
                        <div className="notes-grid">
                          {paragraphs.slice(1).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </div>
                      </details>
                    )}
                    <div className="tech-row">
                      <span>Built with</span>
                      <p>{project.techStack.join(' · ')}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="method" className="section method-section">
          <div className="section-intro">
            <p className="section-index">02 / ENGINEERING METHOD</p>
            <div>
              <h2>How I think under constraints.</h2>
              <p>Real build decisions, including the wrong turn. Expand a case note to follow the path from problem to correction.</p>
            </div>
          </div>

          <div className="thought-list">
            {thoughts.map((thought, index) => (
              <details className="thought" key={thought.problem}>
                <summary>
                  <span className="thought-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="thought-problem">{thought.problem}</span>
                  <span className="thought-action">Open case note <b>+</b></span>
                </summary>
                <div className="thought-content">
                  <div><span className="label label-mistake">Mistake</span><p>{thought.mistake}</p></div>
                  <div><span className="label label-insight">Insight</span><p>{thought.insight}</p></div>
                  <div><span className="label label-fix">Fix</span><p>{thought.fix}</p></div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="section recognition-section">
          <div className="section-intro">
            <p className="section-index">03 / SIGNAL</p>
            <div><h2>Recognition & trajectory.</h2></div>
          </div>
          <div className="achievement-table">
            {achievements.map((achievement, index) => (
              <article key={achievement.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <time>{achievement.year}</time>
              </article>
            ))}
          </div>
        </section>

        <section id="profile" className="section profile-section">
          <div className="profile-copy">
            <p className="section-index">04 / PROFILE</p>
            <h2>Engineer by discipline.<br />Researcher by instinct.</h2>
            <div className="bio-copy">
              {personalInfo.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <div className="skills-panel">
            <p className="panel-title">TECHNICAL INDEX</p>
            {skills.map(group => (
              <div className="skill-group" key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <p className="section-index">05 / CONTACT</p>
          <p className="contact-kicker">Have an ambitious system to build?</p>
          <a href={`mailto:${personalInfo.contactEmail}`}>
            Let&apos;s make it work. <Arrow />
          </a>
          <div className="contact-meta">
            <span>{personalInfo.contactEmail}</span>
            <span>New Delhi · India</span>
            <span>Response time ~24h</span>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Rishi Garg</p>
        <p>Designed for clarity. Engineered for speed.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}
