import Link from 'next/link'

const navigationLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

const legalLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: 'mailto:hello@motionbite.com', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://www.instagram.com/motionbite', label: 'Instagram', icon: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ) },
  { href: 'https://twitter.com/motionbite', label: 'X (Twitter)', icon: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ) },
  { href: 'https://www.linkedin.com/company/motionbite', label: 'LinkedIn', icon: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ) },
  { href: 'https://youtube.com/@motionbite', label: 'YouTube', icon: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136C3.93 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ) },
]

export default function Footer() {
  return (
    <footer className="bg-dark-base pt-16 md:pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-t border-dark-border overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 lg:gap-6 mb-16 lg:mb-24">
          
          {/* Box 1: MotionBite Info */}
          <div className="xl:col-span-5 bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[320px] transition-colors duration-500 hover:border-purple-primary/30">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-primary flex items-center justify-center shadow-[0_0_20px_rgba(125,64,255,0.3)]">
                  <span className="font-heading font-bold text-dark-base text-xl">MB</span>
                </div>
                <span className="font-heading text-3xl font-bold text-text-primary">
                  Motion<span className="text-purple-primary">Bite</span>
                </span>
              </Link>
            </div>
            <p className="text-text-muted text-base font-body leading-relaxed max-w-sm mt-auto">
              We build fast, professional websites for small businesses. Delivered in 14 days, built to convert.
            </p>
          </div>

          {/* Box 2: Navigation */}
          <div className="xl:col-span-3 bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[320px] transition-colors duration-500 hover:border-purple-primary/30">
            <h4 className="font-heading text-text-primary text-sm font-bold uppercase tracking-widest mb-12">Navigation</h4>
            <ul className="space-y-4 mt-auto">
              {navigationLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-muted hover:text-purple-primary text-lg font-heading font-semibold transition-colors duration-200 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Info/Legal */}
          <div className="xl:col-span-3 bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[320px] transition-colors duration-500 hover:border-purple-primary/30">
            <h4 className="font-heading text-text-primary text-sm font-bold uppercase tracking-widest mb-12">Information</h4>
            <ul className="space-y-4 mt-auto">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-muted hover:text-purple-primary text-lg font-heading font-semibold transition-colors duration-200 block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 4: Socials Grid */}
          <div className="xl:col-span-1 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 xl:grid-rows-4 gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-card border border-dark-border rounded-2xl md:rounded-3xl xl:rounded-2xl flex items-center justify-center p-6 hover:border-purple-primary hover:text-purple-primary text-text-muted transition-all duration-300 min-h-[80px]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Giant Typography */}
        <div className="w-full relative mb-12 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide py-4 px-4 sm:px-0">
          <div className="flex items-center w-max min-w-full justify-center mx-auto">
            <span className="font-heading font-black text-[15vw] xl:text-[220px] leading-none text-text-primary tracking-tighter uppercase mr-[0.5vw]">
              M
            </span>
            
            {/* First "O" Container */}
            <div className="relative w-[10vw] h-[12.5vw] max-w-[150px] max-h-[185px] rounded-[3vw] xl:rounded-[36px] overflow-hidden bg-dark-card mx-[0.5vw] shrink-0 self-center">
               <img
                 src="/images/portfolio/founder-1.png"
                 alt="Founder 1"
                 className="absolute inset-0 w-full h-full object-cover object-top saturate-150"
               />
               <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] pointer-events-none rounded-[3vw] xl:rounded-[36px]" />
               <div className="absolute inset-0 border border-purple-primary/30 rounded-[3vw] xl:rounded-[36px] pointer-events-none" />
            </div>

            <span className="font-heading font-black text-[15vw] xl:text-[220px] leading-none text-text-primary tracking-tighter uppercase mx-[0.5vw]">
              TI
            </span>

            {/* Second "O" Container */}
            <div className="relative w-[10vw] h-[12.5vw] max-w-[150px] max-h-[185px] rounded-[3vw] xl:rounded-[36px] overflow-hidden bg-dark-card mx-[0.5vw] shrink-0 self-center">
               <img
                 src="/images/portfolio/founder-2.png"
                 alt="Founder 2"
                 className="absolute inset-0 w-full h-full object-cover object-top saturate-150"
               />
               <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] pointer-events-none rounded-[3vw] xl:rounded-[36px]" />
               <div className="absolute inset-0 border border-purple-primary/30 rounded-[3vw] xl:rounded-[36px] pointer-events-none" />
            </div>

            <span className="font-heading font-black text-[15vw] xl:text-[220px] leading-none text-text-primary tracking-tighter uppercase ml-[0.5vw]">
              NBITE
            </span>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-text-muted mt-8 border-t border-dark-border/50 pt-8">
          <p>Website by MotionBite</p>
          <p>© {new Date().getFullYear()} MotionBite. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  )
}
