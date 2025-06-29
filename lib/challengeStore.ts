interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'timed' | 'survival' | 'themed' | 'practice';
  difficulty: 'easy' | 'medium' | 'hard';
  config: {
    timeLimit?: number; // seconds
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

interface ChallengeProgress {
  completedChallenges: string[];
  bestScores: Record<string, {
    score: number;
    time: number;
    accuracy: number;
    date: string;
  }>;
  currentStreak: number;
  totalChallengesCompleted: number;
}

const CHALLENGES: Challenge[] = [
  // Practice Challenges
  {
    id: 'free_practice',
    name: 'Free Practice',
    description: 'Practice at your own pace with any topic',
    icon: '🎯',
    type: 'practice',
    difficulty: 'easy',
    config: {
      allowHints: true,
      allowPreview: true
    },
    rewards: { xp: 5 }
  },
  {
    id: 'quick_practice',
    name: 'Quick Practice',
    description: '10 random questions for a quick session',
    icon: '⚡',
    type: 'practice',
    difficulty: 'easy',
    config: {
      questionCount: 10,
      allowHints: true,
      allowPreview: true
    },
    rewards: { xp: 25 }
  },

  // Timed Challenges
  {
    id: 'speed_round',
    name: 'Speed Round',
    description: 'Answer 15 questions in 5 minutes',
    icon: '🏃',
    type: 'timed',
    difficulty: 'medium',
    config: {
      timeLimit: 300, // 5 minutes
      questionCount: 15,
      allowHints: false,
      allowPreview: false
    },
    rewards: { 
      xp: 100,
      badge: 'Speed Runner',
      title: 'Speed Runner'
    }
  },
  {
    id: 'lightning_round',
    name: 'Lightning Round',
    description: 'Answer 20 questions in 3 minutes',
    icon: '⚡',
    type: 'timed',
    difficulty: 'hard',
    config: {
      timeLimit: 180, // 3 minutes
      questionCount: 20,
      allowHints: false,
      allowPreview: false
    },
    rewards: { 
      xp: 200,
      badge: 'Lightning Fast',
      title: 'Lightning Master'
    },
    requirements: {
      completedGroups: ['layout', 'typography']
    }
  },

  // Survival Challenges
  {
    id: 'survival_mode',
    name: 'Survival Mode',
    description: 'Answer as many as you can with 3 lives',
    icon: '💀',
    type: 'survival',
    difficulty: 'medium',
    config: {
      lives: 3,
      allowHints: true,
      allowPreview: false
    },
    rewards: { 
      xp: 150,
      badge: 'Survivor',
      title: 'Survivor'
    }
  },
  {
    id: 'hardcore_survival',
    name: 'Hardcore Survival',
    description: 'Survival mode with no hints or previews',
    icon: '☠️',
    type: 'survival',
    difficulty: 'hard',
    config: {
      lives: 3,
      allowHints: false,
      allowPreview: false
    },
    rewards: { 
      xp: 300,
      badge: 'Hardcore Survivor',
      title: 'Hardcore Master'
    },
    requirements: {
      achievements: ['survival_mode']
    }
  },

  // Themed Challenges
  {
    id: 'layout_master_challenge',
    name: 'Layout Master Challenge',
    description: 'Focus on flexbox and grid questions',
    icon: '📐',
    type: 'themed',
    difficulty: 'medium',
    config: {
      categories: ['Flexbox', 'Grid', 'Positioning'],
      questionCount: 20,
      allowHints: true,
      allowPreview: true
    },
    rewards: { 
      xp: 120,
      badge: 'Layout Specialist'
    }
  },
  {
    id: 'color_wizard_challenge',
    name: 'Color Wizard Challenge',
    description: 'Master colors, gradients, and opacity',
    icon: '🎨',
    type: 'themed',
    difficulty: 'medium',
    config: {
      categories: ['Text Color', 'Background Color', 'Gradients', 'Opacity'],
      questionCount: 15,
      allowHints: true,
      allowPreview: true
    },
    rewards: { 
      xp: 100,
      badge: 'Color Expert'
    }
  },
  {
    id: 'effects_master_challenge',
    name: 'Effects Master Challenge',
    description: 'Advanced shadows, transforms, and animations',
    icon: '✨',
    type: 'themed',
    difficulty: 'hard',
    config: {
      categories: ['Shadows', 'Transform', 'Transitions', 'Filters'],
      questionCount: 25,
      allowHints: false,
      allowPreview: true
    },
    rewards: { 
      xp: 200,
      badge: 'Effects Wizard',
      title: 'Effects Wizard'
    },
    requirements: {
      completedGroups: ['effects']
    }
  },
  {
    id: 'responsive_ninja_challenge',
    name: 'Responsive Ninja Challenge',
    description: 'Master responsive design patterns',
    icon: '📱',
    type: 'themed',
    difficulty: 'hard',
    config: {
      categories: ['Display', 'Grid', 'Flexbox', 'Typography', 'Width'],
      questionCount: 20,
      allowHints: false,
      allowPreview: false
    },
    rewards: { 
      xp: 250,
      badge: 'Responsive Master',
      title: 'Responsive Ninja'
    },
    requirements: {
      completedGroups: ['responsive']
    }
  }
];

const DEFAULT_CHALLENGE_PROGRESS: ChallengeProgress = {
  completedChallenges: [],
  bestScores: {},
  currentStreak: 0,
  totalChallengesCompleted: 0
};

export class ChallengeStore {
  private static instance: ChallengeStore;
  private progress: ChallengeProgress;

  private constructor() {
    this.progress = this.loadProgress();
  }

  static getInstance(): ChallengeStore {
    if (!ChallengeStore.instance) {
      ChallengeStore.instance = new ChallengeStore();
    }
    return ChallengeStore.instance;
  }

  private loadProgress(): ChallengeProgress {
    if (typeof window === 'undefined') return DEFAULT_CHALLENGE_PROGRESS;
    
    try {
      const saved = localStorage.getItem('tailwind-trainer-challenges');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CHALLENGE_PROGRESS,
          ...parsed
        };
      }
    } catch (error) {
      console.error('Error loading challenge progress:', error);
    }
    
    return DEFAULT_CHALLENGE_PROGRESS;
  }

  private saveProgress(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('tailwind-trainer-challenges', JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving challenge progress:', error);
    }
  }

  getAllChallenges(): Challenge[] {
    return CHALLENGES;
  }

  getAvailableChallenges(): Challenge[] {
    // Filter challenges based on requirements
    return CHALLENGES.filter(challenge => this.isChallengeUnlocked(challenge));
  }

  getChallengesByType(type: Challenge['type']): Challenge[] {
    return this.getAvailableChallenges().filter(challenge => challenge.type === type);
  }

  getChallenge(id: string): Challenge | undefined {
    return CHALLENGES.find(challenge => challenge.id === id);
  }

  isChallengeUnlocked(challenge: Challenge): boolean {
    if (!challenge.requirements) return true;

    const { minLevel, completedGroups, achievements } = challenge.requirements;

    // Check completed groups requirement
    if (completedGroups) {
      const userCompletedGroups = this.getUserCompletedGroups();
      if (!completedGroups.every(group => userCompletedGroups.includes(group))) {
        return false;
      }
    }

    // Check achievements requirement
    if (achievements) {
      const userAchievements = this.getUserAchievements();
      if (!achievements.every(achievement => userAchievements.includes(achievement))) {
        return false;
      }
    }

    return true;
  }

  private getUserCompletedGroups(): string[] {
    // This would integrate with progressStore
    if (typeof window === 'undefined') return [];
    
    try {
      const progressData = localStorage.getItem('tailwind-trainer-progress');
      if (progressData) {
        const progress = JSON.parse(progressData);
        return Object.entries(progress.groupProgress || {})
          .filter(([_, group]: [string, any]) => group.progress === 100)
          .map(([groupId]) => groupId);
      }
    } catch (error) {
      console.error('Error getting user completed groups:', error);
    }
    
    return [];
  }

  private getUserAchievements(): string[] {
    // This would integrate with achievementsStore
    if (typeof window === 'undefined') return [];
    
    try {
      const achievementData = localStorage.getItem('tailwind-trainer-achievements');
      if (achievementData) {
        const achievements = JSON.parse(achievementData);
        return achievements.unlockedAchievements || [];
      }
    } catch (error) {
      console.error('Error getting user achievements:', error);
    }
    
    return [];
  }

  completeChallenge(challengeId: string, score: number, time: number, accuracy: number): void {
    if (!this.progress.completedChallenges.includes(challengeId)) {
      this.progress.completedChallenges.push(challengeId);
      this.progress.totalChallengesCompleted += 1;
    }

    // Update best score if this is better
    const currentBest = this.progress.bestScores[challengeId];
    if (!currentBest || score > currentBest.score || 
        (score === currentBest.score && time < currentBest.time)) {
      this.progress.bestScores[challengeId] = {
        score,
        time,
        accuracy,
        date: new Date().toISOString()
      };
    }

    this.saveProgress();
  }

  getProgress(): ChallengeProgress {
    return { ...this.progress };
  }

  getBestScore(challengeId: string) {
    return this.progress.bestScores[challengeId];
  }

  isCompleted(challengeId: string): boolean {
    return this.progress.completedChallenges.includes(challengeId);
  }

  getCompletionStats() {
    const total = CHALLENGES.length;
    const completed = this.progress.completedChallenges.length;
    const available = this.getAvailableChallenges().length;
    
    return {
      total,
      completed,
      available,
      completionPercentage: Math.round((completed / total) * 100)
    };
  }

  resetProgress(): void {
    this.progress = { ...DEFAULT_CHALLENGE_PROGRESS };
    this.saveProgress();
  }
}

export const challengeStore = ChallengeStore.getInstance();