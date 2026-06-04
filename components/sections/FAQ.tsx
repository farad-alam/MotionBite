'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { faqItems } from '@/data/faq'

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-t border-light-border/60">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 flex items-center justify-between gap-6 group"
        aria-expanded={isOpen}
      >
        <span className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-purple-primary' : 'text-dark-base group-hover:text-purple-primary/70'}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-purple-primary text-3xl font-light shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12">
              <p className="font-body text-text-charcoal/70 text-lg leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-[#FAFAFA] py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-primary" />
            <span className="text-text-charcoal uppercase tracking-widest text-sm font-semibold font-body">FAQ</span>
          </div>
          <h2 className="font-heading font-black text-5xl md:text-6xl text-dark-base mb-6">
            Frequently asked <span className="font-serif italic text-purple-primary">questions.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-b border-light-border/60 mb-12"
        >
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-text-charcoal/70 text-base font-body"
        >
          Can't find what you're looking for?{' '}
          <Link href="/contact" className="text-purple-primary hover:text-dark-base font-semibold transition-colors duration-200">
            Reach out to us →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
