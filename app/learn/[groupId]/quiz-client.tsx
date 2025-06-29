'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Heart, 
  Star,
  RefreshCw,
  Target,
  Code,
  Palette,
  Trophy,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { progressStore } from '@/lib/progressStore';

interface Question {
  id: string;
  css: string;
  tailwindClass: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizClientProps {
  questions: Question[];
  groupName: string;
  groupId: string;
}

export default function QuizClient({ questions, groupName, groupId }: QuizClientProps) {
  const router = useRouter();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [totalXPGained, setTotalXPGained] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    const normalizeAnswer = (answer: string) => {
      return answer.toLowerCase().trim().replace(/\s+/g, ' ');
    };
    
    const isAnswerCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentQuestion.tailwindClass);
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    
    if (isAnswerCorrect) {
      const xpGained = currentQuestion.difficulty === 'easy' ? 10 : 
                      currentQuestion.difficulty === 'medium' ? 15 : 20;
      setScore(score + xpGained);
      setStreak(streak + 1);
      setTotalXPGained(totalXPGained + xpGained);
    } else {
      setHearts(Math.max(0, hearts - 1));
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowResult(false);
    } else {
      // Quiz completed - save progress
      progressStore.completeLesson(groupId, totalXPGained);
      setShowCompletion(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowResult(false);
    setHearts(5);
    setScore(0);
    setStreak(0);
    setShowCompletion(false);
    setTotalXPGained(0);
  };

  const goHome = () => {
    router.push('/');
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center border-0 shadow-xl">
          <CardContent className="pt-8 pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">You completed {groupName}!</p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalXPGained}</div>
                  <div className="text-sm text-blue-700">XP Gained</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-green-700">Final Score</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button onClick={goHome} className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Zap className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button onClick={resetQuiz} variant="outline" className="w-full">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Out of Hearts!</h2>
            <p className="text-gray-600 mb-6">Don't worry, you can try again!</p>
            <div className="space-y-3">
              <Button onClick={resetQuiz} className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
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
                <h1 className="text-xl font-bold text-gray-800">{groupName}</h1>
                <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-5 h-5 ${i < hearts ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-700">{score}</span>
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
                    variant={currentQuestion.difficulty === 'easy' ? 'secondary' : 
                            currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'}
                  >
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <pre className="text-green-400 whitespace-pre-wrap">
                  {currentQuestion.css}
                </pre>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Task:</strong> What TailwindCSS class(es) would produce this CSS?
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  XP: {currentQuestion.difficulty === 'easy' ? '10' : 
                       currentQuestion.difficulty === 'medium' ? '15' : '20'}
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
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter TailwindCSS class(es)..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  disabled={showResult}
                  onKeyPress={(e) => e.key === 'Enter' && !showResult && userAnswer.trim() && checkAnswer()}
                />
                
                {showResult && (
                  <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {isCorrect ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                      {isCorrect && (
                        <Badge className="bg-green-100 text-green-700">
                          +{currentQuestion.difficulty === 'easy' ? '10' : 
                            currentQuestion.difficulty === 'medium' ? '15' : '20'} XP
                        </Badge>
                      )}
                    </div>
                    
                    {!isCorrect && (
                      <p className="text-sm text-red-700 mb-2">
                        <strong>Correct answer:</strong> <code className="bg-red-100 px-1 rounded">{currentQuestion.tailwindClass}</code>
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-700">
                      {currentQuestion.explanation}
                    </p>
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
                      className={`flex-1 ${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete'}
                    </Button>
                  )}
                </div>
                
                {streak > 0 && (
                  <div className="flex items-center justify-center space-x-2 text-orange-600">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">{streak} streak!</span>
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