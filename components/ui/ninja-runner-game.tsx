"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    Eye,
    Move,
    Palette,
    Play,
    RotateCcw,
    SquareCheckBig,
    Trophy,
    Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Obstacle {
    id: string;
    type: "wall" | "pit" | "enemy" | "ceiling" | "colorEnemy";
    position: number; // posição x do obstáculo
    height?: number;
    color?: string;
    requiredAction: string;
    description: string;
}

interface CSSPower {
    id: string;
    name: string;
    class: string;
    icon: React.ReactNode;
    color: string;
    description: string;
}

const cssPowers: CSSPower[] = [
    {
        id: "jump-forward",
        name: "Dash",
        class: "translate-x-12",
        icon: <ArrowRight className="w-4 h-4" />,
        color: "bg-blue-500 hover:bg-blue-600",
        description: "Pular para frente",
    },
    {
        id: "jump-up",
        name: "Jump",
        class: "-translate-y-8",
        icon: <Move className="w-4 h-4" />,
        color: "bg-green-500 hover:bg-green-600",
        description: "Pular para cima",
    },
    {
        id: "ghost",
        name: "Ghost",
        class: "opacity-30",
        icon: <Eye className="w-4 h-4" />,
        color: "bg-purple-500 hover:bg-purple-600",
        description: "Ficar transparente",
    },
    {
        id: "shrink",
        name: "Shrink",
        class: "scale-50",
        icon: <SquareCheckBig className="w-4 h-4" />,
        color: "bg-yellow-500 hover:bg-yellow-600",
        description: "Encolher",
    },
    {
        id: "camouflage-red",
        name: "Red",
        class: "bg-red-500",
        icon: <Palette className="w-4 h-4" />,
        color: "bg-red-500 hover:bg-red-600",
        description: "Camuflagem vermelha",
    },
    {
        id: "camouflage-blue",
        name: "Blue",
        class: "bg-blue-500",
        icon: <Palette className="w-4 h-4" />,
        color: "bg-blue-500 hover:bg-blue-600",
        description: "Camuflagem azul",
    },
    {
        id: "spin",
        name: "Spin",
        class: "rotate-45",
        icon: <RotateCcw className="w-4 h-4" />,
        color: "bg-orange-500 hover:bg-orange-600",
        description: "Girar para desviar",
    },
    {
        id: "power",
        name: "Power",
        class: "animate-pulse scale-110",
        icon: <Zap className="w-4 h-4" />,
        color: "bg-pink-500 hover:bg-pink-600",
        description: "Poder especial",
    },
];

const obstacleTypes = {
    wall: {
        component: "🧱",
        bgColor: "bg-gray-600",
        requiredAction: "opacity-30",
        description: "Muro - Use Ghost para atravessar",
    },
    pit: {
        component: "🕳️",
        bgColor: "bg-black",
        requiredAction: "translate-x-12",
        description: "Buraco - Use Dash para pular",
    },
    enemy: {
        component: "👹",
        bgColor: "bg-red-600",
        requiredAction: "-translate-y-8",
        description: "Inimigo - Use Jump para pular por cima",
    },
    ceiling: {
        component: "🟫",
        bgColor: "bg-amber-700",
        requiredAction: "scale-50",
        description: "Teto baixo - Use Shrink para passar",
    },
    colorEnemy: {
        component: "🔴",
        bgColor: "bg-red-500",
        requiredAction: "bg-red-500",
        description: "Inimigo vermelho - Use camuflagem vermelha",
    },
};

