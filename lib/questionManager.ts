/**
 * TailwindCSS Question Validation System
 *
 * This system provides:
 * 1. Real CSS validation (not just string comparison)
 * 2. Multiple correct answers support
 * 3. Centralized question management
 * 4. Easy migration path to database
 */

import questionsData from "../data/questions.json";

// Types
export interface Question {
    id: string;
    category: string;
    subcategory: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    css: string;
    acceptedAnswers: string[];
    explanation: string;
    hint: string;
    cssMapping: Record<string, string>;
    examples: Array<{
        html: string;
        description: string;
    }>;
    relatedQuestions: string[];
    learnMore: string;
}

export interface QuestionCategory {
    name: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    isBasic: boolean;
}

export interface ChallengeConfig {
    name: string;
    description: string;
    type: "practice" | "timed" | "survival" | "themed";
    config: {
        allowHints?: boolean;
        allowPreview?: boolean;
        timeLimit?: number;
        questionCount?: number;
        categories?: string[];
        tags?: string[];
        difficulties?: ("easy" | "medium" | "hard")[];
    };
}

// Comprehensive Tailwind to CSS mapping
const TAILWIND_CSS_MAPPING: Record<string, Record<string, string>> = {
    // Display
    flex: { display: "flex" },
    block: { display: "block" },
    inline: { display: "inline" },
    "inline-block": { display: "inline-block" },
    "inline-flex": { display: "inline-flex" },
    hidden: { display: "none" },
    grid: { display: "grid" },

    // Flexbox
    "flex-col": { "flex-direction": "column" },
    "flex-row": { "flex-direction": "row" },
    "flex-col-reverse": { "flex-direction": "column-reverse" },
    "flex-row-reverse": { "flex-direction": "row-reverse" },
    "flex-wrap": { "flex-wrap": "wrap" },
    "flex-nowrap": { "flex-wrap": "nowrap" },

    // Justify Content
    "justify-start": { "justify-content": "flex-start" },
    "justify-end": { "justify-content": "flex-end" },
    "justify-center": { "justify-content": "center" },
    "justify-between": { "justify-content": "space-between" },
    "justify-around": { "justify-content": "space-around" },
    "justify-evenly": { "justify-content": "space-evenly" },

    // Align Items
    "items-start": { "align-items": "flex-start" },
    "items-end": { "align-items": "flex-end" },
    "items-center": { "align-items": "center" },
    "items-baseline": { "align-items": "baseline" },
    "items-stretch": { "align-items": "stretch" },

    // Grid
    "grid-cols-1": { "grid-template-columns": "repeat(1, minmax(0, 1fr))" },
    "grid-cols-2": { "grid-template-columns": "repeat(2, minmax(0, 1fr))" },
    "grid-cols-3": { "grid-template-columns": "repeat(3, minmax(0, 1fr))" },
    "grid-cols-4": { "grid-template-columns": "repeat(4, minmax(0, 1fr))" },
    "grid-cols-6": { "grid-template-columns": "repeat(6, minmax(0, 1fr))" },
    "grid-cols-12": { "grid-template-columns": "repeat(12, minmax(0, 1fr))" },

    // Position
    static: { position: "static" },
    fixed: { position: "fixed" },
    absolute: { position: "absolute" },
    relative: { position: "relative" },
    sticky: { position: "sticky" },

    // Position Values
    "top-0": { top: "0px" },
    "right-0": { right: "0px" },
    "bottom-0": { bottom: "0px" },
    "left-0": { left: "0px" },
    "top-2": { top: "0.5rem" },
    "right-2": { right: "0.5rem" },
    "bottom-2": { bottom: "0.5rem" },
    "left-2": { left: "0.5rem" },
    "top-4": { top: "1rem" },
    "right-4": { right: "1rem" },
    "bottom-4": { bottom: "1rem" },
    "left-4": { left: "1rem" },

    // Typography
    "text-xs": { "font-size": "0.75rem" },
    "text-sm": { "font-size": "0.875rem" },
    "text-base": { "font-size": "1rem" },
    "text-lg": { "font-size": "1.125rem" },
    "text-xl": { "font-size": "1.25rem" },
    "text-2xl": { "font-size": "1.5rem" },
    "text-3xl": { "font-size": "1.875rem" },
    "text-4xl": { "font-size": "2.25rem" },
    "text-5xl": { "font-size": "3rem" },

    // Font Weight
    "font-thin": { "font-weight": "100" },
    "font-extralight": { "font-weight": "200" },
    "font-light": { "font-weight": "300" },
    "font-normal": { "font-weight": "400" },
    "font-medium": { "font-weight": "500" },
    "font-semibold": { "font-weight": "600" },
    "font-bold": { "font-weight": "700" },
    "font-extrabold": { "font-weight": "800" },
    "font-black": { "font-weight": "900" },

    // Text Alignment
    "text-left": { "text-align": "left" },
    "text-center": { "text-align": "center" },
    "text-right": { "text-align": "right" },
    "text-justify": { "text-align": "justify" },

    // Colors - Background
    "bg-transparent": { "background-color": "transparent" },
    "bg-white": { "background-color": "#ffffff" },
    "bg-black": { "background-color": "#000000" },
    "bg-gray-50": { "background-color": "#f9fafb" },
    "bg-gray-100": { "background-color": "#f3f4f6" },
    "bg-gray-500": { "background-color": "#6b7280" },
    "bg-gray-900": { "background-color": "#111827" },
    "bg-red-500": { "background-color": "#ef4444" },
    "bg-blue-500": { "background-color": "#3b82f6" },
    "bg-green-500": { "background-color": "#22c55e" },
    "bg-yellow-500": { "background-color": "#eab308" },
    "bg-purple-500": { "background-color": "#8b5cf6" },

    // Colors - Text
    "text-white": { color: "#ffffff" },
    "text-black": { color: "#000000" },
    "text-gray-500": { color: "#6b7280" },
    "text-gray-900": { color: "#111827" },
    "text-red-500": { color: "#ef4444" },
    "text-blue-500": { color: "#3b82f6" },
    "text-green-500": { color: "#22c55e" },

    // Spacing - Padding
    "p-0": { padding: "0px" },
    "p-1": { padding: "0.25rem" },
    "p-2": { padding: "0.5rem" },
    "p-3": { padding: "0.75rem" },
    "p-4": { padding: "1rem" },
    "p-6": { padding: "1.5rem" },
    "p-8": { padding: "2rem" },
    "px-2": { "padding-left": "0.5rem", "padding-right": "0.5rem" },
    "px-4": { "padding-left": "1rem", "padding-right": "1rem" },
    "py-2": { "padding-top": "0.5rem", "padding-bottom": "0.5rem" },
    "py-4": { "padding-top": "1rem", "padding-bottom": "1rem" },

    // Spacing - Margin
    "m-0": { margin: "0px" },
    "m-2": { margin: "0.5rem" },
    "m-4": { margin: "1rem" },
    "mx-auto": { "margin-left": "auto", "margin-right": "auto" },
    "my-4": { "margin-top": "1rem", "margin-bottom": "1rem" },

    // Width & Height
    "w-full": { width: "100%" },
    "w-1/2": { width: "50%" },
    "w-32": { width: "8rem" },
    "w-64": { width: "16rem" },
    "h-full": { height: "100%" },
    "h-32": { height: "8rem" },
    "h-64": { height: "16rem" },

    // Border Radius
    rounded: { "border-radius": "0.25rem" },
    "rounded-md": { "border-radius": "0.375rem" },
    "rounded-lg": { "border-radius": "0.5rem" },
    "rounded-xl": { "border-radius": "0.75rem" },
    "rounded-full": { "border-radius": "9999px" },

    // Shadows
    shadow: {
        "box-shadow":
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    },
    "shadow-lg": {
        "box-shadow":
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    "shadow-none": { "box-shadow": "none" },
};

class QuestionManager {
    private questions: Question[];
    private categories: Record<string, QuestionCategory>;
    private challenges: Record<string, ChallengeConfig>;

    constructor() {
        this.questions = questionsData.questions as unknown as Question[];
        this.categories = questionsData.categories as Record<
            string,
            QuestionCategory
        >;
        this.challenges = questionsData.challenges as Record<
            string,
            ChallengeConfig
        >;
    }

    // Get all questions
    getAllQuestions(): Question[] {
        return this.questions;
    }

    // Get questions by category
    getQuestionsByCategory(category: string): Question[] {
        return this.questions.filter((q) => q.category === category);
    }

    // Get questions by difficulty
    getQuestionsByDifficulty(
        difficulty: "easy" | "medium" | "hard"
    ): Question[] {
        return this.questions.filter((q) => q.difficulty === difficulty);
    }

    // Get questions by tags
    getQuestionsByTags(tags: string[]): Question[] {
        return this.questions.filter((q) =>
            tags.some((tag) => q.tags.includes(tag))
        );
    }

    // Get random questions with filters
    getRandomQuestions(
        options: {
            count?: number;
            categories?: string[];
            difficulties?: ("easy" | "medium" | "hard")[];
            tags?: string[];
        } = {}
    ): Question[] {
        let filtered = this.questions;

        if (options.categories) {
            filtered = filtered.filter((q) =>
                options.categories!.includes(q.category)
            );
        }

        if (options.difficulties) {
            filtered = filtered.filter((q) =>
                options.difficulties!.includes(q.difficulty)
            );
        }

        if (options.tags) {
            filtered = filtered.filter((q) =>
                options.tags!.some((tag) => q.tags.includes(tag))
            );
        }

        // Shuffle and return requested count
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        return options.count ? shuffled.slice(0, options.count) : shuffled;
    }

    // Convert Tailwind classes to CSS object
    tailwindToCSS(tailwindClasses: string): Record<string, string> {
        const classes = tailwindClasses.toLowerCase().trim().split(/\s+/);
        const cssObject: Record<string, string> = {};

        classes.forEach((className) => {
            if (TAILWIND_CSS_MAPPING[className]) {
                Object.assign(cssObject, TAILWIND_CSS_MAPPING[className]);
            }
        });

        return cssObject;
    }

    // Parse CSS string to object
    parseCSS(css: string): Record<string, string> {
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

    // Compare CSS objects for equivalence
    compareCSSObjects(
        css1: Record<string, string>,
        css2: Record<string, string>
    ): boolean {
        const keys1 = Object.keys(css1).sort();
        const keys2 = Object.keys(css2).sort();

        if (keys1.length !== keys2.length) return false;

        return keys1.every((key) => {
            const value1 = css1[key].replace(/\s+/g, " ").trim();
            const value2 = css2[key]?.replace(/\s+/g, " ").trim();
            return value1 === value2;
        });
    }

    // Validate answer with real CSS comparison
    validateAnswer(
        questionId: string,
        userAnswer: string
    ): {
        isCorrect: boolean;
        method: "exact_match" | "css_equivalent" | "invalid";
        explanation?: string;
    } {
        const question = this.questions.find((q) => q.id === questionId);
        if (!question) {
            return {
                isCorrect: false,
                method: "invalid",
                explanation: "Question not found",
            };
        }

        const normalizedUserAnswer = userAnswer
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");

        // Method 1: Check exact matches against accepted answers
        const exactMatch = question.acceptedAnswers.some(
            (answer) =>
                answer.toLowerCase().trim().replace(/\s+/g, " ") ===
                normalizedUserAnswer
        );

        if (exactMatch) {
            return { isCorrect: true, method: "exact_match" };
        }

        // Method 2: CSS equivalence check
        try {
            const userCSS = this.tailwindToCSS(userAnswer);
            const expectedCSS = question.cssMapping;

            const isEquivalent = this.compareCSSObjects(userCSS, expectedCSS);

            if (isEquivalent) {
                return { isCorrect: true, method: "css_equivalent" };
            }

            return {
                isCorrect: false,
                method: "css_equivalent",
                explanation: `Your CSS: ${JSON.stringify(
                    userCSS
                )}, Expected: ${JSON.stringify(expectedCSS)}`,
            };
        } catch (error) {
            return {
                isCorrect: false,
                method: "invalid",
                explanation: "Could not parse Tailwind classes",
            };
        }
    }

    // Get questions for a specific challenge
    getQuestionsForChallenge(challengeId: string): Question[] {
        const challenge = this.challenges[challengeId];
        if (!challenge) return [];

        const config = challenge.config;

        return this.getRandomQuestions({
            count: config.questionCount,
            categories: config.categories,
            difficulties: config.difficulties,
            tags: config.tags,
        });
    }

    // Get all categories
    getCategories(): Record<string, QuestionCategory> {
        return this.categories;
    }

    // Get challenge config
    getChallengeConfig(challengeId: string): ChallengeConfig | null {
        return this.challenges[challengeId] || null;
    }

    // Statistics
    getStats() {
        return {
            totalQuestions: this.questions.length,
            byCategory: Object.keys(this.categories).reduce((acc, cat) => {
                acc[cat] = this.getQuestionsByCategory(cat).length;
                return acc;
            }, {} as Record<string, number>),
            byDifficulty: {
                easy: this.getQuestionsByDifficulty("easy").length,
                medium: this.getQuestionsByDifficulty("medium").length,
                hard: this.getQuestionsByDifficulty("hard").length,
            },
        };
    }
}

// Singleton instance
export const questionManager = new QuestionManager();

// Export for use in components
export default questionManager;
