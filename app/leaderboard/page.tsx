'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Trophy,
  Medal,
  Crown,
  Star,
  Flame,
  Target,
  Users,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Gem,
  UserPlus,
  UserMinus,
  Play,
  Timer,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import { leaderboardStore, LeaderboardEntry, Competition, LeaderboardStats, UserProfile } from '@/lib/leaderboardStore';

const leagueIcons = {
  Bronze: Shield,
  Silver: Medal,
  Gold: Crown,
  Platinum: Star,
  Diamond: Gem
};

const leagueColors = {
  Bronze: 'from-amber-600 to-amber-800',
  Silver: 'from-gray-400 to-gray-600',
  Gold: 'from-yellow-400 to-yellow-600',
  Platinum: 'from-blue-400 to-blue-600',
  Diamond: 'from-purple-400 to-purple-600'
};

export default function LeaderboardPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedTab, setSelectedTab] = useState('global');
  const [globalRankings, setGlobalRankings] = useState<LeaderboardEntry[]>([]);
  const [weeklyRankings, setWeeklyRankings] = useState<LeaderboardEntry[]>([]);
  const [monthlyRankings, setMonthlyRankings] = useState<LeaderboardEntry[]>([]);
  const [friendsRankings, setFriendsRankings] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeCompetitions, setActiveCompetitions] = useState<Competition[]>([]);
  const [stats, setStats] = useState<LeaderboardStats>({
    userRank: 0,
    weeklyRank: 0,
    monthlyRank: 0,
    league: 'Bronze',
    totalUsers: 0,
    leaguePosition: 0
  });

  useEffect(() => {
    setMounted(true);
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = () => {
    setGlobalRankings(leaderboardStore.getGlobalRankings());
    setWeeklyRankings(leaderboardStore.getWeeklyRankings());
    setMonthlyRankings(leaderboardStore.getMonthlyRankings());
    setFriendsRankings(leaderboardStore.getFriendsRankings());
    setCurrentUser(leaderboardStore.getCurrentUser());
    setActiveCompetitions(leaderboardStore.getActiveCompetitions());
    setStats(leaderboardStore.getLeaderboardStats());
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const renderRankingList = (rankings: LeaderboardEntry[], showXP: 'total' | 'weekly' | 'monthly' = 'total') => {
    return (
      <div className="space-y-3">
        {rankings.slice(0, 10).map((user, index) => {
          const rank = index + 1;
          const xpToShow = showXP === 'weekly' ? user.weeklyXP : 
                          showXP === 'monthly' ? user.monthlyXP : user.totalXP;
          const LeagueIcon = leagueIcons[user.league];
          
          return (
            <Card key={user.id} className={`border-0 shadow-md ${rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-white'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(rank)}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-800">{user.username}</span>
                          {user.title && (
                            <Badge variant="outline" className="text-xs">
                              {user.title}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <LeagueIcon className="w-4 h-4" />
                          <span>{user.league}</span>
                          <span>•</span>
                          <span>Level {user.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-800">{xpToShow.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <span>{user.streak} streak</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
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
                  Leaderboards & Competition
                </h1>
                <p className="text-sm text-gray-600">Compete with learners worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">#{stats.userRank}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* User Stats Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Your Ranking</CardTitle>
                <p className="text-purple-100">See how you stack up against other learners!</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                {currentUser?.avatar}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">#{stats.userRank}</div>
                <div className="text-sm text-purple-100">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">#{stats.weeklyRank}</div>
                <div className="text-sm text-purple-100">Weekly Rank</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  {React.createElement(leagueIcons[stats.league], { className: "w-6 h-6" })}
                  <span className="text-lg font-bold">{stats.league}</span>
                </div>
                <div className="text-sm text-purple-100">League</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser?.totalXP.toLocaleString()}</div>
                <div className="text-sm text-purple-100">Total XP</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Competitions */}
        {activeCompetitions.length > 0 && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Active Competitions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {activeCompetitions.map((competition) => (
                  <Card key={competition.id} className="border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800">{competition.name}</h3>
                          <p className="text-sm text-gray-600">{competition.description}</p>
                        </div>
                        <Badge className="bg-yellow-500 text-white">
                          {competition.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Timer className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-600">Ends in {getTimeRemaining(competition.endDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{competition.participants.length} participants</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-2 bg-white rounded border">
                        <div className="text-xs text-gray-600 mb-1">Rewards:</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Gift className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">1st: {competition.rewards.first.xp} XP + {competition.rewards.first.badge}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-3 bg-gradient-to-r from-yellow-500 to-orange-600">
                        <Play className="w-4 h-4 mr-2" />
                        Join Competition
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Tabs */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="global" className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Global</span>
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Weekly</span>
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Monthly</span>
                </TabsTrigger>
                <TabsTrigger value="friends" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Friends</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="global" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Global Rankings</h3>
                  <p className="text-sm text-gray-600">Top learners by total XP earned</p>
                </div>
                {renderRankingList(globalRankings, 'total')}
              </TabsContent>

              <TabsContent value="weekly" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Weekly Rankings</h3>
                  <p className="text-sm text-gray-600">Top performers this week</p>
                </div>
                {renderRankingList(weeklyRankings, 'weekly')}
              </TabsContent>

              <TabsContent value="monthly" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Rankings</h3>
                  <p className="text-sm text-gray-600">Top performers this month</p>
                </div>
                {renderRankingList(monthlyRankings, 'monthly')}
              </TabsContent>

              <TabsContent value="friends" className="mt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Friends Rankings</h3>
                      <p className="text-sm text-gray-600">Compete with your friends</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Friends
                    </Button>
                  </div>
                </div>
                {friendsRankings.length > 0 ? (
                  renderRankingList(friendsRankings, 'total')
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Friends Yet</h3>
                    <p className="text-gray-500 mb-4">Add friends to see how you compare!</p>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Find Friends
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* League System */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>League System</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(leagueIcons).map(([league, Icon]) => {
                const isCurrentLeague = league === currentUser?.league;
                const leagueRankings = leaderboardStore.getLeagueRankings(league as keyof typeof leagueIcons);
                
                return (
                  <Card 
                    key={league} 
                    className={`border-2 transition-all ${
                      isCurrentLeague 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${leagueColors[league as keyof typeof leagueColors]} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800">{league}</h3>
                      <p className="text-sm text-gray-600">{leagueRankings.length} players</p>
                      {isCurrentLeague && (
                        <Badge className="mt-2 bg-purple-500">
                          Your League
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">League Progression</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>🥉 <strong>Bronze:</strong> 0 - 1,999 XP</div>
                <div>🥈 <strong>Silver:</strong> 2,000 - 4,999 XP</div>
                <div>🥇 <strong>Gold:</strong> 5,000 - 9,999 XP</div>
                <div>💎 <strong>Platinum:</strong> 10,000 - 14,999 XP</div>
                <div>💠 <strong>Diamond:</strong> 15,000+ XP</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}