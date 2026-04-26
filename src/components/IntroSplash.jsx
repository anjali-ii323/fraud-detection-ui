import { useEffect } from 'react'
import { motion } from 'framer-motion'

function IntroSplash({ onFinish }) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 1550)
    return () => window.clearTimeout(timer)
  }, [onFinish])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
    >
      <div className="intro-bg absolute inset-0" />
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center">
        <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-cyan-400/20 blur-3xl" />
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">AI Fraud Decision Intelligence</h1>
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-3 text-sm text-slate-300 md:text-base">
          Real-time reasoning. Not just prediction.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default IntroSplash
