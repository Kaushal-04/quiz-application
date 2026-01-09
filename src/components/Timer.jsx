import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Clock } from 'lucide-react';

const Timer = () => {
    const { state, dispatch } = useQuiz();
    const { timeRemaining, isFinished } = state;

    useEffect(() => {
        if (isFinished) return;

        const timerId = setInterval(() => {
            dispatch({ type: 'TICK_TIMER' });
        }, 1000);

        return () => clearInterval(timerId);
    }, [isFinished, dispatch]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isWarning = timeRemaining < 300; // Less than 5 mins

    return (
        <div className={`card flex items-center gap-2 ${isWarning ? 'text-red-500' : 'text-primary'}`} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <Clock size={20} />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {formatTime(timeRemaining)}
            </span>
        </div>
    );
};

export default Timer;
