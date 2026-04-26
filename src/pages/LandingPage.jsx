import { motion } from 'framer-motion'
import LivePreviewCard from '../components/LivePreviewCard'

const features = [
  {
    title: 'Real-time fraud detection',
    description: 'Low-latency scoring continuously evaluates messages, links, and sender context as incidents unfold.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
        <path d="M9.5 12.5l1.8 1.8 3.7-3.7" />
      </svg>
    ),
  },
  {
    title: 'Multi-step reasoning',
    description: 'A deterministic decision chain reveals how the agent parses signals before classifying risk.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        <path d="M17 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        <path d="M12 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        <path d="M9 10.5h6" />
        <path d="M12 12.5v2" />
      </svg>
    ),
  },
  {
    title: 'Explainable AI',
    description: 'Every output includes auditable evidence and traceable rationale for analyst sign-off.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h6" />
        <path d="M8 12h8" />
        <path d="M8 16h4" />
        <circle cx="16" cy="16" r="2" />
        <path d="M18.5 18.5l2 2" />
      </svg>
    ),
  },
  {
    title: 'Financial impact awareness',
    description: 'Capital exposure and potential prevention outcomes are surfaced in the same decision surface.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 19h14" />
        <path d="M7 15v4" />
        <path d="M12 11v8" />
        <path d="M17 7v12" />
        <path d="M7 11h10" />
        <path d="M7 7h5" />
      </svg>
    ),
  },
]

function LandingPage({ onNavigate }) {
  return (
    <div className="space-y-20 pb-8">
      <section className="hero-grid relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-12">
        <div className="signal-flow" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI Fraud Platform</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">AI Fraud Decision Intelligence</h1>
            <p className="mt-4 max-w-xl text-slate-300">See risk evolve in real time with transparent AI reasoning and financial consequence modeling.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('/detection')} className="btn-primary">Try Live Demo</button>
              <button onClick={() => onNavigate('/dashboard')} className="btn-secondary">View Dashboard</button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <LivePreviewCard />
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, idx) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="glass-card group p-5"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 transition group-hover:bg-cyan-400/20">
              {feature.icon}
            </div>
            <h3 className="text-sm font-medium text-slate-100">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
          </motion.article>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="premium-cta rounded-3xl border border-indigo-200/20 p-10 text-center"
      >
        <h2 className="text-2xl font-semibold">Ready to Secure Your Digital Life</h2>
        <p className="mt-3 text-sm text-slate-300">Deploy AI-native fraud intelligence with explainable actions and measurable impact.</p>
        <button onClick={() => onNavigate('/detection')} className="btn-primary mt-6">Start Analysis</button>
      </motion.section>
    </div>
  )
}

export default LandingPage
