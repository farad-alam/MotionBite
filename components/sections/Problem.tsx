'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    icon: '🔴',
    title: 'No website — or one that looks like 2010',
    desc: 'First impressions happen online. An outdated or missing site costs you customers before they even call.',
  },
  {
    icon: '🔴',
    title: 'Customers search for you and find nothing',
    desc: "If Google can't find you, your competitors get the click. Every day without SEO is revenue left on the table.",
  },
  {
    icon: '🔴',
    title: 'Competitors with better sites are winning',
    desc: 'Customers choose based on what they see online. A polished site signals trust — and trust wins the sale.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Problem() {
  return (
    <section className="bg-light-bg section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-inverse leading-tight">
            Most Small Business Websites{' '}
            <span className="text-state-error">Don&apos;t Work.</span>
            <br />Here&apos;s Why.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white rounded-lg p-8 border-l-4 border-state-error shadow-sm"
            >
              <div className="text-2xl mb-4">{p.icon}</div>
              <h3 className="font-heading text-xl font-bold text-text-inverse mb-3">{p.title}</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center font-heading text-2xl md:text-3xl font-bold text-text-inverse mt-14"
        >
          That&apos;s exactly why{' '}
          <span className="text-green-primary">MotionBite</span> exists.
        </motion.p>
      </div>
    </section>
  )
}
