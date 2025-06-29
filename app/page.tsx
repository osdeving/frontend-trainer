'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Lock, 
  CheckCircle, 
  Circle, 
  Flame,
  Target,
  Zap,
  Palette,
  Layout,
  Type,
  Move,
  Sparkles,
  Settings,
  Award,
  Crown,
  Swords,
  Clock,
  Skull,
  Users,
  TrendingUp,
  User,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { progressStore } from '@/lib/progressStore';
import { achievementsStore } from '@/lib/achievementsStore';
import { challengeStore } from '@/lib/challengeStore';
import { leaderboardStore } from '@/lib/leaderboardStore';
import AchievementsModal from '@/components/ui/achievements-modal';

interface ClassGroup {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
}

const classGroups: ClassGroup[] = [
  {
    id: 'layout',
    name: 'Layout & Positioning',
    description: 'Master flexbox, grid, and positioning',
    icon: Layout,
    difficulty: 'Beginner',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Text styling, fonts, and spacing',
    icon: Type,
    difficulty: 'Beginner',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'colors',
    name: 'Colors & Backgrounds',
    description: 'Color system and background utilities',
    icon: Palette,
    difficulty: 'Intermediate',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'spacing',
    name: 'Spacing & Sizing',
    description: 'Margins, padding, and dimensions',
    icon: Move,
    difficulty: 'Beginner',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'effects',
    name: 'Effects & Animations',
    description: 'Shadows, transforms, and transitions',
    icon: Sparkles,
    difficulty: 'Advanced',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'responsive',
    name: 'Responsive Design',
    description: 'Breakpoints and responsive utilities',
    icon: Target,
    difficulty: 'Advanced',
    color: 'from-indigo-500 to-indigo-600'
  }
];

