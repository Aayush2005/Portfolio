'use client';

import { motion } from 'framer-motion';

export default function SectionContact() {
  // Contact is at the bottom so it's always in the deep blue section
  const textColor = 'text-white';
  const subtextColor = 'text-white/90';
  const cardBg = 'bg-white/10 border-white/20';

  return (
    <section id="contact" className="relative w-full py-32 min-h-screen flex items-center justify-center">
      {/* Smooth gradient transition from About section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-deepTeal/8 to-deepTeal/15 pointer-events-none z-20"></div>

      {/* Deep ocean background - no blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-deepTeal/15 via-deepTeal/25 to-deepTeal/35"></div>

      {/* Ocean floor elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deepTeal/40 to-transparent"></div>

      {/* Deep sea fish and elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Larger fish swimming deeper */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`deep-fish-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${40 + i * 15}%`,
            }}
            animate={{
              x: [0, 120, 0],
              y: [0, -20, 15, 0],
              rotate: [0, 8, -5, 0],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
          >
            <div className="relative">
              <div className={`w-8 h-4 bg-gradient-to-r from-deepTeal/40 to-gold/30 rounded-full transform ${i % 2 === 0 ? 'scale-x-[-1]' : ''}`}></div>
              <div className={`absolute ${i % 2 === 0 ? '-left-3' : '-right-3'} top-0.5 w-4 h-4 bg-deepTeal/25 rounded-full transform rotate-45`}></div>
              <div className={`absolute ${i % 2 === 0 ? 'right-1.5' : 'left-1.5'} top-1 w-1.5 h-1.5 bg-charcoal/50 rounded-full`}></div>
            </div>
          </motion.div>
        ))}

        {/* Seaweed-like elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`seaweed-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${10 + i * 15}%`,
            }}
            animate={{
              rotate: [-5, 5, -5],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div className={`w-2 bg-gradient-to-t from-deepTeal/30 to-deepTeal/10 rounded-t-full origin-bottom`} style={{ height: `${60 + i * 20}px` }}></div>
          </motion.div>
        ))}

        {/* Deep bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`deep-bubble-${i}`}
            className="absolute w-3 h-3 bg-deepTeal/15 rounded-full"
            style={{
              left: `${5 + i * 6}%`,
              top: `${70 + (i % 4) * 8}%`,
            }}
            animate={{
              y: [-30, -150],
              opacity: [0.2, 0.5, 0],
              scale: [0.3, 1.2, 0.2],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 md:px-16 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ margin: '30px' }}
        >
          <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl ${textColor} mb-8 leading-tight`}>
            Let&apos;s Create Together
          </h2>

          <p className={`${subtextColor} text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mx-auto mb-16 p-6`}>
            Interested in collaborating? I&apos;d love to hear about your ideas and explore how we can bring them to life.
          </p>

          {/* Button row */}
          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
            style={{ marginBottom: '2rem' }}
          >
            <motion.a
              href="mailto:hello@aryenvale.dev"
              className="group relative bg-burntOrange text-cream font-medium text-lg rounded-2xl hover:bg-tangerine transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden flex items-center justify-center"
              style={{ padding: '12px 28px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-tangerine to-gold transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-2xl"></div>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              className="group relative bg-white/20 border-2 border-white text-white font-medium text-lg rounded-2xl hover:bg-white hover:text-charcoal transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
              style={{ padding: '12px 28px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 bg-white text-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-2xl"></div>
            </motion.a>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`${cardBg} rounded-2xl p-6 border shadow-lg`}
            >
              <h3 className={`font-display text-xl ${textColor} mb-3`}>Email</h3>
              <p className={subtextColor}>harshithaaa@animal.dev</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`${cardBg} rounded-2xl p-6 border shadow-lg`}
            >
              <h3 className={`font-display text-xl ${textColor} mb-3`}>Location</h3>
              <p className={subtextColor}>Available exclusively in dev's DM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`${cardBg} rounded-2xl p-6 border shadow-lg`}
            >
              <h3 className={`font-display text-xl ${textColor} mb-3`}>Response Time</h3>
              <p className={subtextColor}>I won't reply to you bruhh</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
