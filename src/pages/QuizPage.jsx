import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import OverviewPanel from '../components/OverviewPanel';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const QuizPage = () => {
    const { state, dispatch } = useQuiz();
    const { questions, isFinished, answers, loading } = state;
    const navigate = useNavigate();
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        if (isFinished) {
            navigate('/report');
        }
    }, [isFinished, navigate]);

    useEffect(() => {
        if (questions.length === 0 && !loading) {
            // Redirect if no questions (e.g. refreshed page)
            navigate('/');
        }
    }, [questions, loading, navigate]);

    useEffect(() => {
        // Mark initial question as visited
        if (questions.length > 0) {
            dispatch({ type: 'VISIT_QUESTION', payload: currentIdx });
        }
    }, [currentIdx, questions, dispatch]);

    const handleSelect = (answer) => {
        dispatch({ type: 'SELECT_ANSWER', payload: { index: currentIdx, answer } });
    };

    const handleSubmit = () => {
        dispatch({ type: 'FINISH_QUIZ' });
    };

    if (loading || questions.length === 0) return <div className="container" style={{ textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>Question {currentIdx + 1} / {questions.length}</h2>
                <Timer />
            </div>

            <div className="layout-grid">
                <OverviewPanel
                    currentQuestionIndex={currentIdx}
                    onNavigate={setCurrentIdx}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <QuestionCard
                        question={questions[currentIdx]}
                        index={currentIdx}
                        selectedAnswer={answers[currentIdx]}
                        onSelect={handleSelect}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            className="btn btn-outline"
                            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                            disabled={currentIdx === 0}
                        >
                            <ChevronLeft size={18} /> Previous
                        </button>

                        {currentIdx < questions.length - 1 ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
                            >
                                Next <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                style={{ background: 'var(--correct-color)' }}
                                onClick={handleSubmit}
                            >
                                Submit Quiz <CheckCircle size={18} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
