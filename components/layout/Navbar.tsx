'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/services',  label: 'Services'  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing',   label: 'Pricing'   },
  { href: '/about',     label: 'About'     },
  { href: '/blog',      label: 'Blog'      },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)   // hero has been scrolled past
  const [visible, setVisible]     = useState(true)    // whether the navbar is shown
  const [menuOpen, setMenuOpen]   = useState(false)
  const lastScrollY               = useRef(0)
  const heroHeight                = useRef(0)

  useEffect(() => {
    // Measure the hero section height once on mount
    const hero = document.getElementById('hero-section')
    if (hero) heroHeight.current = hero.offsetHeight

    const handler = () => {
      const y = window.scrollY
      const pastHero = y > (heroHeight.current || window.innerHeight * 0.8)

      setScrolled(pastHero)

      if (!pastHero) {
        // Still inside the hero — always show the navbar
        setVisible(true)
      } else {
        // Past the hero: hide when scrolling down, show when scrolling up
        if (y > lastScrollY.current + 5) {
          setVisible(false)   // scrolling down → slide up and hide
        } else if (y < lastScrollY.current - 5) {
          setVisible(true)    // scrolling up → slide back down
        }
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* ── FLOATING PILL NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -80 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`
            w-full max-w-4xl flex items-center justify-between
            px-4 py-2.5
            rounded-full border transition-all duration-300
            ${scrolled
              ? 'bg-[#0f0f12]/85 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl'
              : 'bg-[#0f0f12]/70 border-transparent backdrop-blur-lg'
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-purple-primary flex items-center justify-center" style={{ boxShadow: 'rgba(255,255,255,0.3) 0px 1px 2px inset' }}>
              <span className="font-heading font-bold text-white text-xs">MB</span>
            </div>
            <span className="font-heading text-base font-semibold text-text-primary tracking-wide">
              Motion<span className="text-purple-primary">Bite</span>
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-muted hover:text-text-primary text-sm font-body px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-white/8"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/free-consultation"
              className="text-text-primary font-body font-semibold text-sm px-4 py-2 rounded-xl border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              Get a Free Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </motion.div>
      </header>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-dark-base/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-text-muted hover:text-text-primary text-2xl transition-colors"
              aria-label="Close menu"
            >
              ×
            </button>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-3xl text-text-primary hover:text-purple-primary transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/free-consultation"
              onClick={() => setMenuOpen(false)}
              className="text-white font-body font-bold text-base px-8 py-3.5 rounded-xl mt-4 transition-all duration-200"
              style={{ backgroundColor: '#712EFF', boxShadow: 'rgba(255,255,255,0.72) 0px 2px 3px 0px inset' }}
            >
              Get a Free Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM STICKY CTA ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-30 md:hidden bg-dark-base/95 backdrop-blur-md border-t border-dark-border px-4 py-3 transition-transform duration-200 ${menuOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        <Link
          href="/free-consultation"
          className="block w-full text-center text-white font-body font-semibold text-sm py-3 rounded-xl transition-all duration-200"
          style={{ backgroundColor: '#712EFF', boxShadow: 'rgba(255,255,255,0.72) 0px 2px 3px 0px inset' }}
        >
          Get a Free Demo →
        </Link>
      </div>
    </>
  )
}
