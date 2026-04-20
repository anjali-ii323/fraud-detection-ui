import { motion } from 'framer-motion'

function Hero({ onJumpToInput }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card relative overflow-hidden p-7 md:p-8"
    >
      <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-accent/15 blur-3xl" />

      <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">Fraud Intelligence Platform</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-100 md:text-4xl">AI Fraud Detection, Reinvented</h1>
      <p className="mt-3 max-w-2xl text-sm text-neutral-300 md:text-base">
        Instantly evaluate suspicious messages and links with explainable AI risk scoring.
      </p>

      <motion.button
        type="button"
        onClick={onJumpToInput}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-accent/60 bg-accent/15 px-4 py-2.5 text-sm font-medium text-neutral-100 shadow-[0_0_30px_rgba(77,126,255,0.22)] transition"
      >
        Analyze Message
        <span aria-hidden>→</span>
      </motion.button>
    </motion.section>
  )
}

export default Hero
