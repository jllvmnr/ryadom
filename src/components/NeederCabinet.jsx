import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/NeederCabinet.css';

const INITIAL_MY_REQUESTS = [
    {
        id: 1,
        title: "Доставка продуктов пожилому человеку",
        description: "Нужно купить и привезти продукты по списку (хлеб, молоко, картошка) для бабушки. Деньги на продукты переведу.",
        date: "14.06.2026",
        status: "active",
        responses: [
            { id: 'r1', volunteerName: "Алексей (Волонтер)", phone: "+996 555 12-34-56", message: "Готов помочь сегодня после 18:00!" },
            { id: 'r2', volunteerName: "Дмитрий", phone: "+996 700 98-76-54", message: "Могу заехать в магазин в обед." }
        ]
    },
    {
        id: 2,
        title: "Помощь с уборкой во дворе",
        description: "После ремонта скопился мелкий мусор во дворе частного дома, тяжело убрать самой.",
        date: "12.06.2026",
        status: "completed",
        responses: []
    }
];

const NeederCabinet = () => {
    const { user } = useAuth();
    const [myRequests, setMyRequests] = useState(INITIAL_MY_REQUESTS);
    const [activeTab, setActiveTab] = useState('active');

    const handleDeleteRequest = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту заявку?")) {
            setMyRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    const filteredRequests = myRequests.filter(req => req.status === activeTab);

    return (
        <div className="needer-cabinet-bg">
            <div className="cabinet-bg-text">WORKSPACE</div>

            <div className="cabinet-container">
                <header className="cabinet-header">
                    <div className="user-welcome">
                        <span className="cabinet-meta">CONTROL PANEL / NEEDER</span>
                        <h1 className="cabinet-title">
                            ПРОФИЛЬ: <span className="outline-text">{user?.name || 'ПОЛЬЗОВАТЕЛЬ'}</span>
                        </h1>
                    </div>
                    <Link to="/create" className="create-btn-cabinet">
                        ОСТАВИТЬ ЗАПРОС ↗
                    </Link>
                </header>

                <div className="cabinet-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        АКТИВНЫЕ ЗАЯВКИ ({myRequests.filter(r => r.status === 'active').length})
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        АРХИВ ({myRequests.filter(r => r.status === 'completed').length})
                    </button>
                </div>

                <div className="cabinet-content">
                    {filteredRequests.length === 0 ? (
                        <div className="empty-state">
                            <p>У вас пока нет {activeTab === 'active' ? 'активных' : 'завершенных'} заявок в системе.</p>
                            {activeTab === 'active' && <Link to="/create">СОЗДАТЬ ПЕРВЫЙ ЗАПРОС ↗</Link>}
                        </div>
                    ) : (
                        <div className="requests-list-cabinet">
                            {filteredRequests.map(request => (
                                <div key={request.id} className="request-card-cabinet">
                                    
                                    <div className="card-top-bar">
                                        <span className="request-date">ДАТА ПУБЛИКАЦИИ: {request.date}</span>
                                        {activeTab === 'active' && (
                                            <button 
                                                onClick={() => handleDeleteRequest(request.id)} 
                                                className="delete-req-btn"
                                            >
                                                УДАЛИТЬ С КАРТЫ
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="card-body-cabinet">
                                        <h3>{request.title}</h3>
                                        <p className="req-desc">{request.description}</p>

                                        {activeTab === 'active' && (
                                            <div className="responses-section">
                                                <h4>ОТКЛИКИ ВОЛОНТЕРОВ ({request.responses.length})</h4>
                                                
                                                {request.responses.length === 0 ? (
                                                    <p className="no-responses">ОЖИДАНИЕ СИГНАЛОВ ОТКЛИКА...</p>
                                                ) : (
                                                    <div className="responses-grid">
                                                        {request.responses.map(resp => (
                                                            <div key={resp.id} className="response-item">
                                                                <div className="vol-info">
                                                                    <strong>{resp.volunteerName}</strong>
                                                                    <a href={`tel:${resp.phone}`} className="vol-phone">{resp.phone}</a>
                                                                </div>
                                                                <p className="vol-message">«{resp.message}»</p>
                                                                <button 
                                                                    className="accept-vol-btn"
                                                                    onClick={() => alert(`Вызов подтвержден. Свяжитесь: ${resp.phone}`)}
                                                                >
                                                                    ПОДТВЕРДИТЬ ПОМОЩЬ
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NeederCabinet;