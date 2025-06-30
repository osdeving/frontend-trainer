"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    CheckCircle,
    RotateCcw,
    Trophy,
    XCircle,
    Rocket,
} from "lucide-react";
import { useEffect, useState } from "react";

interface MissionLevel {
    id: number;
    title: string;
    description: string;
    missionType: "grid" | "position" | "transform" | "alignment" | "advanced";
    correctAnswer: string;
    hint: string;
    difficulty: "easy" | "medium" | "hard";
    elements: {
        type: "ship" | "satellite" | "planet" | "station";
        count: number;
    }[];
    targetLayout: string; // Descrição do layout esperado
}

const spaceMissions: MissionLevel[] = [
    {
        id: 1,
        title: "Primeira Decolagem",
        description: "Lance a nave espacial para o centro da galáxia. Use Grid para posicioná-la.",
        missionType: "grid",
        correctAnswer: "place-items-center",
        hint: "Tente 'place-items-center' para centralizar na grid.",
        difficulty: "easy",
        elements: [{ type: "ship", count: 1 }],
        targetLayout: "center",
    },
    {
        id: 2,
        title: "Pouso na Estação",
        description: "Guide a nave para o canto superior direito da estação espacial.",
        missionType: "grid",
        correctAnswer: "place-items-end",
        hint: "Use 'place-items-end' para posicionar no final da grid.",
        difficulty: "easy",
        elements: [{ type: "ship", count: 1 }],
        targetLayout: "top-right",
    },
    {
        id: 3,
        title: "Frota em Formação",
        description: "Organize 3 naves em uma linha horizontal no centro do espaço.",
        missionType: "grid",
        correctAnswer: "grid-cols-3 place-items-center",
        hint: "Combine 'grid-cols-3' com 'place-items-center'.",
        difficulty: "medium",
        elements: [{ type: "ship", count: 3 }],
        targetLayout: "horizontal-center",
    },
    {
        id: 4,
        title: "Satélites em Órbita",
        description: "Posicione 4 satélites nos cantos da estação espacial.",
        missionType: "grid",
        correctAnswer: "grid-cols-2 gap-4",
        hint: "Use 'grid-cols-2 gap-4' para criar um grid 2x2.",
        difficulty: "medium",
        elements: [{ type: "satellite", count: 4 }],
        targetLayout: "corners",
    },
    {
        id: 5,
        title: "Torre de Controle",
        description: "Empilhe 3 estações espaciais verticalmente no centro.",
        missionType: "grid",
        correctAnswer: "grid-rows-3 place-items-center",
        hint: "Tente 'grid-rows-3 place-items-center' para empilhar verticalmente.",
        difficulty: "medium",
        elements: [{ type: "station", count: 3 }],
        targetLayout: "vertical-stack",
    },
    {
        id: 6,
        title: "Sistema Solar",
        description: "Crie um sistema com planeta central e satélites ao redor.",
        missionType: "position",
        correctAnswer: "relative",
        hint: "Use 'relative' no container para positioning avançado.",
        difficulty: "hard",
        elements: [
            { type: "planet", count: 1 },
            { type: "satellite", count: 4 }
        ],
        targetLayout: "solar-system",
    },
    {
        id: 7,
        title: "Estação Orbital",
        description: "Posicione a estação no canto superior direito, flutuando sobre tudo.",
        missionType: "position",
        correctAnswer: "absolute top-4 right-4",
        hint: "Combine 'absolute', 'top-4' e 'right-4'.",
        difficulty: "hard",
        elements: [{ type: "station", count: 1 }],
        targetLayout: "floating-corner",
    },
    {
        id: 8,
        title: "Rotação Planetária",
        description: "Gire o planeta 45 graus para ajustar sua orientação.",
        missionType: "transform",
        correctAnswer: "rotate-45",
        hint: "Use 'rotate-45' para girar o elemento.",
        difficulty: "medium",
        elements: [{ type: "planet", count: 1 }],
        targetLayout: "rotated",
    },
    {
        id: 9,
        title: "Nave Ampliada",
        description: "Aumente a nave para 150% do tamanho original para melhor visibilidade.",
        missionType: "transform",
        correctAnswer: "scale-150",
        hint: "Tente 'scale-150' para ampliar o elemento.",
        difficulty: "medium",
        elements: [{ type: "ship", count: 1 }],
        targetLayout: "scaled",
    },
    {
        id: 10,
        title: "Missão Complexa",
        description: "Organize uma frota: naves em linha, planeta central e satélites nos cantos.",
        missionType: "advanced",
        correctAnswer: "grid-cols-3 gap-4 place-items-center",
        hint: "Combine grid-cols-3, gap-4 e place-items-center.",
        difficulty: "hard",
        elements: [
            { type: "ship", count: 3 },
            { type: "planet", count: 1 },
            { type: "satellite", count: 2 }
        ],
        targetLayout: "complex-formation",
    },
];

