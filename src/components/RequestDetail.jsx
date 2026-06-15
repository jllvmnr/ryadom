import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHelpRequestById } from '../api';
import './css/RequestDetail.css'

const RequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            console.log("Загружаю запрос с ID:", id);
            try {
                const response = await getHelpRequestById(id);
                setRequest(response);
            } catch (err) {
                setError("Запрос не найден или произошла ошибка при загрузке.");
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [id]);

    const handleTakeRequest = () => {
        alert(`Вы взяли запрос "${request.title}"! Скоро будет реализована логика API.`);
    };

    if (loading) return <p style={{ textAlign: 'center' }}>Загрузка деталей запроса...</p>;
    if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    if (!request) return <div style={{ textAlign: 'center' }}>Данные не получены.</div>;

    const isClosed = request.status === 'CLOSED';

    return (
        <div className="bg bg2">
            <div className='requestDetail'>
                <Link to="/requests" className="back-link">
                    &larr; Назад ко всем запросам
                </Link>

                <h1>{request.title}</h1>

                <p className={isClosed ? 'status-closed' : 'status-open'}>
                    Статус: {request.status}
                </p>

                <p className="request-description">{request.description}</p>

                <h3>Контактная информация:</h3>
                <div className="contact-info">
                    <p><strong>Имя:</strong> {request.contact_name}</p>
                    <p><strong>Телефон:</strong> {request.contact_phone}</p>
                    <p><strong>Категория:</strong> {request.category_display}</p>
                </div>

                <p className="publish-date"><small>Опубликовано: {new Date(request.created_at).toLocaleString()}</small></p>

                {!isClosed && (
                    <button
                        className="take-request-btn"
                        onClick={handleTakeRequest}
                    >
                        Я беру этот запрос!
                    </button>
                )}
            </div>
        </div>
    );
};

export default RequestDetail;