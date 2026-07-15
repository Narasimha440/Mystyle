import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import PromptBox from '../components/PromptBox.jsx'
import ComparisonGrid from '../components/ComparisonGrid.jsx'
import { generate } from '../api/mockApi.js'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [startTyping, setStartTyping] = useState(false)
  const [responseTimes, setResponseTimes] = useState(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  const resultsRef = useRef(null)
  const typingDoneRef = useRef({ base: false, lora: false })

  async function handleGenerate(prompt) {
    setIsLoading(true)
    setStartTyping(false)
    setResult(null)
    setHasGenerated(true)
    typingDoneRef.current = { base: false, lora: false }

    // Auto-scroll to the results section as soon as the request starts,
    // so the loading skeletons are visible immediately.
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    const startedAt = performance.now()

    try {
      const data = await generate(prompt)
      const elapsedSeconds = (performance.now() - startedAt) / 1000

      setResult(data)
      setResponseTimes({
        base: `${elapsedSeconds.toFixed(1)}s`,
        lora: `${(elapsedSeconds + 0.4).toFixed(1)}s`,
      })
      setIsLoading(false)

      // Kick off the typing reveal on the next frame so cards have already
      // finished their "float up" entrance animation.
      requestAnimationFrame(() => setStartTyping(true))
    } catch (error) {
      setIsLoading(false)
      // In production this would surface a toast / inline error state.
      console.error('Generation failed:', error)
    }
  }

  function handleTypingComplete(variant) {
    typingDoneRef.current[variant] = true
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PromptBox onGenerate={handleGenerate} isLoading={isLoading} />

        <AnimatePresence>
          {hasGenerated && (
            <ComparisonGrid
              ref={resultsRef}
              isLoading={isLoading}
              result={result}
              startTyping={startTyping}
              responseTimes={responseTimes}
              onTypingComplete={handleTypingComplete}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
