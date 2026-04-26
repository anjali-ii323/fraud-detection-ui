import SimpleLineChart from '../components/SimpleLineChart'

function InsightsPage() {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <h2 className="text-xl font-semibold">Training & Insights</h2>
        <p className="mt-2 text-sm text-slate-300">Agent improves decision-making over time using reward feedback.</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5"><p className="text-sm text-slate-300">Reward Curve (episode vs reward)</p><SimpleLineChart data={[2, 5, 4, 8, 10, 13, 15, 18]} /></div>
        <div className="glass-card p-5">
          <p className="text-sm text-slate-300">Before vs After</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-xl border border-white/10 p-4"><p className="text-xs text-slate-400">Before</p><p className="mt-2 text-2xl">78%</p><p className="text-xs">success rate</p></div>
            <div className="rounded-xl border border-white/10 p-4"><p className="text-xs text-slate-400">After</p><p className="mt-2 text-2xl text-cyan-200">94%</p><p className="text-xs">success rate</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InsightsPage
