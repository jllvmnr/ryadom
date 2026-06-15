import React from 'react';
import { Link } from 'react-router-dom';

const footerStyle = {
    backgroundColor: '#0f0f0f', 
    color: '#ccc',
    padding: '40px 20px',
    fontSize: '0.95em',
    fontFamily: '"Nunito", sans-serif',
};

const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
};

const sectionTitleStyle = {
    color: 'white',
    marginBottom: '15px',
    fontSize: '1.1em',
};

const linkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
    transition: 'color 0.2s',
};

const logoStyle = {
    color: '#5b88b2ff', 
    fontSize: '1.5em',
    fontWeight: '700',
    textDecoration: 'none',
    marginBottom: '10px',
    display: 'block',
};

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>

                <div style={{ flexBasis: '250px' }}>
                    <Link to="/" style={logoStyle}>
                        рядом.kg
                    </Link>
                    <p>
                        Миссия: Соединять тех, кто нуждается в помощи, с теми, кто готов ее оказать.
                    </p>
                    <p>© {new Date().getFullYear()} рядом.kg. Все права защищены.</p>
                </div>

                <div>
                    <h4 style={sectionTitleStyle}>Навигация</h4>
                    <Link to="/" style={linkStyle}>Главная</Link>
                    <Link to="/requests" style={linkStyle}>Найти Помощь</Link>
                    <Link to="/create" style={linkStyle}>Оставить Запрос</Link>
                    <Link to="/about" style={linkStyle}>О нас</Link>
                </div>

                <div>
                    <h4 style={sectionTitleStyle}>Информация</h4>
                    <Link to="/faq" style={linkStyle}>Часто задаваемые вопросы (FAQ)</Link>
                    <Link to="/privacy" style={linkStyle}>Политика конфиденциальности</Link>
                    <Link to="/terms" style={linkStyle}>Условия использования</Link>
                </div>

                <div style={{ flexBasis: '200px' }}>
                    <h4 style={sectionTitleStyle}>Связь с нами</h4>
                    <p>
                        Email: <a href="mailto:support@ryadom.kg" style={linkStyle}>support@ryadom.kg</a>
                    </p>
                    <p>
                        Телефон: <a href="tel:+996555123456" style={linkStyle}>+996 997 909 073</a>
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;