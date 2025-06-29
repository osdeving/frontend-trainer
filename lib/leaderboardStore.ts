interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  totalXP: number;
  level: number;
  streak: number;
  completedChallenges: number;
  perfectQuizzes: number;
  rank: number;
  league: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  weeklyXP: number;
  monthlyXP: number;
  lastActive: string;
  achievements: string[];
  title?: string;
}

interface Competition {
  id: string;
  name: string;
  description: string;
  type: 'weekly' | 'monthly' | 'special';
  startDate: string;
  endDate: string;
  participants: LeaderboardEntry[];
  rewards: {
    first: { xp: number; badge: string; title?: string };
    second: { xp: number; badge: string };
    third: { xp: number; badge: string };
    participation: { xp: number };
  };
  isActive: boolean;
  category?: string;
}

interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  joinDate: string;
  totalXP: number;
  level: number;
  currentStreak: number;
  maxStreak: number;
  completedGroups: string[];
  achievements: string[];
  badges: string[];
  titles: string[];
  activeTitle?: string;
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    averageTime: number;
    fastestAnswer: number;
    challengesCompleted: number;
    perfectQuizzes: number;
    reviewSessions: number;
  };
  friends: string[];
  league: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  weeklyXP: number;
  monthlyXP: number;
  lastActive: string;
}

interface LeaderboardData {
  globalRankings: LeaderboardEntry[];
  weeklyRankings: LeaderboardEntry[];
  monthlyRankings: LeaderboardEntry[];
  friendsRankings: LeaderboardEntry[];
  currentUser: UserProfile;
  activeCompetitions: Competition[];
  leagues: Record<string, LeaderboardEntry[]>;
}

// Mock data for demonstration
const MOCK_USERS: LeaderboardEntry[] = [
  {
    id: 'user1',
    username: 'CSSMaster',
    avatar: '👑',
    totalXP: 15420,
    level: 42,
    streak: 28,
    completedChallenges: 45,
    perfectQuizzes: 23,
    rank: 1,
    league: 'Diamond',
    weeklyXP: 1250,
    monthlyXP: 4800,
    lastActive: new Date().toISOString(),
    achievements: ['css_master', 'tailwind_grandmaster', 'speed_demon'],
    title: 'Tailwind Grandmaster'
  },
  {
    id: 'user2',
    username: 'FlexboxNinja',
    avatar: '🥷',
    totalXP: 12890,
    level: 38,
    streak: 15,
    completedChallenges: 38,
    perfectQuizzes: 19,
    rank: 2,
    league: 'Platinum',
    weeklyXP: 980,
    monthlyXP: 3200,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    achievements: ['layout_master', 'perfectionist', 'on_fire'],
    title: 'Layout Master'
  },
  {
    id: 'user3',
    username: 'GridGuru',
    avatar: '📐',
    totalXP: 11250,
    level: 35,
    streak: 12,
    completedChallenges: 32,
    perfectQuizzes: 16,
    rank: 3,
    league: 'Platinum',
    weeklyXP: 750,
    monthlyXP: 2800,
    lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    achievements: ['layout_master', 'dedicated_learner'],
    title: 'Grid Specialist'
  },
  {
    id: 'user4',
    username: 'ColorWizard',
    avatar: '🎨',
    totalXP: 9800,
    level: 31,
    streak: 8,
    completedChallenges: 28,
    perfectQuizzes: 14,
    rank: 4,
    league: 'Gold',
    weeklyXP: 620,
    monthlyXP: 2100,
    lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    achievements: ['color_wizard', 'perfectionist'],
    title: 'Color Expert'
  },
  {
    id: 'user5',
    username: 'ResponsiveRanger',
    avatar: '📱',
    totalXP: 8500,
    level: 28,
    streak: 5,
    completedChallenges: 24,
    perfectQuizzes: 11,
    rank: 5,
    league: 'Gold',
    weeklyXP: 480,
    monthlyXP: 1800,
    lastActive: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    achievements: ['responsive_ninja', 'getting_started'],
    title: 'Responsive Ninja'
  }
];

