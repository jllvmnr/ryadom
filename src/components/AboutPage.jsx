import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/AboutPage.css';

const AboutPage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            pageRef.current?.classList.add('is-loaded');
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="about-page-container" ref={pageRef}>
            <div className="about-bg-text">MISSION</div>

            <div className="about-content">
                <header className="about-header">
                    <span className="about-meta">PROJECT / 2026</span>
                    <h1 className="about-title">О ПРОЕКТЕ <br/> <span className="outline-text">РЯДОМ.KG</span></h1>
                </header>

                <section className="about-section">
                    <div className="section-grid">
                        <div className="section-title-box">
                            <h2>01 / Миссия</h2>
                        </div>
                        <div className="section-text-box">
                            <p className="lead-text">
                                Мы верим, что сильное сообщество строится на взаимопомощи. 
                                Рядом.kg — это цифровой мост между бескорыстием и нуждой.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <div className="section-grid">
                        <div className="section-title-box">
                            <h2>02 / Зачем мы здесь</h2>
                        </div>
                        <div className="section-text-box">
                            <p>
                                Часто нуждающиеся люди не знают, к кому обратиться, а волонтеры не знают, где их помощь критически важна. 
                                Мы создали централизованную систему для Кыргызстана, где каждый запрос находит своего героя.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-section values-section">
                    <h2>03 / Ценности</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Взаимоуважение</h3>
                            <p>Основа любого взаимодействия — это уважение к времени и нуждам друг друга.</p>
                        </div>
                        <div className="value-card">
                            <h3>Прозрачность</h3>
                            <p>Мы стремимся к открытости процесса: от подачи заявки до её финального выполнения.</p>
                        </div>
                        <div className="value-card">
                            <h3>Ответственность</h3>
                            <p>Волонтеры обязуются выполнять задачи добросовестно и точно в срок.</p>
                        </div>
                    </div>
                </section>

                <footer className="about-cta">
                    <Link to="/requests" className="cta-link">
                        ПЕРЕЙТИ К ЗАПРОСАМ <span className="arrow">↗</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default AboutPage;