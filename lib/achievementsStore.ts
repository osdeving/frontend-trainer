interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'mastery' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: (progress: any, stats: any) => boolean;
  reward: {
    xp: number;
    title?: string;
  };
  unlockedAt?: string;
}

interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  perfectQuizzes: number;
  maxStreak: number;
  totalStudyDays: number;
  fastestAnswer: number; // in seconds
  groupsCompleted: string[];
  hintsUsed: number;
  reviewSessionsCompleted: number;
}

interface AchievementProgress {
  achievements: Record<string, Achievement>;
  unlockedAchievements: string[];
  stats: UserStats;
  titles: string[];
  activeTitle?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  // Progress Achievements
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first question',
    icon: '👶',
    category: 'progress',
    rarity: 'common',
    condition: (progress, stats) => stats.totalQuestions >= 1,
    reward: { xp: 10 }
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Complete 10 questions',
    icon: '🚀',
    category: 'progress',
    rarity: 'common',
    condition: (progress, stats) => stats.totalQuestions >= 10,
    reward: { xp: 25 }
  },
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Complete 50 questions',
    icon: '📚',
    category: 'progress',
    rarity: 'rare',
    condition: (progress, stats) => stats.totalQuestions >= 50,
    reward: { xp: 100, title: 'Dedicated Learner' }
  },
  {
    id: 'css_master',
    name: 'CSS Master',
    description: 'Complete 200 questions',
    icon: '🎓',
    category: 'progress',
    rarity: 'epic',
    condition: (progress, stats) => stats.totalQuestions >= 200,
    reward: { xp: 500, title: 'CSS Master' }
  },

  // Streak Achievements
  {
    id: 'on_fire',
    name: 'On Fire!',
    description: 'Get a 5-question streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    condition: (progress, stats) => stats.maxStreak >= 5,
    reward: { xp: 50 }
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Get a 10-question streak',
    icon: '⚡',
    category: 'streak',
    rarity: 'rare',
    condition: (progress, stats) => stats.maxStreak >= 10,
    reward: { xp: 150, title: 'Unstoppable' }
  },
  {
    id: 'legendary_streak',
    name: 'Legendary Streak',
    description: 'Get a 25-question streak',
    icon: '🌟',
    category: 'streak',
    rarity: 'legendary',
    condition: (progress, stats) => stats.maxStreak >= 25,
    reward: { xp: 1000, title: 'Streak Legend' }
  },

  // Mastery Achievements
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete a quiz with 100% accuracy',
    icon: '💯',
    category: 'mastery',
    rarity: 'rare',
    condition: (progress, stats) => stats.perfectQuizzes >= 1,
    reward: { xp: 100 }
  },
  {
    id: 'layout_master',
    name: 'Layout Master',
    description: 'Complete the Layout & Positioning group',
    icon: '📐',
    category: 'mastery',
    rarity: 'rare',
    condition: (progress, stats) => stats.groupsCompleted.includes('layout'),
    reward: { xp: 200, title: 'Layout Master' }
  },
  {
    id: 'typography_expert',
    name: 'Typography Expert',
    description: 'Complete the Typography group',
    icon: '✍️',
    category: 'mastery',
    rarity: 'rare',
    condition: (progress, stats) => stats.groupsCompleted.includes('typography'),
    reward: { xp: 200, title: 'Typography Expert' }
  },
  {
    id: 'color_wizard',
    name: 'Color Wizard',
    description: 'Complete the Colors & Backgrounds group',
    icon: '🎨',
    category: 'mastery',
    rarity: 'rare',
    condition: (progress, stats) => stats.groupsCompleted.includes('colors'),
    reward: { xp: 200, title: 'Color Wizard' }
  },
  {
    id: 'spacing_guru',
    name: 'Spacing Guru',
    description: 'Complete the Spacing & Sizing group',
    icon: '📏',
    category: 'mastery',
    rarity: 'rare',
    condition: (progress, stats) => stats.groupsCompleted.includes('spacing'),
    reward: { xp: 200, title: 'Spacing Guru' }
  },
  {
    id: 'effects_master',
    name: 'Effects Master',
    description: 'Complete the Effects & Animations group',
    icon: '✨',
    category: 'mastery',
    rarity: 'epic',
    condition: (progress, stats) => stats.groupsCompleted.includes('effects'),
    reward: { xp: 300, title: 'Effects Master' }
  },
  {
    id: 'responsive_ninja',
    name: 'Responsive Ninja',
    description: 'Complete the Responsive Design group',
    icon: '📱',
    category: 'mastery',
    rarity: 'epic',
    condition: (progress, stats) => stats.groupsCompleted.includes('responsive'),
    reward: { xp: 300, title: 'Responsive Ninja' }
  },
  {
    id: 'tailwind_grandmaster',
    name: 'Tailwind Grandmaster',
    description: 'Complete all groups',
    icon: '👑',
    category: 'mastery',
    rarity: 'legendary',
    condition: (progress, stats) => stats.groupsCompleted.length >= 6,
    reward: { xp: 1500, title: 'Tailwind Grandmaster' }
  },

  // Special Achievements
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Answer a question in under 5 seconds',
    icon: '💨',
    category: 'special',
    rarity: 'rare',
    condition: (progress, stats) => stats.fastestAnswer > 0 && stats.fastestAnswer < 5,
    reward: { xp: 150, title: 'Speed Demon' }
  },
  {
    id: 'no_hints_needed',
    name: 'No Hints Needed',
    description: 'Complete 20 questions without using hints',
    icon: '🧠',
    category: 'special',
    rarity: 'epic',
    condition: (progress, stats) => stats.totalQuestions >= 20 && stats.hintsUsed === 0,
    reward: { xp: 300, title: 'Independent Learner' }
  },
  {
    id: 'review_champion',
    name: 'Review Champion',
    description: 'Complete 5 review sessions',
    icon: '🔄',
    category: 'special',
    rarity: 'rare',
    condition: (progress, stats) => stats.reviewSessionsCompleted >= 5,
    reward: { xp: 200, title: 'Review Champion' }
  },
  {
    id: 'consistent_learner',
    name: 'Consistent Learner',
    description: 'Study for 7 consecutive days',
    icon: '📅',
    category: 'special',
    rarity: 'epic',
    condition: (progress, stats) => progress.streak >= 7,
    reward: { xp: 400, title: 'Consistent Learner' }
  }
];

