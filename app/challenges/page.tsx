'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Clock,
  Target,
  Zap,
  Skull,
  Trophy,
  Star,
  Lock,
  Play,
  Timer,
  Heart,
  Palette,
  Layout,
  Sparkles,
  Smartphone,
  Award,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { challengeStore } from '@/lib/challengeStore';

interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'timed' | 'survival' | 'themed' | 'practice';
  difficulty: 'easy' | 'medium' | 'hard';
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
  requirements?: {
    minLevel?: number;
    completedGroups?: string[];
    achievements?: string[];
  };
}

const typeIcons = {
  practice: Target,
  timed: Clock,
  survival: Skull,
  themed: Palette
};

const difficultyColors = {
  easy: 'from-green-400 to-green-600',
  medium: 'from-yellow-400 to-orange-500',
  hard: 'from-red-400 to-red-600'
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChallenges(challengeStore.getAllChallenges());
  }, []);

  const progress = challengeStore.getProgress();
  const stats = challengeStore.getCompletionStats();

  const filteredChallenges = selectedType === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.type === selectedType);

  const availableChallenges = filteredChallenges.filter(challenge => 
    challengeStore.isChallengeUnlocked(challenge)
  );

  const getTypeIcon = (type: string) => {
    const IconComponent = typeIcons[type as keyof typeof typeIcons] || Target;
    return IconComponent;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Challenges & Practice
                </h1>
                <p className="text-sm text-gray-600">Test your skills with special challenges</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">{stats.completed}/{stats.total}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Challenge Progress</CardTitle>
                <p className="text-purple-100">Push your limits and earn exclusive rewards!</p>
              </div>
              <Award className="w-12 h-12 text-yellow-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Challenges Completed</span>
                  <span>{stats.completionPercentage}%</span>
                </div>
                <Progress value={stats.completionPercentage} className="h-3 bg-purple-400/30" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{stats.completed}</div>
                  <div className="text-sm text-purple-100">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.available}</div>
                  <div className="text-sm text-purple-100">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.totalChallengesCompleted}</div>
                  <div className="text-sm text-purple-100">Total Attempts</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedType('all')}
            className="flex items-center space-x-2"
          >
            <Star className="w-4 h-4" />
            <span>All Challenges</span>
          </Button>
          <Button
            variant={selectedType === 'practice' ? 'default' : 'outline'}
            onClick={() => setSelectedType('practice')}
            className="flex items-center space-x-2"
          >
            <Target className="w-4 h-4" />
            <span>Practice</span>
          </Button>
          <Button
            variant={selectedType === 'timed' ? 'default' : 'outline'}
            onClick={() => setSelectedType('timed')}
            className="flex items-center space-x-2"
          >
            <Clock className="w-4 h-4" />
            <span>Timed</span>
          </Button>
          <Button
            variant={selectedType === 'survival' ? 'default' : 'outline'}
            onClick={() => setSelectedType('survival')}
            className="flex items-center space-x-2"
          >
            <Skull className="w-4 h-4" />
            <span>Survival</span>
          </Button>
          <Button
            variant={selectedType === 'themed' ? 'default' : 'outline'}
            onClick={() => setSelectedType('themed')}
            className="flex items-center space-x-2"
          >
            <Palette className="w-4 h-4" />
            <span>Themed</span>
          </Button>
        </div>

        {/* Challenges Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => {
            const TypeIcon = getTypeIcon(challenge.type);
            const isUnlocked = challengeStore.isChallengeUnlocked(challenge);
            const isCompleted = challengeStore.isCompleted(challenge.id);
            const bestScore = challengeStore.getBestScore(challenge.id);

            return (
              <Card 
                key={challenge.id}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 ${
                  isUnlocked 
                    ? 'cursor-pointer bg-white shadow-lg' 
                    : 'cursor-not-allowed bg-gray-100 opacity-60'
                }`}
              >
                {isUnlocked ? (
                  <Link href={`/challenges/${challenge.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${difficultyColors[challenge.difficulty]} flex items-center justify-center`}>
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1">
                          {isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
                          <Badge 
                            variant={challenge.difficulty === 'easy' ? 'secondary' : challenge.difficulty === 'medium' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{challenge.name}</CardTitle>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Challenge Details */}
                        <div className="flex flex-wrap gap-2 text-xs">
                          {challenge.config.timeLimit && (
                            <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              <Timer className="w-3 h-3" />
                              <span>{formatTime(challenge.config.timeLimit)}</span>
                            </div>
                          )}
                          {challenge.config.lives && (
                            <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded">
                              <Heart className="w-3 h-3" />
                              <span>{challenge.config.lives} lives</span>
                            </div>
                          )}
                          {challenge.config.questionCount && (
                            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded">
                              <Target className="w-3 h-3" />
                              <span>{challenge.config.questionCount} questions</span>
                            </div>
                          )}
                        </div>

                        {/* Best Score */}
                        {bestScore && (
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-yellow-800">Best Score:</span>
                              <span className="font-bold text-yellow-900">{bestScore.score} pts</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-yellow-700 mt-1">
                              <span>Accuracy: {bestScore.accuracy}%</span>
                              <span>Time: {formatTime(bestScore.time)}</span>
                            </div>
                          </div>
                        )}

                        {/* Rewards */}
                        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                          <div className="text-xs text-purple-700 mb-1">Rewards:</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-800">{challenge.rewards.xp} XP</span>
                            </div>
                            {challenge.rewards.badge && (
                              <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">
                                {challenge.rewards.badge}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button 
                          className={`w-full ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'}`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isCompleted ? 'Play Again' : 'Start Challenge'}
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                ) : (
                  <>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-gray-300 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gray-500" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Locked
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-gray-500">{challenge.name}</CardTitle>
                      <p className="text-sm text-gray-400">{challenge.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {challenge.requirements && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-2">Requirements:</div>
                            {challenge.requirements.completedGroups && (
                              <div className="text-xs text-gray-500">
                                Complete: {challenge.requirements.completedGroups.join(', ')}
                              </div>
                            )}
                            {challenge.requirements.achievements && (
                              <div className="text-xs text-gray-500">
                                Unlock: {challenge.requirements.achievements.join(', ')}
                              </div>
                            )}
                          </div>
                        )}
                        <Button disabled className="w-full">
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Challenge Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {challengeStore.getChallengesByType('practice').filter(c => challengeStore.isCompleted(c.id)).length}
                </div>
                <div className="text-sm text-blue-700">Practice Completed</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {challengeStore.getChallengesByType('timed').filter(c => challengeStore.isCompleted(c.id)).length}
                </div>
                <div className="text-sm text-green-700">Timed Challenges</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {challengeStore.getChallengesByType('survival').filter(c => challengeStore.isCompleted(c.id)).length}
                </div>
                <div className="text-sm text-red-700">Survival Modes</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {challengeStore.getChallengesByType('themed').filter(c => challengeStore.isCompleted(c.id)).length}
                </div>
                <div className="text-sm text-purple-700">Themed Challenges</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}