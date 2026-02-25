import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiWifi, HiStar, HiUsers, HiViewGrid } from 'react-icons/hi';
import { MdPool, MdSpa, MdLocalBar, MdRoomService } from 'react-icons/md';
import './RoomShowcase.css';

const rooms = [
    {
        id: 1,
        type: 'Standard Room',
        price: 14999,
        capacity: '2 Guests',
        size: '32 m²',
        bed: 'Queen Bed',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
        amenities: ['Wi-Fi', 'Room Service', 'Smart TV'],
        description: 'Elegant comfort with city views and premium amenities.',
    },
    {
        id: 2,
        type: 'Deluxe Room',
        price: 26999,
        capacity: '2 Guests',
        size: '45 m²',
        bed: 'King Bed',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop',
        amenities: ['Wi-Fi', 'Mini Bar', 'Room Service', 'Balcony'],
        description: 'Spacious luxury with a private balcony and mini bar.',
    },
    {
        id: 3,
        type: 'Executive Suite',
        price: 43999,
        capacity: '3 Guests',
        size: '68 m²',
        bed: 'King Bed + Sofa',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d955e4a67?w=600&h=400&fit=crop',
        amenities: ['Wi-Fi', 'Pool Access', 'Spa', 'Lounge', 'Room Service'],
        description: 'Executive living with separate lounge and pool access.',
    },
    {
        id: 4,
        type: 'Presidential Suite',
        price: 79999,
        capacity: '4 Guests',
        size: '120 m²',
        bed: 'King Bed + Twin',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
        amenities: ['Wi-Fi', 'Pool', 'Spa', 'Bar', 'Butler', 'Dining Room'],
        description: 'The pinnacle of luxury — panoramic views, butler service, and private dining.',
    },
];

const amenityIcons = {
    'Wi-Fi': <HiWifi />,
    'Room Service': <MdRoomService />,
    'Pool Access': <MdPool />,
    'Pool': <MdPool />,
    'Spa': <MdSpa />,
    'Mini Bar': <MdLocalBar />,
    'Bar': <MdLocalBar />,
    'Lounge': <HiViewGrid />,
    'Butler': <HiStar />,
    'Balcony': <HiViewGrid />,
    'Smart TV': <HiViewGrid />,
    'Dining Room': <MdRoomService />,
};

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

export default function RoomShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToBooking = () => {
        const el = document.getElementById('booking');
        if (el && window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
        }
    };

    return (
        <section className="section rooms" id="rooms" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label">Luxury Accommodations</p>
                    <h2 className="section-title">Exquisite Rooms & Suites</h2>
                    <div className="gold-line" />
                    <p className="section-subtitle">
                        From refined comfort to unparalleled luxury, each room is
                        designed to be your personal sanctuary.
                    </p>
                </motion.div>

                <div className="rooms__grid">
                    {rooms.map((room, i) => (
                        <motion.div
                            key={room.id}
                            className="room-card card"
                            custom={i}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        >
                            <div className="room-card__image-wrapper">
                                <img src={room.image} alt={room.type} className="room-card__image" loading="lazy" />
                                <div className="room-card__badge">
                                    <span className="room-card__price">₹{room.price.toLocaleString('en-IN')}</span>
                                    <span className="room-card__per-night">/ night</span>
                                </div>
                            </div>
                            <div className="room-card__content">
                                <h3 className="room-card__type">{room.type}</h3>
                                <p className="room-card__desc">{room.description}</p>
                                <div className="room-card__details">
                                    <span>{room.bed}</span>
                                    <span>•</span>
                                    <span>{room.size}</span>
                                    <span>•</span>
                                    <span>{room.capacity}</span>
                                </div>
                                <div className="room-card__amenities">
                                    {room.amenities.slice(0, 4).map(a => (
                                        <span key={a} className="room-card__amenity" title={a}>
                                            {amenityIcons[a] || <HiStar />}
                                        </span>
                                    ))}
                                    {room.amenities.length > 4 && (
                                        <span className="room-card__amenity room-card__amenity--more">
                                            +{room.amenities.length - 4}
                                        </span>
                                    )}
                                </div>
                                <button className="btn btn-outline room-card__btn" onClick={scrollToBooking}>
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
