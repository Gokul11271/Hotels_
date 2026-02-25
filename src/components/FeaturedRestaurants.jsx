import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiStar, HiLocationMarker } from 'react-icons/hi';
import './FeaturedRestaurants.css';

const restaurants = [
    {
        id: 1,
        name: 'Saffron Heritage',
        location: 'Tokyo, Japan',
        cuisine: 'Japanese',
        cuisineLabel: 'Zen Omakase',
        rating: 4.9,
        signature: 'Heirloom 24-course Omakase',
        price: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&h=1000&fit=crop',
    },
    {
        id: 2,
        name: 'The Gilded Oak',
        location: 'Modena, Italy',
        cuisine: 'Italian',
        cuisineLabel: 'Tuscan Legacy',
        rating: 4.8,
        signature: 'White Truffle Risotto',
        price: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=1000&fit=crop',
    },
    {
        id: 3,
        name: 'Azure Coast',
        location: 'Paris, France',
        cuisine: 'French',
        cuisineLabel: 'Classical Haute',
        rating: 4.9,
        signature: 'Saffron-Poached Lobster',
        price: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&h=1000&fit=crop',
    },
    {
        id: 4,
        name: 'Spice Route',
        location: 'New Delhi, India',
        cuisine: 'Indian',
        cuisineLabel: 'Imperial Awadhi',
        rating: 4.9,
        signature: 'Gold-Leaf Galouti',
        price: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1585937421612-70a0f245224e?w=800&h=1000&fit=crop',
    },
    {
        id: 5,
        name: 'Ancestral Mesa',
        location: 'Mexico City, Mexico',
        cuisine: 'Mexican',
        cuisineLabel: 'Mayan Soul',
        rating: 4.8,
        signature: 'Heritage Cacao & Mole',
        price: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=1000&fit=crop',
    },
    {
        id: 6,
        name: 'Silk Road',
        location: 'New York, USA',
        cuisine: 'American',
        cuisineLabel: 'Artisanal Hearth',
        rating: 4.9,
        signature: 'Double-Aged Ribeye',
        price: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1000&fit=crop',
    },
];

const filters = ['All', 'Japanese', 'Italian', 'French', 'Indian', 'Mexican', 'American'];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: { duration: 0.25 },
    },
};

export default function FeaturedRestaurants() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? restaurants
        : restaurants.filter(r => r.cuisine === activeFilter);

    return (
        <section className="section restaurants" id="restaurants" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label">Culinary Journeys</p>
                    <h2 className="section-title">Signature Dining</h2>
                    <div className="gold-line" />
                    <p className="section-subtitle">
                        Handpicked from the finest culinary destinations around the world,
                        each offering an unforgettable dining experience.
                    </p>
                </motion.div>

                {/* Cuisine Filter Tabs */}
                <motion.div
                    className="restaurants__filters"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`restaurants__filter ${activeFilter === f ? 'restaurants__filter--active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </motion.div>

                <div className="restaurants__grid">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((r) => (
                            <motion.div
                                key={r.id}
                                className="restaurant-card card"
                                layout
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="restaurant-card__image-wrapper">
                                    <img src={r.image} alt={r.name} className="restaurant-card__image" loading="lazy" />
                                    <div className="restaurant-card__price">{r.price}</div>
                                </div>
                                <div className="restaurant-card__content">
                                    <div className="restaurant-card__cuisine">{r.cuisineLabel}</div>
                                    <h3 className="restaurant-card__name simple-shimmer">{r.name}</h3>
                                    <div className="restaurant-card__meta">
                                        <span className="restaurant-card__location">
                                            <HiLocationMarker /> {r.location}
                                        </span>
                                        <span className="restaurant-card__rating">
                                            <HiStar /> {r.rating}
                                        </span>
                                    </div>
                                    <p className="restaurant-card__signature">
                                        <em>Signature:</em> {r.signature}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
