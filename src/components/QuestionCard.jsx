import React from 'react';

const QuestionCard = ({ question, index, selectedAnswer, onSelect }) => {
    if (!question) return null;

    return (
        <div className="card fade-in">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>{index + 1}.</span>
                {question.question}
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {question.choices.map((choice, i) => (
                    <button
                        key={i}
                        onClick={() => onSelect(choice)}
                        className="btn"
                        style={{
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            background: selectedAnswer === choice
                                ? 'rgba(99, 102, 241, 0.2)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: selectedAnswer === choice
                                ? '1px solid var(--primary-color)'
                                : '1px solid transparent',
                            color: selectedAnswer === choice ? 'white' : 'var(--text-color)',
                        }}
                    >
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '2px solid currentColor',
                            marginRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem'
                        }}>
                            {String.fromCharCode(65 + i)}
                        </div>
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
