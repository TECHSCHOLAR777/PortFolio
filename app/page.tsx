import CustomCursor from '../components/CustomCursor'
import HeroSection from '../components/HeroSection'
import ProjectSection from '../components/ProjectSection'
import HowIThinkSection from '../components/HowIThinkSection'
import AchievementSection from '../components/AchievementSection'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'

export default function PortfolioPage() {
  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-void text-[#e8e4dc]">
        <HeroSection />
        <ProjectSection />
        <HowIThinkSection />
        <AchievementSection />
        <AboutSection />
        <Footer />
      </main>
    </>
  )
}
