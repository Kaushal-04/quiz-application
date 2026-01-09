import he from 'he';

const API_URL = 'https://opentdb.com/api.php?amount=15';

export const fetchQuestions = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.response_code !== 0) {
            throw new Error('Failed to load questions from OpenTDB');
        }

        // Process and shuffle questions
        return data.results.map((q) => {
            const incorrect = q.incorrect_answers || [];
            const correct = q.correct_answer;
            // Shuffle choices: combine correct + incorrect, then sort randomly
            const choices = [...incorrect, correct].sort(() => Math.random() - 0.5);

            return {
                ...q,
                question: he.decode(q.question),
                correct_answer: he.decode(correct),
                incorrect_answers: incorrect.map(a => he.decode(a)),
                choices: choices.map(c => he.decode(c))
            };
        });

    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        // Re-throw to be handled by the UI (e.g., show error message)
        throw error;
    }
};
