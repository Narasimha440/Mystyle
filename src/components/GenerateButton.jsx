import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Loader2 } from 'lucide-react'

export default function GenerateButton({ onClick, isLoading, disabled }) {
  const [ripples, setRipples] = useState([])

  function handleClick(e) {
    if (disabled || isLoading) return

    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const id = Date.now()
    const ripple = {
      id,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 650)

    onClick?.()
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? {} : { scale: 1.015 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.985 }}
      aria-label={isLoading ? 'Generating response' : 'Generate response'}
      className="group relative isolate flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient px-6 py-3.5 font-body text-[15px] font-semibold text-white shadow-glow transition-shadow duration-300 hover:shadow-glow-blue disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[180px]"
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}

      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={17} className="animate-spin" aria-hidden="true" />
            Generating...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <Wand2 size={17} className="transition-transform duration-300 group-hover:-rotate-6" aria-hidden="true" />
            Generate
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
