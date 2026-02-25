import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaTwitter, FaFacebookF, FaPinterestP } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <footer className="footer" id="footer" ref={ref}>
            <div className="container">
                <motion.div
                    className="footer__top"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <img src="/logo.svg" alt="ECOG Elite Inn" className="footer__logo-img" />
                            <span className="footer__logo-text">ECOG Elite Inn</span>
                        </div>
                        <p className="footer__tagline">
                            A tradition of luxury & grandeur. Experience world-class
                            hospitality across iconic destinations.
                        </p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" className="footer__social" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" className="footer__social" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" className="footer__social" aria-label="Pinterest"><FaPinterestP /></a>
                        </div>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__heading">Discover</h4>
                        <ul className="footer__links">
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#restaurants">Destinations</a></li>
                            <li><a href="#rooms">Rooms & Suites</a></li>
                            <li><a href="#reservation">Dining</a></li>
                            <li><a href="#booking">Book a Stay</a></li>
                        </ul>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__heading">Experiences</h4>
                        <ul className="footer__links">
                            <li><a href="#restaurants">Fine Dining</a></li>
                            <li><a href="#rooms">Luxury Spa</a></li>
                            <li><a href="#rooms">Pool & Wellness</a></li>
                            <li><a href="#testimonials">Guest Stories</a></li>
                            <li><a href="#offers">Special Offers</a></li>
                        </ul>
                    </div>

                    <div className="footer__contact">
                        <h4 className="footer__heading">Get In Touch</h4>
                        <div className="footer__contact-items">
                            <a href="mailto:hello@ecogeliteinn.com" className="footer__contact-item">
                                <HiMail /> hello@ecogeliteinn.com
                            </a>
                            <a href="tel:+918888888888" className="footer__contact-item">
                                <HiPhone /> +91 88888 88888
                            </a>
                            <span className="footer__contact-item">
                                <HiLocationMarker /> Race Course Road, Coimbatore
                            </span>
                        </div>

                        <div className="footer__newsletter">
                            <p className="footer__newsletter-label">Subscribe to our newsletter</p>
                            <div className="footer__newsletter-form">
                                <input type="email" placeholder="Your email" className="footer__newsletter-input" />
                                <button className="btn btn-primary footer__newsletter-btn">→</button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} ECOG Elite Inn. All rights reserved.</p>
                    <p className="footer__credit">Developed by <span className="footer__credit-name">ECOG CORE TECHNOLOGIES</span></p>
                    <div className="footer__legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
