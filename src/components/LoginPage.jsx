import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => pageRef.current?.classList.add('is-loaded'), 100);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const cleanUsername = formData.username.trim().toLowerCase();
            const cleanPassword = formData.password.trim();

            let mockUser = null;

            if (cleanUsername === 'volunteer' && cleanPassword === '123') {
                mockUser = { id: 'v1', name: 'Алексей', role: 'VOLUNTEER' };
            } else if (cleanUsername === 'needer' && cleanPassword === '123') {
                mockUser = { id: 'n1', name: 'Марья Ивановна', role: 'NEEDER' };
            } else if (cleanUsername === 'admin' && cleanPassword === '123') {
                mockUser = { id: 'a1', name: 'Модератор', role: 'ADMIN' };
            }

            if (mockUser) {
                login(mockUser);

                switch (mockUser.role) {
                    case 'VOLUNTEER':
                        navigate('/volunteer/profile');
                        break;
                    case 'NEEDER':
                        navigate('/needer/my-tasks');
                        break;
                    case 'ADMIN':
                        navigate('/admin');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError('НЕВЕРНЫЕ ДАННЫЕ ДОСТУПА');
            }
        } catch (err) {
            setError('ОШИБКА СЕРВЕРА. ПОПРОБУЙТЕ ПОЗЖЕ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-bg" ref={pageRef}>
            <div className="login-bg-text">SECURE</div>
            <div className="login-content-wrapper">
                <header className="login-header">
                    <span className="login-meta">AUTH / ACCESS</span>
                    <h1 className="login-title">ВХОД В <br /> <span className="outline-text">СИСТЕМУ</span></h1>
                </header>

                <div className="login-box">
                    <div style={{ fontSize: '11px', color: '#888', marginBottom: '15px' }}>
                        Тесты (пароль 123): <b>volunteer</b>, <b>needer</b>, <b>admin</b>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="login-error-msg">{error}</div>}

                        <div className="login-input-group">
                            <label>LOGIN / EMAIL</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Введите логин роли"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="login-input-group">
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="login-submit-btn" disabled={loading}>
                            {loading ? 'ПРОВЕРКА...' : 'ПОДТВЕРДИТЬ ВХОД'}
                            <span className="btn-arrow">↗</span>
                        </button>
                    </form>

                    <div className="login-footer">
                        <span>Нет аккаунта?</span>
                        <Link to="/register" className="register-link">СОЗДАТЬ ПРОФИЛЬ</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;