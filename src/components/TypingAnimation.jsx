import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * Reveals `text` progressively to simulate natural typing, rendering
 * Markdown as it goes. Calls onComplete once fully revealed.
 */
export default function TypingAnimation({ text, start, onComplete, onProgress }) {
  const [length, setLength] = useState(0)
  const completedRef = useRef(false)

  useEffect(() => {
    if (!start) return
    setLength(0)
    completedRef.current = false

    let current = 0
    let cancelled = false

    function tick() {
      if (cancelled) return

      // Slightly variable chunk size + delay for a natural, non-robotic feel
      const chunk = Math.random() < 0.15 ? 1 : Math.floor(Math.random() * 3) + 2
      current = Math.min(current + chunk, text.length)
      setLength(current)
      onProgress?.()

      if (current < text.length) {
        const delay = 8 + Math.random() * 22
        setTimeout(tick, delay)
      } else if (!completedRef.current) {
        completedRef.current = true
        onComplete?.()
      }
    }

    const initialDelay = setTimeout(tick, 120)
    return () => {
      cancelled = true
      clearTimeout(initialDelay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text])

  const isTyping = start && length < text.length
  const visibleText = text.slice(0, length)

  return (
    <div className="markdown-body">
      <ReactMarkdown>{visibleText}</ReactMarkdown>
      {isTyping && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-blink bg-accent-violet align-middle"
        />
      )}
    </div>
  )
}
