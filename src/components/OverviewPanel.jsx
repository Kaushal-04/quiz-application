import React from 'react';
import { useQuiz } from '../context/QuizContext';

const OverviewPanel = ({ currentQuestionIndex, onNavigate }) => {
    const { state } = useQuiz();
    const { questions, visited, answers } = state;

    return (
        <div className="card" style={{ height: 'fit-content' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Question Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {questions.map((_, index) => {
                    const isVisited = visited[index];
                    const isAttempted = answers[index] !== undefined;
                    const isCurrent = index === currentQuestionIndex;

                    let bg = 'rgba(255, 255, 255, 0.1)';
                    let border = '1px solid transparent';
                    let color = 'var(--text-muted)';

                    if (isCurrent) {
                        border = '1px solid var(--primary-color)';
                        color = 'white';
                    }
                    if (isAttempted) {
                        bg = 'var(--primary-color)';
                        color = 'white';
                    } else if (isVisited) {
                        bg = 'rgba(236, 72, 153, 0.2)'; // Pink tint
                        color = 'var(--secondary-color)';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => onNavigate(index)}
                            style={{
                                background: bg,
                                border: border,
                                color: color,
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '600'
                            }}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 12, height: 12, background: 'var(--primary-color)', borderRadius: 2 }}></div>
                    <span>Attempted</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 12, height: 12, background: 'rgba(236, 72, 153, 0.2)', borderRadius: 2 }}></div>
                    <span>Visited</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 12, height: 12, border: '1px solid var(--primary-color)', borderRadius: 2 }}></div>
                    <span>Current</span>
                </div>
            </div>
        </div>
    );
};

export default OverviewPanel;
