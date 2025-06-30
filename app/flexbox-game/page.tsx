import FlexboxGame from "@/components/ui/flexbox-game";

export default function FlexboxGamePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🐸 Flexbox Pond
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Aprenda Flexbox visualmente! Observe onde os sapos precisam ir e descubra as classes Tailwind CSS que fazem a mágica acontecer.
                    </p>
                </div>

                <FlexboxGame />

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Como Jogar
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="font-semibold mb-2">Objetivo</h3>
                            <p className="text-sm text-gray-600">
                                Mova os sapos 🐸 até as vitórias-régias 🪷 usando
                                classes Tailwind CSS. Observe onde elas estão e
                                descubra visualmente qual classe usar!
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-3xl mb-3">⌨️</div>
                            <h3 className="font-semibold mb-2">Como Usar</h3>
                            <p className="text-sm text-gray-600">
                                Digite classes Tailwind como
                                &lsquo;justify-center&rsquo;,
                                &lsquo;items-end&rsquo;, &lsquo;flex-col&rsquo;.
                                Aprenda descobrindo o efeito visual de cada classe!
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-3xl mb-3">💡</div>
                            <h3 className="font-semibold mb-2">Dicas</h3>
                            <p className="text-sm text-gray-600">
                                Use o botão de dica se precisar de ajuda. Cada
                                nível ensina um conceito diferente!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
