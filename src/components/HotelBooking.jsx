import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import './HotelBooking.css';

const roomTypes = [
    { label: 'Standard Room', price: 14999 },
    { label: 'Deluxe Room', price: 26999 },
    { label: 'Executive Suite', price: 43999 },
    { label: 'Presidential Suite', price: 79999 },
];

export default function HotelBooking() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        roomType: 'Standard Room',
        guests: '2',
        requests: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const selectedRoom = roomTypes.find(r => r.label === form.roomType);

    const { nights, total } = useMemo(() => {
        if (!form.checkIn || !form.checkOut) return { nights: 0, total: 0 };
        const d1 = new Date(form.checkIn);
        const d2 = new Date(form.checkOut);
        const diff = Math.max(0, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
        return { nights: diff, total: diff * (selectedRoom?.price || 0) };
    }, [form.checkIn, form.checkOut, form.roomType, selectedRoom?.price]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
        setForm({ name: '', email: '', phone: '', checkIn: '', checkOut: '', roomType: 'Standard Room', guests: '2', requests: '' });
    };

    return (
        <section className="section booking" id="booking" ref={ref}>
            <div className="container">
                <div className="booking__layout">
                    <motion.form
                        className="booking__form glass"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" name="name" className="form-input" placeholder="John Smith" value={form.name} onChange={handleChange} required />
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-input" placeholder="john@email.com" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="tel" name="phone" className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Check-In</label>
                                <input type="date" name="checkIn" className="form-input" value={form.checkIn} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Check-Out</label>
                                <input type="date" name="checkOut" className="form-input" value={form.checkOut} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Room Type</label>
                                <select name="roomType" className="form-select" value={form.roomType} onChange={handleChange}>
                                    {roomTypes.map(r => (
                                        <option key={r.label} value={r.label}>{r.label} — ₹{r.price.toLocaleString('en-IN')}/night</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Guests</label>
                                <select name="guests" className="form-select" value={form.guests} onChange={handleChange}>
                                    {[1, 2, 3, 4].map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Special Requests</label>
                            <textarea name="requests" className="form-textarea" placeholder="Early check-in, extra pillows, airport transfer..." value={form.requests} onChange={handleChange} />
                        </div>

                        <motion.button type="submit" className="btn btn-primary booking__submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            Confirm Booking
                        </motion.button>
                    </motion.form>

                    <motion.div
                        className="booking__summary"
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <p className="section-label">Room Booking</p>
                        <h2 className="section-title">Book Your<br />Luxury Stay</h2>
                        <div className="gold-line" />
                        <p className="section-subtitle">
                            From serene standard rooms to our opulent Presidential Suite —
                            every stay is tailored to perfection.
                        </p>

                        {/* Price Calculator */}
                        <div className="booking__calculator glass">
                            <h4 className="booking__calc-title">Booking Summary</h4>
                            <div className="booking__calc-row">
                                <span>Room</span>
                                <span>{selectedRoom?.label}</span>
                            </div>
                            <div className="booking__calc-row">
                                <span>Rate</span>
                                <span>₹{selectedRoom?.price.toLocaleString('en-IN')} / night</span>
                            </div>
                            <div className="booking__calc-row">
                                <span>Duration</span>
                                <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                            </div>
                            <div className="booking__calc-divider" />
                            <div className="booking__calc-row booking__calc-total">
                                <span>Total</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </motion.div>
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
                            <h3>Booking Confirmed!</h3>
                            <p>Your room has been booked. A confirmation will arrive in your inbox shortly.</p>
                            <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>
                                Excellent
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
