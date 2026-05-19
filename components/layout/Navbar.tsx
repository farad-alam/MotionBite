'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-base/95 backdrop-blur-md border-b border-dark-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-md bg-green-primary flex items-center justify-center">
                <span className="font-heading font-bold text-dark-base text-sm">MB</span>
              </div>
              <span className="font-heading text-lg font-semibold text-text-primary tracking-wide">
                Motion<span className="text-green-primary">Bite</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-text-muted hover:text-text-primary text-sm font-body transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <Link
                href="/free-audit"
                className="bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold text-sm px-5 py-2.5 rounded-md transition-colors duration-200"
              >
                Get Free Audit
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-dark-base flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-3xl text-text-primary hover:text-green-primary transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/free-audit"
              onClick={() => setMenuOpen(false)}
              className="bg-green-primary text-dark-base font-heading font-semibold text-lg px-8 py-3 rounded-md mt-4"
            >
              Get Free Audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky bottom CTA bar — hidden when menu is open */}
      <div className={`fixed bottom-0 left-0 right-0 z-30 md:hidden bg-dark-base/95 backdrop-blur-md border-t border-dark-border px-4 py-3 transition-transform duration-200 ${menuOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        <Link
          href="/free-audit"
          className="block w-full text-center bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold text-sm py-3 rounded-md transition-colors duration-200"
        >
          Get Free Audit →
        </Link>
      </div>
    </>
  )
}
