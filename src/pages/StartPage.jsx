import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../services/api';
import { Play } from 'lucide-react';

const StartPage = () => {
    const [inputEmail, setInputEmail] = useState('');
    const { dispatch, state } = useQuiz();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleStart = async (e) => {
        e.preventDefault();
        if (!inputEmail || !inputEmail.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        dispatch({ type: 'SET_EMAIL', payload: inputEmail });
        dispatch({ type: 'START_LOADING' });

        try {
            const questions = await fetchQuestions();
            dispatch({ type: 'SET_QUESTIONS', payload: questions });
            navigate('/quiz');
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
            setError(err.message);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card fade-in" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(to right, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
                    Quiz Master
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Enter your email to start the 30-minute challenge. 15 questions await!
                </p>

                <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: 'var(--radius)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />

                    {error && <div style={{ color: 'var(--incorrect-color)', fontSize: '0.9rem' }}>{error}</div>}
                    {state.loading && <div style={{ color: 'var(--primary-color)' }}>Loading questions...</div>}

                    <button type="submit" className="btn btn-primary" disabled={state.loading} style={{ justifyContent: 'center' }}>
                        Start Quiz <Play size={18} style={{ marginLeft: '0.5rem' }} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StartPage;
