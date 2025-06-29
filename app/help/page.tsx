'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  BookOpen,
  Target,
  Trophy,
  Users,
  Zap,
  Star,
  Flame,
  Clock,
  Heart,
  Eye,
  Lightbulb,
  Play,
  RotateCcw,
  Crown,
  Shield,
  Award,
  TrendingUp,
  Settings,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Rocket,
  Gamepad2,
  Medal,
  Gift,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const helpSections = [
  {
    id: 'getting-started',
    title: 'Primeiros Passos',
    icon: Rocket,
    description: 'Como começar sua jornada no TailwindTrainer'
  },
  {
    id: 'learning-system',
    title: 'Sistema de Aprendizado',
    icon: BookOpen,
    description: 'Como funciona o sistema de grupos e lições'
  },
  {
    id: 'challenges',
    title: 'Desafios e Modos',
    icon: Target,
    description: 'Diferentes tipos de desafios disponíveis'
  },
  {
    id: 'achievements',
    title: 'Conquistas e XP',
    icon: Trophy,
    description: 'Sistema de gamificação e recompensas'
  },
  {
    id: 'leaderboards',
    title: 'Rankings e Competições',
    icon: TrendingUp,
    description: 'Como funciona o sistema competitivo'
  },
  {
    id: 'profile',
    title: 'Perfil e Estatísticas',
    icon: Users,
    description: 'Acompanhe seu progresso detalhado'
  }
];

const faqs = [
  {
    question: 'Como funciona o sistema de XP?',
    answer: 'Você ganha XP completando questões e desafios. Questões fáceis dão 10 XP, médias 15 XP e difíceis 20 XP. Desafios especiais podem dar até 300 XP!'
  },
  {
    question: 'O que são streaks e como mantê-los?',
    answer: 'Streaks são sequências de respostas corretas consecutivas. Mantenha-os acertando questões seguidas. Streaks longos desbloqueiam conquistas especiais!'
  },
  {
    question: 'Como desbloquear grupos avançados?',
    answer: 'Complete todos os grupos básicos (Layout, Typography, Colors, Spacing) para desbloquear os avançados (Effects, Responsive).'
  },
  {
    question: 'Posso revisar questões que errei?',
    answer: 'Sim! Ao final de cada quiz, você pode entrar no modo de revisão para praticar apenas as questões que errou.'
  },
  {
    question: 'Como funcionam as ligas?',
    answer: 'As ligas são baseadas no seu XP total: Bronze (0-1999), Silver (2000-4999), Gold (5000-9999), Platinum (10000-14999), Diamond (15000+).'
  },
  {
    question: 'Posso competir com amigos?',
    answer: 'Sim! Adicione amigos na seção de Leaderboards e veja como vocês se comparam nos rankings.'
  }
];

