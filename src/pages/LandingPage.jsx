import { motion } from 'framer-motion'
import LivePreviewCard from '../components/LivePreviewCard'

const features = [
  'Real-time fraud detection',
  'Multi-step reasoning engine',
  'Explainable AI decisions',
  'Financial impact awareness',
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
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="glass-card group p-5"
          >
            <div className="mb-4 h-9 w-9 rounded-lg bg-cyan-400/10 transition group-hover:bg-cyan-400/20" />
            <h3 className="text-sm font-medium text-slate-100">{feature}</h3>
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
