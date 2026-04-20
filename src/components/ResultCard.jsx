import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { predictionStyles } from '../lib/analyzer'

function highlightKeywords(text, words) {
  if (!words?.length || !text) return text
  const escaped = words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const pattern = new RegExp(`(${escaped})`, 'gi')

  return text.split(pattern).map((segment, idx) =>
    words.some((word) => word.toLowerCase() === segment.toLowerCase()) ? (
      <mark key={`${segment}-${idx}`} className="rounded bg-accent/20 px-1 text-accent-foreground">
        {segment}
      </mark>
    ) : (
      <span key={`${segment}-${idx}`}>{segment}</span>
    ),
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
      <p className="text-sm text-neutral-300">No analysis yet.</p>
      <p className="mt-1 text-sm text-neutral-500">Submit a message to view prediction, confidence, and rationale.</p>
    </div>
  )
}

function ResultCard({ result }) {
  const [expanded, setExpanded] = useState(false)

  if (!result) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
        className="glass-card p-6 md:p-7"
      >
        <h2 className="text-lg font-medium text-neutral-100">Result</h2>
        <p className="mt-1 mb-5 text-sm text-neutral-400">Your AI decision output appears here after analysis.</p>
        <EmptyState />
      </motion.section>
    )
  }

  const style = predictionStyles[result.prediction] || predictionStyles.Safe
  const confidence = Math.round((result.confidence || 0) * 100)

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
      className="glass-card p-6 md:p-7"
    >
      <h2 className="text-lg font-medium text-neutral-100">Result</h2>
      <p className="mt-1 text-sm text-neutral-400">AI decision summary with explainability signals.</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${result.prediction}-${confidence}-${result.risk}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mt-5 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <p className={`text-4xl font-semibold tracking-tight ${style.accent}`}>{result.prediction}</p>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${style.risk}`}>{result.risk} Risk</span>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-neutral-300">
              <span>Confidence</span>
              <span>{confidence}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full ${style.progress}`}
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-neutral-200">
            {highlightKeywords(result.explanation, result.highlighted_keywords)}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm font-medium text-accent transition hover:text-white"
          >
            {expanded ? 'Hide details' : 'Why this decision?'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300"
              >
                {result.why || 'The model used context and lexical intent markers to estimate fraud risk.'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}

export default ResultCard