const MOCK_CURRENT_USER: UserProfile = {
  id: 'current_user',
  username: 'You',
  avatar: '🚀',
  joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  totalXP: 2450,
  level: 12,
  currentStreak: 3,
  maxStreak: 8,
  completedGroups: ['layout', 'typography'],
  achievements: ['first_steps', 'getting_started', 'on_fire'],
  badges: ['Speed Runner', 'Perfectionist'],
  titles: ['Dedicated Learner'],
  activeTitle: 'Dedicated Learner',
  stats: {
    totalQuestions: 156,
    correctAnswers: 124,
    accuracy: 79,
    averageTime: 12.5,
    fastestAnswer: 3.2,
    challengesCompleted: 8,
    perfectQuizzes: 3,
    reviewSessions: 5
  },
  friends: ['user2', 'user4'],
  league: 'Silver',
  weeklyXP: 320,
  monthlyXP: 1200,
  lastActive: new Date().toISOString()
};

const MOCK_COMPETITIONS: Competition[] = [
  {
    id: 'weekly_sprint',
    name: 'Weekly CSS Sprint',
    description: 'Compete for the highest XP this week!',
    type: 'weekly',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    participants: MOCK_USERS.slice(0, 10),
    rewards: {
      first: { xp: 500, badge: 'Weekly Champion', title: 'Sprint Master' },
      second: { xp: 300, badge: 'Runner Up' },
      third: { xp: 200, badge: 'Third Place' },
      participation: { xp: 50 }
    },
    isActive: true
  },
  {
    id: 'flexbox_masters',
    name: 'Flexbox Masters Tournament',
    description: 'Special challenge focusing on flexbox mastery',
    type: 'special',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    participants: MOCK_USERS.slice(0, 15),
    rewards: {
      first: { xp: 1000, badge: 'Flexbox Champion', title: 'Flexbox Grandmaster' },
      second: { xp: 600, badge: 'Flexbox Expert' },
      third: { xp: 400, badge: 'Flexbox Specialist' },
      participation: { xp: 100 }
    },
    isActive: true,
    category: 'Flexbox'
  }
];

const DEFAULT_LEADERBOARD_DATA: LeaderboardData = {
  globalRankings: [],
  weeklyRankings: [],
  monthlyRankings: [],
  friendsRankings: [],
  currentUser: MOCK_CURRENT_USER,
  activeCompetitions: [],
  leagues: {
    Bronze: [],
    Silver: [],
    Gold: [],
    Platinum: [],
    Diamond: []
  }
};

export class LeaderboardStore {
  private static instance: LeaderboardStore;
  private data: LeaderboardData;

  private constructor() {
    this.data = this.loadData();
    this.initializeMockData();
  }

  static getInstance(): LeaderboardStore {
    if (!LeaderboardStore.instance) {
      LeaderboardStore.instance = new LeaderboardStore();
    }
    return LeaderboardStore.instance;
  }

