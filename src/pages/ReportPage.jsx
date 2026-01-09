import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { XCircle, CheckCircle, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
    const { state } = useQuiz();
    const { questions, answers, email } = state;
    const navigate = useNavigate();

    const score = questions.reduce((acc, q, i) => {
        return acc + (answers[i] === q.correct_answer ? 1 : 0);
    }, 0);

    if (questions.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>No Report Available</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
            </div>
        )
    }

    return (
        <div className="container fade-in">
            <div className="card" style={{ marginBottom: '2rem', textAlign: 'center', background: 'linear-gradient(to bottom right, var(--surface-color), #2d1b4e)' }}>
                <h1>Quiz Report</h1>
                <p className="text-muted">User: {email}</p>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>
                    {score} / {questions.length}
                </div>
                <p style={{ color: score > 8 ? 'var(--correct-color)' : 'var(--text-muted)' }}>
                    {score > 8 ? 'Great Job!' : 'Keep Practicing!'}
                </p>
                <button className="btn btn-outline" onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>
                    <RotateCw size={18} style={{ marginRight: '0.5rem' }} /> Take Info Again
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {questions.map((q, i) => {
                    const isCorrect = answers[i] === q.correct_answer;
                    const isUnanswered = !answers[i];

                    return (
                        <div key={i} className="card" style={{
                            borderLeft: `4px solid ${isCorrect ? 'var(--correct-color)' : 'var(--incorrect-color)'}`,
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>{i + 1}.</span>
                                <div style={{ flex: 1 }}>{q.question}</div>
                                {isCorrect ?
                                    <CheckCircle color="var(--correct-color)" /> :
                                    <XCircle color="var(--incorrect-color)" />
                                }
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginTop: '0.5rem',
                                fontSize: '0.9rem'
                            }}>
                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--incorrect-color)',
                                    borderRadius: '8px',
                                    display: isCorrect || isUnanswered ? 'none' : 'block'
                                }}>
                                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Your Answer:</span>
                                    {answers[i] || 'Skipped'}
                                </div>

                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    color: 'var(--correct-color)',
                                    borderRadius: '8px',
                                    gridColumn: isCorrect ? '1 / -1' : 'auto'
                                }}>
                                    <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Correct Answer:</span>
                                    {q.correct_answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReportPage;
