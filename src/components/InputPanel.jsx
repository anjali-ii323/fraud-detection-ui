import { motion } from 'framer-motion'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(77,126,255,0.2)]'

function InputPanel({ values, onChange, onSubmit, loading, errorText, panelRef }) {
  return (
    <motion.section
      ref={panelRef}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
      className="glass-card p-6 md:p-7"
    >
      <div className="mb-5">
        <h2 className="text-lg font-medium text-neutral-100">Interactive Analysis Panel</h2>
        <p className="mt-1 text-sm text-neutral-400">Paste any message, URL, and sender to receive a real-time fraud assessment.</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm text-neutral-300">
            Message
          </label>
          <textarea
            id="message"
            value={values.message}
            onChange={onChange('message')}
            required
            className={`${fieldClass} h-32 resize-none`}
            placeholder="Example: Your payroll account is suspended. Verify now to avoid lockout..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm text-neutral-300">
              URL
            </label>
            <input
              id="url"
              value={values.url}
              onChange={onChange('url')}
              className={fieldClass}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="sender" className="text-sm text-neutral-300">
              Sender
            </label>
            <input
              id="sender"
              value={values.sender}
              onChange={onChange('sender')}
              className={fieldClass}
              placeholder="security@company.com"
            />
          </div>
        </div>

        {errorText && <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{errorText}</p>}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(77,126,255,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
          {loading ? 'Analyzing...' : 'Analyze'}
        </motion.button>
      </form>
    </motion.section>
  )
}

export default InputPanel
