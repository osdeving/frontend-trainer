'use client';

import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface ClassGroup {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  totalLessons: number;
  completedLessons: number;
  isUnlocked: boolean;
  color: string;
}

const classGroups: ClassGroup[] = [
  {
    id: 'layout',
    name: 'Layout & Positioning',
    description: 'Master flexbox, grid, and positioning',
    icon: Layout,
    difficulty: 'Beginner',
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    isUnlocked: true,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Text styling, fonts, and spacing',
    icon: Type,
    difficulty: 'Beginner',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    isUnlocked: true,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'colors',
    name: 'Colors & Backgrounds',
    description: 'Color system and background utilities',
    icon: Palette,
    difficulty: 'Intermediate',
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    isUnlocked: true,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'spacing',
    name: 'Spacing & Sizing',
    description: 'Margins, padding, and dimensions',
    icon: Move,
    difficulty: 'Beginner',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    isUnlocked: true,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'effects',
    name: 'Effects & Animations',
    description: 'Shadows, transforms, and transitions',
    icon: Sparkles,
    difficulty: 'Advanced',
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    isUnlocked: false,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'responsive',
    name: 'Responsive Design',
    description: 'Breakpoints and responsive utilities',
    icon: Target,
    difficulty: 'Advanced',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    isUnlocked: false,
    color: 'from-indigo-500 to-indigo-600'
  }
];

export default function Home() {
  const [streak, setStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(1250);
  
  const totalProgress = Math.round(
    classGroups.reduce((acc, group) => acc + group.progress, 0) / classGroups.length
  );

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
                <p className="text-sm text-gray-600">Master CSS utilities</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-700">{streak}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">{totalXP.toLocaleString()}</span>
              </div>
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
                <p className="text-blue-100">Keep going! You're doing great!</p>
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
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{classGroups.filter(g => g.progress === 100).length}</div>
                  <div className="text-sm text-blue-100">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{classGroups.filter(g => g.progress > 0 && g.progress < 100).length}</div>
                  <div className="text-sm text-blue-100">In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{classGroups.reduce((acc, g) => acc + g.completedLessons, 0)}</div>
                  <div className="text-sm text-blue-100">Lessons Done</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Learning Path</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classGroups.map((group, index) => {
              const Icon = group.icon;
              const isCompleted = group.progress === 100;
              const isInProgress = group.progress > 0 && group.progress < 100;
              
              return (
                <Card 
                  key={group.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 ${
                    group.isUnlocked 
                      ? 'cursor-pointer bg-white shadow-lg' 
                      : 'cursor-not-allowed bg-gray-100 opacity-60'
                  }`}
                >
                  {group.isUnlocked ? (
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
                            <span>{group.completedLessons}/{group.totalLessons} lessons</span>
                            <span className="font-semibold">{group.progress}%</span>
                          </div>
                          <Progress value={group.progress} className="h-2" />
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
                            <span>{group.totalLessons} lessons</span>
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

        {/* Quick Stats */}
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
                <div className="text-2xl font-bold text-green-600">5/5</div>
                <div className="text-sm text-green-700">Lessons Today</div>
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-2" />
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">150/200</div>
                <div className="text-sm text-blue-700">XP Today</div>
                <Progress value={75} className="mt-2 h-2" />
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{streak}</div>
                <div className="text-sm text-orange-700">Day Streak</div>
                <Flame className="w-6 h-6 text-orange-500 mx-auto mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}