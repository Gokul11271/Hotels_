import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
    const [phase, setPhase] = useState('logo'); // logo → text → exit

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('text'), 600);
        const t2 = setTimeout(() => setPhase('exit'), 1800);
        const t3 = setTimeout(() => onComplete(), 2400);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                className="splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                animate={phase === 'exit' ? { y: '-100%', opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="splash__inner">
                    <motion.div
                        className="splash__logo-ring"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <motion.img
                            src="/logo.svg"
                            alt="ECOG Elite Inn logo"
                            className="splash__logo-img"
                        />
                    </motion.div>

                    <motion.h1
                        className="splash__title"
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={phase === 'text' || phase === 'exit'
                            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                            : { opacity: 0, y: 20, filter: 'blur(10px)' }
                        }
                        transition={{ duration: 0.5 }}
                    >
                        ECOG Elite Inn
                    </motion.h1>

                    <motion.p
                        className="splash__tagline"
                        initial={{ opacity: 0 }}
                        animate={phase === 'text' || phase === 'exit'
                            ? { opacity: 1 }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 0.4, delay: 0.15 }}
                    >
                        A Tradition of Luxury & Grandeur
                    </motion.p>
                </div>

                <div className="splash__glow" />
            </motion.div>
        </AnimatePresence>
    );
}
