import CustomCursor from '@/components/CustomCursor'
import ParticlePortrait from '@/components/ParticlePortrait'
import { portfolioData } from '@/data/portfolio'

const projectMeta = [
  { index: '01', type: 'Computer vision + HCI', signal: '<80 ms', detail: 'End-to-end hardware response' },
  { index: '02', type: 'Edge AI + robotics', signal: '30 FPS', detail: 'Multimodal inference on edge' },
  { index: '03', type: 'Voice agents', signal: '22+', detail: 'Regional dialects supported' },
  { index: '04', type: 'ML systems', signal: '2k+', detail: 'PyPI downloads' },
  { index: '05', type: 'Public safety AI', signal: '<2 sec', detail: 'Dynamic route recalculation' },
]

export default function PortfolioPage() {
  const { personalInfo, projects, thoughts, achievements, skills } = portfolioData

  return (
    <>
      <CustomCursor />
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="topbar">
        <a className="identity" href="#top">
          <span>Rishi Garg</span>
          <small>AI systems engineer</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
        </nav>
        <a className="availability" href={`mailto:${personalInfo.contactEmail}`}>
          <i /> Available for work
        </a>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="kicker">AI engineering / computer vision / multimodal systems</p>
            <h1>
              Building machines<br />
              that understand<br />
              <span>human intent.</span>
            </h1>
            <p className="hero-summary">
              I am Rishi Garg, an AI and ML engineer focused on real-time systems.
              I turn research ideas into software that can see, listen, decide, and respond.
            </p>
            <div className="hero-links">
              <a className="primary-link" href="#work">Selected work <span>↓</span></a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
            <dl className="hero-facts">
              <div><dt>Based in</dt><dd>New Delhi, India</dd></div>
              <div><dt>Currently</dt><dd>DTU Software Engineering</dd></div>
              <div><dt>Interested in</dt><dd>Human-centered AI</dd></div>
            </dl>
          </div>

          <div className="portrait-stage">
            <div className="portrait-label portrait-label-top">
              <span>LIVE PORTRAIT MODEL</span>
              <span>RGB → LUMINANCE → PARTICLES</span>
            </div>
            <ParticlePortrait
              src="/rishi-portrait-matte.png"
              accentColor="#e06a32"
              particleDensity={0.82}
              backgroundTreatment="halo"
            />
            <div className="portrait-label portrait-label-bottom">
              <span>SUBJECT: RISHI GARG</span>
              <span>POINTER REACTIVE / 60 FPS</span>
            </div>
          </div>
        </section>

        <section className="selected-work" id="work">
          <div className="section-heading">
            <p>01 / Selected work</p>
            <h2>Useful intelligence,<br />built under constraints.</h2>
            <p className="section-note">
              A selection of systems where model behavior, latency, and user experience
              had to work together.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => {
              const paragraphs = project.description.split('\n\n')
              const meta = projectMeta[index]
              return (
                <article className="project-row" key={project.title}>
                  <div className="project-index">
                    <span>{meta.index}</span>
                    <small>{meta.type}</small>
                  </div>
                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p>{paragraphs[0]}</p>
                    <details>
                      <summary>Engineering notes <span>+</span></summary>
                      <div className="project-notes">
                        {paragraphs.slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </details>
                    <p className="stack">{project.techStack.join(' / ')}</p>
                  </div>
                  <div className="project-result">
                    <strong>{meta.signal}</strong>
                    <span>{meta.detail}</span>
                    <a href={project.link} target="_blank" rel="noreferrer">Open project ↗</a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="approach" id="approach">
          <div className="section-heading compact">
            <p>02 / Engineering approach</p>
            <h2>Show the reasoning,<br />including the wrong turn.</h2>
          </div>
          <div className="approach-list">
            {thoughts.map((thought, index) => (
              <details key={thought.problem}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{thought.problem}</h3>
                  <b>+</b>
                </summary>
                <div className="approach-content">
                  <div><small>Mistake</small><p>{thought.mistake}</p></div>
                  <div><small>Insight</small><p>{thought.insight}</p></div>
                  <div><small>Fix</small><p>{thought.fix}</p></div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-main">
            <p className="kicker">03 / About</p>
            <h2>Curious about models.<br />Serious about systems.</h2>
            <div className="about-copy">
              {personalInfo.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <aside>
            <p className="aside-title">Technical practice</p>
            {skills.map(group => (
              <div className="skill-block" key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
            <div className="recognition">
              <p className="aside-title">Recognition</p>
              {achievements.map(item => (
                <div key={item.title}>
                  <span>{item.year}</span>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="contact">
          <p>04 / Contact</p>
          <h2>Let&apos;s build something<br /><span>that has to work.</span></h2>
          <a href={`mailto:${personalInfo.contactEmail}`}>{personalInfo.contactEmail} ↗</a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Rishi Garg</span>
        <span>Built with care in New Delhi</span>
        <a href="#top">Top ↑</a>
      </footer>
    </>
  )
}
