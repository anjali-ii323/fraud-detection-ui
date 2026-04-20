import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import InputPanel from './components/InputPanel'
import ResultCard from './components/ResultCard'
import { analyzeMessage, fallbackAnalyze } from './lib/analyzer'

const initialForm = {
  message: '',
  url: '',
  sender: '',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const inputRef = useRef(null)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleAnalyze = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorText('')

    try {
      const payload = await analyzeMessage(form)
      setResult(payload)
    } catch (error) {
      setErrorText('Live API unavailable. Showing local AI simulation result.')
      setResult(fallbackAnalyze(form))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-[#f5f5f5] md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-6"
      >
        <Hero onJumpToInput={() => inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
        <InputPanel values={form} onChange={handleChange} onSubmit={handleAnalyze} loading={loading} errorText={errorText} panelRef={inputRef} />
        <ResultCard result={result} />
      </motion.div>
    </div>
  )
}

export default App