const DEFAULT_ACHIEVEMENT_PROGRESS: AchievementProgress = {
  achievements: {},
  unlockedAchievements: [],
  stats: {
    totalQuestions: 0,
    correctAnswers: 0,
    perfectQuizzes: 0,
    maxStreak: 0,
    totalStudyDays: 0,
    fastestAnswer: 0,
    groupsCompleted: [],
    hintsUsed: 0,
    reviewSessionsCompleted: 0
  },
  titles: [],
  activeTitle: undefined
};

export class AchievementsStore {
  private static instance: AchievementsStore;
  private progress: AchievementProgress;

  private constructor() {
    this.progress = this.loadProgress();
    this.initializeAchievements();
  }

  static getInstance(): AchievementsStore {
    if (!AchievementsStore.instance) {
      AchievementsStore.instance = new AchievementsStore();
    }
    return AchievementsStore.instance;
  }

  private loadProgress(): AchievementProgress {
    if (typeof window === 'undefined') return DEFAULT_ACHIEVEMENT_PROGRESS;
    
    try {
      const saved = localStorage.getItem('tailwind-trainer-achievements');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_ACHIEVEMENT_PROGRESS,
          ...parsed,
          stats: {
            ...DEFAULT_ACHIEVEMENT_PROGRESS.stats,
            ...parsed.stats
          }
        };
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
    
    return DEFAULT_ACHIEVEMENT_PROGRESS;
  }

