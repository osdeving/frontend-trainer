# 🐸 Flexbox Pond - Interactive Flexbox Game

Um jogo interativo inspirado no Flexbox Froggy para aprender Flexbox com Tailwind CSS de forma divertida e envolvente.

## 🎯 Objetivo

Ajude os sapos 🐸 a chegarem até as vitórias-régias 🪷 usando classes Tailwind CSS de Flexbox. Cada nível ensina um conceito diferente de Flexbox de forma progressiva.

## 🎮 Como Jogar

1. **Observe a lagoa**: Veja onde estão os sapos e onde devem chegar (vitórias-régias)
2. **Digite a solução**: Use classes Tailwind CSS no campo de entrada
3. **Verificar**: Clique em "Verificar" ou pressione Enter
4. **Avance**: Complete o nível para avançar para o próximo

## 📚 Níveis e Conceitos

### Níveis Básicos (1-4)

-   **justify-content**: Alinhamento horizontal
-   **justify-center**: Centralização horizontal
-   **justify-between**: Espaçamento entre itens
-   **justify-around**: Espaçamento ao redor dos itens

### Níveis Intermediários (5-8)

-   **align-items**: Alinhamento vertical
-   **items-center**: Centralização vertical
-   **flex-col**: Direção em coluna
-   **flex-col-reverse**: Coluna reversa

### Níveis Avançados (9-12)

-   **flex-wrap**: Quebra de linha
-   **Combinações**: Multiple propriedades juntas
-   **justify-evenly**: Espaçamento equilibrado
-   **Desafios complexos**: Combinação de 3+ propriedades

## 🛠️ Funcionalidades

### Validação Inteligente

O jogo aceita múltiplas formas de escrever a mesma solução:

-   `justify-center` ✅
-   `flex justify-center` ✅
-   Combinações em qualquer ordem para propriedades múltiplas

### Sistema de Dicas

-   Cada nível tem uma dica específica
-   Clique em "💡 Mostrar Dica" quando precisar de ajuda

### Progresso Visual

-   Barra de progresso geral
-   Navegação entre níveis
-   Indicadores de níveis completos

### Interface Responsiva

-   Design adaptável para desktop e mobile
-   Animações suaves
-   Feedback visual imediato

## 🎨 Design

### Elementos Visuais

-   **Lagoa**: Container flexbox com fundo azul gradiente
-   **Sapos**: Elementos que precisam ser movidos
-   **Vitórias-régias**: Posições alvo onde os sapos devem chegar
-   **Grid de fundo**: Mostra posições possíveis (sutil)

### Cores e Tema

-   Azul: Lagoa e elementos primários
-   Verde: Sapos, vitórias-régias e feedback positivo
-   Amarelo/Dourado: Conquistas e troféus
-   Vermelho: Feedback de erro

## 🚀 Tecnologias

-   **React**: Framework principal
-   **Tailwind CSS**: Sistema de classes (tema do jogo)
-   **TypeScript**: Tipagem e segurança
-   **Lucide Icons**: Ícones consistentes
-   **Next.js**: Framework e roteamento

## 📱 Responsividade

O jogo é totalmente responsivo:

-   **Desktop**: Layout completo com todos os elementos
-   **Tablet**: Interface adaptada para touch
-   **Mobile**: Otimizado para telas pequenas

## 🎓 Valor Educacional

### Progressão Pedagógica

1. **Conceitos simples** primeiro (justify-content básico)
2. **Introdução gradual** de novos conceitos
3. **Combinações complexas** nos níveis finais
4. **Reforço** através da prática repetida

### Aprendizado Ativo

-   **Tentativa e erro** seguro
-   **Feedback imediato** após cada tentativa
-   **Dicas contextuais** quando necessário
-   **Celebração** de conquistas

## 🔧 Customização

O jogo pode ser facilmente expandido:

### Adicionar Novos Níveis

```typescript
{
  id: 13,
  title: "Novo Desafio",
  description: "Descrição do desafio",
  targetProperty: "propriedade-target",
  correctAnswer: "resposta-correta",
  hint: "Dica útil",
  difficulty: "easy" | "medium" | "hard",
  frogs: 2,
  lilyPads: 2,
  frogPositions: [0, 1],
  targetPositions: [3, 4]
}
```

### Modificar Validação

Adicionar novas respostas válidas no array `alternativeAnswers`.

### Personalizar Visual

Modificar classes Tailwind nos componentes para alterar cores, tamanhos e animações.

## 🏆 Sistema de Conquistas

-   **Progresso por nível**: Acompanhe quantos níveis foram completos
-   **Tela de vitória**: Celebração ao completar todos os níveis
-   **Estatísticas**: Níveis completos, propriedades aprendidas, progresso
-   **Replay**: Possibilidade de jogar novamente

## 🌟 Diferencial

Este jogo se destaca por:

1. **Foco em Tailwind CSS**: Ensina especificamente classes Tailwind
2. **Validação flexível**: Aceita múltiplas formas corretas
3. **Design brasileiro**: Interface em português
4. **Progressão pedagógica**: Níveis cuidadosamente ordenados
5. **Integração completa**: Parte do ecossistema TailwindTrainer

## 📈 Métricas de Sucesso

-   **Taxa de conclusão** por nível
-   **Tempo médio** por nível
-   **Uso de dicas** por nível
-   **Taxa de abandono** em cada ponto
-   **Feedback dos usuários**

---

_Desenvolvido como parte do TailwindTrainer - Master TailwindCSS_
