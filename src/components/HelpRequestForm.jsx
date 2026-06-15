import React, { useState, useEffect, useRef } from 'react';
import { createHelpRequest } from '../api';
import './css/HelpRequestForm.css';

const CATEGORY_CHOICES = [
    { value: 'MED', label: 'Медицинская помощь' },
    { value: 'FOOD', label: 'Продукты/Еда' },
    { value: 'TRANS', label: 'Транспорт' },
    { value: 'OTHER', label: 'Другое' },
];

const HelpRequestForm = ({ onCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'OTHER',
        contact_name: '',
        contact_phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const pageRef = useRef(null);

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
        setMessage('');

        try {
            const newRequest = await createHelpRequest(formData);
            setMessage(`Успешно: "${newRequest.title}" создан.`);
            setFormData({
                title: '', description: '', category: 'OTHER',
                contact_name: '', contact_phone: ''
            });
            if (onCreated) onCreated();
        } catch (error) {
            setMessage('Ошибка при отправке запроса.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page-bg" ref={pageRef}>
            <div className="form-bg-text">CREATE</div>
            
            <div className="form-content-wrapper">
                <header className="form-header">
                    <span className="form-meta">NEW REQUEST / 2026</span>
                    <h1 className="form-title">НУЖНА <br/> <span className="outline-text">ПОМОЩЬ?</span></h1>
                </header>

                <form onSubmit={handleSubmit} className="help-form-box">
                    {message && (
                        <div className={`form-status-msg ${message.includes('Ошибка') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}

                    <div className="input-group">
                        <label>ЧТО СЛУЧИЛОСЬ?</label>
                        <input 
                            type="text" name="title" placeholder="Краткое название"
                            value={formData.title} onChange={handleChange} required 
                        />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>КАТЕГОРИЯ</label>
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                {CATEGORY_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>ВАШЕ ИМЯ</label>
                            <input 
                                type="text" name="contact_name" placeholder="Как вас зовут"
                                value={formData.contact_name} onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>ДЕТАЛИ</label>
                        <textarea 
                            name="description" placeholder="Опишите ситуацию подробнее..."
                            value={formData.description} onChange={handleChange} required
                        ></textarea>
                    </div>

                    <div className="input-group">
                        <label>ТЕЛЕФОН</label>
                        <input 
                            type="tel" name="contact_phone" placeholder="+996 (___) __ __ __"
                            value={formData.contact_phone} onChange={handleChange} required
                        />
                    </div>

                    <button type="submit" className="form-submit-btn" disabled={loading}>
                        {loading ? 'ОТПРАВКА...' : 'ОПУБЛИКОВАТЬ ЗАПРОС'}
                        <span className="btn-arrow">↗</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HelpRequestForm;