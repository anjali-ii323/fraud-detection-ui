import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import DetectionPage from './pages/DetectionPage'
import DashboardPage from './pages/DashboardPage'
import InsightsPage from './pages/InsightsPage'
import HowItWorksPage from './pages/HowItWorksPage'
import CursorGlow from './components/CursorGlow'
import IntroSplash from './components/IntroSplash'
import TopNav from './components/TopNav'

const routes = {
  '/': LandingPage,
  '/detection': DetectionPage,
  '/dashboard': DashboardPage,
  '/insights': InsightsPage,
  '/how-it-works': HowItWorksPage,
}

const transition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.5, ease: 'easeInOut', delay: 0.1 },
}

function resolvePath(pathname) {
  return routes[pathname] ? pathname : '/'
}

function App() {
  const [pathname, setPathname] = useState(resolvePath(window.location.pathname))
  const [showIntro, setShowIntro] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const onPop = () => setPathname(resolvePath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to) => {
    if (to === pathname) return
    setShowOverlay(true)
    window.history.pushState({}, '', to)
    setPathname(resolvePath(to))
    window.setTimeout(() => setShowOverlay(false), 160)
  }

  const CurrentPage = useMemo(() => routes[pathname] || LandingPage, [pathname])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-slate-100">
      <CursorGlow />

      <AnimatePresence>
        {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      <TopNav pathname={pathname} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.main key={pathname} {...transition} className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 md:px-8">
          <CurrentPage onNavigate={navigate} />
        </motion.main>
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.16 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none fixed inset-0 z-40 bg-black"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
