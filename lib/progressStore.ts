interface UserProgress {
  completedLessons: Record<string, number>;
  totalXP: number;
  streak: number;
  lastStudyDate: string;
  groupProgress: Record<string, {
    progress: number;
    completedLessons: number;
    totalLessons: number;
  }>;
  dailyGoals: {
    lessonsToday: number;
    xpToday: number;
    targetLessons: number;
    targetXP: number;
  };
}

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: {},
  totalXP: 0,
  streak: 0,
  lastStudyDate: '',
  groupProgress: {
    layout: { progress: 0, completedLessons: 0, totalLessons: 5 },
    typography: { progress: 0, completedLessons: 0, totalLessons: 5 },
    colors: { progress: 0, completedLessons: 0, totalLessons: 5 },
    spacing: { progress: 0, completedLessons: 0, totalLessons: 8 },
    effects: { progress: 0, completedLessons: 0, totalLessons: 20 },
    responsive: { progress: 0, completedLessons: 0, totalLessons: 12 }
  },
  dailyGoals: {
    lessonsToday: 0,
    xpToday: 0,
    targetLessons: 5,
    targetXP: 200
  }
};

export class ProgressStore {
  private static instance: ProgressStore;
  private progress: UserProgress;

  private constructor() {
    this.progress = this.loadProgress();
  }

  static getInstance(): ProgressStore {
    if (!ProgressStore.instance) {
      ProgressStore.instance = new ProgressStore();
    }
    return ProgressStore.instance;
  }

  private loadProgress(): UserProgress {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    
    try {
      const saved = localStorage.getItem('tailwind-trainer-progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all properties exist
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          groupProgress: {
            ...DEFAULT_PROGRESS.groupProgress,
            ...parsed.groupProgress
          },
          dailyGoals: {
            ...DEFAULT_PROGRESS.dailyGoals,
            ...parsed.dailyGoals
          }
        };
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    
    return DEFAULT_PROGRESS;
  }

  private saveProgress(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('tailwind-trainer-progress', JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  private isToday(dateString: string): boolean {
    const today = new Date().toDateString();
    const date = new Date(dateString).toDateString();
    return today === date;
  }

  private resetDailyGoalsIfNeeded(): void {
    const today = new Date().toDateString();
    if (!this.isToday(this.progress.lastStudyDate)) {
      // Reset daily goals for new day
      this.progress.dailyGoals.lessonsToday = 0;
      this.progress.dailyGoals.xpToday = 0;
      
      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (this.progress.lastStudyDate === yesterday.toDateString()) {
        // Consecutive day, keep streak
      } else if (this.progress.lastStudyDate !== today) {
        // Missed days, reset streak
        this.progress.streak = 0;
      }
    }
  }

  completeLesson(groupId: string, xpGained: number = 10): void {
    this.resetDailyGoalsIfNeeded();
    
    const today = new Date().toDateString();
    
    // Update daily goals
    this.progress.dailyGoals.lessonsToday += 1;
    this.progress.dailyGoals.xpToday += xpGained;
    
    // Update total XP
    this.progress.totalXP += xpGained;
    
    // Update group progress
    if (this.progress.groupProgress[groupId]) {
      this.progress.groupProgress[groupId].completedLessons += 1;
      const totalLessons = this.progress.groupProgress[groupId].totalLessons;
      this.progress.groupProgress[groupId].progress = Math.round(
        (this.progress.groupProgress[groupId].completedLessons / totalLessons) * 100
      );
    }
    
    // Update streak if first lesson of the day
    if (this.progress.dailyGoals.lessonsToday === 1 && !this.isToday(this.progress.lastStudyDate)) {
      this.progress.streak += 1;
    }
    
    // Update last study date
    this.progress.lastStudyDate = today;
    
    this.saveProgress();
  }

  getProgress(): UserProgress {
    this.resetDailyGoalsIfNeeded();
    return { ...this.progress };
  }

  getGroupProgress(groupId: string) {
    return this.progress.groupProgress[groupId] || DEFAULT_PROGRESS.groupProgress[groupId];
  }

  getTotalProgress(): number {
    const groups = Object.values(this.progress.groupProgress);
    const totalProgress = groups.reduce((sum, group) => sum + group.progress, 0);
    return Math.round(totalProgress / groups.length);
  }

  getCompletedGroups(): number {
    return Object.values(this.progress.groupProgress).filter(group => group.progress === 100).length;
  }

  getInProgressGroups(): number {
    return Object.values(this.progress.groupProgress).filter(group => group.progress > 0 && group.progress < 100).length;
  }

  getTotalCompletedLessons(): number {
    return Object.values(this.progress.groupProgress).reduce((sum, group) => sum + group.completedLessons, 0);
  }

  isGroupUnlocked(groupId: string): boolean {
    // Basic groups are always unlocked
    const basicGroups = ['layout', 'typography', 'colors', 'spacing'];
    if (basicGroups.includes(groupId)) return true;
    
    // Advanced groups require completion of basic groups
    const basicGroupsCompleted = basicGroups.every(id => 
      this.progress.groupProgress[id]?.progress === 100
    );
    
    return basicGroupsCompleted;
  }

  resetProgress(): void {
    this.progress = { ...DEFAULT_PROGRESS };
    this.saveProgress();
  }
}

export const progressStore = ProgressStore.getInstance();