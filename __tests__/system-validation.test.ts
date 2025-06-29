import { challengeStore } from '@/lib/challengeStore';
import { questionSets } from '@/lib/quizData';

describe('TailwindTrainer - Validação de Funcionalidades', () => {
  describe('ChallengeStore', () => {
    test('deve ter challenges definidos', () => {
      expect(challengeStore).toBeDefined();
      expect(typeof challengeStore.getChallenge).toBe('function');
      expect(typeof challengeStore.completeChallenge).toBe('function');
    });

    test('deve retornar Free Practice challenge', () => {
      const challenge = challengeStore.getChallenge('free_practice');
      
      expect(challenge).toBeDefined();
      expect(challenge?.id).toBe('free_practice');
      expect(challenge?.name).toBe('Free Practice');
      expect(challenge?.type).toBe('practice');
    });

    test('deve retornar Quick Practice challenge', () => {
      const challenge = challengeStore.getChallenge('quick_practice');
      
      expect(challenge).toBeDefined();
      expect(challenge?.id).toBe('quick_practice');
      expect(challenge?.name).toBe('Quick Practice');
      expect(challenge?.config.questionCount).toBe(10);
    });

    test('deve retornar Speed Round challenge', () => {
      const challenge = challengeStore.getChallenge('speed_round');
      
      expect(challenge).toBeDefined();
      expect(challenge?.id).toBe('speed_round');
      expect(challenge?.type).toBe('timed');
      expect(challenge?.config.timeLimit).toBe(300);
    });

    test('deve retornar undefined para challenge inexistente', () => {
      const challenge = challengeStore.getChallenge('challenge_inexistente');
      expect(challenge).toBeUndefined();
    });
  });

  describe('QuestionSets - Dados das Questões', () => {
    test('deve ter questionSets definidos', () => {
      expect(questionSets).toBeDefined();
      expect(typeof questionSets).toBe('object');
    });

    test('deve ter grupos de questões obrigatórios', () => {
      const requiredGroups = ['layout', 'typography', 'colors', 'spacing'];
      
      requiredGroups.forEach(group => {
        expect(questionSets[group]).toBeDefined();
        expect(Array.isArray(questionSets[group])).toBe(true);
        expect(questionSets[group].length).toBeGreaterThan(0);
      });
    });

    test('questões devem ter estrutura correta', () => {
      const allQuestions = Object.values(questionSets).flat();
      
      expect(allQuestions.length).toBeGreaterThan(0);
      
      allQuestions.forEach(question => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('css');
        expect(question).toHaveProperty('tailwindClass');
        expect(question).toHaveProperty('explanation');
        expect(question).toHaveProperty('category');
        expect(question).toHaveProperty('difficulty');
        
        // Validar tipos
        expect(typeof question.id).toBe('string');
        expect(typeof question.css).toBe('string');
        expect(typeof question.tailwindClass).toBe('string');
        expect(typeof question.explanation).toBe('string');
        expect(typeof question.category).toBe('string');
        expect(['easy', 'medium', 'hard']).toContain(question.difficulty);
      });
    });

    test('deve ter questões variadas de dificuldade', () => {
      const allQuestions = Object.values(questionSets).flat();
      const difficulties = allQuestions.map(q => q.difficulty);
      
      expect(difficulties).toContain('easy');
      expect(difficulties).toContain('medium');
      expect(difficulties).toContain('hard');
    });

    test('deve ter categorias definidas', () => {
      const allQuestions = Object.values(questionSets).flat();
      const categories = Array.from(new Set(allQuestions.map(q => q.category)));
      
      // Deve ter pelo menos algumas categorias
      expect(categories.length).toBeGreaterThan(0);
      
      // Todas as categorias devem ser strings não vazias
      categories.forEach(category => {
        expect(typeof category).toBe('string');
        expect(category.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Funcionalidades do Sistema', () => {
    test('deve ter pelo menos 10 questões por categoria principal', () => {
      const mainCategories = ['layout', 'typography', 'colors', 'spacing'];
      
      mainCategories.forEach(category => {
        expect(questionSets[category].length).toBeGreaterThanOrEqual(10);
      });
    });

    test('challenges devem ter configurações válidas', () => {
      const challenges = [
        'free_practice',
        'quick_practice', 
        'speed_round',
        'survival_mode'
      ];
      
      challenges.forEach(challengeId => {
        const challenge = challengeStore.getChallenge(challengeId);
        expect(challenge).toBeDefined();
        expect(challenge?.config).toBeDefined();
        expect(challenge?.rewards).toBeDefined();
        expect(typeof challenge?.rewards.xp).toBe('number');
      });
    });

    test('sistema de recompensas deve ser consistente', () => {
      const practiceChallenge = challengeStore.getChallenge('free_practice');
      const timedChallenge = challengeStore.getChallenge('speed_round');
      
      expect(practiceChallenge?.rewards.xp).toBeGreaterThan(0);
      if (practiceChallenge && timedChallenge) {
        expect(timedChallenge.rewards.xp).toBeGreaterThan(practiceChallenge.rewards.xp);
      }
    });
  });
});
