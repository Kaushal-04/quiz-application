import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
    email: '',
    questions: [],
    answers: {}, // Key: questionIndex, Value: selectedChoice
    visited: {}, // Key: questionIndex, Value: true
    loading: false,
    error: null,
    isFinished: false,
    timeRemaining: 30 * 60, // 30 minutes in seconds
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'START_LOADING':
            return { ...state, loading: true, error: null };
        case 'SET_QUESTIONS':
            return { ...state, questions: action.payload, loading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SELECT_ANSWER':
            return {
                ...state,
                answers: { ...state.answers, [action.payload.index]: action.payload.answer },
                visited: { ...state.visited, [action.payload.index]: true }
            };
        case 'VISIT_QUESTION':
            return {
                ...state,
                visited: { ...state.visited, [action.payload]: true }
            };
        case 'FINISH_QUIZ':
            return { ...state, isFinished: true };
        case 'TICK_TIMER':
            if (state.timeRemaining <= 0) return { ...state, isFinished: true, timeRemaining: 0 };
            return { ...state, timeRemaining: state.timeRemaining - 1 };
        default:
            return state;
    }
};

export const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