  private loadData(): LeaderboardData {
    if (typeof window === 'undefined') return DEFAULT_LEADERBOARD_DATA;
    
    try {
      const saved = localStorage.getItem('tailwind-trainer-leaderboard');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_LEADERBOARD_DATA,
          ...parsed,
          currentUser: {
            ...DEFAULT_LEADERBOARD_DATA.currentUser,
            ...parsed.currentUser
          }
        };
      }
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
    }
    
    return DEFAULT_LEADERBOARD_DATA;
  }

  private saveData(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('tailwind-trainer-leaderboard', JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving leaderboard data:', error);
    }
  }

  private initializeMockData(): void {
    // Initialize with mock data if empty
    if (this.data.globalRankings.length === 0) {
      this.data.globalRankings = [...MOCK_USERS];
      this.data.weeklyRankings = [...MOCK_USERS].sort((a, b) => b.weeklyXP - a.weeklyXP);
      this.data.monthlyRankings = [...MOCK_USERS].sort((a, b) => b.monthlyXP - a.monthlyXP);
      this.data.activeCompetitions = [...MOCK_COMPETITIONS];
      
      // Organize by leagues
      this.data.globalRankings.forEach(user => {
        if (!this.data.leagues[user.league]) {
          this.data.leagues[user.league] = [];
        }
        this.data.leagues[user.league].push(user);
      });

      // Friends rankings
      this.data.friendsRankings = this.data.globalRankings.filter(user => 
        this.data.currentUser.friends.includes(user.id)
      );

      this.saveData();
    }
  }

  updateUserProgress(xpGained: number, challengeCompleted?: boolean, perfectQuiz?: boolean): void {
    this.data.currentUser.totalXP += xpGained;
    this.data.currentUser.weeklyXP += xpGained;
    this.data.currentUser.monthlyXP += xpGained;
    this.data.currentUser.level = Math.floor(this.data.currentUser.totalXP / 100) + 1;
    this.data.currentUser.lastActive = new Date().toISOString();

    if (challengeCompleted) {
      this.data.currentUser.stats.challengesCompleted += 1;
    }

    if (perfectQuiz) {
      this.data.currentUser.stats.perfectQuizzes += 1;
    }

    // Update league based on XP
    this.updateUserLeague();
    this.saveData();
  }

  private updateUserLeague(): void {
    const xp = this.data.currentUser.totalXP;
    if (xp >= 15000) this.data.currentUser.league = 'Diamond';
    else if (xp >= 10000) this.data.currentUser.league = 'Platinum';
    else if (xp >= 5000) this.data.currentUser.league = 'Gold';
    else if (xp >= 2000) this.data.currentUser.league = 'Silver';
    else this.data.currentUser.league = 'Bronze';
  }

  getGlobalRankings(): LeaderboardEntry[] {
    return this.data.globalRankings.sort((a, b) => b.totalXP - a.totalXP);
  }

  getWeeklyRankings(): LeaderboardEntry[] {
    return this.data.weeklyRankings.sort((a, b) => b.weeklyXP - a.weeklyXP);
  }

  getMonthlyRankings(): LeaderboardEntry[] {
    return this.data.monthlyRankings.sort((a, b) => b.monthlyXP - a.monthlyXP);
  }

  getFriendsRankings(): LeaderboardEntry[] {
    return this.data.friendsRankings.sort((a, b) => b.totalXP - a.totalXP);
  }

  getLeagueRankings(league: string): LeaderboardEntry[] {
    return this.data.leagues[league] || [];
  }

  getCurrentUser(): UserProfile {
    return this.data.currentUser;
  }

  getUserRank(type: 'global' | 'weekly' | 'monthly' | 'friends' = 'global'): number {
    let rankings: LeaderboardEntry[];
    const userXP = type === 'weekly' ? this.data.currentUser.weeklyXP :
                   type === 'monthly' ? this.data.currentUser.monthlyXP :
                   this.data.currentUser.totalXP;

    switch (type) {
      case 'weekly':
        rankings = this.getWeeklyRankings();
        break;
      case 'monthly':
        rankings = this.getMonthlyRankings();
        break;
      case 'friends':
        rankings = this.getFriendsRankings();
        break;
      default:
        rankings = this.getGlobalRankings();
    }

    const rank = rankings.findIndex(user => user.totalXP <= userXP) + 1;
    return rank || rankings.length + 1;
  }

  getActiveCompetitions(): Competition[] {
    return this.data.activeCompetitions.filter(comp => comp.isActive);
  }

  joinCompetition(competitionId: string): boolean {
    const competition = this.data.activeCompetitions.find(c => c.id === competitionId);
    if (competition && !competition.participants.find(p => p.id === this.data.currentUser.id)) {
      // Add current user to competition (simplified)
      return true;
    }
    return false;
  }

  getLeaderboardStats() {
    return {
      totalUsers: this.data.globalRankings.length + 1, // +1 for current user
      userRank: this.getUserRank('global'),
      weeklyRank: this.getUserRank('weekly'),
      monthlyRank: this.getUserRank('monthly'),
      league: this.data.currentUser.league,
      leaguePosition: this.getLeagueRankings(this.data.currentUser.league).length + 1
    };
  }

  addFriend(userId: string): boolean {
    if (!this.data.currentUser.friends.includes(userId)) {
      this.data.currentUser.friends.push(userId);
      
      // Add to friends rankings if not already there
      const user = this.data.globalRankings.find(u => u.id === userId);
      if (user && !this.data.friendsRankings.find(f => f.id === userId)) {
        this.data.friendsRankings.push(user);
      }
      
      this.saveData();
      return true;
    }
    return false;
  }

  removeFriend(userId: string): boolean {
    const index = this.data.currentUser.friends.indexOf(userId);
    if (index > -1) {
      this.data.currentUser.friends.splice(index, 1);
      this.data.friendsRankings = this.data.friendsRankings.filter(f => f.id !== userId);
      this.saveData();
      return true;
    }
    return false;
  }

  resetData(): void {
    this.data = { ...DEFAULT_LEADERBOARD_DATA };
    this.initializeMockData();
    this.saveData();
  }
}

export const leaderboardStore = LeaderboardStore.getInstance();