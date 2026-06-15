import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Navbar.css';

const Navbar = () => {
    const { role, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert('Вы вышли из системы!');
        navigate('/');
    };

    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navPages = document.querySelector('.pages');

        if (menuToggle && navPages) { 
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('is-active');
                navPages.classList.toggle('is-active');
            });
        }
    });
    return (
        <div>
            <nav className="navbar">
                <div className='container nav'>
                    <Link to="/" className="navbar-brand">
                        рядом.kg
                    </Link>
                    <div className='pages'>
                        <Link to="/">Главная</Link>
                        <Link to="/requests">Найти Помощь</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/about">О нас</Link>


                        {/* 1. Если зашел ВОЛОНТЕР */}
                        {role === 'VOLUNTEER' && (
                            <Link to="/volunteer/profile">Мои задания</Link>
                        )}

                        {/* 2. Если зашел НУЖДАЮЩИЙСЯ */}
                        {role === 'NEEDER' && (
                            <>
                                <Link to="/needer/my-tasks">Мои заявки</Link>
                                <Link to="/create">Оставить Запрос</Link>
                            </>
                        )}

                        {/* 3. Если зашел АДМИН / МОДЕРАТОР */}
                        {role === 'ADMIN' && (
                            <Link to="/admin">Админ-панель</Link>
                        )}

                        {/* --- БЛОК АВТОРИЗАЦИИ (Вход / Выход) --- */}
                        {isAuthenticated ? (
                            <div className='auth-links'>
                                <button
                                    onClick={handleLogout}
                                    className='logout-button'
                                >
                                    Выход
                                </button>
                            </div>
                        ) : (
                            /* Если ГОСТЬ — показываем кнопку Вход */
                            <Link to="/login" className='login-button'>
                                Вход
                            </Link>
                        )}

                    </div>
                    <button class="menu-toggle" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;