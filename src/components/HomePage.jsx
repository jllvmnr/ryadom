import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css';

const HomePage = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            mainRef.current?.classList.add('is-loaded');
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="homePage" ref={mainRef}>
            <div className="portal-layout">
                <div className="bg-text-vector">HELP / CARE</div>

                <div className="hero-section">
                    <div className="main-image-frame">
                        {/* <img src="." alt="City" /> */}
                    </div>

                    <div className="content-frame">
                        <div className="meta-tag">Volunteer Portal 2026</div>
                        <h1 className="giant-title">
                            ДОБРО <br />
                            <span className="outline-text">ВНУТРИ</span> <br />
                            ГОРОДА
                        </h1>
                        <p className="description-text">
                            Мы создаем мост между вашим желанием помочь и теми, кто в этом нуждается.
                            Без лишних слов. Просто действие.
                        </p>
                    </div>
                </div>

                <nav className="side-navigation">
                    <Link to="/create" className="nav-panel">
                        <span className="panel-number">01</span>
                        <span className="panel-label">Мне нужна помощь</span>
                        <span className="panel-arrow"></span>
                    </Link>
                    <Link to="/requests" className="nav-panel">
                        <span className="panel-number">02</span>
                        <span className="panel-label">Я хочу помочь</span>
                        <span className="panel-arrow"></span>
                    </Link>
                </nav>

                <div className="internal-portal-bottom">
                    <span>Scroll to footer</span>
                    <div className="social-links">IG / TG / FB</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;