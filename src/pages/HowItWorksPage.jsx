const steps = [
  ['Agent', 'AI agent monitors incoming communication context.'],
  ['Action', 'It classifies intent and risk-related actions in sequence.'],
  ['Environment', 'Signals from links, sender reputation, and language are evaluated.'],
  ['Reward', 'Correct interventions receive positive reward; misses are penalized.'],
  ['Learning', 'Policy updates improve future fraud prevention decisions.'],
]

function HowItWorksPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {steps.map(([title, desc]) => (
        <article key={title} className="glass-card p-5">
          <div className="mb-3 h-8 w-8 rounded-lg bg-indigo-400/20" />
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="mt-2 text-sm text-slate-300">{desc}</p>
        </article>
      ))}
    </div>
  )
}

export default HowItWorksPage
