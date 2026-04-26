import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { analyzeMessage, fallbackAnalyze, predictionStyles } from '../lib/analyzer'

const examples = [
  'Your payroll account is suspended. Verify immediately to avoid penalties.',
  'Hi, your package could not be delivered. Update details now.',
  'Board meeting moved to 4pm. Please confirm attendance.',
]

const steps = [
  'Parsing message...',
  'Extracting features...',
  'Evaluating sender...',
  'Analyzing risk patterns...',
  'Generating decision...',
]

function DetectionPage() {
  const [form, setForm] = useState({ message: '', url: '', sender: '' })
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [result, setResult] = useState(null)

  const confidence = Math.round((result?.confidence || 0) * 100)
  const style = predictionStyles[result?.prediction] || predictionStyles.Safe

  useEffect(() => {
    if (!running) return
    if (currentStep >= steps.length - 1) return
    const timer = window.setTimeout(() => setCurrentStep((v) => v + 1), 350)
    return () => window.clearTimeout(timer)
  }, [running, currentStep])

  const metrics = useMemo(() => {
    const high = result?.risk === 'High'
    return {
      saved: high ? '₹0' : '₹3,40,000',
      atRisk: high ? '₹1,20,000' : '₹40,000',
      loss: high ? '₹78,000' : '₹0',
    }
  }, [result])

  const handleAnalyze = async (event) => {
    event.preventDefault()
    if (!form.message.trim()) return
    setRunning(true)
    setCurrentStep(0)
    setResult(null)
    await new Promise((r) => setTimeout(r, 1400))
    try {
      const live = await analyzeMessage(form)
      setResult(live)
    } catch {
      setResult(fallbackAnalyze(form))
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass-card p-6">
        <h2 className="text-xl font-semibold">Fraud Signal Intake</h2>
        <p className="mt-2 text-sm text-slate-400">Submit only a message or enrich with sender + URL context for deeper decision intelligence.</p>
        <form onSubmit={handleAnalyze} className="mt-6 space-y-4">
          <textarea className="input-field h-36" placeholder="Paste suspicious message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <input className="input-field" placeholder="URL (optional)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <input className="input-field" placeholder="Sender (optional)" value={form.sender} onChange={(e) => setForm({ ...form, sender: e.target.value })} />
          <div className="flex flex-wrap gap-2">
            {examples.map((msg) => (
              <button key={msg} type="button" onClick={() => setForm((f) => ({ ...f, message: msg }))} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-300/50">
                Use example
              </button>
            ))}
          </div>
          <button className="btn-primary" disabled={running}>{running ? 'Analyzing...' : 'Analyze Message'}</button>
        </form>
      </section>

      <section className="glass-card p-6">
        <h3 className="text-lg font-semibold">AI Thinking Engine</h3>
        <div className="mt-5 space-y-3">
          {steps.map((step, idx) => (
            <motion.div key={step} initial={{ opacity: 0.35 }} animate={{ opacity: idx <= currentStep ? 1 : 0.35 }} className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${idx < currentStep ? 'bg-cyan-300' : idx === currentStep && running ? 'bg-indigo-300 animate-pulse' : 'bg-white/20'}`} />
              <p className="text-sm text-slate-300">{step}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {result && !running && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <p className={`text-2xl font-semibold ${style.accent}`}>{result.prediction}</p>
                <p className="text-sm text-slate-300">{result.risk} risk</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative grid h-20 w-20 place-items-center rounded-full border border-cyan-300/30">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold">{confidence}%</motion.span>
                </div>
                <div className="text-xs text-slate-300">
                  <p>₹ Saved: {metrics.saved}</p>
                  <p>₹ At Risk: {metrics.atRisk}</p>
                  <p>₹ Potential Loss: {metrics.loss}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {['urgency', 'suspicious link', 'unknown sender'].map((sig) => <span className="rounded-full border border-white/10 px-2 py-1" key={sig}>{sig}</span>)}
              </div>
              <ul className="list-disc space-y-1 pl-4 text-sm text-slate-300">
                <li>{result.explanation}</li>
                <li>{result.why}</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default DetectionPage
