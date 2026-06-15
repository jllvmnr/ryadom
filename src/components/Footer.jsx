import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-brand-section">
                    <Link to="/" className="footer-logo">
                        рядом.kg
                    </Link>
                    <p>
                        Миссия: Соединять тех, кто нуждается в помощи, с теми, кто готов ее оказать.
                    </p>
                    <p>© {new Date().getFullYear()} рядом.kg. Все права защищены.</p>
                </div>

                <div>
                    <h4 className="footer-section-title">Навигация</h4>
                    <Link to="/" className="footer-link">Главная</Link>
                    <Link to="/requests" className="footer-link">Найти Помощь</Link>
                    <Link to="/create" className="footer-link">Оставить Запрос</Link>
                    <Link to="/about" className="footer-link">О нас</Link>
                </div>

                <div>
                    <h4 className="footer-section-title">Информация</h4>
                    <Link to="/faq" className="footer-link">Часто задаваемые вопросы (FAQ)</Link>
                    <Link to="/privacy" className="footer-link">Политика конфиденциальности</Link>
                    <Link to="/terms" className="footer-link">Условия использования</Link>
                </div>

                <div className="footer-contacts-section">
                    <h4 className="footer-section-title">Связь с нами</h4>
                    <p>
                        Email: <a href="mailto:support@ryadom.kg" className="footer-link">support@ryadom.kg</a>
                    </p>
                    <p>
                        Телефон: <a href="tel:+996997909073" className="footer-link">+996 997 909 073</a>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;