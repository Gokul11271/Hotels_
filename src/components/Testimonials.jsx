import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: 'Isabelle Moreau',
        country: 'France',
        avatar: 'IM',
        rating: 5,
        text: 'An absolutely transcendent dining experience. The attention to detail, from the amuse-bouche to the final petit four, was impeccable. The suite we stayed in felt like a private château.',
    },
    {
        id: 2,
        name: 'Takeshi Yamamoto',
        country: 'Japan',
        avatar: 'TY',
        rating: 5,
        text: 'The omakase dinner was a journey through flavors I never thought possible. Our Deluxe Room was the perfect retreat after an evening of culinary excellence. Will return without hesitation.',
    },
    {
        id: 3,
        name: 'Aarav Patel',
        country: 'India',
        avatar: 'AP',
        rating: 5,
        text: 'From the moment we arrived, every interaction felt genuine and warm. The Presidential Suite exceeded all expectations — the panoramic views at sunset were breathtaking.',
    },
    {
        id: 4,
        name: 'Sofia Rodriguez',
        country: 'Mexico',
        avatar: 'SR',
        rating: 4,
        text: 'We celebrated our anniversary here and it was magical. The contemporary Mexican restaurant brought tears to my eyes. The spa and pool made our stay unforgettable.',
    },
    {
        id: 5,
        name: 'James & Emily Carter',
        country: 'United States',
        avatar: 'JC',
        rating: 5,
        text: 'We\'ve stayed at five-star hotels around the world, and Luxe Haven stands apart. The seamless booking, exquisite rooms, and world-class dining — all in one place. Perfection.',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const t = testimonials[current];

    return (
        <section className="section testimonials" id="testimonials" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label">Guest Stories</p>
                    <h2 className="section-title">What Our Guests Say</h2>
                    <div className="gold-line" />
                </motion.div>

                <motion.div
                    className="testimonials__carousel"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={t.id}
                            className="testimonial glass"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="testimonial__stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <HiStar key={i} className={i < t.rating ? 'star--filled' : 'star--empty'} />
                                ))}
                            </div>
                            <blockquote className="testimonial__text">
                                "{t.text}"
                            </blockquote>
                            <div className="testimonial__author">
                                <div className="testimonial__avatar">{t.avatar}</div>
                                <div>
                                    <p className="testimonial__name">{t.name}</p>
                                    <p className="testimonial__country">{t.country}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="testimonials__dots">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
