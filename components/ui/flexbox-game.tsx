"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Trophy } from 'lucide-react';

interface GameLevel {
  id: number;
  title: string;
  description: string;
  targetProperty: string;
  correctAnswer: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  frogs: number;
  lilyPads: number;
  frogPositions: number[];
  targetPositions: number[];
}

const flexboxLevels: GameLevel[] = [
  {
    id: 1,
    title: "Bem-vindo ao Flexbox Pond!",
    description: "Use justify-content para mover o sapo até a vitória-régia.",
    targetProperty: "justify-content",
    correctAnswer: "justify-end",
    hint: "Use 'justify-end' para mover itens para o final do container.",
    difficulty: "easy",
    frogs: 1,
    lilyPads: 1,
    frogPositions: [0],
    targetPositions: [4]
  },
  {
    id: 2,
    title: "Centro das Atenções",
    description: "Centralize o sapo na lagoa usando justify-content.",
    targetProperty: "justify-content",
    correctAnswer: "justify-center",
    hint: "Use 'justify-center' para centralizar itens horizontalmente.",
    difficulty: "easy",
    frogs: 1,
    lilyPads: 1,
    frogPositions: [0],
    targetPositions: [2]
  },
  {
    id: 3,
    title: "Espaçamento Igual",
    description: "Distribua os sapos igualmente usando space-between.",
    targetProperty: "justify-content",
    correctAnswer: "justify-between",
    hint: "Use 'justify-between' para espaçamento igual entre os itens.",
    difficulty: "easy",
    frogs: 2,
    lilyPads: 2,
    frogPositions: [1, 2],
    targetPositions: [0, 4]
  },
  {
    id: 4,
    title: "Espaço ao Redor",
    description: "Use space-around para criar espaço ao redor dos sapos.",
    targetProperty: "justify-content",
    correctAnswer: "justify-around",
    hint: "Use 'justify-around' para espaço igual ao redor de cada item.",
    difficulty: "medium",
    frogs: 3,
    lilyPads: 3,
    frogPositions: [0, 1, 2],
    targetPositions: [0, 2, 4]
  },
  {
    id: 5,
    title: "Alinhamento Vertical",
    description: "Use align-items para alinhar verticalmente.",
    targetProperty: "align-items",
    correctAnswer: "items-end",
    hint: "Use 'items-end' para alinhar itens no final do eixo cruzado.",
    difficulty: "medium",
    frogs: 2,
    lilyPads: 2,
    frogPositions: [1, 3],
    targetPositions: [1, 3]
  },
  {
    id: 6,
    title: "Centro Vertical",
    description: "Centralize verticalmente com align-items.",
    targetProperty: "align-items",
    correctAnswer: "items-center",
    hint: "Use 'items-center' para centralizar verticalmente.",
    difficulty: "medium",
    frogs: 2,
    lilyPads: 2,
    frogPositions: [0, 4],
    targetPositions: [5, 9]
  },
  {
    id: 7,
    title: "Direção da Coluna",
    description: "Mude a direção do flex para coluna.",
    targetProperty: "flex-direction",
    correctAnswer: "flex-col",
    hint: "Use 'flex-col' para mudar a direção para coluna.",
    difficulty: "medium",
    frogs: 2,
    lilyPads: 2,
    frogPositions: [0, 1],
    targetPositions: [5, 10]
  },
  {
    id: 8,
    title: "Coluna Reversa",
    description: "Use flex-direction column-reverse.",
    targetProperty: "flex-direction",
    correctAnswer: "flex-col-reverse",
    hint: "Use 'flex-col-reverse' para coluna em ordem reversa.",
    difficulty: "hard",
    frogs: 3,
    lilyPads: 3,
    frogPositions: [0, 1, 2],
    targetPositions: [10, 5, 0]
  },
  {
    id: 9,
    title: "Flex Wrap",
    description: "Permita que os itens quebrem linha com flex-wrap.",
    targetProperty: "flex-wrap",
    correctAnswer: "flex-wrap",
    hint: "Use 'flex-wrap' para permitir quebra de linha.",
    difficulty: "hard",
    frogs: 4,
    lilyPads: 4,
    frogPositions: [0, 1, 2, 3],
    targetPositions: [0, 1, 5, 6]
  },
  {
    id: 10,
    title: "Combinação Mestre",
    description: "Combine justify-center e items-center.",
    targetProperty: "justify-content + align-items",
    correctAnswer: "justify-center items-center",
    hint: "Use 'justify-center items-center' para centralizar completamente.",
    difficulty: "hard",
    frogs: 1,
    lilyPads: 1,
    frogPositions: [0],
    targetPositions: [7]
  },
  {
    id: 11,
    title: "Espaço Equilibrado",
    description: "Use justify-evenly para espaçamento equilibrado.",
    targetProperty: "justify-content",
    correctAnswer: "justify-evenly",
    hint: "Use 'justify-evenly' para espaçamento igual entre e ao redor dos itens.",
    difficulty: "hard",
    frogs: 3,
    lilyPads: 3,
    frogPositions: [1, 2, 3],
    targetPositions: [0, 2, 4]
  },
  {
    id: 12,
    title: "Desafio Final",
    description: "Combine flex-col, justify-between e items-center.",
    targetProperty: "flex-direction + justify + align",
    correctAnswer: "flex-col justify-between items-center",
    hint: "Combine três propriedades: direção coluna, espaçamento entre e centralização.",
    difficulty: "hard",
    frogs: 3,
    lilyPads: 3,
    frogPositions: [0, 1, 2],
    targetPositions: [2, 7, 12]
  }
];

