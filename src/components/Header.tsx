'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [textWhite, setTextWhite] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'featured', 'about', 'techstack', 'contact'];
            const sectionElements = sections.map(id => document.getElementById(id === 'hero' ? 'hero' : id));

            let currentSection = 'hero';
            sectionElements.forEach((element, index) => {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = sections[index];
                    }
                }
            });

            setActiveSection(currentSection);
            setScrolled(window.scrollY > 50);

            // Use same logic as Featured section for text color change
            const scrollY = window.scrollY || 0;
            const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            const globalScrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
            setTextWhite(globalScrollProgress > 0.3);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { name: 'Work', href: '#featured', id: 'featured' },
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Tech', href: '#techstack', id: 'techstack' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    const scrollToSection = (href: string) => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled
                ? 'bg-white/10 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
            style={{
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
            }}
        >
            <nav className="mx-auto px-8 md:px-16 lg:px-24 py-6 md:py-8">
                <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16" style={{ padding: '10px' }}>
                    {navigationItems.map((item, index) => (
                        <motion.button
                            key={item.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection(item.href)}
                            className={`relative px-4 md:px-6 py-3 font-medium transition-all duration-300 text-base md:text-lg ${activeSection === item.id
                                ? textWhite
                                    ? 'text-white font-semibold'
                                    : 'text-black font-semibold'
                                : textWhite
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-black/70 hover:text-black'
                                }`}
                        >
                            {item.name}

                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-burntOrange to-gold rounded-full"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}

                    {/* Resume Button */}
                    <motion.a
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        href="/resume.pdf"
                        target="_blank"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-6 md:px-8 py-3 bg-gradient-to-r from-burntOrange to-tangerine font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-burntOrange/25 text-base md:text-lg"
                        style={{ color: textWhite ? 'white' : 'black' }}
                    >
                        <span className="relative z-10">Resume</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-tangerine to-gold transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                    </motion.a>
                </div>
            </nav>
        </motion.header>
    );
}