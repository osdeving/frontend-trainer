interface Question {
  id: string;
  css: string;
  tailwindClass: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questionSets: Record<string, Question[]> = {
  layout: [
    {
      id: '1',
      css: 'display: flex;',
      tailwindClass: 'flex',
      explanation: 'The flex class applies display: flex to create a flex container.',
      category: 'Flexbox',
      difficulty: 'easy'
    },
    {
      id: '2',
      css: 'justify-content: center;',
      tailwindClass: 'justify-center',
      explanation: 'justify-center centers flex items along the main axis.',
      category: 'Flexbox',
      difficulty: 'easy'
    },
    {
      id: '3',
      css: 'align-items: center;',
      tailwindClass: 'items-center',
      explanation: 'items-center centers flex items along the cross axis.',
      category: 'Flexbox',
      difficulty: 'easy'
    },
    {
      id: '4',
      css: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);',
      tailwindClass: 'grid grid-cols-3',
      explanation: 'Creates a 3-column grid with equal column widths.',
      category: 'Grid',
      difficulty: 'medium'
    },
    {
      id: '5',
      css: 'position: absolute;\ntop: 0;\nleft: 0;',
      tailwindClass: 'absolute top-0 left-0',
      explanation: 'Positions element absolutely at the top-left corner.',
      category: 'Positioning',
      difficulty: 'medium'
    }
  ],
  typography: [
    {
      id: '1',
      css: 'font-size: 1.5rem;',
      tailwindClass: 'text-2xl',
      explanation: 'text-2xl sets font-size to 1.5rem (24px).',
      category: 'Font Size',
      difficulty: 'easy'
    },
    {
      id: '2',
      css: 'font-weight: 700;',
      tailwindClass: 'font-bold',
      explanation: 'font-bold sets font-weight to 700.',
      category: 'Font Weight',
      difficulty: 'easy'
    },
    {
      id: '3',
      css: 'text-align: center;',
      tailwindClass: 'text-center',
      explanation: 'text-center centers text horizontally.',
      category: 'Text Alignment',
      difficulty: 'easy'
    },
    {
      id: '4',
      css: 'line-height: 1.25;',
      tailwindClass: 'leading-tight',
      explanation: 'leading-tight sets line-height to 1.25.',
      category: 'Line Height',
      difficulty: 'medium'
    },
    {
      id: '5',
      css: 'letter-spacing: 0.1em;',
      tailwindClass: 'tracking-wider',
      explanation: 'tracking-wider increases letter spacing.',
      category: 'Letter Spacing',
      difficulty: 'medium'
    }
  ],
  colors: [
    {
      id: '1',
      css: 'color: #3B82F6;',
      tailwindClass: 'text-blue-500',
      explanation: 'text-blue-500 sets text color to blue-500.',
      category: 'Text Color',
      difficulty: 'easy'
    },
    {
      id: '2',
      css: 'background-color: #EF4444;',
      tailwindClass: 'bg-red-500',
      explanation: 'bg-red-500 sets background color to red-500.',
      category: 'Background Color',
      difficulty: 'easy'
    },
    {
      id: '3',
      css: 'border-color: #10B981;',
      tailwindClass: 'border-green-500',
      explanation: 'border-green-500 sets border color to green-500.',
      category: 'Border Color',
      difficulty: 'medium'
    },
    {
      id: '4',
      css: 'background: linear-gradient(to right, #3B82F6, #8B5CF6);',
      tailwindClass: 'bg-gradient-to-r from-blue-500 to-purple-500',
      explanation: 'Creates a horizontal gradient from blue to purple.',
      category: 'Gradients',
      difficulty: 'hard'
    },
    {
      id: '5',
      css: 'color: rgba(107, 114, 128, 0.5);',
      tailwindClass: 'text-gray-500/50',
      explanation: 'Sets text color to gray-500 with 50% opacity.',
      category: 'Opacity',
      difficulty: 'medium'
    }
  ]
};

export const groupNames: Record<string, string> = {
  layout: 'Layout & Positioning',
  typography: 'Typography',
  colors: 'Colors & Backgrounds'
};