export default function HelpPage() {
  const [selectedSection, setSelectedSection] = useState('getting-started');

  const renderGettingStarted = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Bem-vindo ao TailwindTrainer!</h3>
        </div>
        <p className="text-gray-700 mb-4">
          O TailwindTrainer é uma plataforma gamificada para aprender TailwindCSS de forma interativa e divertida. 
          Aqui você encontrará tudo que precisa para dominar as classes utilitárias do Tailwind!
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Passo a Passo para Iniciantes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Escolha um Grupo de Aprendizado</h4>
                <p className="text-green-700 text-sm">Comece com "Layout & Positioning" - é perfeito para iniciantes e ensina os fundamentos do Flexbox e Grid.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Complete sua Primeira Questão</h4>
                <p className="text-blue-700 text-sm">Leia o código CSS e digite a classe TailwindCSS equivalente. Use dicas se precisar!</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-1">Ganhe sua Primeira Conquista</h4>
                <p className="text-purple-700 text-sm">Ao completar a primeira questão, você ganhará a conquista "First Steps" e 10 XP!</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-1">Continue Aprendendo</h4>
                <p className="text-orange-700 text-sm">Complete mais questões, mantenha streaks e desbloqueie novos grupos e desafios!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>Dicas Importantes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Use o Preview Visual</span>
              </div>
              <p className="text-yellow-700 text-sm">Clique no ícone do olho para ver como o CSS se aplica visualmente. Isso ajuda muito no aprendizado!</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Não Tenha Medo das Dicas</span>
              </div>
              <p className="text-blue-700 text-sm">As dicas são suas amigas! Use-as para aprender os padrões do TailwindCSS.</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Flame className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-800">Mantenha Streaks</span>
              </div>
              <p className="text-green-700 text-sm">Sequências de acertos desbloqueiam conquistas especiais e multiplicam seu XP!</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <RotateCcw className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-800">Revise Erros</span>
              </div>
              <p className="text-purple-700 text-sm">Use o modo de revisão para praticar questões que você errou. A repetição é chave!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLearningSystem = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Como Funciona o Sistema de Aprendizado</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Grupos de Aprendizado</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-green-500">Básico</Badge>
                    <span className="font-medium">Sempre Disponíveis</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Layout & Positioning (15 lições)</li>
                    <li>• Typography (15 lições)</li>
                    <li>• Colors & Backgrounds (15 lições)</li>
                    <li>• Spacing & Sizing (15 lições)</li>
                  </ul>
                </div>

                <div className="p-4 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-purple-500">Avançado</Badge>
                    <span className="font-medium">Requer Básicos</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Effects & Animations (20 lições)</li>
                    <li>• Responsive Design (12 lições)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Mecânicas de Jogo</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-red-800 mb-1">Sistema de Vidas</h5>
                  <p className="text-sm text-red-700">Você tem 5 vidas. Perde 1 vida a cada erro. Sem vidas = fim do jogo!</p>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-yellow-800 mb-1">Sistema de XP</h5>
                  <p className="text-sm text-yellow-700">Fácil: 10 XP, Médio: 15 XP, Difícil: 20 XP por questão correta.</p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-orange-800 mb-1">Streaks</h5>
                  <p className="text-sm text-orange-700">Acertos consecutivos. Streaks longos = conquistas especiais!</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Ferramentas de Aprendizado</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <span className="font-medium text-blue-800">Sistema de Dicas</span>
                    <p className="text-sm text-blue-700">Dicas contextuais baseadas na categoria da questão. Use sem medo!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Eye className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium text-green-800">Preview Visual</span>
                    <p className="text-sm text-green-700">Veja como o CSS se aplica visualmente em um elemento de exemplo.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <span className="font-medium text-purple-800">Modo de Revisão</span>
                    <p className="text-sm text-purple-700">Pratique apenas as questões que você errou para reforçar o aprendizado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Tipos de Desafios</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Modo Prática</h4>
                </div>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• <strong>Free Practice:</strong> Sem limites, com dicas e preview</li>
                  <li>• <strong>Quick Practice:</strong> 10 questões aleatórias</li>
                  <li>• Ideal para aprender no seu ritmo</li>
                  <li>• 5-25 XP por sessão</li>
                </ul>
              </div>

              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Modo Cronometrado</h4>
                </div>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• <strong>Speed Round:</strong> 15 questões em 5 minutos</li>
                  <li>• <strong>Lightning Round:</strong> 20 questões em 3 minutos</li>
                  <li>• Sem dicas ou preview</li>
                  <li>• 100-200 XP + badges especiais</li>
                </ul>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Heart className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Modo Sobrevivência</h4>
                </div>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• <strong>Survival Mode:</strong> 3 vidas, com dicas</li>
                  <li>• <strong>Hardcore Survival:</strong> 3 vidas, sem ajudas</li>
                  <li>• Responda o máximo que conseguir</li>
                  <li>• 150-300 XP + títulos exclusivos</li>
                </ul>
              </div>

              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-800">Desafios Temáticos</h4>
                </div>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Foco em categorias específicas</li>
                  <li>• Layout Master, Color Wizard, etc.</li>
                  <li>• Requer grupos específicos completos</li>
                  <li>• 100-250 XP + badges especializados</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Dica Estratégica</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Comece com modos de prática para se familiarizar, depois parta para cronometrados e sobrevivência. 
                Desafios temáticos são ótimos para focar em áreas específicas!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Sistema de Conquistas e Gamificação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Categorias de Conquistas</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Progresso</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• First Steps (1 questão)</li>
                      <li>• Getting Started (10 questões)</li>
                      <li>• Dedicated Learner (50 questões)</li>
                      <li>• CSS Master (200 questões)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Streaks</span>
                    </div>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• On Fire! (5 acertos seguidos)</li>
                      <li>• Unstoppable (10 acertos seguidos)</li>
                      <li>• Legendary Streak (25 acertos seguidos)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Maestria</span>
                    </div>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Layout Master (grupo completo)</li>
                      <li>• Typography Expert (grupo completo)</li>
                      <li>• Color Wizard (grupo completo)</li>
                      <li>• Tailwind Grandmaster (todos os grupos)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Especiais</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Speed Demon (resposta em &lt;5s)</li>
                      <li>• No Hints Needed (20 sem dicas)</li>
                      <li>• Review Champion (5 revisões)</li>
                      <li>• Consistent Learner (7 dias seguidos)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Sistema de Recompensas</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-yellow-800 mb-1">XP (Experience Points)</h5>
                  <p className="text-sm text-yellow-700">Pontos de experiência para subir de nível e liga</p>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Medal className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-blue-800 mb-1">Badges</h5>
                  <p className="text-sm text-blue-700">Distintivos especiais para mostrar suas conquistas</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-purple-800 mb-1">Títulos</h5>
                  <p className="text-sm text-purple-700">Títulos exclusivos para exibir no seu perfil</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Gift className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">Dica de Maximização de XP</span>
              </div>
              <p className="text-orange-700 text-sm">
                Para ganhar XP rapidamente: complete grupos inteiros (conquistas de maestria), 
                mantenha streaks longos, participe de desafios cronometrados e competições semanais!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLeaderboards = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Sistema de Rankings e Competições</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Tipos de Rankings</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Rankings Temporais</h5>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• <strong>Global:</strong> Ranking por XP total de todos os tempos</li>
                    <li>• <strong>Semanal:</strong> Competição semanal por XP ganho</li>
                    <li>• <strong>Mensal:</strong> Competição mensal por XP ganho</li>
                    <li>• <strong>Amigos:</strong> Compare-se apenas com seus amigos</li>
                  </ul>
                </div>

                <div className="p-4 border border-purple-200 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">Sistema de Ligas</h5>
                  <ul className="space-y-1 text-sm text-purple-700">
                    <li>• 🥉 <strong>Bronze:</strong> 0 - 1,999 XP</li>
                    <li>• 🥈 <strong>Silver:</strong> 2,000 - 4,999 XP</li>
                    <li>• 🥇 <strong>Gold:</strong> 5,000 - 9,999 XP</li>
                    <li>• 💎 <strong>Platinum:</strong> 10,000 - 14,999 XP</li>
                    <li>• 💠 <strong>Diamond:</strong> 15,000+ XP</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Competições Ativas</h4>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-yellow-800">Weekly CSS Sprint</h5>
                    <Badge className="bg-yellow-500 text-white">Semanal</Badge>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">Competição semanal pelo maior XP ganho</p>
                  <div className="text-xs text-yellow-600">
                    <strong>Recompensas:</strong> 1º lugar: 500 XP + Badge "Weekly Champion" + Título "Sprint Master"
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-purple-800">Flexbox Masters Tournament</h5>
                    <Badge className="bg-purple-500 text-white">Especial</Badge>
                  </div>
                  <p className="text-sm text-purple-700 mb-2">Torneio temático focado em questões de Flexbox</p>
                  <div className="text-xs text-purple-600">
                    <strong>Recompensas:</strong> 1º lugar: 1000 XP + Badge "Flexbox Champion" + Título "Flexbox Grandmaster"
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Como Competir Efetivamente</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Estratégias de XP</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Foque em desafios de alto valor (200+ XP)</li>
                    <li>• Complete grupos para conquistas de maestria</li>
                    <li>• Mantenha streaks longos</li>
                    <li>• Participe de competições ativas</li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Timing Estratégico</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Monitore competições ativas</li>
                    <li>• Planeje sessões intensivas</li>
                    <li>• Aproveite multiplicadores de XP</li>
                    <li>• Estude padrões dos concorrentes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Perfil e Estatísticas Detalhadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Seções do Perfil</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Overview</h5>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Atividade semanal com gráficos</li>
                    <li>• Progresso por categoria</li>
                    <li>• Ações rápidas para continuar aprendendo</li>
                    <li>• Estatísticas gerais de performance</li>
                  </ul>
                </div>

                <div className="p-4 border border-green-200 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Progresso Detalhado</h5>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Progresso geral do curso</li>
                    <li>• Status de cada grupo de aprendizado</li>
                    <li>• Lições completadas por categoria</li>
                    <li>• Metas diárias e semanais</li>
                  </ul>
                </div>

                <div className="p-4 border border-purple-200 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">Conquistas</h5>
                  <ul className="space-y-1 text-sm text-purple-700">
                    <li>• Todas as conquistas desbloqueadas</li>
                    <li>• Badges e títulos conquistados</li>
                    <li>• Progresso para próximas conquistas</li>
                    <li>• Raridade e recompensas de cada conquista</li>
                  </ul>
                </div>

                <div className="p-4 border border-orange-200 rounded-lg">
                  <h5 className="font-medium text-orange-800 mb-2">Estatísticas</h5>
                  <ul className="space-y-1 text-sm text-orange-700">
                    <li>• Performance detalhada (precisão, tempo)</li>
                    <li>• Estatísticas de desafios</li>
                    <li>• Histórico de sessões</li>
                    <li>• Comparação com outros usuários</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Métricas Importantes</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-blue-800 mb-1">Precisão</h5>
                  <p className="text-sm text-blue-700">Porcentagem de respostas corretas</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-green-800 mb-1">Tempo Médio</h5>
                  <p className="text-sm text-green-700">Tempo médio por questão</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Flame className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h5 className="font-semibold text-purple-800 mb-1">Melhor Streak</h5>
                  <p className="text-sm text-purple-700">Maior sequência de acertos</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Dica de Uso</span>
              </div>
              <p className="text-blue-700 text-sm">
                Use as estatísticas do perfil para identificar pontos fracos e focar seus estudos. 
                Se sua precisão em "Effects" está baixa, dedique mais tempo a esse grupo!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
                  Central de Ajuda
                </h1>
                <p className="text-sm text-gray-600">Aprenda como usar todas as funcionalidades do TailwindTrainer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Contato
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Navigation */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="pt-8 pb-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Como posso ajudar você?</h2>
              <p className="text-blue-100">Escolha um tópico abaixo para aprender mais sobre o TailwindTrainer</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {helpSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant="outline"
                    className={`h-auto p-4 flex flex-col space-y-2 border-white/30 text-white hover:bg-white/10 ${
                      selectedSection === section.id ? 'bg-white/20' : ''
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium text-center">{section.title}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Navegação</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {helpSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={selectedSection === section.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedSection(section.id)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {section.title}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedSection === 'getting-started' && renderGettingStarted()}
            {selectedSection === 'learning-system' && renderLearningSystem()}
            {selectedSection === 'challenges' && renderChallenges()}
            {selectedSection === 'achievements' && renderAchievements()}
            {selectedSection === 'leaderboards' && renderLeaderboards()}
            {selectedSection === 'profile' && renderProfile()}
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Perguntas Frequentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/learn/layout">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Começar a Aprender</h3>
                <p className="text-sm text-blue-100">Inicie sua jornada com o primeiro grupo</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/challenges">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Tentar Desafios</h3>
                <p className="text-sm text-purple-100">Teste suas habilidades em modos especiais</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/leaderboard">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Ver Rankings</h3>
                <p className="text-sm text-green-100">Compare-se com outros aprendizes</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}