export default function FlexboxGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const level = flexboxLevels[currentLevel];

  useEffect(() => {
    setUserInput('');
    setIsCorrect(null);
    setShowHint(false);
  }, [currentLevel]);

  const checkAnswer = () => {
    const cleanInput = userInput.trim().toLowerCase();
    const cleanAnswer = level.correctAnswer.toLowerCase();
    
    // Lista de respostas alternativas válidas
    const alternativeAnswers: { [key: string]: string[] } = {
      'justify-end': ['justify-end', 'flex justify-end'],
      'justify-center': ['justify-center', 'flex justify-center'],
      'justify-between': ['justify-between', 'flex justify-between'],
      'justify-around': ['justify-around', 'flex justify-around'],
      'justify-evenly': ['justify-evenly', 'flex justify-evenly'],
      'items-end': ['items-end', 'flex items-end'],
      'items-center': ['items-center', 'flex items-center'],
      'flex-col': ['flex-col', 'flex flex-col'],
      'flex-col-reverse': ['flex-col-reverse', 'flex flex-col-reverse'],
      'flex-wrap': ['flex-wrap', 'flex flex-wrap'],
      'justify-center items-center': [
        'justify-center items-center',
        'items-center justify-center',
        'flex justify-center items-center',
        'flex items-center justify-center'
      ],
      'flex-col justify-between items-center': [
        'flex-col justify-between items-center',
        'flex-col items-center justify-between',
        'items-center flex-col justify-between',
        'justify-between flex-col items-center',
        'flex flex-col justify-between items-center',
        'flex flex-col items-center justify-between'
      ]
    };
    
    const validAnswers = alternativeAnswers[cleanAnswer] || [cleanAnswer];
    const correct = validAnswers.includes(cleanInput);
    
    setIsCorrect(correct);
    
    if (correct && !completedLevels.includes(level.id)) {
      setCompletedLevels([...completedLevels, level.id]);
      
      if (currentLevel === flexboxLevels.length - 1) {
        setGameComplete(true);
      }
    }
  };

  const nextLevel = () => {
    if (currentLevel < flexboxLevels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const resetLevel = () => {
    setUserInput('');
    setIsCorrect(null);
    setShowHint(false);
  };

  const renderPond = () => {
    const containerClasses = `relative w-full h-64 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg border-4 border-blue-500 flex gap-2 p-4 ${userInput || 'justify-start items-start'}`;
    
    // Criar grid 5x3 para posicionamento das vitórias-régias
    const positions: { row: number; col: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        positions.push({ row, col });
      }
    }

    return (
      <div className="relative">
        {/* Grid de fundo para mostrar posições possíveis */}
        <div className="absolute inset-0 rounded-lg p-4">
          <div className="grid grid-cols-5 grid-rows-3 gap-2 h-full opacity-20">
            {positions.map((_, index) => (
              <div key={index} className="bg-blue-300 rounded-lg border border-blue-400"></div>
            ))}
          </div>
        </div>
        
        <div className={containerClasses}>
          {/* Vitórias-régias (targets) */}
          {level.targetPositions.map((pos, index) => {
            const position = positions[pos];
            return (
              <div
                key={`lily-${index}`}
                className="absolute w-12 h-12 z-10 flex items-center justify-center"
                style={{
                  left: `${16 + position.col * 18}%`,
                  top: `${16 + position.row * 30}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-12 h-12 bg-green-400 rounded-full border-2 border-green-600 flex items-center justify-center shadow-lg">
                  🪷
                </div>
              </div>
            );
          })}
          
          {/* Sapos */}
          {Array.from({ length: level.frogs }).map((_, index) => (
            <div
              key={`frog-${index}`}
              className="w-12 h-12 bg-green-500 rounded-full border-2 border-green-700 flex items-center justify-center text-xl shadow-lg z-20 transition-all duration-300"
            >
              🐸
            </div>
          ))}
        </div>
        
        {/* Overlay para mostrar se está correto */}
        {isCorrect !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-30">
            <div className={`text-4xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? <CheckCircle size={64} /> : <XCircle size={64} />}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (gameComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="animate-bounce mb-6">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Parabéns! Você dominou o Flexbox! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Você completou todos os {flexboxLevels.length} níveis do Flexbox Pond!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{flexboxLevels.length}</div>
              <div className="text-sm text-green-700">Níveis Completos</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-blue-700">Propriedades Aprendidas</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-purple-700">Progresso</div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => {
                setCurrentLevel(0);
                setCompletedLevels([]);
                setGameComplete(false);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Jogar Novamente
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Voltar ao Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            🐸 Flexbox Pond - Nível {level.id}
            <Badge variant={level.difficulty === 'easy' ? 'default' : level.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {level.difficulty}
            </Badge>
          </CardTitle>
          <div className="text-sm text-gray-500">
            {completedLevels.length}/{flexboxLevels.length} completos
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentLevel + 1) / flexboxLevels.length) * 100}%` }}
          />
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">{level.title}</h3>
          <p className="text-blue-800">{level.description}</p>
          {showHint && (
            <div className="mt-2 p-2 bg-yellow-100 rounded border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-800">💡 {level.hint}</p>
            </div>
          )}
        </div>

        {/* Lagoa do Jogo */}
        {renderPond()}

        {/* Input e Controles */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Digite a classe Tailwind (ex: ${level.targetProperty})`}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            />
            <Button onClick={checkAnswer} className="bg-green-600 hover:bg-green-700">
              Verificar
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowHint(!showHint)}
              >
                💡 {showHint ? 'Ocultar' : 'Mostrar'} Dica
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetLevel}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>

            {isCorrect && (
              <Button 
                onClick={nextLevel}
                disabled={currentLevel >= flexboxLevels.length - 1}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Próximo Nível <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Feedback */}
        {isCorrect !== null && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {isCorrect ? (
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Correto! 🎉</span>
                <span>Os sapos chegaram às vitórias-régias!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-800">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">Não foi dessa vez!</span>
                <span>Tente novamente. A resposta é: <code className="bg-red-100 px-1 rounded">{level.correctAnswer}</code></span>
              </div>
            )}
          </div>
        )}

        {/* Navegação de Níveis */}
        <div className="flex gap-1 flex-wrap">
          {flexboxLevels.map((_, index) => (
            <Button
              key={index}
              variant={index === currentLevel ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLevel(index)}
              className={`w-8 h-8 p-0 ${
                completedLevels.includes(index + 1) ? 'bg-green-600 text-white' : ''
              }`}
            >
              {completedLevels.includes(index + 1) ? '✓' : index + 1}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
