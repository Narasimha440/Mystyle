import { Sparkles, Github } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
            <Sparkles className="text-white" size={18} aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink-100">
              MyStyle Writer
            </span>
            <span className="hidden rounded-full border border-base-border bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] font-medium text-accent-violet sm:inline-block">
              LoRA Style Comparison
            </span>
          </div>
        </div>

        <a
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-base-border text-ink-500 transition-colors hover:border-white/20 hover:text-ink-100"
          aria-label="View source on GitHub"
        >
          <Github size={17} aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}
