import React, { useState, useEffect, useRef } from 'react';
import './css/FAQPage.css';

const faqData = [
    {
        question: "Как я могу стать волонтером?",
        answer: "Чтобы стать волонтером, просто зарегистрируйтесь на нашем сайте, перейдите в раздел 'Найти Помощь' и выберите запрос. Свяжитесь с контактным лицом для подтверждения деталей."
    },
    {
        question: "Как оставить запрос на помощь?",
        answer: "Нажмите на кнопку 'Оставить Запрос' в меню. Заполните форму, указав категорию и описание. После публикации ваш запрос станет виден волонтерам."
    },
    {
        question: "Безопасно ли пользоваться платформой?",
        answer: "Мы призываем соблюдать правила безопасности: встречайтесь в общественных местах и не делитесь конфиденциальными данными. Платформа модерируется."
    },
    {
        question: "Что делать, если запрос выполнен?",
        answer: "Автору или волонтеру нужно зайти на страницу запроса и нажать 'Закрыть Запрос'. Это уберет его из активного списка."
    },
    {
        question: "Могу ли я оставить анонимный запрос?",
        answer: "Нет, для безопасности необходимо указать имя и телефон. Ваша конфиденциальность защищена политикой сайта."
    },
];

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
            <div className="faq-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="faq-number">0{index + 1}</span>
                <span className="faq-question">{question}</span>
                <span className="faq-icon">{isOpen ? '—' : '+'}</span>
            </div>
            <div className="faq-answer">
                <div className="faq-answer-content">
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQPage = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        setTimeout(() => pageRef.current?.classList.add('is-loaded'), 100);
    }, []);

    return (
        <div className="faq-page-container" ref={pageRef}>
            <div className="faq-bg-text">ANSWERS</div>
            
            <div className="faq-content">
                <header className="faq-page-header">
                    <span className="faq-meta">HELP CENTER / FAQ</span>
                    <h1 className="faq-title">ЕСТЬ <span className="outline-text">ВОПРОСЫ?</span></h1>
                </header>

                <div className="faq-list">
                    {faqData.map((item, index) => (
                        <FAQItem 
                            key={index} 
                            index={index}
                            question={item.question} 
                            answer={item.answer} 
                        />
                    ))}
                </div>

                <footer className="faq-footer-box">
                    <h3>Не нашли ответ?</h3>
                    <p>Напишите нам: <a href="mailto:support@ryadom.kg">support@ryadom.kg</a></p>
                </footer>
            </div>
        </div>
    );
};

export default FAQPage;