import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiCalendar, HiClock, HiUserGroup, HiCheck } from 'react-icons/hi';
import './RestaurantReservation.css';

const cuisines = [
    'Any Cuisine',
    'Japanese Omakase',
    'Italian Fine Dining',
    'French Gastronomy',
    'Modern Indian',
    'Contemporary Mexican',
    'New American',
];

const timeSlots = [
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

export default function RestaurantReservation() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        date: '',
        time: '7:00 PM',
        guests: '2',
        cuisine: 'Any Cuisine',
        notes: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
        setForm({ name: '', email: '', date: '', time: '7:00 PM', guests: '2', cuisine: 'Any Cuisine', notes: '' });
    };

    return (
        <section className="section reservation" id="reservation" ref={ref}>
            <div className="container">
                <div className="reservation__layout">
                    <motion.div
                        className="reservation__info"
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="section-label">Table Reservation</p>
                        <h2 className="section-title">Reserve Your<br />Dining Experience</h2>
                        <div className="gold-line" />
                        <p className="section-subtitle">
                            Secure your table at any of our featured restaurants.
                            From intimate dinners to celebration feasts, we'll ensure
                            every moment is extraordinary.
                        </p>

                        <div className="reservation__features">
                            <div className="reservation__feature">
                                <span className="reservation__feature-icon"><HiCalendar /></span>
                                <div>
                                    <h4>Flexible Dates</h4>
                                    <p>Book up to 90 days in advance</p>
                                </div>
                            </div>
                            <div className="reservation__feature">
                                <span className="reservation__feature-icon"><HiClock /></span>
                                <div>
                                    <h4>Prime Time Slots</h4>
                                    <p>Evening slots from 6pm to 10pm</p>
                                </div>
                            </div>
                            <div className="reservation__feature">
                                <span className="reservation__feature-icon"><HiUserGroup /></span>
                                <div>
                                    <h4>Groups Welcome</h4>
                                    <p>Accommodating 1 to 20 guests</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        className="reservation__form glass"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="John Smith"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="john@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-input"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Time</label>
                                <select name="time" className="form-select" value={form.time} onChange={handleChange}>
                                    {timeSlots.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Guests</label>
                                <select name="guests" className="form-select" value={form.guests} onChange={handleChange}>
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Cuisine</label>
                                <select name="cuisine" className="form-select" value={form.cuisine} onChange={handleChange}>
                                    {cuisines.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Special Requests</label>
                            <textarea
                                name="notes"
                                className="form-textarea"
                                placeholder="Allergies, celebrations, seating preferences..."
                                value={form.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary reservation__submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Reserve Table
                        </motion.button>
                    </motion.form>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSuccess(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="success-icon"><HiCheck /></div>
                            <h3>Reservation Confirmed!</h3>
                            <p>Your table has been reserved. A confirmation email will be sent shortly.</p>
                            <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>
                                Wonderful
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
