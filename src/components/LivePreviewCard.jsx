import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const steps = ['Parsing message…', 'Detecting urgency…', 'Evaluating link…', 'Fraud detected']

function LivePreviewCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % steps.length), 1200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <span>LIVE SYSTEM PREVIEW</span>
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
      </div>
      <p className="rounded-lg border border-red-400/25 bg-red-500/10 p-3 text-sm text-slate-100">“Your account is blocked. Click link now.”</p>

      <div className="mt-4 h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={steps[index]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-cyan-200"
          >
            {steps[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {index === steps.length - 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-300">
          <p>Risk: <span className="font-semibold text-red-300">FRAUD</span></p>
          <p>Confidence: 92%</p>
          <p>₹ At Risk: ₹1,20,000</p>
        </motion.div>
      )}
    </div>
  )
}

export default LivePreviewCard
