import { challengeStore } from "@/lib/challengeStore";
import { questionManager } from "@/lib/questionManager";

describe("TailwindTrainer - Validação de Funcionalidades", () => {
    describe("ChallengeStore", () => {
        test("deve ter challenges definidos", () => {
            expect(challengeStore).toBeDefined();
            expect(typeof challengeStore.getChallenge).toBe("function");
            expect(typeof challengeStore.completeChallenge).toBe("function");
        });

        test("deve retornar Free Practice challenge", () => {
            const challenge = challengeStore.getChallenge("free_practice");

            expect(challenge).toBeDefined();
            expect(challenge?.id).toBe("free_practice");
            expect(challenge?.name).toBe("Free Practice");
            expect(challenge?.type).toBe("practice");
        });

        test("deve retornar Quick Practice challenge", () => {
            const challenge = challengeStore.getChallenge("quick_practice");

            expect(challenge).toBeDefined();
            expect(challenge?.id).toBe("quick_practice");
            expect(challenge?.name).toBe("Quick Practice");
            expect(challenge?.config.questionCount).toBe(10);
        });

        test("deve retornar Speed Round challenge", () => {
            const challenge = challengeStore.getChallenge("speed_round");

            expect(challenge).toBeDefined();
            expect(challenge?.id).toBe("speed_round");
            expect(challenge?.type).toBe("timed");
            expect(challenge?.config.timeLimit).toBe(300);
        });

        test("deve retornar undefined para challenge inexistente", () => {
            const challenge = challengeStore.getChallenge(
                "challenge_inexistente"
            );
            expect(challenge).toBeUndefined();
        });
    });

    describe("QuestionManager - Sistema de Questões", () => {
        test("deve ter questionManager definido", () => {
            expect(questionManager).toBeDefined();
            expect(typeof questionManager.getCategories).toBe("function");
            expect(typeof questionManager.getQuestionsByCategory).toBe(
                "function"
            );
            expect(typeof questionManager.validateAnswer).toBe("function");
        });

        test("deve ter categorias obrigatórias", () => {
            const categories = questionManager.getCategories();
            const requiredCategories = [
                "layout",
                "typography",
                "colors",
                "spacing",
            ];

            requiredCategories.forEach((category) => {
                expect(categories[category]).toBeDefined();
                expect(categories[category].name).toBeDefined();
                expect(typeof categories[category].name).toBe("string");
            });
        });

        test("questões devem ter estrutura correta do novo formato", () => {
            const categories = questionManager.getCategories();
            const allQuestions = Object.keys(categories).flatMap((categoryId) =>
                questionManager.getQuestionsByCategory(categoryId)
            );

            expect(allQuestions.length).toBeGreaterThan(0);

            allQuestions.forEach((question) => {
                expect(question).toHaveProperty("id");
                expect(question).toHaveProperty("css");
                expect(question).toHaveProperty("acceptedAnswers");
                expect(question).toHaveProperty("explanation");
                expect(question).toHaveProperty("category");
                expect(question).toHaveProperty("difficulty");

                // Validar tipos
                expect(typeof question.id).toBe("string");
                expect(typeof question.css).toBe("string");
                expect(Array.isArray(question.acceptedAnswers)).toBe(true);
                expect(question.acceptedAnswers.length).toBeGreaterThan(0);
                expect(typeof question.explanation).toBe("string");
                expect(typeof question.category).toBe("string");
                expect(["easy", "medium", "hard"]).toContain(
                    question.difficulty
                );
            });
        });

        test("deve ter questões variadas de dificuldade", () => {
            const categories = questionManager.getCategories();
            const allQuestions = Object.keys(categories).flatMap((categoryId) =>
                questionManager.getQuestionsByCategory(categoryId)
            );
            const difficulties = allQuestions.map((q) => q.difficulty);

            expect(difficulties).toContain("easy");
            expect(difficulties).toContain("medium");
            // Note: hard questions may not be present yet during migration
        });

        test("deve ter categorias definidas", () => {
            const categories = questionManager.getCategories();
            const allQuestions = Object.keys(categories).flatMap((categoryId) =>
                questionManager.getQuestionsByCategory(categoryId)
            );
            const questionCategories = Array.from(
                new Set(allQuestions.map((q) => q.category))
            );

            // Deve ter pelo menos algumas categorias
            expect(questionCategories.length).toBeGreaterThan(0);

            // Todas as categorias devem ser strings não vazias
            questionCategories.forEach((category) => {
                expect(typeof category).toBe("string");
                expect(category.length).toBeGreaterThan(0);
            });
        });

        test("deve validar respostas corretamente", () => {
            const layoutQuestions =
                questionManager.getQuestionsByCategory("layout");

            if (layoutQuestions.length > 0) {
                const firstQuestion = layoutQuestions[0];
                const correctAnswer = firstQuestion.acceptedAnswers[0];

                // Teste com resposta correta
                const validResult = questionManager.validateAnswer(
                    firstQuestion.id,
                    correctAnswer
                );
                expect(validResult.isCorrect).toBe(true);

                // Teste com resposta incorreta
                const invalidResult = questionManager.validateAnswer(
                    firstQuestion.id,
                    "invalid-answer"
                );
                expect(invalidResult.isCorrect).toBe(false);
            }
        });
    });

    describe("Funcionalidades do Sistema", () => {
        test("deve ter pelo menos algumas questões por categoria principal", () => {
            const mainCategories = [
                "layout",
                "typography",
                "colors",
                "spacing",
            ];

            mainCategories.forEach((category) => {
                const questions =
                    questionManager.getQuestionsByCategory(category);
                expect(questions.length).toBeGreaterThan(0);
            });
        });

        test("challenges devem ter configurações válidas", () => {
            const challenges = [
                "free_practice",
                "quick_practice",
                "speed_round",
                "survival_mode",
            ];

            challenges.forEach((challengeId) => {
                const challenge = challengeStore.getChallenge(challengeId);
                expect(challenge).toBeDefined();
                expect(challenge?.config).toBeDefined();
                expect(challenge?.rewards).toBeDefined();
                expect(typeof challenge?.rewards.xp).toBe("number");
            });
        });

        test("sistema de recompensas deve ser consistente", () => {
            const practiceChallenge =
                challengeStore.getChallenge("free_practice");
            const timedChallenge = challengeStore.getChallenge("speed_round");

            expect(practiceChallenge?.rewards.xp).toBeGreaterThan(0);
            if (practiceChallenge && timedChallenge) {
                expect(timedChallenge.rewards.xp).toBeGreaterThan(
                    practiceChallenge.rewards.xp
                );
            }
        });
    });
});