export default function Home() {
  const [progress, setProgress] = useState(progressStore.getProgress());
  const [mounted, setMounted] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Refresh progress when component mounts
    setProgress(progressStore.getProgress());
  }, []);

  const totalProgress = progressStore.getTotalProgress();
  const completedGroups = progressStore.getCompletedGroups();
  const inProgressGroups = progressStore.getInProgressGroups();
  const totalCompletedLessons = progressStore.getTotalCompletedLessons();
  
  // Achievement stats
  const achievementProgress = achievementsStore.getProgress();
  const unlockedAchievements = achievementsStore.getUnlockedCount();
  const totalAchievements = achievementsStore.getTotalAchievements();
  const activeTitle = achievementsStore.getActiveTitle();

  // Challenge stats
  const challengeStats = challengeStore.getCompletionStats();

  // Leaderboard stats
  const leaderboardStats = leaderboardStore.getLeaderboardStats();
  const currentUser = leaderboardStore.getCurrentUser();

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      progressStore.resetProgress();
      achievementsStore.resetProgress();
      challengeStore.resetProgress();
      leaderboardStore.resetData();
      setProgress(progressStore.getProgress());
    }
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TailwindTrainer
                </h1>
                <p className="text-sm text-gray-600">
                  {activeTitle ? `${activeTitle} • Master CSS utilities` : 'Master CSS utilities'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-700">{progress.streak}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">{progress.totalXP.toLocaleString()}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAchievements(true)}
                className="text-gray-600 hover:text-purple-600"
              >
                <Trophy className="w-4 h-4 mr-1" />
                <span className="text-sm">{unlockedAchievements}/{totalAchievements}</span>
              </Button>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetProgress}
                className="text-gray-500 hover:text-red-500"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Your Progress</CardTitle>
                <p className="text-blue-100">Keep going! You&apos;re doing great!</p>
              </div>
              <Trophy className="w-12 h-12 text-yellow-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-3 bg-blue-400/30" />
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{completedGroups}</div>
                  <div className="text-sm text-blue-100">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{inProgressGroups}</div>
                  <div className="text-sm text-blue-100">In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalCompletedLessons}</div>
                  <div className="text-sm text-blue-100">Lessons Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">#{leaderboardStats.userRank}</div>
                  <div className="text-sm text-blue-100">Global Rank</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600">{achievementProgress.stats.correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{achievementProgress.stats.maxStreak}</div>
              <div className="text-sm text-gray-600">Best Streak</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{achievementProgress.stats.perfectQuizzes}</div>
              <div className="text-sm text-gray-600">Perfect Quizzes</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-red-600">{challengeStats.completed}</div>
              <div className="text-sm text-gray-600">Challenges Won</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Challenges Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-pink-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Special Challenges</h3>
                  <p className="text-red-100 text-sm">Test your skills with timed and survival modes</p>
                </div>
                <Swords className="w-12 h-12 text-red-200" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <div className="text-red-100">Completed</div>
                  <div className="text-2xl font-bold">{challengeStats.completed}/{challengeStats.total}</div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-1 bg-red-400/30 px-2 py-1 rounded">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">Timed</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-red-400/30 px-2 py-1 rounded">
                    <Skull className="w-3 h-3" />
                    <span className="text-xs">Survival</span>
                  </div>
                </div>
              </div>
              <Link href="/challenges">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Swords className="w-4 h-4 mr-2" />
                  Enter Challenges
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Leaderboard Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
                  <p className="text-blue-100 text-sm">Compete with learners worldwide</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-200" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <div className="text-blue-100">Global Rank</div>
                  <div className="text-2xl font-bold">#{leaderboardStats.userRank}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-blue-100">League</div>
                  <div className="font-semibold">{currentUser.league}</div>
                </div>
              </div>
              <Link href="/leaderboard">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Rankings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Achievements</h3>
                  <p className="text-yellow-100 text-sm">Unlock badges and earn exclusive titles</p>
                </div>
                <Crown className="w-12 h-12 text-yellow-200" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <div className="text-yellow-100">Unlocked</div>
                  <div className="text-2xl font-bold">{unlockedAchievements}/{totalAchievements}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-yellow-100">Active Title</div>
                  <div className="font-semibold">{activeTitle || 'None'}</div>
                </div>
              </div>
              <Button 
                onClick={() => setShowAchievements(true)}
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Crown className="w-4 h-4 mr-2" />
                View Achievements
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Learning Path</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classGroups.map((group, index) => {
              const Icon = group.icon;
              const groupProgress = progressStore.getGroupProgress(group.id);
              const isCompleted = groupProgress.progress === 100;
              const isInProgress = groupProgress.progress > 0 && groupProgress.progress < 100;
              const isUnlocked = progressStore.isGroupUnlocked(group.id);
              
              return (
                <Card 
                  key={group.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 ${
                    isUnlocked 
                      ? 'cursor-pointer bg-white shadow-lg' 
                      : 'cursor-not-allowed bg-gray-100 opacity-60'
                  }`}
                >
                  {isUnlocked ? (
                    <Link href={`/learn/${group.id}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${group.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center space-x-1">
                            {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {isInProgress && <Circle className="w-5 h-5 text-blue-500" />}
                            <Badge 
                              variant={group.difficulty === 'Beginner' ? 'secondary' : group.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {group.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <p className="text-sm text-gray-600">{group.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>{groupProgress.completedLessons}/{groupProgress.totalLessons} lessons</span>
                            <span className="font-semibold">{groupProgress.progress}%</span>
                          </div>
                          <Progress value={groupProgress.progress} className="h-2" />
                          <Button 
                            className={`w-full ${isCompleted ? 'bg-green-500 hover:bg-green-600' : isInProgress ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'}`}
                          >
                            {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}
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
                        <CardTitle className="text-lg text-gray-500">{group.name}</CardTitle>
                        <p className="text-sm text-gray-400">{group.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>{groupProgress.totalLessons} lessons</span>
                            <span>Complete previous sections to unlock</span>
                          </div>
                          <Progress value={0} className="h-2" />
                          <Button disabled className="w-full">
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
        </div>

        {/* Daily Goals */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Daily Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {progress.dailyGoals.lessonsToday}/{progress.dailyGoals.targetLessons}
                </div>
                <div className="text-sm text-green-700">Lessons Today</div>
                {progress.dailyGoals.lessonsToday >= progress.dailyGoals.targetLessons ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-2" />
                ) : (
                  <Progress 
                    value={(progress.dailyGoals.lessonsToday / progress.dailyGoals.targetLessons) * 100} 
                    className="mt-2 h-2" 
                  />
                )}
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {progress.dailyGoals.xpToday}/{progress.dailyGoals.targetXP}
                </div>
                <div className="text-sm text-blue-700">XP Today</div>
                <Progress 
                  value={(progress.dailyGoals.xpToday / progress.dailyGoals.targetXP) * 100} 
                  className="mt-2 h-2" 
                />
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{progress.streak}</div>
                <div className="text-sm text-orange-700">Day Streak</div>
                <Flame className="w-6 h-6 text-orange-500 mx-auto mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Achievements Modal */}
      <AchievementsModal 
        isOpen={showAchievements} 
        onClose={() => setShowAchievements(false)} 
      />
    </div>
  );
}