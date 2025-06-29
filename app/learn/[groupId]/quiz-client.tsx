"use client";

import AchievementNotification from "@/components/ui/achievement-notification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { achievementsStore } from "@/lib/achievementsStore";
import { progressStore } from "@/lib/progressStore";
import {
    ArrowLeft,
    BookOpen,
    Check,
    Code,
    Eye,
    EyeOff,
    Heart,
    HelpCircle,
    Lightbulb,
    Palette,
    RefreshCw,
    Star,
    Target,
    Trophy,
    X,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Question {
    id: string;
    css: string;
    tailwindClass: string;
    explanation: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
}

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: "progress" | "streak" | "mastery" | "special";
    rarity: "common" | "rare" | "epic" | "legendary";
    reward: {
        xp: number;
        title?: string;
    };
}

interface QuizClientProps {
    questions: Question[];
    groupName: string;
    groupId: string;
}

export default function QuizClient({
    questions,
    groupName,
    groupId,
}: QuizClientProps) {
    const router = useRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [hearts, setHearts] = useState(5);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [showCompletion, setShowCompletion] = useState(false);
    const [totalXPGained, setTotalXPGained] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
    const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
    const [questionStartTime, setQuestionStartTime] = useState<number>(
        Date.now()
    );
    const [usedHintThisQuestion, setUsedHintThisQuestion] = useState(false);
    const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
    const [correctAnswersInQuiz, setCorrectAnswersInQuiz] = useState(0);

    const currentQuestion = reviewMode
        ? reviewQuestions[currentQuestionIndex]
        : questions[currentQuestionIndex];
    const totalQuestions = reviewMode
        ? reviewQuestions.length
        : questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    // Generate hint based on the correct answer
    const generateHint = (tailwindClass: string, category: string) => {
        const hints = {
            Flexbox:
                "Think about flex properties - this controls how flex items behave.",
            Grid: "This is a CSS Grid property - consider columns, rows, or gaps.",
            Positioning:
                "This relates to element positioning - absolute, relative, or fixed.",
            "Font Size":
                "This controls text size - remember Tailwind uses t-shirt sizing (xs, sm, lg, xl, etc.).",
            "Font Weight": "This controls how bold or light the text appears.",
            "Text Color": "This sets the color of text - use the text- prefix.",
            "Background Color":
                "This sets the background color - use the bg- prefix.",
            Margin: "This adds space outside the element - use m- prefix.",
            Padding: "This adds space inside the element - use p- prefix.",
            Width: "This controls element width - use w- prefix.",
            Height: "This controls element height - use h- prefix.",
            Shadows: "This adds depth with shadows - use shadow- prefix.",
            Transform:
                "This transforms the element - scale, rotate, translate, or skew.",
            Transitions:
                "This creates smooth animations - use transition- prefix.",
            "Border Radius": "This rounds corners - use rounded- prefix.",
            Display:
                "This controls how elements are displayed - block, flex, grid, etc.",
            Gradients:
                "This creates color gradients - use bg-gradient- prefix.",
            Opacity:
                "This controls transparency - use opacity- or color/opacity syntax.",
            Filters: "This applies visual effects - blur, grayscale, etc.",
            "Backdrop Filter":
                "This applies effects to the background - backdrop- prefix.",
        };

        const specificHints = {
            flex: "Creates a flex container",
            grid: "Creates a grid container",
            block: "Makes element display as block",
            hidden: "Hides the element",
            "text-": "For text colors, use text-[color]-[shade]",
            "bg-": "For backgrounds, use bg-[color]-[shade]",
            "p-": "For padding, use p-[size] or py-/px- for specific sides",
            "m-": "For margins, use m-[size] or my-/mx- for specific sides",
            rounded:
                "For border radius, use rounded, rounded-lg, rounded-full, etc.",
            shadow: "For shadows, use shadow-sm, shadow, shadow-lg, shadow-xl, etc.",
        };

        // Check for specific hints first
        for (const [key, hint] of Object.entries(specificHints)) {
            if (tailwindClass.includes(key)) {
                return hint;
            }
        }

        return (
            hints[category as keyof typeof hints] ||
            "Think about what CSS property this represents and its Tailwind equivalent."
        );
    };

    // Generate visual preview of the CSS
    const generatePreview = (css: string, tailwindClass: string) => {
        const previewElement = {
            width: "100px",
            height: "60px",
            backgroundColor: "#f3f4f6",
            border: "2px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: "#374151",
            ...parseCSS(css),
        };

        return previewElement;
    };

    // Simple CSS parser for preview
    const parseCSS = (css: string) => {
        const styles: any = {};
        const rules = css.split(";").filter((rule) => rule.trim());

        rules.forEach((rule) => {
            const [property, value] = rule.split(":").map((s) => s.trim());
            if (property && value) {
                const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
                    g[1].toUpperCase()
                );
                styles[camelCaseProperty] = value;
            }
        });

        return styles;
    };

    const checkAnswer = () => {
        if (!currentQuestion) return;

        const normalizeAnswer = (answer: string) => {
            return answer.toLowerCase().trim().replace(/\s+/g, " ");
        };

        const isAnswerCorrect =
            normalizeAnswer(userAnswer) ===
            normalizeAnswer(currentQuestion.tailwindClass);
        setIsCorrect(isAnswerCorrect);
        setShowResult(true);

        // Calculate time spent on question
        const timeSpent = (Date.now() - questionStartTime) / 1000;

        // Record the answer in achievements
        const newAchievements = achievementsStore.recordQuestionAnswer(
            isAnswerCorrect,
            timeSpent,
            usedHintThisQuestion
        );

        if (newAchievements.length > 0) {
            setNewAchievements((prev) => [...prev, ...newAchievements]);
        }

        if (isAnswerCorrect) {
            const xpGained =
                currentQuestion.difficulty === "easy"
                    ? 10
                    : currentQuestion.difficulty === "medium"
                    ? 15
                    : 20;
            setScore(score + xpGained);
            setStreak(streak + 1);
            setTotalXPGained(totalXPGained + xpGained);
            setCorrectAnswersInQuiz(correctAnswersInQuiz + 1);
        } else {
            setHearts(Math.max(0, hearts - 1));
            setStreak(0);
            // Add to incorrect answers for review
            if (!incorrectAnswers.includes(currentQuestionIndex)) {
                setIncorrectAnswers([
                    ...incorrectAnswers,
                    currentQuestionIndex,
                ]);
            }
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer("");
            setShowResult(false);
            setShowHint(false);
            setShowPreview(false);
            setQuestionStartTime(Date.now());
            setUsedHintThisQuestion(false);
        } else {
            // Quiz completed - record completion
            const perfectScore = correctAnswersInQuiz === totalQuestions;
            const completionAchievements =
                achievementsStore.recordQuizCompletion(perfectScore, streak);

            if (completionAchievements.length > 0) {
                setNewAchievements((prev) => [
                    ...prev,
                    ...completionAchievements,
                ]);
            }

            // Check if group is completed
            if (!reviewMode && correctAnswersInQuiz === totalQuestions) {
                const groupAchievements =
                    achievementsStore.recordGroupCompletion(groupId);
                if (groupAchievements.length > 0) {
                    setNewAchievements((prev) => [
                        ...prev,
                        ...groupAchievements,
                    ]);
                }
            }

            if (reviewMode) {
                // Completed review mode
                const reviewAchievements =
                    achievementsStore.recordReviewSession();
                if (reviewAchievements.length > 0) {
                    setNewAchievements((prev) => [
                        ...prev,
                        ...reviewAchievements,
                    ]);
                }
                setShowCompletion(true);
            } else if (incorrectAnswers.length > 0) {
                // Offer review mode
                const reviewQs = incorrectAnswers.map(
                    (index) => questions[index]
                );
                setReviewQuestions(reviewQs);
                setShowCompletion(true);
            } else {
                // Quiz completed perfectly - save progress
                progressStore.completeLesson(groupId, totalXPGained);
                setShowCompletion(true);
            }
        }
    };

    const startReviewMode = () => {
        const reviewQs = incorrectAnswers.map((index) => questions[index]);
        setReviewQuestions(reviewQs);
        setReviewMode(true);
        setCurrentQuestionIndex(0);
        setUserAnswer("");
        setShowResult(false);
        setShowCompletion(false);
        setShowHint(false);
        setShowPreview(false);
        setHearts(5);
        setStreak(0);
        setQuestionStartTime(Date.now());
        setUsedHintThisQuestion(false);
        setCorrectAnswersInQuiz(0);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswer("");
        setShowResult(false);
        setHearts(5);
        setScore(0);
        setStreak(0);
        setShowCompletion(false);
        setTotalXPGained(0);
        setShowHint(false);
        setShowPreview(false);
        setReviewMode(false);
        setIncorrectAnswers([]);
        setReviewQuestions([]);
        setQuestionStartTime(Date.now());
        setUsedHintThisQuestion(false);
        setCorrectAnswersInQuiz(0);
    };

    const goHome = () => {
        if (!reviewMode) {
            progressStore.completeLesson(groupId, totalXPGained);
        }
        router.push("/");
    };

    const handleShowHint = () => {
        setShowHint(!showHint);
        if (!showHint && !usedHintThisQuestion) {
            setUsedHintThisQuestion(true);
        }
    };

    const dismissAchievement = (achievementId: string) => {
        setNewAchievements((prev) =>
            prev.filter((a) => a.id !== achievementId)
        );
    };

    if (showCompletion) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <Card className="w-full max-w-md text-center border-0 shadow-xl">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {reviewMode
                                ? "Review Complete!"
                                : "Congratulations!"}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {reviewMode
                                ? "You've reviewed your missed questions!"
                                : `You completed ${groupName}!`}
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {totalXPGained}
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        XP Gained
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {score}
                                    </div>
                                    <div className="text-sm text-green-700">
                                        Final Score
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!reviewMode && incorrectAnswers.length > 0 && (
                            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800 mb-2">
                                    You missed {incorrectAnswers.length}{" "}
                                    question
                                    {incorrectAnswers.length > 1 ? "s" : ""}.
                                    Want to review them?
                                </p>
                                <Button
                                    onClick={startReviewMode}
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                                >
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Review Missed Questions
                                </Button>
                            </div>
                        )}

                        <div className="space-y-3">
                            <Button
                                onClick={goHome}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                Continue Learning
                            </Button>
                            <Button
                                onClick={resetQuiz}
                                variant="outline"
                                className="w-full"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Practice Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (hearts === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <Card className="w-full max-w-md text-center border-0 shadow-xl">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Out of Hearts!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Don&apos;t worry, you can try again!
                        </p>
                        <div className="space-y-3">
                            <Button
                                onClick={resetQuiz}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                            <Link href="/">
                                <Button variant="outline" className="w-full">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Achievement Notifications */}
            {newAchievements.map((achievement, index) => (
                <div
                    key={achievement.id}
                    style={{ top: `${4 + index * 100}px` }}
                >
                    <AchievementNotification
                        achievement={achievement}
                        onClose={() => dismissAchievement(achievement.id)}
                    />
                </div>
            ))}

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    {groupName} {reviewMode && "(Review Mode)"}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Question {currentQuestionIndex + 1} of{" "}
                                    {totalQuestions}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Heart
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < hearts
                                                ? "text-red-500 fill-current"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Target className="w-5 h-5 text-blue-500" />
                                <span className="font-semibold text-gray-700">
                                    {score}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Progress value={progress} className="mt-3 h-2" />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Question */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Code className="w-5 h-5" />
                                    <span>CSS Code</span>
                                </CardTitle>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="outline">
                                        {currentQuestion.category}
                                    </Badge>
                                    <Badge
                                        variant={
                                            currentQuestion.difficulty ===
                                            "easy"
                                                ? "secondary"
                                                : currentQuestion.difficulty ===
                                                  "medium"
                                                ? "default"
                                                : "destructive"
                                        }
                                    >
                                        {currentQuestion.difficulty}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
                                <pre className="text-green-400 whitespace-pre-wrap">
                                    {currentQuestion.css}
                                </pre>
                            </div>

                            {/* Visual Preview */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Visual Preview
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setShowPreview(!showPreview)
                                        }
                                    >
                                        {showPreview ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                                {showPreview && (
                                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                                        <div
                                            style={generatePreview(
                                                currentQuestion.css,
                                                currentQuestion.tailwindClass
                                            )}
                                            className="transition-all duration-300"
                                        >
                                            Preview
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Task:</strong> What TailwindCSS
                                    class(es) would produce this CSS?
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    XP:{" "}
                                    {currentQuestion.difficulty === "easy"
                                        ? "10"
                                        : currentQuestion.difficulty ===
                                          "medium"
                                        ? "15"
                                        : "20"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Answer Input */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Palette className="w-5 h-5" />
                                <span>Your Answer</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) =>
                                        setUserAnswer(e.target.value)
                                    }
                                    placeholder="Enter TailwindCSS class(es)..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                                    disabled={showResult}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" &&
                                        !showResult &&
                                        userAnswer.trim() &&
                                        checkAnswer()
                                    }
                                />

                                {/* Hint System */}
                                {!showResult && (
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleShowHint}
                                            className="flex-1"
                                        >
                                            <Lightbulb className="w-4 h-4 mr-2" />
                                            {showHint
                                                ? "Hide Hint"
                                                : "Show Hint"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setShowPreview(!showPreview)
                                            }
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                {showHint && !showResult && (
                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div className="flex items-start space-x-2">
                                            <HelpCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-yellow-800">
                                                {generateHint(
                                                    currentQuestion.tailwindClass,
                                                    currentQuestion.category
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {showResult && (
                                    <div
                                        className={`p-4 rounded-lg ${
                                            isCorrect
                                                ? "bg-green-50 border border-green-200"
                                                : "bg-red-50 border border-red-200"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2 mb-2">
                                            {isCorrect ? (
                                                <Check className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500" />
                                            )}
                                            <span
                                                className={`font-semibold ${
                                                    isCorrect
                                                        ? "text-green-700"
                                                        : "text-red-700"
                                                }`}
                                            >
                                                {isCorrect
                                                    ? "Correct!"
                                                    : "Incorrect"}
                                            </span>
                                            {isCorrect && (
                                                <Badge className="bg-green-100 text-green-700">
                                                    +
                                                    {currentQuestion.difficulty ===
                                                    "easy"
                                                        ? "10"
                                                        : currentQuestion.difficulty ===
                                                          "medium"
                                                        ? "15"
                                                        : "20"}{" "}
                                                    XP
                                                </Badge>
                                            )}
                                        </div>

                                        {!isCorrect && (
                                            <p className="text-sm text-red-700 mb-2">
                                                <strong>Correct answer:</strong>{" "}
                                                <code className="bg-red-100 px-1 rounded">
                                                    {
                                                        currentQuestion.tailwindClass
                                                    }
                                                </code>
                                            </p>
                                        )}

                                        <div className="bg-white/50 p-3 rounded border-l-4 border-l-blue-400">
                                            <p className="text-sm text-gray-700 font-medium mb-1">
                                                Explanation:
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex space-x-3">
                                    {!showResult ? (
                                        <Button
                                            onClick={checkAnswer}
                                            disabled={!userAnswer.trim()}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                        >
                                            Check Answer
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={nextQuestion}
                                            className={`flex-1 ${
                                                isCorrect
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : "bg-blue-500 hover:bg-blue-600"
                                            }`}
                                        >
                                            {currentQuestionIndex <
                                            totalQuestions - 1
                                                ? "Next Question"
                                                : "Complete"}
                                        </Button>
                                    )}
                                </div>

                                {streak > 0 && (
                                    <div className="flex items-center justify-center space-x-2 text-orange-600">
                                        <Star className="w-4 h-4" />
                                        <span className="text-sm font-semibold">
                                            {streak} streak!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
