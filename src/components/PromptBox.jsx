import { useState } from 'react'
import { motion } from 'framer-motion'
import { CornerDownLeft } from 'lucide-react'
import GenerateButton from './GenerateButton.jsx'

export default function PromptBox({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const trimmed = prompt.trim()

  function handleSubmit() {
    if (!trimmed || isLoading) return
    onGenerate(trimmed)
  }

  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-5 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className={`glass rounded-2xl p-2 shadow-card transition-shadow duration-300 ${
          isFocused ? 'shadow-glow ring-1 ring-accent-violet/40' : ''
        }`}
      >
        <label htmlFor="prompt-input" className="sr-only">
          Enter your prompt
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything...  e.g. Explain Artificial Intelligence"
          rows={4}
          className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-[15px] text-ink-100 placeholder:text-ink-700 focus:outline-none"
        />
        <div className="flex flex-col-reverse items-stretch gap-3 px-2 pb-1.5 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-ink-700 sm:flex">
            <CornerDownLeft size={12} aria-hidden="true" />
            <kbd className="rounded border border-base-border px-1.5 py-0.5">⌘</kbd>
            <kbd className="rounded border border-base-border px-1.5 py-0.5">Enter</kbd>
            to generate
          </span>
          <GenerateButton onClick={handleSubmit} isLoading={isLoading} disabled={!trimmed} />
        </div>
      </motion.div>
    </section>
  )
}
