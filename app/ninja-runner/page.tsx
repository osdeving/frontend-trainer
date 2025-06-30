import NinjaRunnerGame from "@/components/ui/ninja-runner-game";

export default function NinjaRunnerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🥷 CSS Ninja Runner
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Torne-se um mestre ninja CSS! Reaja rapidamente aos
                        obstáculos usando os poderes corretos. Cada clique testa
                        seu conhecimento de CSS em ação!
                    </p>
                </div>

                <NinjaRunnerGame />

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Manual do Ninja CSS
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <div className="bg-blue-800 p-6 rounded-lg shadow-md border border-blue-600">
                            <div className="text-3xl mb-3">🏃</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Movement Powers
                            </h3>
                            <div className="text-sm text-blue-200 space-y-1">
                                <div>
                                    <strong>Dash:</strong> translate-x-12
                                </div>
                                <div>
                                    <strong>Jump:</strong> -translate-y-8
                                </div>
                                <div>
                                    <strong>Spin:</strong> rotate-45
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-800 p-6 rounded-lg shadow-md border border-purple-600">
                            <div className="text-3xl mb-3">👻</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Transformation
                            </h3>
                            <div className="text-sm text-purple-200 space-y-1">
                                <div>
                                    <strong>Ghost:</strong> opacity-30
                                </div>
                                <div>
                                    <strong>Shrink:</strong> scale-50
                                </div>
                                <div>
                                    <strong>Power:</strong> animate-pulse
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-800 p-6 rounded-lg shadow-md border border-red-600">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Camouflage
                            </h3>
                            <div className="text-sm text-red-200 space-y-1">
                                <div>
                                    <strong>Red:</strong> bg-red-500
                                </div>
                                <div>
                                    <strong>Blue:</strong> bg-blue-500
                                </div>
                                <div>Match enemy colors!</div>
                            </div>
                        </div>
                        <div className="bg-green-800 p-6 rounded-lg shadow-md border border-green-600">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Game Rules
                            </h3>
                            <div className="text-sm text-green-200 space-y-1">
                                <div>• 3 seconds per obstacle</div>
                                <div>• Click the right CSS power</div>
                                <div>• Survive to level up!</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-4xl mx-auto border border-gray-600">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            🎯 Obstacles & Solutions
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-lg mb-1">🧱 Wall</div>
                                <div className="text-gray-300">
                                    Use{" "}
                                    <code className="bg-purple-600 px-1 rounded">
                                        opacity-30
                                    </code>{" "}
                                    to phase through
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-lg mb-1">🕳️ Pit</div>
                                <div className="text-gray-300">
                                    Use{" "}
                                    <code className="bg-blue-600 px-1 rounded">
                                        translate-x-12
                                    </code>{" "}
                                    to dash over
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-lg mb-1">👹 Enemy</div>
                                <div className="text-gray-300">
                                    Use{" "}
                                    <code className="bg-green-600 px-1 rounded">
                                        -translate-y-8
                                    </code>{" "}
                                    to jump over
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-lg mb-1">🟫 Ceiling</div>
                                <div className="text-gray-300">
                                    Use{" "}
                                    <code className="bg-yellow-600 px-1 rounded">
                                        scale-50
                                    </code>{" "}
                                    to shrink
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-lg mb-1">
                                    🔴 Color Enemy
                                </div>
                                <div className="text-gray-300">
                                    Match with{" "}
                                    <code className="bg-red-600 px-1 rounded">
                                        bg-red-500
                                    </code>
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded">
                                <div className="text-lg mb-1">⚡ Special</div>
                                <div className="text-gray-300">
                                    Use{" "}
                                    <code className="bg-pink-600 px-1 rounded">
                                        animate-pulse
                                    </code>{" "}
                                    power
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
