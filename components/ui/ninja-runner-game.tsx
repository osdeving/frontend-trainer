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
    ninjaThought: string;
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
        name: "translate-x-12",
        class: "translate-x-12",
        icon: <ArrowRight className="w-4 h-4" />,
        color: "bg-blue-500 hover:bg-blue-600",
        description: "Move horizontalmente 12 unidades",
    },
    {
        id: "jump-up",
        name: "-translate-y-8",
        class: "-translate-y-8",
        icon: <Move className="w-4 h-4" />,
        color: "bg-green-500 hover:bg-green-600",
        description: "Move verticalmente -8 unidades",
    },
    {
        id: "ghost",
        name: "opacity-30",
        class: "opacity-30",
        icon: <Eye className="w-4 h-4" />,
        color: "bg-purple-500 hover:bg-purple-600",
        description: "Define opacidade para 30%",
    },
    {
        id: "shrink",
        name: "scale-50",
        class: "scale-50",
        icon: <SquareCheckBig className="w-4 h-4" />,
        color: "bg-yellow-500 hover:bg-yellow-600",
        description: "Reduz escala para 50%",
    },
    {
        id: "camouflage-red",
        name: "bg-red-500",
        class: "bg-red-500",
        icon: <Palette className="w-4 h-4" />,
        color: "bg-red-500 hover:bg-red-600",
        description: "Aplica cor de fundo vermelha",
    },
    {
        id: "camouflage-blue",
        name: "bg-blue-500",
        class: "bg-blue-500",
        icon: <Palette className="w-4 h-4" />,
        color: "bg-blue-500 hover:bg-blue-600",
        description: "Aplica cor de fundo azul",
    },
    {
        id: "spin",
        name: "rotate-45",
        class: "rotate-45",
        icon: <RotateCcw className="w-4 h-4" />,
        color: "bg-orange-500 hover:bg-orange-600",
        description: "Rotaciona 45 graus",
    },
    {
        id: "power",
        name: "animate-pulse",
        class: "animate-pulse scale-110",
        icon: <Zap className="w-4 h-4" />,
        color: "bg-pink-500 hover:bg-pink-600",
        description: "Animação de pulsação",
    },
];

