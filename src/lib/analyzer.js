export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const predictionStyles = {
  Safe: {
    accent: 'text-cyan-200',
    progress: 'bg-cyan-300',
    risk: 'border-cyan-300/50 bg-cyan-400/10 text-cyan-200',
  },
  Fraud: {
    accent: 'text-red-300',
    progress: 'bg-red-400',
    risk: 'border-red-400/50 bg-red-400/10 text-red-200',
  },
  Suspicious: {
    accent: 'text-indigo-200',
    progress: 'bg-indigo-300',
    risk: 'border-indigo-300/40 bg-indigo-400/10 text-indigo-200',
  },
}

export const fallbackAnalyze = ({ message, url, sender }) => {
  const lowered = `${message} ${url} ${sender}`.toLowerCase()

  const hasUrgency = /(urgent|immediately|act now|expires|security alert)/.test(lowered)
  const hasFinancialTerms = /(bank|payment|invoice|wire|crypto|gift card|refund)/.test(lowered)
  const hasCredentialTrap = /(verify account|password|otp|login now|suspended)/.test(lowered)
  const suspiciousDomainScore = /(\.ru|\.tk|bit\.ly|tinyurl|secure-login)/.test(lowered) ? 0.87 : 0.2

  let prediction = 'Safe'
  let confidence = 0.72
  let risk = 'Low'

  if (hasUrgency || hasFinancialTerms || hasCredentialTrap || suspiciousDomainScore > 0.65) {
    prediction = 'Suspicious'
    confidence = 0.86
    risk = 'Medium'
  }

  if ((hasUrgency && hasFinancialTerms) || hasCredentialTrap || suspiciousDomainScore > 0.8) {
    prediction = 'Fraud'
    confidence = 0.93
    risk = 'High'
  }

  const highlightedKeywords = ['urgent', 'payment', 'verify', 'password', 'suspended', 'wire'].filter((k) =>
    lowered.includes(k),
  )

  return {
    prediction,
    confidence,
    risk,
    explanation:
      prediction === 'Safe'
        ? 'Language appears informational without coercive urgency, credential traps, or high-risk domain signals.'
        : 'The message contains manipulative urgency and/or financial or credential-harvesting patterns commonly seen in phishing operations.',
    why:
      prediction === 'Safe'
        ? 'No high-risk intent markers were found. Sender and URL patterns look relatively normal.'
        : 'Risk increased due to urgency pressure, account verification prompts, and suspicious link/domain patterns that correlate with scam campaigns.',
  }
}

export const analyzeMessage = async (form) => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    throw new Error('Unable to reach analysis service.')
  }

  return response.json()
}
