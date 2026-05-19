'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useExitIntent } from '@/hooks/useExitIntent'

export default function ExitIntentModal() {
  const { triggered, dismiss } = useExitIntent(4000)

  return (
    <AnimatePresence>
      {triggered && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-dark-card rounded-2xl p-8 glow-border shadow-2xl"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-xl transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-2xl mx-auto mb-5">
                🎯
              </div>
              <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">
                Wait — before you go
              </h3>
              <p className="font-body text-text-muted text-sm leading-relaxed mb-6">
                Get a free 30-minute website audit. We&apos;ll tell you exactly what&apos;s costing you customers online — no pitch, no strings.
              </p>

              <Link
                href="/free-audit"
                onClick={dismiss}
                className="block w-full text-center bg-green-primary hover:bg-green-deep text-dark-base font-heading font-bold py-3.5 rounded-md transition-colors duration-200 mb-3"
              >
                Get My Free Audit →
              </Link>
              <button onClick={dismiss} className="font-body text-text-muted text-xs hover:text-text-primary transition-colors">
                No thanks, I&apos;ll pass
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
