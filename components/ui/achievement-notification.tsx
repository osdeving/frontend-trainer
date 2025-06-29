'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Trophy, Star, Zap, Sparkles } from 'lucide-react';

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
}

interface AchievementNotificationProps {
  achievement: Achievement;
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

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const RarityIcon = rarityIcons[achievement.rarity];

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className={`w-80 border-0 shadow-2xl bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white overflow-hidden`}>
        <CardContent className="p-4 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-2 right-2 text-white hover:bg-white/20 h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-start space-x-3">
            <div className="text-3xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-lg">{achievement.name}</h3>
                <RarityIcon className="w-4 h-4" />
              </div>
              <p className="text-sm text-white/90 mb-2">{achievement.description}</p>
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 capitalize"
                >
                  {achievement.rarity}
                </Badge>
                <div className="text-right">
                  <div className="text-sm font-semibold">+{achievement.reward.xp} XP</div>
                  {achievement.reward.title && (
                    <div className="text-xs text-white/80">Title: {achievement.reward.title}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}