  private saveProgress(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('tailwind-trainer-achievements', JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }

  private initializeAchievements(): void {
    ACHIEVEMENTS.forEach(achievement => {
      if (!this.progress.achievements[achievement.id]) {
        this.progress.achievements[achievement.id] = achievement;
      }
    });
  }

  checkAchievements(userProgress: any): Achievement[] {
    const newlyUnlocked: Achievement[] = [];

    ACHIEVEMENTS.forEach(achievement => {
      if (!this.progress.unlockedAchievements.includes(achievement.id)) {
        if (achievement.condition(userProgress, this.progress.stats)) {
          this.progress.unlockedAchievements.push(achievement.id);
          this.progress.achievements[achievement.id].unlockedAt = new Date().toISOString();
          
          if (achievement.reward.title) {
            this.progress.titles.push(achievement.reward.title);
          }
          
          newlyUnlocked.push(achievement);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveProgress();
    }

    return newlyUnlocked;
  }

  updateStats(updates: Partial<UserStats>): Achievement[] {
    this.progress.stats = { ...this.progress.stats, ...updates };
    this.saveProgress();
    
    // Check for new achievements after updating stats
    return this.checkAchievements(this.progress);
  }

  recordQuestionAnswer(isCorrect: boolean, timeSpent: number, usedHint: boolean): Achievement[] {
    const updates: Partial<UserStats> = {
      totalQuestions: this.progress.stats.totalQuestions + 1,
      correctAnswers: isCorrect ? this.progress.stats.correctAnswers + 1 : this.progress.stats.correctAnswers,
      hintsUsed: usedHint ? this.progress.stats.hintsUsed + 1 : this.progress.stats.hintsUsed
    };

    if (timeSpent > 0 && (this.progress.stats.fastestAnswer === 0 || timeSpent < this.progress.stats.fastestAnswer)) {
      updates.fastestAnswer = timeSpent;
    }

    return this.updateStats(updates);
  }

  recordQuizCompletion(perfectScore: boolean, currentStreak: number): Achievement[] {
    const updates: Partial<UserStats> = {
      perfectQuizzes: perfectScore ? this.progress.stats.perfectQuizzes + 1 : this.progress.stats.perfectQuizzes,
      maxStreak: Math.max(this.progress.stats.maxStreak, currentStreak)
    };

    return this.updateStats(updates);
  }

  recordGroupCompletion(groupId: string): Achievement[] {
    if (!this.progress.stats.groupsCompleted.includes(groupId)) {
      const updates: Partial<UserStats> = {
        groupsCompleted: [...this.progress.stats.groupsCompleted, groupId]
      };
      return this.updateStats(updates);
    }
    return [];
  }

  recordReviewSession(): Achievement[] {
    const updates: Partial<UserStats> = {
      reviewSessionsCompleted: this.progress.stats.reviewSessionsCompleted + 1
    };
    return this.updateStats(updates);
  }

  getProgress(): AchievementProgress {
    return { ...this.progress };
  }

  getUnlockedAchievements(): Achievement[] {
    return this.progress.unlockedAchievements.map(id => this.progress.achievements[id]).filter(Boolean);
  }

  getAchievementsByCategory(category: Achievement['category']): Achievement[] {
    return ACHIEVEMENTS.filter(a => a.category === category);
  }

  getAchievementsByRarity(rarity: Achievement['rarity']): Achievement[] {
    return ACHIEVEMENTS.filter(a => a.rarity === rarity);
  }

  getTotalAchievements(): number {
    return ACHIEVEMENTS.length;
  }

  getUnlockedCount(): number {
    return this.progress.unlockedAchievements.length;
  }

  getCompletionPercentage(): number {
    return Math.round((this.getUnlockedCount() / this.getTotalAchievements()) * 100);
  }

  setActiveTitle(title: string): void {
    if (this.progress.titles.includes(title)) {
      this.progress.activeTitle = title;
      this.saveProgress();
    }
  }

  getAvailableTitles(): string[] {
    return this.progress.titles;
  }

  getActiveTitle(): string | undefined {
    return this.progress.activeTitle;
  }

  resetProgress(): void {
    this.progress = { ...DEFAULT_ACHIEVEMENT_PROGRESS };
    this.initializeAchievements();
    this.saveProgress();
  }
}

export const achievementsStore = AchievementsStore.getInstance();