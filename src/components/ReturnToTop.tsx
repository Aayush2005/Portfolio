'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ReturnToTop() {
    const [showReturnTop, setShowReturnTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowReturnTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {showReturnTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[9998] p-3 md:p-4 bg-gradient-to-r from-burntOrange to-tangerine text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-burntOrange/30 transition-all duration-300"
                    aria-label="Return to top"
                >
                    <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}