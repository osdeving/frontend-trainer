'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Trophy, 
  Star, 
  Zap, 
  Sparkles, 
  Lock,
  Target,
  Flame,
  Award,
  Crown
} from 'lucide-react';
import { achievementsStore } from '@/lib/achievementsStore';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'mastery' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  reward: {
    xp: number;
    title?: string;
  };
  unlockedAt?: string;
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500'
};

const rarityIcons = {
  common: Star,
  rare: Zap,
  epic: Sparkles,
  legendary: Trophy
};

const categoryIcons = {
  progress: Target,
  streak: Flame,
  mastery: Award,
  special: Crown
};

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  
  const progress = achievementsStore.getProgress();
  const unlockedAchievements = achievementsStore.getUnlockedAchievements();
  const availableTitles = achievementsStore.getAvailableTitles();
  const activeTitle = achievementsStore.getActiveTitle();
  const completionPercentage = achievementsStore.getCompletionPercentage();
  const totalAchievements = achievementsStore.getTotalAchievements();
  const unlockedCount = achievementsStore.getUnlockedCount();

  const allAchievements = Object.values(progress.achievements);
  const filteredAchievements = selectedCategory === 'all' 
    ? allAchievements 
    : allAchievements.filter(a => a.category === selectedCategory);

  const handleTitleSelect = (title: string) => {
    achievementsStore.setActiveTitle(title);
    setSelectedTitle(title);
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const isUnlocked = progress.unlockedAchievements.includes(achievement.id);
    const RarityIcon = rarityIcons[achievement.rarity];
    
    return (
      <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
        isUnlocked 
          ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} text-white shadow-lg` 
          : 'bg-gray-100 text-gray-400'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className={`text-2xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
              {isUnlocked ? achievement.icon : '🔒'}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                  {isUnlocked ? achievement.name : '???'}
                </h3>
                {isUnlocked && <RarityIcon className="w-4 h-4" />}
              </div>
              <p className={`text-sm mb-2 ${isUnlocked ? 'text-white/90' : 'text-gray-400'}`}>
                {isUnlocked ? achievement.description : 'Complete more challenges to unlock'}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant={isUnlocked ? "secondary" : "outline"}
                  className={isUnlocked 
                    ? "bg-white/20 text-white border-white/30 capitalize" 
                    : "capitalize"
                  }
                >
                  {achievement.rarity}
                </Badge>
                {isUnlocked && (
                  <div className="text-right">
                    <div className="text-sm font-semibold">+{achievement.reward.xp} XP</div>
                    {achievement.reward.title && (
                      <div className="text-xs text-white/80">Title: {achievement.reward.title}</div>
                    )}
                  </div>
                )}
              </div>
              
              {isUnlocked && achievement.unlockedAt && (
                <div className="text-xs text-white/70 mt-2">
                  Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          
          {!isUnlocked && (
            <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>Achievements & Titles</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="titles">Titles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="space-y-4">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Achievements Unlocked</span>
                      <span>{unlockedCount}/{totalAchievements}</span>
                    </div>
                    <Progress value={completionPercentage} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-600">{progress.stats.totalQuestions}</div>
                      <div className="text-sm text-gray-500">Questions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{progress.stats.correctAnswers}</div>
                      <div className="text-sm text-gray-500">Correct</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{progress.stats.maxStreak}</div>
                      <div className="text-sm text-gray-500">Best Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{progress.stats.perfectQuizzes}</div>
                      <div className="text-sm text-gray-500">Perfect Quizzes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {['progress', 'streak', 'mastery', 'special'].map(category => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {category}
                  </Button>
                );
              })}
            </div>

            {/* Achievements Grid */}
            <div className="grid gap-4 md:grid-cols-2 max-h-96 overflow-y-auto">
              {filteredAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="titles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Titles</CardTitle>
              </CardHeader>
              <CardContent>
                {availableTitles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Crown className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No titles unlocked yet!</p>
                    <p className="text-sm">Complete achievements to earn titles.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Current Title: <span className="font-semibold">{activeTitle || 'None'}</span>
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      {availableTitles.map(title => (
                        <div
                          key={title}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            activeTitle === title
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleTitleSelect(title)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{title}</span>
                            {activeTitle === title && (
                              <Badge variant="default">Active</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}