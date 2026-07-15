import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'
import ResponseCard from './ResponseCard.jsx'

const ComparisonGrid = forwardRef(function ComparisonGrid(
  { isLoading, result, startTyping, responseTimes, onTypingComplete },
  ref
) {
  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 pb-24 pt-4">
      <div className="relative">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10">
          <ResponseCard
            variant="base"
            text={result?.base ?? ''}
            isLoading={isLoading}
            startTyping={startTyping}
            onTypingComplete={() => onTypingComplete?.('base')}
            responseTime={responseTimes?.base}
            index={0}
          />
          <ResponseCard
            variant="lora"
            text={result?.lora ?? ''}
            isLoading={isLoading}
            startTyping={startTyping}
            onTypingComplete={() => onTypingComplete?.('lora')}
            responseTime={responseTimes?.lora}
            index={1}
          />
        </div>

        {/* Signature element: a "style transfer" seam connecting the two
            outputs, visualizing the base -> LoRA transformation directly. */}
        <div
          className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 md:block"
          aria-hidden="true"
        >
          <div className="h-full w-px bg-seam-gradient animate-pulse-seam" />
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass shadow-glow">
            <ArrowRight size={14} className="text-accent-violet" />
          </div>
        </div>
      </div>
    </section>
  )
})

export default ComparisonGrid