const elementEmojis = {
    ship: "🚀",
    satellite: "🛰️",
    planet: "🪐",
    station: "🛸"
};

const elementColors = {
    ship: "bg-blue-500 border-blue-700",
    satellite: "bg-gray-500 border-gray-700", 
    planet: "bg-purple-500 border-purple-700",
    station: "bg-green-500 border-green-700"
};

export default function SpaceMissionGame() {
    const [currentMission, setCurrentMission] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [completedMissions, setCompletedMissions] = useState<number[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);

    const mission = spaceMissions[currentMission];

    useEffect(() => {
        setUserInput("");
        setIsCorrect(null);
        setShowHint(false);
    }, [currentMission]);

    const checkAnswer = () => {
        const cleanInput = userInput.trim().toLowerCase();
        const cleanAnswer = mission.correctAnswer.toLowerCase();

        // Respostas alternativas válidas
        const alternativeAnswers: { [key: string]: string[] } = {
            "place-items-center": ["place-items-center", "justify-center items-center"],
            "place-items-end": ["place-items-end", "justify-end items-end"],
            "grid-cols-3 place-items-center": [
                "grid-cols-3 place-items-center",
                "grid-cols-3 justify-center items-center",
                "place-items-center grid-cols-3"
            ],
            "grid-cols-2 gap-4": ["grid-cols-2 gap-4", "gap-4 grid-cols-2"],
            "grid-rows-3 place-items-center": [
                "grid-rows-3 place-items-center",
                "place-items-center grid-rows-3"
            ],
            "relative": ["relative", "position-relative"],
            "absolute top-4 right-4": [
                "absolute top-4 right-4",
                "absolute right-4 top-4",
                "top-4 right-4 absolute"
            ],
            "rotate-45": ["rotate-45", "transform rotate-45"],
            "scale-150": ["scale-150", "transform scale-150"],
            "grid-cols-3 gap-4 place-items-center": [
                "grid-cols-3 gap-4 place-items-center",
                "grid-cols-3 place-items-center gap-4",
                "gap-4 grid-cols-3 place-items-center"
            ]
        };

        const validAnswers = alternativeAnswers[cleanAnswer] || [cleanAnswer];
        const correct = validAnswers.includes(cleanInput);

        setIsCorrect(correct);

        if (correct && !completedMissions.includes(mission.id)) {
            setCompletedMissions([...completedMissions, mission.id]);

            if (currentMission === spaceMissions.length - 1) {
                setGameComplete(true);
            }
        }
    };

    const nextMission = () => {
        if (currentMission < spaceMissions.length - 1) {
            setCurrentMission(currentMission + 1);
        }
    };

    const resetMission = () => {
        setUserInput("");
        setIsCorrect(null);
        setShowHint(false);
    };

    const renderSpaceField = () => {
        // Classes base do container espacial
        const baseClasses = "w-full h-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-black rounded-lg border-4 border-indigo-500 relative overflow-hidden";
        
        // Classes aplicadas pelo usuário
        const containerClasses = `${baseClasses} ${userInput || "grid place-items-start"}`;

        // Layout alvo para comparação
        const targetClasses = `${baseClasses} grid ${mission.correctAnswer}`;

        // Renderizar elementos
        const renderElements = (isTarget: boolean = false) => {
            const elements: JSX.Element[] = [];
            let elementIndex = 0;

            mission.elements.forEach((elementGroup) => {
                for (let i = 0; i < elementGroup.count; i++) {
                    const emoji = elementEmojis[elementGroup.type];
                    const colorClass = elementColors[elementGroup.type];
                    
                    elements.push(
                        <div
                            key={`${isTarget ? 'target' : 'current'}-${elementGroup.type}-${elementIndex}`}
                            className={`w-12 h-12 ${colorClass} rounded-full border-2 flex items-center justify-center text-xl shadow-lg ${
                                isTarget ? 'opacity-50' : 'opacity-100 transition-all duration-500'
                            } relative z-10`}
                        >
                            {emoji}
                        </div>
                    );
                    elementIndex++;
                }
            });

            return elements;
        };

        return (
            <div className="relative">
                {/* Estrelas de fundo */}
                <div className="absolute inset-0 rounded-lg pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className={`absolute bg-white rounded-full ${
                                i % 3 === 0 ? 'w-1 h-1' : i % 3 === 1 ? 'w-0.5 h-0.5' : 'w-2 h-2'
                            } opacity-70 animate-pulse`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Layout alvo (onde os elementos devem ficar) */}
                <div className="absolute inset-0 rounded-lg pointer-events-none z-0">
                    <div className={targetClasses}>
                        {renderElements(true)}
                    </div>
                </div>

                {/* Container atual (posições dos elementos baseado no input) */}
                <div className={containerClasses}>
                    {renderElements(false)}
                </div>

                {/* Overlay de feedback */}
                {isCorrect !== null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg z-30">
                        <div className={`text-5xl ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                            {isCorrect ? (
                                <div className="text-center">
                                    <CheckCircle size={64} />
                                    <div className="text-lg mt-2">Missão Cumprida!</div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <XCircle size={64} />
                                    <div className="text-lg mt-2">Missão Falhou</div>
                                </div>
                            )}
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
                        <Rocket className="w-24 h-24 text-blue-500 mx-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">
                        🎉 Missão Espacial Completa! 🎉
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Parabéns, Comandante! Você completou todas as {spaceMissions.length} missões espaciais!
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {spaceMissions.length}
                            </div>
                            <div className="text-sm text-blue-700">
                                Missões Completas
                            </div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                                CSS Grid
                            </div>
                            <div className="text-sm text-purple-700">
                                Tecnologia Dominada
                            </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                🚀
                            </div>
                            <div className="text-sm text-green-700">
                                Comandante Espacial
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={() => {
                                setCurrentMission(0);
                                setCompletedMissions([]);
                                setGameComplete(false);
                            }}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Nova Missão
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => (window.location.href = "/")}
                        >
                            Voltar à Base
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
                        🚀 CSS Space Mission - Missão {mission.id}
                        <Badge
                            variant={
                                mission.difficulty === "easy"
                                    ? "default"
                                    : mission.difficulty === "medium"
                                    ? "secondary"
                                    : "destructive"
                            }
                        >
                            {mission.difficulty}
                        </Badge>
                    </CardTitle>
                    <div className="text-sm text-gray-500">
                        {completedMissions.length}/{spaceMissions.length} completas
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Progresso */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${((currentMission + 1) / spaceMissions.length) * 100}%`,
                        }}
                    />
                </div>

                {/* Briefing da Missão */}
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                    <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                        📡 {mission.title}
                    </h3>
                    <p className="text-indigo-800">{mission.description}</p>
                    {showHint && (
                        <div className="mt-2 p-2 bg-yellow-100 rounded border-l-4 border-yellow-500">
                            <p className="text-sm text-yellow-800">
                                💡 {mission.hint}
                            </p>
                        </div>
                    )}
                </div>

                {/* Campo Espacial */}
                {renderSpaceField()}

                {/* Controles da Missão */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Digite classes Tailwind (ex: grid-cols-3 gap-4)"
                            className="flex-1"
                            onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                        />
                        <Button
                            onClick={checkAnswer}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Executar Missão
                        </Button>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowHint(!showHint)}
                            >
                                💡 {showHint ? "Ocultar" : "Mostrar"} Intel
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetMission}
                            >
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Reset
                            </Button>
                        </div>

                        {isCorrect && (
                            <Button
                                onClick={nextMission}
                                disabled={currentMission >= spaceMissions.length - 1}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Próxima Missão <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Feedback da Missão */}
                {isCorrect !== null && (
                    <div
                        className={`p-4 rounded-lg ${
                            isCorrect
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                        }`}
                    >
                        {isCorrect ? (
                            <div className="flex items-center gap-2 text-green-800">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Missão Cumprida! 🚀</span>
                                <span>Elementos posicionados corretamente!</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-red-800">
                                <XCircle className="w-5 h-5" />
                                <span className="font-semibold">Missão Falhou!</span>
                                <span>
                                    Resposta correta: <code className="bg-red-100 px-1 rounded">
                                        {mission.correctAnswer}
                                    </code>
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Navegação de Missões */}
                <div className="flex gap-1 flex-wrap">
                    {spaceMissions.map((_, index) => (
                        <Button
                            key={index}
                            variant={index === currentMission ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentMission(index)}
                            className={`w-8 h-8 p-0 ${
                                completedMissions.includes(index + 1)
                                    ? "bg-green-600 text-white"
                                    : ""
                            }`}
                        >
                            {completedMissions.includes(index + 1) ? "✓" : index + 1}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
