import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MdRestaurantMenu, MdFavorite, MdLuggage } from 'react-icons/md';
import './SpecialOffers.css';

const offers = [
    {
        id: 1,
        icon: <MdRestaurantMenu />,
        title: "Chef's Table Experience",
        description: 'An exclusive evening with a Michelin-starred chef. A bespoke 12-course tasting menu crafted just for your table.',
        highlight: 'From ₹37,500 per person',
        gradient: 'linear-gradient(135deg, rgba(142,116,75,0.06), rgba(107,124,110,0.04))',
    },
    {
        id: 2,
        icon: <MdFavorite />,
        title: 'Honeymoon Package',
        description: 'Presidential Suite with rose petal turndown, couples spa treatment, and a private candlelit dinner on the terrace.',
        highlight: 'From ₹1,99,999 per couple',
        gradient: 'linear-gradient(135deg, rgba(142,116,75,0.04), rgba(193,145,145,0.06))',
    },
    {
        id: 3,
        icon: <MdLuggage />,
        title: 'Weekend Getaway',
        description: '2 nights in a Deluxe Room, daily breakfast, a curated city tour, and dinner at our featured Italian restaurant.',
        highlight: 'From ₹74,999 per person',
        gradient: 'linear-gradient(135deg, rgba(107,124,110,0.05), rgba(142,116,75,0.06))',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

export default function SpecialOffers() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section offers" id="offers" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label">Curated Experiences</p>
                    <h2 className="section-title">Exclusive Packages</h2>
                    <div className="gold-line" />
                    <p className="section-subtitle">
                        Beyond rooms and restaurants — immersive experiences
                        designed for life's most memorable moments.
                    </p>
                </motion.div>

                <div className="offers__grid">
                    {offers.map((offer, i) => (
                        <motion.div
                            key={offer.id}
                            className="offer-card"
                            custom={i}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            style={{ '--card-gradient': offer.gradient }}
                        >
                            <div className="offer-card__glow" />
                            <div className="offer-card__content">
                                <div className="offer-card__icon">{offer.icon}</div>
                                <h3 className="offer-card__title">{offer.title}</h3>
                                <p className="offer-card__desc">{offer.description}</p>
                                <div className="offer-card__highlight">{offer.highlight}</div>
                                <button className="btn btn-outline offer-card__btn">Learn More</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
