import React, { useState, useEffect, useCallback } from 'react';
import { getHelpRequests, deleteHelpRequest, updateHelpRequest } from '../api';
import { Link } from 'react-router-dom';
import './css/HelpRequestList.css'

const HelpRequestList = ({ reloadTrigger }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRequests = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getHelpRequests();
            setRequests(data);
            setError(null);
        } catch (err) {
            setError("Не удалось загрузить данные.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRequests();
    }, [loadRequests, reloadTrigger]);

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Удалить запрос "${title}"?`)) return;
        try {
            await deleteHelpRequest(id);
            setRequests(requests.filter(req => req.id !== id));
        } catch (error) {
            alert("Ошибка при удалении.");
        }
    };

    const handleClose = async (id, currentTitle) => {
        if (!window.confirm(`Закрыть запрос "${currentTitle}"?`)) return;
        try {
            const updatedRequest = await updateHelpRequest(id, { status: 'CLOSED' });
            setRequests(prev => prev.map(req => req.id === id ? updatedRequest : req));
        } catch (error) {
            alert("Ошибка при закрытии.");
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="portal-spinner"></div>
                <p className="loader-text">СКАНИРОВАНИЕ ЗАПРОСОВ...</p>
            </div>
        );
    }

    return (
        <div className="requests-page-bg">
            <div className="requests-bg-text">COMMUNITY</div>

            <div className="requests-container">
                <header className="requests-header">
                    <span className="requests-meta">DATABASE / 2026</span>
                    <h1 className="requests-title">АКТИВНЫЕ <br /> <span className="outline-text">ЗАПРОСЫ</span></h1>
                    <p className="requests-count">Найдено записей: {requests.length}</p>
                </header>

                <div className="requests-grid">
                    {requests.length === 0 ? (
                        <p className="no-data">Запросов пока нет.</p>
                    ) : (
                        requests.map(request => (
                            <div key={request.id} className={`request-card ${request.status === "CLOSED" ? "is-closed" : ""}`}>
                                <Link to={`/requests/${request.id}`} className="card-main-content">
                                    <div className="card-top">
                                        <span className="card-category">{request.category_display}</span>
                                        <span className={`card-status ${request.status.toLowerCase()}`}>
                                            {request.status}
                                        </span>
                                    </div>
                                    <h3 className="card-title">{request.title}</h3>
                                    <div className="card-info">
                                        <p><span>КТО:</span> {request.contact_name}</p>
                                        <p><span>ТЕЛ:</span> {request.contact_phone}</p>
                                    </div>
                                    <div className="card-footer">
                                        <span>DATE: {new Date(request.created_at).toLocaleDateString()}</span>
                                        <span className="card-arrow">↗</span>
                                    </div>
                                </Link>

                                <div className="card-actions">
                                    {request.status !== 'CLOSED' && (
                                        <button onClick={() => handleClose(request.id, request.title)} className="action-btn close">
                                            ЗАКРЫТЬ
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(request.id, request.title)} className="action-btn delete">
                                        УДАЛИТЬ
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HelpRequestList;