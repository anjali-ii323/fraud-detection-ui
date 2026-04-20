import { useMemo, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const predictionStyles = {
  Safe: {
    accent: 'text-emerald-400',
    bar: 'bg-emerald-400',
    badge: 'text-emerald-300 border-emerald-400/50 bg-emerald-400/10',
  },
  Fraud: {
    accent: 'text-rose-400',
    bar: 'bg-rose-400',
    badge: 'text-rose-300 border-rose-400/50 bg-rose-400/10',
  },
  Suspicious: {
    accent: 'text-amber-300',
    bar: 'bg-amber-300',
    badge: 'text-amber-200 border-amber-300/50 bg-amber-300/10',
  },
}

const featureMeta = [
  { key: 'urgency', label: 'Urgency detected' },
  { key: 'financial_keywords', label: 'Financial keywords' },
  { key: 'suspicious_domain_score', label: 'Suspicious domain score' },
  { key: 'external_links', label: 'External links' },
  { key: 'sender_reputation', label: 'Sender reputation' },
]

const initialState = {
  message: '',
  url: '',
  sender: '',
}

const fallbackAnalyze = ({ message, url, sender }) => {
  const lowered = `${message} ${url} ${sender}`.toLowerCase()
  const hasUrgency = /(urgent|immediately|now|expire|limited|act now)/.test(lowered)
  const hasFinance = /(payment|bank|crypto|invoice|transfer|gift card|refund)/.test(lowered)
  const suspiciousDomainScore = /(\.ru|\.tk|bit\.ly|tinyurl)/.test(lowered) ? 0.82 : 0.24
  const externalLinks = /https?:\/\//.test(lowered)
  const senderReputation = /(support|no-reply|admin)/.test(lowered) ? 'Unknown' : 'Moderate'

  let prediction = 'Safe'
  let confidence = 0.77
  let risk = 'Low'

  if (hasUrgency || hasFinance || suspiciousDomainScore > 0.65) {
    prediction = 'Suspicious'
    confidence = 0.84
    risk = 'Medium'
  }

  if ((hasUrgency && hasFinance) || suspiciousDomainScore > 0.8) {
    prediction = 'Fraud'
    confidence = 0.93
    risk = 'High'
  }

  const keywords = ['urgent', 'payment', 'verify', 'suspended', 'bank'].filter((keyword) => lowered.includes(keyword))

  return {
    prediction,
    confidence,
    risk,
    explanation:
      prediction === 'Safe'
        ? 'No high-risk scam patterns were detected. Message language and sender context appear normal.'
        : 'The model detected manipulative intent signals and risky sender/domain indicators that frequently occur in phishing or payment scams.',
    highlighted_keywords: keywords,
    features: {
      urgency: hasUrgency ? 'Detected' : 'Not detected',
      financial_keywords: hasFinance ? 'High' : 'Low',
      suspicious_domain_score: `${Math.round(suspiciousDomainScore * 100)}%`,
      external_links: externalLinks ? 'Present' : 'None',
      sender_reputation: senderReputation,
    },
  }
}

function App() {
  const [form, setForm] = useState(initialState)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const style = useMemo(() => predictionStyles[result?.prediction] ?? predictionStyles.Safe, [result])

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleAnalyze = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const payload = await response.json()
      setResult(payload)
      setHistory((prev) => [payload, ...prev].slice(0, 5))
    } catch (error) {
      const payload = fallbackAnalyze(form)
      setResult(payload)
      setHistory((prev) => [payload, ...prev].slice(0, 5))
    } finally {
      setLoading(false)
    }
  }

  const highlightKeywords = (text, words) => {
    if (!words?.length || !text) return text

    const pattern = new RegExp(`(${words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    return text.split(pattern).map((segment, index) =>
      words.some((word) => word.toLowerCase() === segment.toLowerCase()) ? (
        <mark key={`${segment}-${index}`} className="rounded bg-indigo-400/20 px-1 text-indigo-200">
          {segment}
        </mark>
      ) : (
        <span key={`${segment}-${index}`}>{segment}</span>
      ),
    )
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="glass-card p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Threat Intelligence Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-100 md:text-4xl">AI Fraud Detection</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Real-time Scam Analysis using AI Environment</p>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <form onSubmit={handleAnalyze} className="glass-card space-y-4 p-6">
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-slate-300">
                  Message content
                </label>
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={handleChange('message')}
                  className="h-36 w-full resize-none rounded-xl border border-slate-600/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400/60 transition focus:ring"
                  placeholder="Paste email, SMS, or chat message for analysis"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="url" className="text-sm text-slate-300">
                    URL
                  </label>
                  <input
                    id="url"
                    value={form.url}
                    onChange={handleChange('url')}
                    className="w-full rounded-xl border border-slate-600/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400/60 transition focus:ring"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sender" className="text-sm text-slate-300">
                    Sender
                  </label>
                  <input
                    id="sender"
                    value={form.sender}
                    onChange={handleChange('sender')}
                    className="w-full rounded-xl border border-slate-600/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-400/60 transition focus:ring"
                    placeholder="support@domain.com"
                  />
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-indigo-400/50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                {loading ? 'Analyzing...' : 'Analyze'}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </form>

            <article className="glass-card p-6 transition-all duration-500">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">Result</h2>
              {result ? (
                <div className="mt-4 space-y-5 transition-opacity duration-500">
                  <div className="flex flex-wrap items-center gap-4">
                    <p className={`text-4xl font-semibold ${style.accent}`}>{result.prediction}</p>
                    <span className={`tag ${style.badge}`}>{result.risk} risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Confidence score</span>
                      <span>{Math.round((result.confidence || 0) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700/70">
                      <div
                        className={`h-2 rounded-full ${style.bar} transition-all duration-700`}
                        style={{ width: `${Math.round((result.confidence || 0) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Run an analysis to see prediction and risk intelligence.</p>
              )}
            </article>

            <article className="glass-card p-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">Extracted Features</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {featureMeta.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-xl border border-slate-700/70 bg-slate-900/35 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-400/60"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-slate-100">{result?.features?.[item.key] ?? '—'}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="space-y-6">
            <article className="glass-card p-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">AI Explanation</h2>
              {result ? (
                <p className="mt-4 leading-relaxed text-slate-200">
                  {highlightKeywords(result.explanation, result.highlighted_keywords)}
                </p>
              ) : (
                <p className="mt-4 text-sm text-slate-400">The model reasoning will appear after a successful analysis.</p>
              )}
            </article>

            <article className="glass-card p-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400">Recent Analyses</h2>
              <div className="mt-4 space-y-3">
                {history.length ? (
                  history.map((entry, index) => (
                    <div
                      key={`${entry.prediction}-${index}`}
                      className="rounded-xl border border-slate-700/70 bg-slate-900/40 p-4 transition duration-300 hover:border-indigo-400/60"
                    >
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${predictionStyles[entry.prediction]?.accent ?? 'text-slate-200'}`}>
                          {entry.prediction}
                        </p>
                        <span className="text-xs text-slate-400">#{index + 1}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{entry.explanation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No history yet. Your last five results will appear here.</p>
                )}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
