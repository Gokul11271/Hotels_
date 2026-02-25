import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Destinations', target: 'restaurants' },
    { label: 'Rooms & Suites', target: 'rooms' },
    { label: 'Experiences', target: 'offers' },
    { label: 'Testimonials', target: 'testimonials' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setScrolled(current > 80);
            setHidden(current > lastScroll && current > 300);
            setLastScroll(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    const scrollTo = (id) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el && window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
        }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="scroll-progress"
                style={{ scaleX, transformOrigin: '0%' }}
            />

            <motion.nav
                className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="navbar__inner container">
                    <button className="navbar__logo" onClick={() => scrollTo('hero')}>
                        <img src="/logo.svg" alt="ECOG Elite Inn" className="navbar__logo-img" />
                        <span className="navbar__logo-text">ECOG Elite Inn</span>
                    </button>

                    <ul className="navbar__links">
                        {navLinks.map(link => (
                            <li key={link.target}>
                                <button className="navbar__link" onClick={() => scrollTo(link.target)}>
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar__actions">
                        <button className="btn btn-primary btn--sm" onClick={() => scrollTo('booking')}>
                            Book Now
                        </button>
                        <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            className="navbar__mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navLinks.map(link => (
                                <button key={link.target} className="navbar__mobile-link" onClick={() => scrollTo(link.target)}>
                                    {link.label}
                                </button>
                            ))}
                            <button className="btn btn-primary" onClick={() => scrollTo('booking')} style={{ width: '100%' }}>
                                Book Now
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
