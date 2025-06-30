/**
 * Example of how to use the new Question Management System
 * This shows practical integration patterns
 */

import { questionManager } from "../lib/questionManager";

// Example 1: Get questions for a learning group
export function getQuestionsForLearningGroup(
    groupId: string,
    difficulty?: string
) {
    const questions = questionManager.getQuestionsByCategory(groupId);

    if (difficulty) {
        return questions.filter((q) => q.difficulty === difficulty);
    }

    return questions;
}

// Example 2: Generate challenge questions
export function generateChallengeQuestions(challengeConfig: {
    type: string;
    categories?: string[];
    difficulty?: string[];
    count?: number;
    tags?: string[];
}) {
    return questionManager.getRandomQuestions({
        count: challengeConfig.count || 10,
        categories: challengeConfig.categories,
        difficulties: challengeConfig.difficulty as any,
        tags: challengeConfig.tags,
    });
}

// Example 3: Validate user answer with detailed feedback
export function validateUserAnswer(questionId: string, userAnswer: string) {
    const result = questionManager.validateAnswer(questionId, userAnswer);

    const feedback = {
        isCorrect: result.isCorrect,
        validationMethod: result.method,
        message: "",
    };

    if (result.isCorrect) {
        switch (result.method) {
            case "exact_match":
                feedback.message =
                    "🎯 Perfect! Exact match with the expected answer.";
                break;
            case "css_equivalent":
                feedback.message =
                    "✨ Excellent! Your classes produce equivalent CSS.";
                break;
        }
    } else {
        feedback.message =
            result.explanation || "❌ Not quite right. Try again!";
    }

    return feedback;
}

// Example 4: Get question statistics for analytics
export function getQuestionAnalytics() {
    const stats = questionManager.getStats();

    return {
        overview: {
            totalQuestions: stats.totalQuestions,
            categoriesCount: Object.keys(stats.byCategory).length,
            averagePerCategory: Math.round(
                stats.totalQuestions / Object.keys(stats.byCategory).length
            ),
        },
        distribution: {
            byCategory: stats.byCategory,
            byDifficulty: stats.byDifficulty,
            difficultyPercentages: {
                easy: Math.round(
                    (stats.byDifficulty.easy / stats.totalQuestions) * 100
                ),
                medium: Math.round(
                    (stats.byDifficulty.medium / stats.totalQuestions) * 100
                ),
                hard: Math.round(
                    (stats.byDifficulty.hard / stats.totalQuestions) * 100
                ),
            },
        },
    };
}

// Example 5: Get related/suggested questions
export function getRelatedQuestions(currentQuestionId: string) {
    const allQuestions = questionManager.getAllQuestions();
    const currentQuestion = allQuestions.find(
        (q) => q.id === currentQuestionId
    );

    if (!currentQuestion) return [];

    // Find questions with same tags or category
    const related = allQuestions.filter(
        (q) =>
            q.id !== currentQuestionId &&
            (q.category === currentQuestion.category ||
                q.tags.some((tag) => currentQuestion.tags.includes(tag)))
    );

    return related.slice(0, 3); // Return max 3 related questions
}

// Example 6: Advanced filtering for adaptive learning
export function getAdaptiveQuestions(userProfile: {
    weakCategories: string[];
    preferredDifficulty: string;
    masteredTags: string[];
}) {
    const questions = questionManager.getAllQuestions();

    return questions
        .filter((q) => {
            // Focus on weak categories
            if (userProfile.weakCategories.includes(q.category)) return true;

            // Match preferred difficulty
            if (q.difficulty === userProfile.preferredDifficulty) return true;

            // Avoid mastered concepts unless review
            const hasMasteredTags = q.tags.some((tag) =>
                userProfile.masteredTags.includes(tag)
            );
            if (hasMasteredTags && Math.random() > 0.3) return false; // 30% chance for review

            return true;
        })
        .slice(0, 10);
}

// Example 7: Export for migration to database
export function exportQuestionsForDatabase() {
    const allQuestions = questionManager.getAllQuestions();
    const categories = questionManager.getCategories();

    return {
        questions: allQuestions.map((q) => ({
            ...q,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
            isActive: true,
        })),
        categories: Object.entries(categories).map(([id, cat]) => ({
            id,
            ...cat,
            createdAt: new Date().toISOString(),
        })),
        metadata: {
            exportedAt: new Date().toISOString(),
            totalQuestions: allQuestions.length,
            version: "1.0",
        },
    };
}

// Example usage in React components:
/*
// In a Learning Component
const questions = getQuestionsForLearningGroup('layout', 'easy');

// In a Challenge Component
const challengeQuestions = generateChallengeQuestions({
  type: 'speed_round',
  categories: ['layout', 'typography'],
  difficulty: ['easy', 'medium'],
  count: 15
});

// In Answer Validation
const feedback = validateUserAnswer(currentQuestion.id, userInput);
if (feedback.isCorrect) {
  showSuccessAnimation(feedback.message);
} else {
  showErrorMessage(feedback.message);
}
*/
