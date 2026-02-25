import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiGlobe, HiHome, HiUserGroup, HiFlag } from 'react-icons/hi';
import './Stats.css';

const stats = [
    { icon: <HiGlobe />, value: 50, suffix: '+', label: 'Global Restaurants' },
    { icon: <HiHome />, value: 200, suffix: '+', label: 'Luxury Rooms' },
    { icon: <HiUserGroup />, value: 35, suffix: 'K+', label: 'Happy Guests' },
    { icon: <HiFlag />, value: 15, suffix: '+', label: 'Countries' },
];

function AnimatedCounter({ target, suffix, isInView }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span className="stat__number">
            {count}{suffix}
        </span>
    );
}

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="stats" ref={ref}>
            <div className="container">
                <div className="stats__grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="stat"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <div className="stat__icon">{stat.icon}</div>
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isInView} />
                            <span className="stat__label">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
