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
  ],
  spacing: [
    {
      id: '1',
      css: 'margin: 1rem;',
      tailwindClass: 'm-4',
      explanation: 'm-4 applies margin of 1rem (16px) on all sides.',
      category: 'Margin',
      difficulty: 'easy'
    },
    {
      id: '2',
      css: 'padding: 0.5rem 1rem;',
      tailwindClass: 'py-2 px-4',
      explanation: 'py-2 adds vertical padding, px-4 adds horizontal padding.',
      category: 'Padding',
      difficulty: 'easy'
    },
    {
      id: '3',
      css: 'width: 100%;',
      tailwindClass: 'w-full',
      explanation: 'w-full sets width to 100%.',
      category: 'Width',
      difficulty: 'easy'
    },
    {
      id: '4',
      css: 'height: 50vh;',
      tailwindClass: 'h-screen/2',
      explanation: 'h-screen/2 sets height to 50% of viewport height.',
      category: 'Height',
      difficulty: 'medium'
    },
    {
      id: '5',
      css: 'max-width: 28rem;',
      tailwindClass: 'max-w-md',
      explanation: 'max-w-md sets maximum width to 28rem (448px).',
      category: 'Max Width',
      difficulty: 'medium'
    },
    {
      id: '6',
      css: 'gap: 1rem;',
      tailwindClass: 'gap-4',
      explanation: 'gap-4 sets gap between flex/grid items to 1rem.',
      category: 'Gap',
      difficulty: 'medium'
    },
    {
      id: '7',
      css: 'margin-left: auto;\nmargin-right: auto;',
      tailwindClass: 'mx-auto',
      explanation: 'mx-auto centers an element horizontally.',
      category: 'Centering',
      difficulty: 'medium'
    },
    {
      id: '8',
      css: 'padding-top: 2rem;\npadding-bottom: 2rem;',
      tailwindClass: 'py-8',
      explanation: 'py-8 applies padding of 2rem to top and bottom.',
      category: 'Padding',
      difficulty: 'easy'
    }
  ]
};

export const groupNames: Record<string, string> = {
  layout: 'Layout & Positioning',
  typography: 'Typography',
  colors: 'Colors & Backgrounds',
  spacing: 'Spacing & Sizing'
};