/**
 * Migration helper to transition from old quizData.ts to new questionManager.ts
 * This file shows how to use the new system in existing components
 */

import { Question, questionManager } from "./questionManager";
import { questionSets } from "./quizData"; // Old system

// Adapter to make new system work with existing code
export class QuestionAdapter {
    // Convert old format to new format for backward compatibility
    static convertOldQuestion(oldQuestion: any): Question {
        return {
            id: oldQuestion.id,
            category: "legacy", // Will need to be mapped properly
            subcategory: oldQuestion.category,
            difficulty: oldQuestion.difficulty,
            tags: [oldQuestion.category.toLowerCase()],
            css: oldQuestion.css,
            acceptedAnswers: [oldQuestion.tailwindClass],
            explanation: oldQuestion.explanation,
            hint: `Think about the ${oldQuestion.category} property and its Tailwind equivalent.`,
            cssMapping: this.parseCSS(oldQuestion.css),
            examples: [],
            relatedQuestions: [],
            learnMore: "",
        };
    }

    // Parse CSS string to object (same as in questionManager)
    static parseCSS(css: string): Record<string, string> {
        const cssObject: Record<string, string> = {};
        const rules = css.split(";").filter((rule) => rule.trim());

        rules.forEach((rule) => {
            const [property, value] = rule.split(":").map((s) => s.trim());
            if (property && value) {
                cssObject[property] = value;
            }
        });

        return cssObject;
    }

    // Get questions for a specific group (legacy compatibility)
    static getQuestionsForGroup(groupId: string): Question[] {
        // First try new system
        const newQuestions = questionManager.getQuestionsByCategory(groupId);
        if (newQuestions.length > 0) {
            return newQuestions;
        }

        // Fallback to old system
        const oldQuestions = questionSets[groupId] || [];
        return oldQuestions.map((q) => this.convertOldQuestion(q));
    }

    // Enhanced validation that uses both string comparison and CSS validation
    static validateAnswer(
        question: Question,
        userAnswer: string
    ): {
        isCorrect: boolean;
        method: string;
        feedback: string;
    } {
        const result = questionManager.validateAnswer(question.id, userAnswer);

        let feedback = "";
        if (result.isCorrect) {
            feedback =
                result.method === "exact_match"
                    ? "✅ Perfect! Exact match."
                    : "✅ Correct! Your classes produce the equivalent CSS.";
        } else {
            feedback = result.explanation || "❌ Not quite right. Try again!";
        }

        return {
            isCorrect: result.isCorrect,
            method: result.method,
            feedback,
        };
    }

    // Get random questions for challenges
    static getRandomQuestionsForChallenge(challengeConfig: any): Question[] {
        return questionManager.getRandomQuestions({
            count: challengeConfig.questionCount || 10,
            categories: challengeConfig.categories,
            difficulties: challengeConfig.difficulties || ["easy", "medium"],
        });
    }
}

// Example usage in a React component:
/*
import { QuestionAdapter } from './questionAdapter';

function ChallengeComponent({ challengeId }: { challengeId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Load questions using new system
    const challengeQuestions = questionManager.getQuestionsForChallenge(challengeId);
    setQuestions(challengeQuestions);
  }, [challengeId]);

  const handleAnswer = (question: Question, userAnswer: string) => {
    const result = QuestionAdapter.validateAnswer(question, userAnswer);

    if (result.isCorrect) {
      console.log('Correct!', result.feedback);
      // Award points, show success animation, etc.
    } else {
      console.log('Incorrect:', result.feedback);
      // Show hint, explanation, etc.
    }
  };
}
*/

export default QuestionAdapter;
