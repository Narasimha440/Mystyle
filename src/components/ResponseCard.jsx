import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Clock, Bot, Sparkles } from 'lucide-react'
import TypingAnimation from './TypingAnimation.jsx'
import LoadingSkeleton from './LoadingSkeleton.jsx'

const VARIANTS = {
  base: {
    icon: Bot,
    title: 'Base Model',
    badge: 'Original',
    description: 'Response generated using the original Qwen model.',
    badgeClass: 'border-white/10 bg-white/[0.04] text-ink-300',
    iconWrapClass: 'bg-white/[0.06] text-ink-100',
  },
  lora: {
    icon: Sparkles,
    title: 'Base + LoRA',
    badge: 'Fine-Tuned',
    description: 'Response generated using the LoRA adapter.',
    badgeClass: 'border-accent-purple/30 bg-accent-purple/10 text-accent-violet',
    iconWrapClass: 'bg-brand-gradient text-white',
  },
}

export default function ResponseCard({
  variant,
  text,
  isLoading,
  startTyping,
  onTypingComplete,
  responseTime,
  index = 0,
}) {
  const [copied, setCopied] = useState(false)
  const config = VARIANTS[variant]
  const Icon = config.icon

  async function handleCopy() {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable — fail silently, no destructive fallback needed
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full min-h-[420px] flex-col rounded-2xl glass shadow-card transition-shadow duration-300 hover:shadow-glow"
      aria-label={`${config.title} response`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-base-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.iconWrapClass}`}
            aria-hidden="true"
          >
            <Icon size={16} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-[15px] font-semibold text-ink-100">{config.title}</h3>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide ${config.badgeClass}`}
              >
                {config.badge}
              </span>
            </div>
          </div>
        </div>
      </header>

      <p className="border-b border-base-border/60 px-6 py-2.5 text-[12.5px] leading-snug text-ink-700">
        {config.description}
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <TypingAnimation text={text} start={startTyping} onComplete={onTypingComplete} />
        )}
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-base-border px-6 py-3">
        <div className="flex items-center gap-4 font-mono text-[11px] text-ink-700">
          <span>{isLoading ? '—' : `${text.length.toLocaleString()} chars`}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} aria-hidden="true" />
            {isLoading ? '—' : responseTime}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={isLoading || !text}
          aria-label={copied ? 'Copied to clipboard' : `Copy ${config.title} response`}
          className="flex items-center gap-1.5 rounded-lg border border-base-border px-2.5 py-1.5 font-body text-[12px] text-ink-500 transition-colors hover:border-white/20 hover:text-ink-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? <Check size={13} className="text-accent-violet" /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </footer>
    </motion.article>
  )
}
