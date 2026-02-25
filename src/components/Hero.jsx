import { motion } from 'framer-motion';
import { HiOutlineArrowDown } from 'react-icons/hi';
import './Hero.css';

export default function Hero() {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el && window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
        }
    };

    return (
        <section className="hero" id="hero">
            {/* Full-screen background image */}
            <div className="hero__bg">
                <img
                    src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=1080&fit=crop&q=85"
                    alt="Luxury hotel exterior"
                    className="hero__bg-image"
                />
            </div>

            {/* Warm overlay */}
            <div className="hero__overlay" />

            {/* Subtle gold particles */}
            <div className="hero__particles">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        className="hero__particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            <div className="hero__content container">
                <motion.div
                    className="hero__text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.p
                        className="hero__label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Experience the Art of Indian Hospitality
                    </motion.p>

                    <motion.h1 className="hero__title">
                        <motion.span
                            className="hero__title-line"
                            initial={{ opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            Where Heritage
                        </motion.span>
                        <br />
                        <motion.span
                            className="hero__title-line"
                            initial={{ opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            Meets <span className="hero__accent">Luxury</span>
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                    >
                        Discover iconic palaces, world-class dining, and legendary
                        hospitality across the most breathtaking destinations.
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.1 }}
                    >
                        <button className="btn btn-primary btn--hero" onClick={() => scrollTo('restaurants')}>
                            Explore Destinations
                        </button>
                        <button className="btn btn-outline btn--hero" onClick={() => scrollTo('booking')}>
                            Book Your Stay
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Booking Bar */}
            <motion.div
                className="hero__booking-bar"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
            >
                <div className="hero__booking-inner container">
                    <div className="hero__booking-field">
                        <span className="hero__booking-label">Destination</span>
                        <span className="hero__booking-value">Select City</span>
                    </div>
                    <div className="hero__booking-divider" />
                    <div className="hero__booking-field">
                        <span className="hero__booking-label">Check In</span>
                        <span className="hero__booking-value">Select Date</span>
                    </div>
                    <div className="hero__booking-divider" />
                    <div className="hero__booking-field">
                        <span className="hero__booking-label">Check Out</span>
                        <span className="hero__booking-value">Select Date</span>
                    </div>
                    <div className="hero__booking-divider" />
                    <div className="hero__booking-field">
                        <span className="hero__booking-label">Guests</span>
                        <span className="hero__booking-value">2 Adults</span>
                    </div>
                    <button className="btn btn-primary hero__booking-btn" onClick={() => scrollTo('booking')}>
                        Check Availability
                    </button>
                </div>
            </motion.div>

            <motion.button
                className="hero__scroll-indicator"
                onClick={() => scrollTo('restaurants')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{
                    opacity: { duration: 0.5, delay: 1.5 },
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
                <span>Scroll</span>
                <HiOutlineArrowDown />
            </motion.button>
        </section>
    );
}
