import { motion } from 'framer-motion'

const links = [
  ['/', 'Home'],
  ['/detection', 'Detection'],
  ['/dashboard', 'Dashboard'],
  ['/insights', 'Training'],
  ['/how-it-works', 'How it works'],
]

function TopNav({ pathname, onNavigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <button onClick={() => onNavigate('/')} className="text-sm font-semibold tracking-wide text-slate-100">
          FraudIQ
        </button>
        <nav className="flex items-center gap-2">
          {links.map(([to, label]) => {
            const active = pathname === to
            return (
              <motion.button
                key={to}
                onClick={() => onNavigate(to)}
                whileHover={{ y: -1, scale: 1.02 }}
                className={`rounded-lg px-3 py-2 text-xs md:text-sm ${
                  active ? 'bg-cyan-400/15 text-cyan-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </motion.button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default TopNav
