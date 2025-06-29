"use client";

import AchievementNotification from "@/components/ui/achievement-notification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { achievementsStore } from "@/lib/achievementsStore";
import { challengeStore } from "@/lib/challengeStore";
import { questionSets } from "@/lib/quizData";
import {
    ArrowLeft,
    Check,
    Clock,
    Eye,
    EyeOff,
    Heart,
    HelpCircle,
    Lightbulb,
    Pause,
    Play,
    RotateCcw,
    Skull,
    Target,
    Trophy,
    X,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Question {
    id: string;
    css: string;
    tailwindClass: string;
    explanation: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
}

interface Challenge {
    id: string;
    name: string;
    description: string;
    icon: string;
    type: "timed" | "survival" | "themed" | "practice";
    difficulty: "easy" | "medium" | "hard";
    config: {
        timeLimit?: number;
        lives?: number;
        questionCount?: number;
        categories?: string[];
        allowHints?: boolean;
        allowPreview?: boolean;
    };
    rewards: {
        xp: number;
        badge?: string;
        title?: string;
    };
}

interface ChallengeClientProps {
    challengeId: string;
}

export default function ChallengeClient({ challengeId }: ChallengeClientProps) {
    const router = useRouter();

    // Get challenge and questions
    const challenge = challengeStore.getChallenge(challengeId);

    if (!challenge) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Challenge not found.</p>
                    <Link href="/challenges">
                        <Button className="mt-4">Back to Challenges</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Generate questions based on challenge config
    let questionsArray: Question[] = [];

    if (challenge.config.categories) {
        // Filter questions by categories
        const allQuestions = Object.values(questionSets).flat();
        questionsArray = allQuestions.filter((q) =>
            challenge.config.categories!.includes(q.category)
        );
    } else {
        // Use all questions
        questionsArray = Object.values(questionSets).flat();
    }

    // Shuffle and limit questions
    questionsArray = questionsArray.sort(() => Math.random() - 0.5);
    if (challenge.config.questionCount) {
        questionsArray = questionsArray.slice(
            0,
            challenge.config.questionCount
        );
    }

    if (questionsArray.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">
                        No questions available for this challenge.
                    </p>
                    <Link href="/challenges">
                        <Button className="mt-4">Back to Challenges</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const questions = questionsArray;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [lives, setLives] = useState(challenge.config.lives || 5);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(challenge.config.timeLimit || 0);
    const [isPaused, setIsPaused] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [startTime] = useState(Date.now());
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [usedHintThisQuestion, setUsedHintThisQuestion] = useState(false);
    const [newAchievements, setNewAchievements] = useState<any[]>([]);

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    // Timer effect
    useEffect(() => {
        if (
            challenge.config.timeLimit &&
            timeLeft > 0 &&
            !isPaused &&
            !showResult &&
            !showCompletion
        ) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setShowCompletion(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [
        challenge.config.timeLimit,
        timeLeft,
        isPaused,
        showResult,
        showCompletion,
    ]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const generateHint = (tailwindClass: string, category: string) => {
        const hints = {
            Flexbox:
                "Think about flex properties - this controls how flex items behave.",
            Grid: "This is a CSS Grid property - consider columns, rows, or gaps.",
            Positioning:
                "This relates to element positioning - absolute, relative, or fixed.",
            "Font Size":
                "This controls text size - remember Tailwind uses t-shirt sizing.",
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

        return Object.prototype.hasOwnProperty.call(hints, category)
            ? hints[category as keyof typeof hints]
            : "Think about what CSS property this represents and its Tailwind equivalent.";
    };

    const generatePreview = (css: string) => {
        const parseCSS = (css: string) => {
            const styles: any = {};
            const rules = css.split(";").filter((rule) => rule.trim());

            rules.forEach((rule) => {
                const [property, value] = rule.split(":").map((s) => s.trim());
                if (property && value) {
                    const camelCaseProperty = property.replace(
                        /-([a-z])/g,
                        (g) => g[1].toUpperCase()
                    );
                    styles[camelCaseProperty] = value;
                }
            });

            return styles;
        };

        return {
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
            const baseXP =
                currentQuestion.difficulty === "easy"
                    ? 10
                    : currentQuestion.difficulty === "medium"
                    ? 15
                    : 20;

            // Bonus XP for challenges
            const bonusMultiplier =
                challenge.type === "timed"
                    ? 1.5
                    : challenge.type === "survival"
                    ? 1.3
                    : challenge.type === "themed"
                    ? 1.2
                    : 1;

            const xpGained = Math.round(baseXP * bonusMultiplier);
            setScore(score + xpGained);
            setStreak(streak + 1);
            setCorrectAnswers(correctAnswers + 1);
        } else {
            if (challenge.type === "survival") {
                setLives(Math.max(0, lives - 1));
            }
            setStreak(0);
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
            completeChallenge();
        }
    };

    const completeChallenge = () => {
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

        // Record challenge completion
        challengeStore.completeChallenge(
            challenge.id,
            score,
            totalTime,
            accuracy
        );

        // Record achievements
        const perfectScore = correctAnswers === totalQuestions;
        const completionAchievements = achievementsStore.recordQuizCompletion(
            perfectScore,
            streak
        );

        if (completionAchievements.length > 0) {
            setNewAchievements((prev) => [...prev, ...completionAchievements]);
        }

        setShowCompletion(true);
    };

    const handleShowHint = () => {
        if (challenge.config.allowHints) {
            setShowHint(!showHint);
            if (!showHint && !usedHintThisQuestion) {
                setUsedHintThisQuestion(true);
            }
        }
    };

    const dismissAchievement = (achievementId: string) => {
        setNewAchievements((prev) =>
            prev.filter((a) => a.id !== achievementId)
        );
    };

    // Game over conditions
    if (
        (challenge.type === "survival" && lives === 0) ||
        (challenge.config.timeLimit && timeLeft === 0 && !showCompletion)
    ) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <Card className="w-full max-w-md text-center border-0 shadow-xl">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Skull className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Challenge Failed!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {challenge.type === "survival"
                                ? "You ran out of lives!"
                                : "Time's up!"}
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-600">
                                        {score}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        Final Score
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-600">
                                        {correctAnswers}/{totalQuestions}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        Correct
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Button
                                onClick={() => window.location.reload()}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                            <Link href="/challenges">
                                <Button variant="outline" className="w-full">
                                    Back to Challenges
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (showCompletion) {
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <Card className="w-full max-w-md text-center border-0 shadow-xl">
                    <CardContent className="pt-8 pb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Challenge Complete!
                        </h2>
                        <p className="text-gray-600 mb-4">{challenge.name}</p>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {score}
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        Score
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {accuracy}%
                                    </div>
                                    <div className="text-sm text-green-700">
                                        Accuracy
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {formatTime(totalTime)}
                                    </div>
                                    <div className="text-sm text-purple-700">
                                        Time
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-orange-600">
                                        {correctAnswers}/{totalQuestions}
                                    </div>
                                    <div className="text-sm text-orange-700">
                                        Correct
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rewards */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <Zap className="w-5 h-5 text-yellow-600" />
                                <span className="font-semibold text-yellow-800">
                                    Rewards Earned
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-700">
                                {challenge.rewards.xp} XP
                            </div>
                            {challenge.rewards.badge && (
                                <Badge className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                                    {challenge.rewards.badge}
                                </Badge>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => window.location.reload()}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                            >
                                <Play className="w-4 h-4 mr-2" />
                                Play Again
                            </Button>
                            <Link href="/challenges">
                                <Button variant="outline" className="w-full">
                                    Back to Challenges
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
                            <Link href="/challenges">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    {challenge.name}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Question {currentQuestionIndex + 1} of{" "}
                                    {totalQuestions}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {challenge.config.timeLimit && (
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span
                                        className={`font-semibold ${
                                            timeLeft < 30
                                                ? "text-red-600"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {formatTime(timeLeft)}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsPaused(!isPaused)}
                                    >
                                        {isPaused ? (
                                            <Play className="w-4 h-4" />
                                        ) : (
                                            <Pause className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            )}

                            {challenge.type === "survival" && (
                                <div className="flex items-center space-x-1">
                                    {Array.from({
                                        length: challenge.config.lives || 3,
                                    }).map((_, i) => (
                                        <Heart
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < lives
                                                    ? "text-red-500 fill-current"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

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
                                    <Target className="w-5 h-5" />
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
                            {challenge.config.allowPreview && (
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
                                                    currentQuestion.css
                                                )}
                                                className="transition-all duration-300"
                                            >
                                                Preview
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Task:</strong> What TailwindCSS
                                    class(es) would produce this CSS?
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                    Challenge Type: {challenge.type}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Answer Input */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Zap className="w-5 h-5" />
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
                                    disabled={showResult || isPaused}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" &&
                                        !showResult &&
                                        userAnswer.trim() &&
                                        checkAnswer()
                                    }
                                />

                                {/* Hint System */}
                                {challenge.config.allowHints && !showResult && (
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
                                    </div>
                                )}

                                {showHint &&
                                    !showResult &&
                                    challenge.config.allowHints && (
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
                                            disabled={
                                                !userAnswer.trim() || isPaused
                                            }
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
                                                : "Complete Challenge"}
                                        </Button>
                                    )}
                                </div>

                                {streak > 0 && (
                                    <div className="flex items-center justify-center space-x-2 text-orange-600">
                                        <Trophy className="w-4 h-4" />
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
