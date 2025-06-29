'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  User,
  Trophy,
  Star,
  Flame,
  Target,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Zap,
  Shield,
  Edit,
  Settings,
  Share,
  Download,
  BarChart3,
  PieChart,
  Activity,
  BookOpen,
  CheckCircle,
  Circle
} from 'lucide-react';
import Link from 'next/link';
import { leaderboardStore } from '@/lib/leaderboardStore';
import { progressStore } from '@/lib/progressStore';
import { achievementsStore } from '@/lib/achievementsStore';

const leagueIcons = {
  Bronze: Shield,
  Silver: Shield,
  Gold: Trophy,
  Platinum: Star,
  Diamond: Award
};

const leagueColors = {
  Bronze: 'from-amber-600 to-amber-800',
  Silver: 'from-gray-400 to-gray-600',
  Gold: 'from-yellow-400 to-yellow-600',
  Platinum: 'from-blue-400 to-blue-600',
  Diamond: 'from-purple-400 to-purple-600'
};

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [progress, setProgress] = useState<any>({});
  const [achievements, setAchievements] = useState<any>({});
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    setMounted(true);
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    setCurrentUser(leaderboardStore.getCurrentUser());
    setProgress(progressStore.getProgress());
    setAchievements(achievementsStore.getProgress());
    setStats(leaderboardStore.getLeaderboardStats());
  };

  const getJoinDuration = (joinDate: string) => {
    const now = new Date();
    const joined = new Date(joinDate);
    const diffTime = Math.abs(now.getTime() - joined.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  const getActivityData = () => {
    // Mock activity data for the last 7 days
    return [
      { day: 'Mon', xp: 120 },
      { day: 'Tue', xp: 80 },
      { day: 'Wed', xp: 200 },
      { day: 'Thu', xp: 150 },
      { day: 'Fri', xp: 90 },
      { day: 'Sat', xp: 180 },
      { day: 'Sun', xp: 160 }
    ];
  };

  const getCategoryProgress = () => {
    const groupProgress = progress.groupProgress || {};
    return [
      { name: 'Layout', progress: groupProgress.layout?.progress || 0, color: 'bg-blue-500' },
      { name: 'Typography', progress: groupProgress.typography?.progress || 0, color: 'bg-green-500' },
      { name: 'Colors', progress: groupProgress.colors?.progress || 0, color: 'bg-purple-500' },
      { name: 'Spacing', progress: groupProgress.spacing?.progress || 0, color: 'bg-orange-500' },
      { name: 'Effects', progress: groupProgress.effects?.progress || 0, color: 'bg-pink-500' },
      { name: 'Responsive', progress: groupProgress.responsive?.progress || 0, color: 'bg-indigo-500' }
    ];
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const LeagueIcon = leagueIcons[currentUser?.league] || Shield;
  const activityData = getActivityData();
  const categoryProgress = getCategoryProgress();

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
                  Your Profile
                </h1>
                <p className="text-sm text-gray-600">Track your learning journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  {currentUser?.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-3xl font-bold">{currentUser?.username}</h2>
                    {currentUser?.activeTitle && (
                      <Badge className="bg-white/20 text-white border-white/30">
                        {currentUser.activeTitle}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-purple-100">
                    <div className="flex items-center space-x-1">
                      <LeagueIcon className="w-4 h-4" />
                      <span>{currentUser?.league} League</span>
                    </div>
                    <span>•</span>
                    <span>Level {currentUser?.level}</span>
                    <span>•</span>
                    <span>Joined {getJoinDuration(currentUser?.joinDate || '')}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{currentUser?.totalXP.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{currentUser?.currentStreak}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600">#{stats.userRank}</div>
              <div className="text-sm text-gray-600">Global Rank</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{achievements.unlockedAchievements?.length || 0}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Progress</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Achievements</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Statistics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Recent Activity */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Weekly Activity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {activityData.map((day, index) => (
                          <div key={day.day} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{day.day}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                  style={{ width: `${(day.xp / 200) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700 w-12 text-right">{day.xp} XP</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Progress */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Learning Progress</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoryProgress.map((category) => (
                          <div key={category.name}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">{category.name}</span>
                              <span className="text-sm text-gray-600">{category.progress}%</span>
                            </div>
                            <Progress value={category.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/learn/layout">
                    <Button variant="outline" className="w-full h-16 flex flex-col space-y-1">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm">Continue Learning</span>
                    </Button>
                  </Link>
                  <Link href="/challenges">
                    <Button variant="outline" className="w-full h-16 flex flex-col space-y-1">
                      <Target className="w-5 h-5" />
                      <span className="text-sm">Take Challenge</span>
                    </Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button variant="outline" className="w-full h-16 flex flex-col space-y-1">
                      <Trophy className="w-5 h-5" />
                      <span className="text-sm">View Rankings</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-16 flex flex-col space-y-1">
                    <Download className="w-5 h-5" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <div className="space-y-6">
                  {/* Overall Progress */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">{progressStore.getTotalProgress()}%</div>
                          <div className="text-sm text-gray-600">Course Completion</div>
                          <Progress value={progressStore.getTotalProgress()} className="mt-2" />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 mb-2">{progressStore.getCompletedGroups()}/6</div>
                          <div className="text-sm text-gray-600">Groups Completed</div>
                          <Progress value={(progressStore.getCompletedGroups() / 6) * 100} className="mt-2" />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-2">{progressStore.getTotalCompletedLessons()}</div>
                          <div className="text-sm text-gray-600">Lessons Completed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Group Progress Details */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>Group Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {categoryProgress.map((category) => (
                          <div key={category.name} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-gray-800">{category.name}</h3>
                              <div className="flex items-center space-x-1">
                                {category.progress === 100 ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400" />
                                )}
                                <span className="text-sm font-medium">{category.progress}%</span>
                              </div>
                            </div>
                            <Progress value={category.progress} className="h-2 mb-2" />
                            <div className="text-xs text-gray-600">
                              {category.progress === 100 ? 'Completed!' : `${Math.round((category.progress / 100) * 15)} of 15 lessons`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {achievements.unlockedAchievements?.map((achievementId: string) => {
                    const achievement = achievements.achievements?.[achievementId];
                    if (!achievement) return null;
                    
                    return (
                      <Card key={achievementId} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant={achievement.rarity === 'legendary' ? 'default' : 'secondary'}>
                              {achievement.rarity}
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Zap className="w-3 h-3" />
                              <span>{achievement.reward.xp} XP</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Performance Stats */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>Performance Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Questions</span>
                          <span className="font-semibold">{currentUser?.stats.totalQuestions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Correct Answers</span>
                          <span className="font-semibold">{currentUser?.stats.correctAnswers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Accuracy</span>
                          <span className="font-semibold">{currentUser?.stats.accuracy}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Average Time</span>
                          <span className="font-semibold">{currentUser?.stats.averageTime}s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Fastest Answer</span>
                          <span className="font-semibold">{currentUser?.stats.fastestAnswer}s</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Challenge Stats */}
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>Challenge Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Challenges Completed</span>
                          <span className="font-semibold">{currentUser?.stats.challengesCompleted}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Perfect Quizzes</span>
                          <span className="font-semibold">{currentUser?.stats.perfectQuizzes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Review Sessions</span>
                          <span className="font-semibold">{currentUser?.stats.reviewSessions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Max Streak</span>
                          <span className="font-semibold">{currentUser?.maxStreak}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Current League</span>
                          <span className="font-semibold">{currentUser?.league}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}