export default function NinjaRunnerGame() {
    const [gameState, setGameState] = useState<
        "menu" | "difficulty" | "playing" | "gameOver" | "complete"
    >("menu");
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [ninjaAction, setNinjaAction] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(5);
    const [currentObstacle, setCurrentObstacle] = useState<Obstacle | null>(
        null
    );
    const [gameSpeed, setGameSpeed] = useState(2000);
    const [successStreak, setSuccessStreak] = useState(0);
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
    
    // Configurações de dificuldade
    const difficultySettings = {
        easy: {
            initialTime: 6,
            initialSpeed: 3000,
            speedDecrease: 200,
            minSpeed: 1500,
            name: "Ninja Iniciante",
            description: "6 segundos por obstáculo, velocidade reduzida"
        },
        medium: {
            initialTime: 4,
            initialSpeed: 2000,
            speedDecrease: 150,
            minSpeed: 800,
            name: "Ninja Experiente", 
            description: "4 segundos por obstáculo, velocidade normal"
        },
        hard: {
            initialTime: 3,
            initialSpeed: 1200,
            speedDecrease: 100,
            minSpeed: 400,
            name: "Mestre Ninja",
            description: "3 segundos por obstáculo, velocidade máxima"
        }
    };

    // Gerar obstáculo aleatório
    const generateObstacle = useCallback((): Obstacle => {
        const types = Object.keys(obstacleTypes) as Array<
            keyof typeof obstacleTypes
        >;
        const randomType = types[Math.floor(Math.random() * types.length)];
        const obstacleData = obstacleTypes[randomType];

        const colors = ["red", "blue", "green", "purple"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return {
            id: `obstacle-${Date.now()}-${Math.random()}`,
            type: randomType,
            position: 100, // Começa fora da tela
            color: randomType === "colorEnemy" ? randomColor : undefined,
            requiredAction:
                randomType === "colorEnemy"
                    ? `bg-${randomColor}-500`
                    : obstacleData.requiredAction,
            description:
                randomType === "colorEnemy"
                    ? `Inimigo ${randomColor} - Use camuflagem ${randomColor}`
                    : obstacleData.description,
        };
    }, []);    // Iniciar jogo
    const startGame = () => {
        const settings = difficultySettings[difficulty];
        setGameState("playing");
        setScore(0);
        setLevel(1);
        setObstacles([]);
        setNinjaAction("");
        setTimeLeft(settings.initialTime);
        setGameSpeed(settings.initialSpeed);
        setSuccessStreak(0);
        
        // Primeiro obstáculo
        setTimeout(() => {
            const newObstacle = generateObstacle();
            setCurrentObstacle(newObstacle);
            setTimeLeft(settings.initialTime);
        }, 1000);
    };

    // Usar poder CSS
    const usePower = (power: CSSPower) => {
        if (!currentObstacle || gameState !== "playing") return;

        const isCorrect =
            power.class === currentObstacle.requiredAction ||
            (currentObstacle.requiredAction.includes("bg-") &&
                power.class.includes("bg-") &&
                currentObstacle.requiredAction.includes(
                    power.class.split("-")[1]
                ));

        if (isCorrect) {
            // Sucesso!
            setNinjaAction(power.class);
            setScore((prev) => prev + 10 * level);
            setSuccessStreak((prev) => prev + 1);

            // Animação de sucesso
            setTimeout(() => {
                setNinjaAction("");
                setCurrentObstacle(null);

                // Próximo obstáculo
                setTimeout(() => {
                    const settings = difficultySettings[difficulty];
                    if (score + 10 * level >= level * 100) {
                        // Level up!
                        setLevel((prev) => prev + 1);
                        setGameSpeed((prev) => Math.max(prev - settings.speedDecrease, settings.minSpeed));

                        if (level >= 5) {
                            setGameState("complete");
                            return;
                        }
                    }

                    const newObstacle = generateObstacle();
                    setCurrentObstacle(newObstacle);
                    setTimeLeft(settings.initialTime);
                }, 500);
            }, 800);
        } else {
            // Falhou!
            setGameState("gameOver");
        }
    };

    // Timer para obstáculos
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (gameState === "playing" && currentObstacle && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setGameState("gameOver");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [gameState, currentObstacle, timeLeft]);

    // Renderizar ninja
    const renderNinja = () => {
        const baseClasses =
            "w-12 h-12 bg-black rounded-lg flex items-center justify-center text-2xl transition-all duration-300 relative z-20";
        const actionClasses = ninjaAction ? ninjaAction : "";

        return <div className={`${baseClasses} ${actionClasses}`}>🥷</div>;
    };

    // Renderizar obstáculo atual
    const renderCurrentObstacle = () => {
        if (!currentObstacle) return null;

        const obstacleData = obstacleTypes[currentObstacle.type];
        const bgColor = currentObstacle.color
            ? `bg-${currentObstacle.color}-500`
            : obstacleData.bgColor;

        return (
            <div className="absolute right-8 bottom-8 z-10">
                <div
                    className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center text-3xl border-2 border-gray-300 shadow-lg`}
                >
                    {currentObstacle.type === "colorEnemy" ? (
                        <div
                            className={`w-8 h-8 rounded-full bg-${currentObstacle.color}-500 border-2 border-white`}
                        ></div>
                    ) : (
                        obstacleData.component
                    )}
                </div>
                <div className="text-center mt-2 text-sm font-semibold text-white bg-black bg-opacity-50 rounded px-2 py-1">
                    {timeLeft}s
                </div>
            </div>
        );
    };

    // Tela de menu
    if (gameState === "menu") {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="text-center py-12">
                    <div className="mb-8">
                        <div className="text-6xl mb-4">🥷</div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            CSS Ninja Runner
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Seja um ninja CSS! Use poderes de CSS para superar
                            obstáculos rapidamente. Clique no poder certo antes
                            que o tempo acabe!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-3">
                                Como Jogar
                            </h3>
                            <ul className="text-sm text-blue-800 space-y-2 text-left">
                                <li>• Obstáculos aparecem na tela</li>
                                <li>• Escolha sua dificuldade</li>
                                <li>• Clique no poder CSS correto</li>
                                <li>• Sobreviva e evolua de nível!</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-purple-900 mb-3">
                                Poderes CSS
                            </h3>
                            <ul className="text-sm text-purple-800 space-y-2 text-left">
                                <li>• Ghost: opacity-30</li>
                                <li>• Jump: -translate-y-8</li>
                                <li>• Dash: translate-x-12</li>
                                <li>• Shrink: scale-50</li>
                            </ul>
                        </div>
                    </div>

                    <Button
                        onClick={() => setGameState("difficulty")}
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
                    >
                        <Play className="w-5 h-5 mr-2" />
                        Escolher Dificuldade
                    </Button>
                </CardContent>
            </Card>
        );
    }

    // Tela de seleção de dificuldade
    if (gameState === "difficulty") {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="text-center py-12">
                    <div className="mb-8">
                        <div className="text-6xl mb-4">⚡</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Escolha Sua Dificuldade
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Selecione o nível de desafio que combina com seu estilo ninja!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                        {(Object.keys(difficultySettings) as Array<keyof typeof difficultySettings>).map((diff) => {
                            const settings = difficultySettings[diff];
                            const isSelected = difficulty === diff;
                            
                            return (
                                <Card 
                                    key={diff}
                                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                                        isSelected 
                                            ? 'ring-2 ring-purple-500 bg-purple-50' 
                                            : 'hover:shadow-lg'
                                    }`}
                                    onClick={() => setDifficulty(diff)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="text-4xl mb-3">
                                            {diff === 'easy' ? '🟢' : diff === 'medium' ? '🟡' : '🔴'}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">
                                            {settings.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {settings.description}
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Tempo:</span>
                                                <span className="font-semibold">{settings.initialTime}s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Velocidade:</span>
                                                <span className="font-semibold">
                                                    {diff === 'easy' ? 'Lenta' : diff === 'medium' ? 'Normal' : 'Rápida'}
                                                </span>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="mt-4 text-purple-600 font-semibold">
                                                ✓ Selecionado
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => setGameState("menu")}
                        >
                            Voltar
                        </Button>
                        <Button
                            onClick={startGame}
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Iniciar Missão ({difficultySettings[difficulty].name})
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Tela de jogo completo
    if (gameState === "complete") {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="text-center py-12">
                    <div className="animate-bounce mb-6">
                        <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-purple-600 mb-4">
                        🥷 Ninja Master Alcançado! 🥷
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Você dominou todos os poderes CSS e completou todos os
                        níveis!
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                                {score}
                            </div>
                            <div className="text-sm text-purple-700">
                                Pontuação Final
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {level}
                            </div>
                            <div className="text-sm text-blue-700">
                                Níveis Completados
                            </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                Ninja
                            </div>
                            <div className="text-sm text-green-700">
                                Rank CSS
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={startGame}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Jogar Novamente
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setGameState("difficulty")}
                        >
                            Mudar Dificuldade
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setGameState("menu")}
                        >
                            Menu Principal
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Tela de game over
    if (gameState === "gameOver") {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="text-center py-12">
                    <div className="text-6xl mb-6">💥</div>
                    <h2 className="text-3xl font-bold text-red-600 mb-4">
                        Missão Falhou!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        O ninja foi pego! Mas você aprendeu muito sobre CSS.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {score}
                            </div>
                            <div className="text-sm text-blue-700">
                                Pontuação
                            </div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                                {level}
                            </div>
                            <div className="text-sm text-purple-700">
                                Nível Alcançado
                            </div>
                        </div>
                    </div>
                    {currentObstacle && (
                        <div className="bg-yellow-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
                            <p className="text-sm text-yellow-800">
                                <strong>Obstáculo:</strong>{" "}
                                {currentObstacle.description}
                            </p>
                            <p className="text-sm text-yellow-700 mt-1">
                                <strong>Resposta:</strong>{" "}
                                <code>{currentObstacle.requiredAction}</code>
                            </p>
                        </div>
                    )}
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={startGame}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Tentar Novamente
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setGameState("difficulty")}
                        >
                            Mudar Dificuldade
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setGameState("menu")}
                        >
                            Menu Principal
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Tela de jogo principal
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        🥷 CSS Ninja Runner
                        <Badge variant="default">Nível {level}</Badge>
                        <Badge variant="secondary">{difficultySettings[difficulty].name}</Badge>
                    </CardTitle>
                    <div className="flex gap-4 text-sm">
                        <span className="font-semibold">Score: {score}</span>
                        <span>Sequência: {successStreak}</span>
                        <span>Tempo: {difficultySettings[difficulty].initialTime}s</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Campo de Jogo */}
                <div className="relative w-full h-64 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg border-4 border-gray-600 overflow-hidden">
                    {/* Cenário de fundo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900 opacity-20"></div>

                    {/* Chão */}
                    <div className="absolute bottom-0 w-full h-16 bg-green-600 border-t-4 border-green-500"></div>

                    {/* Ninja */}
                    <div className="absolute bottom-16 left-8">
                        {renderNinja()}
                    </div>

                    {/* Obstáculo atual */}
                    {renderCurrentObstacle()}

                    {/* Instrução do obstáculo */}
                    {currentObstacle && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-center">
                            <div className="text-sm font-semibold">
                                {currentObstacle.description}
                            </div>
                            <div className="text-xs text-gray-300 mt-1">
                                Tempo: {timeLeft}s
                            </div>
                        </div>
                    )}
                </div>

                {/* Poderes CSS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center">
                        Poderes CSS - Clique Rápido!
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        {cssPowers.map((power) => (
                            <Button
                                key={power.id}
                                onClick={() => usePower(power)}
                                className={`${power.color} text-white p-3 h-auto flex flex-col items-center gap-1 transition-all duration-200 hover:scale-105`}
                                disabled={!currentObstacle}
                            >
                                {power.icon}
                                <span className="text-xs font-medium">
                                    {power.name}
                                </span>
                                <span className="text-xs opacity-80">
                                    {power.class}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Progresso do nível */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progresso do Nível {level}</span>
                        <span>
                            {score}/{level * 100} pontos
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${Math.min(
                                    (score / (level * 100)) * 100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Controles */}
                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setGameState("menu")}
                    >
                        Pause / Menu
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
