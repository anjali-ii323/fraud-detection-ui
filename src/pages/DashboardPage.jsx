import { motion } from 'framer-motion'
import SimpleLineChart from '../components/SimpleLineChart'

const kpis = [
  ['Total Checks', '12,482'],
  ['Fraud Rate', '7.8%'],
  ['Model Accuracy', '94.2%'],
]

function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {kpis.map(([label, value]) => (
          <motion.div key={label} whileHover={{ y: -4 }} className="glass-card p-5">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5"><p className="text-sm text-slate-300">Fraud vs Safe Trend</p><SimpleLineChart data={[12, 18, 14, 22, 19, 27, 24]} /></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-300">Confidence Trend</p><SimpleLineChart data={[70, 74, 78, 81, 84, 86, 89]} stroke="#818cf8" /></div>
      </section>

      <section className="glass-card p-5">
        <div className="mb-3 flex justify-between text-sm text-slate-300"><span>Recent Activity</span><span>fraud spikes detected · model confidence stabilizing</span></div>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500"><tr><th className="py-2">Time</th><th>Sender</th><th>Decision</th><th>Impact</th></tr></thead>
          <tbody>
            <tr className="border-t border-white/10"><td className="py-2">10:42</td><td>unknown-pay@notice.io</td><td>Fraud</td><td>₹80,000 blocked</td></tr>
            <tr className="border-t border-white/10"><td className="py-2">09:18</td><td>ops@vendor.com</td><td>Safe</td><td>₹0</td></tr>
            <tr className="border-t border-white/10"><td className="py-2">08:02</td><td>alerts@secure-auth.net</td><td>Suspicious</td><td>₹12,500 at risk</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default DashboardPage