const obstacleTypes = {
    wall: {
        component: "🧱",
        bgColor: "bg-gray-600",
        requiredAction: "opacity-30",
        description: "Muro sólido se aproximando",
        ninjaThought: "💭 Preciso ficar transparente para atravessar!",
    },
    pit: {
        component: "🕳️",
        bgColor: "bg-black",
        requiredAction: "translate-x-12",
        description: "Buraco profundo à frente",
        ninjaThought: "💭 Preciso pular 12px para frente!",
    },
    enemy: {
        component: "👹",
        bgColor: "bg-red-600",
        requiredAction: "-translate-y-8",
        description: "Inimigo rastejante",
        ninjaThought: "💭 Preciso subir 8px para passar por cima!",
    },
    ceiling: {
        component: "🟫",
        bgColor: "bg-amber-700",
        requiredAction: "scale-50",
        description: "Teto baixo",
        ninjaThought: "💭 Nossa, preciso ficar menor para passar!",
    },
    colorEnemy: {
        component: "🔴",
        bgColor: "bg-red-500",
        requiredAction: "bg-red-500",
        description: "Inimigo colorido",
        ninjaThought: "💭 Preciso me camuflar com a mesma cor!",
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
    const [currentObstacle, setCurrentObstacle] = useState<Obstacle | null>(
        null
    );
    const [gameSpeed, setGameSpeed] = useState(2000);
    const [successStreak, setSuccessStreak] = useState(0);
    const [difficulty, setDifficulty] = useState<
        "intern" | "junior" | "mid" | "senior"
    >("junior");
    const [obstaclePosition, setObstaclePosition] = useState(800);
    const [isColliding, setIsColliding] = useState(false);

    // Configurações de dificuldade
    const difficultySettings = {
        intern: {
            initialTime: 8,
            initialSpeed: 4000,
            speedDecrease: 300,
            minSpeed: 2500,
            name: "Estagiário",
            description: "8 segundos por obstáculo, velocidade muito reduzida",
            badge: "🟢",
        },
        junior: {
            initialTime: 6,
            initialSpeed: 3000,
            speedDecrease: 200,
            minSpeed: 1500,
            name: "Júnior",
            description: "6 segundos por obstáculo, velocidade reduzida",
            badge: "🟡",
        },
        mid: {
            initialTime: 4,
            initialSpeed: 2000,
            speedDecrease: 150,
            minSpeed: 800,
            name: "Pleno",
            description: "4 segundos por obstáculo, velocidade normal",
            badge: "🟠",
        },
        senior: {
            initialTime: 3,
            initialSpeed: 1200,
            speedDecrease: 100,
            minSpeed: 400,
            name: "Sênior",
            description: "3 segundos por obstáculo, velocidade máxima",
            badge: "🔴",
        },
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
            position: window.innerWidth || 800, // Começa fora da tela direita
            color: randomType === "colorEnemy" ? randomColor : undefined,
            requiredAction:
                randomType === "colorEnemy"
                    ? `bg-${randomColor}-500`
                    : obstacleData.requiredAction,
            description:
                randomType === "colorEnemy"
                    ? `Inimigo ${randomColor}`
                    : obstacleData.description,
            ninjaThought:
                randomType === "colorEnemy"
                    ? `💭 Preciso me camuflar de ${randomColor}!`
                    : obstacleData.ninjaThought,
        };
    }, []);
    // Iniciar jogo
    const startGame = () => {
        const settings = difficultySettings[difficulty];
        setGameState("playing");
        setScore(0);
        setLevel(1);
        setObstacles([]);
        setNinjaAction("");
        setGameSpeed(settings.initialSpeed);
        setSuccessStreak(0);
        setObstaclePosition(window.innerWidth || 800);
        setIsColliding(false);

        // Primeiro obstáculo
        setTimeout(() => {
            const newObstacle = generateObstacle();
            setCurrentObstacle(newObstacle);
            setObstaclePosition(window.innerWidth || 800);
        }, 2000); // Dar mais tempo para o jogador se preparar
    }; // Usar poder CSS
    const usePower = (power: CSSPower) => {
        if (!currentObstacle || gameState !== "playing") return;

        // Aplicar o efeito CSS imediatamente
        setNinjaAction(power.class);

        // O efeito dura 1 segundo, depois remove
        setTimeout(() => {
            if (gameState === "playing" && !isColliding) {
                setNinjaAction("");
            }
        }, 1000);
    }; // Timer removido - agora a colisão é baseada em posição física
    // A detecção acontece no useEffect de animação do obstáculo    // Animação do movimento do obstáculo
    useEffect(() => {
        let animationFrame: number;

        if (gameState === "playing" && currentObstacle && !isColliding) {
            const settings = difficultySettings[difficulty];
            // Velocidade baseada na dificuldade - mais lenta e controlada
            const baseSpeed = {
                intern: 0.8, // Muito devagar
                junior: 1.2, // Devagar
                mid: 1.8, // Normal
                senior: 2.5, // Rápido
            };
            const speed = baseSpeed[difficulty];

            const animate = () => {
                setObstaclePosition((prev) => {
                    const newPosition = prev - speed;

                    // Detecção de colisão física - quando o obstáculo atinge a posição do ninja
                    // Ninja está em left-8 (32px), obstáculo tem 64px de largura
                    const ninjaPosition = 32; // left-8 = 32px
                    const obstacleWidth = 64; // w-16 = 64px
                    const collisionZone = ninjaPosition + 48; // Zona de colisão mais generosa

                    if (newPosition <= collisionZone && prev > collisionZone) {
                        // Verificar se o ninja está usando o poder correto
                        if (
                            ninjaAction === currentObstacle.requiredAction ||
                            (currentObstacle.requiredAction.includes("bg-") &&
                                ninjaAction.includes("bg-") &&
                                currentObstacle.requiredAction.includes(
                                    ninjaAction.split("-")[1]
                                ))
                        ) {
                            // Sucesso! Ninja esquivou
                            setScore((prev) => prev + 10 * level);
                            setSuccessStreak((prev) => prev + 1);

                            // Remover obstáculo e gerar próximo
                            setTimeout(() => {
                                setNinjaAction("");
                                setCurrentObstacle(null);
                                setObstaclePosition(window.innerWidth || 800); // Resetar para fora da tela

                                setTimeout(() => {
                                    if (score + 10 * level >= level * 100) {
                                        setLevel((prev) => prev + 1);
                                        setGameSpeed((prev) =>
                                            Math.max(
                                                prev - settings.speedDecrease,
                                                settings.minSpeed
                                            )
                                        );

                                        if (level >= 5) {
                                            setGameState("complete");
                                            return;
                                        }
                                    }

                                    const newObstacle = generateObstacle();
                                    setCurrentObstacle(newObstacle);
                                    setObstaclePosition(
                                        window.innerWidth || 800
                                    );
                                }, 1000); // Mais tempo entre obstáculos
                            }, 300);

                            return newPosition;
                        } else {
                            // Colisão! Game Over
                            setIsColliding(true);
                            setNinjaAction("animate-pulse scale-75 bg-red-500");

                            setTimeout(() => {
                                setGameState("gameOver");
                                setIsColliding(false);
                                setNinjaAction("");
                            }, 1500);

                            return newPosition;
                        }
                    }

                    // Se o obstáculo passou do ninja sem colisão, é sucesso também
                    if (
                        newPosition <= -obstacleWidth &&
                        prev > -obstacleWidth
                    ) {
                        // Sucesso automático se passou sem colidir
                        setScore((prev) => prev + 5 * level); // Menos pontos por passar sem usar poder
                        setSuccessStreak((prev) => prev + 1);

                        setTimeout(() => {
                            setNinjaAction("");
                            setCurrentObstacle(null);
                            setObstaclePosition(window.innerWidth || 800);

                            setTimeout(() => {
                                const newObstacle = generateObstacle();
                                setCurrentObstacle(newObstacle);
                                setObstaclePosition(window.innerWidth || 800);
                            }, 1500); // Intervalo maior entre obstáculos
                        }, 200);

                        return newPosition;
                    }

                    return newPosition;
                });

                if (gameState === "playing" && !isColliding) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [
        gameState,
        currentObstacle,
        difficulty,
        isColliding,
        ninjaAction,
        score,
        level,
    ]);

    // Renderizar ninja
    const renderNinja = () => {
        const baseClasses =
            "w-12 h-12 bg-black rounded-lg flex items-center justify-center text-2xl transition-all duration-300 relative z-20";
        const actionClasses = ninjaAction ? ninjaAction : "";
        const collisionClasses = isColliding ? "animate-bounce" : "";

        return (
            <div
                className={`${baseClasses} ${actionClasses} ${collisionClasses}`}
            >
                {isColliding ? "💥" : "🥷"}
            </div>
        );
    };

    // Renderizar obstáculo atual
    const renderCurrentObstacle = () => {
        if (!currentObstacle) return null;

        const obstacleData = obstacleTypes[currentObstacle.type];
        const bgColor = currentObstacle.color
            ? `bg-${currentObstacle.color}-500`
            : obstacleData.bgColor;

        return (
            <div
                className="absolute bottom-8 z-10 transition-all duration-100"
                style={{
                    left: `${obstaclePosition}px`,
                    transform: isColliding ? "scale(1.2)" : "scale(1)",
                }}
            >
                <div
                    className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center text-3xl border-2 border-gray-300 shadow-lg ${
                        isColliding ? "animate-pulse border-red-500" : ""
                    }`}
                >
                    {currentObstacle.type === "colorEnemy" ? (
                        <div
                            className={`w-8 h-8 rounded-full bg-${currentObstacle.color}-500 border-2 border-white`}
                        ></div>
                    ) : (
                        obstacleData.component
                    )}
                </div>
                <div className="text-center mt-2 text-xs font-semibold text-white bg-black bg-opacity-50 rounded px-2 py-1">
                    Distância: {Math.round(obstaclePosition)}px
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
                            Seja um ninja CSS! Use propriedades CSS para desviar
                            de obstáculos que se aproximam. O ninja pensa em voz
                            alta - ouça seus pensamentos!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-3">
                                Como Jogar
                            </h3>
                            <ul className="text-sm text-blue-800 space-y-2 text-left">
                                <li>• Obstáculos se aproximam do ninja</li>
                                <li>• Ouça os pensamentos do ninja</li>
                                <li>• Clique na propriedade CSS correta</li>
                                <li>• Evite a colisão física!</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-purple-900 mb-3">
                                Poderes CSS
                            </h3>
                            <ul className="text-sm text-purple-800 space-y-2 text-left">
                                <li>• opacity-30: Transparência</li>
                                <li>• -translate-y-8: Mover para cima</li>
                                <li>• translate-x-12: Mover para frente</li>
                                <li>• scale-50: Reduzir tamanho</li>
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
                            Selecione o nível de desafio que combina com seu
                            estilo ninja!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                        {(
                            Object.keys(difficultySettings) as Array<
                                keyof typeof difficultySettings
                            >
                        ).map((diff) => {
                            const settings = difficultySettings[diff];
                            const isSelected = difficulty === diff;

                            return (
                                <Card
                                    key={diff}
                                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                                        isSelected
                                            ? "ring-2 ring-purple-500 bg-purple-50"
                                            : "hover:shadow-lg"
                                    }`}
                                    onClick={() => setDifficulty(diff)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="text-4xl mb-3">
                                            {settings.badge}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">
                                            {settings.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {settings.description}
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Velocidade:</span>
                                                <span className="font-semibold">
                                                    {diff === "intern"
                                                        ? "Muito Lenta"
                                                        : diff === "junior"
                                                        ? "Lenta"
                                                        : diff === "mid"
                                                        ? "Normal"
                                                        : "Rápida"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Dificuldade:</span>
                                                <span className="font-semibold">
                                                    {diff === "intern"
                                                        ? "Iniciante"
                                                        : diff === "junior"
                                                        ? "Fácil"
                                                        : diff === "mid"
                                                        ? "Médio"
                                                        : "Difícil"}
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
                            Iniciar Missão (
                            {difficultySettings[difficulty].name})
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
                        <Badge variant="secondary">
                            {difficultySettings[difficulty].name}
                        </Badge>
                    </CardTitle>
                    <div className="flex gap-4 text-sm">
                        <span className="font-semibold">Score: {score}</span>
                        <span>Sequência: {successStreak}</span>
                        <span>Distância: {Math.round(obstaclePosition)}px</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Campo de Jogo */}
                <div className="relative w-full h-64 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg border-4 border-gray-600 overflow-hidden">
                    {/* Cenário de fundo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900 opacity-20"></div>

                    {/* Linhas de movimento para dar sensação de velocidade */}
                    <div className="absolute inset-0 opacity-30">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-white h-px animate-pulse"
                                style={{
                                    top: `${20 + i * 35}px`,
                                    left: "0",
                                    right: "0",
                                    animation: `moveLines 2s linear infinite`,
                                    animationDelay: `${i * 0.3}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Chão */}
                    <div className="absolute bottom-0 w-full h-16 bg-green-600 border-t-4 border-green-500"></div>

                    {/* Ninja */}
                    <div className="absolute bottom-16 left-8">
                        {renderNinja()}
                    </div>

                    {/* Obstáculo atual */}
                    {renderCurrentObstacle()}

                    {/* Pensamento do ninja */}
                    {currentObstacle && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-center max-w-xs">
                            <div className="text-sm font-semibold mb-1">
                                {currentObstacle.ninjaThought}
                            </div>
                            <div className="text-xs text-gray-300">
                                Distância: {Math.round(obstaclePosition)}px
                            </div>
                        </div>
                    )}

                    {/* Efeito de colisão */}
                    {isColliding && (
                        <div className="absolute inset-0 bg-red-500 opacity-30 animate-pulse pointer-events-none z-30" />
                    )}
                </div>

                {/* CSS para animação das linhas */}
                <style jsx>{`
                    @keyframes moveLines {
                        0% {
                            transform: translateX(100%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                `}</style>

                {/* Poderes CSS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-center">
                        Propriedades CSS Disponíveis
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        {cssPowers.map((power) => (
                            <Button
                                key={power.id}
                                onClick={() => usePower(power)}
                                className={`${power.color} text-white p-2 h-auto flex flex-col items-center gap-1 transition-all duration-200 hover:scale-105 text-xs`}
                                disabled={!currentObstacle}
                            >
                                {power.icon}
                                <span className="font-mono text-xs leading-tight">
                                    {power.name}
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
