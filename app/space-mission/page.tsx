import SpaceMissionGame from "@/components/ui/space-mission-game";

export default function SpaceMissionPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🚀 CSS Space Mission
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Comandante, sua missão é posicionar elementos espaciais
                        usando CSS Grid, positioning e transforms. O destino da
                        galáxia está em suas mãos!
                    </p>
                </div>

                <SpaceMissionGame />

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Manual do Comandante
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="bg-indigo-800 p-6 rounded-lg shadow-md border border-indigo-600">
                            <div className="text-3xl mb-3">🚀</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Naves Espaciais
                            </h3>
                            <p className="text-sm text-indigo-200">
                                Use CSS Grid e Flexbox para posicionar suas
                                naves em formação. Classes: grid-cols-3,
                                place-items-center
                            </p>
                        </div>
                        <div className="bg-purple-800 p-6 rounded-lg shadow-md border border-purple-600">
                            <div className="text-3xl mb-3">🛰️</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Satélites
                            </h3>
                            <p className="text-sm text-purple-200">
                                Posicione satélites em órbitas precisas usando
                                positioning. Classes: absolute, relative, top-4,
                                right-4
                            </p>
                        </div>
                        <div className="bg-blue-800 p-6 rounded-lg shadow-md border border-blue-600">
                            <div className="text-3xl mb-3">🪐</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Planetas
                            </h3>
                            <p className="text-sm text-blue-200">
                                Rotacione e escale planetas usando transforms.
                                Classes: rotate-45, scale-150, transform
                            </p>
                        </div>
                        <div className="bg-green-800 p-6 rounded-lg shadow-md border border-green-600">
                            <div className="text-3xl mb-3">🛸</div>
                            <h3 className="font-semibold mb-2 text-white">
                                Estações
                            </h3>
                            <p className="text-sm text-green-200">
                                Empilhe e organize estações espaciais usando
                                grid avançado. Classes: grid-rows-3, gap-4,
                                place-content-center
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto border border-gray-600">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            📡 Tecnologias Que Você Vai Dominar
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="text-blue-300">
                                <strong>CSS Grid:</strong> grid-cols-*,
                                grid-rows-*, gap-*, place-items-*
                            </div>
                            <div className="text-purple-300">
                                <strong>Positioning:</strong> absolute,
                                relative, top-*, left-*, right-*, bottom-*
                            </div>
                            <div className="text-green-300">
                                <strong>Transforms:</strong> rotate-*, scale-*,
                                translate-*, transform-*
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
