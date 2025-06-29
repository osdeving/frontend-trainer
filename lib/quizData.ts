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
    },
    {
      id: '6',
      css: 'flex-direction: column;',
      tailwindClass: 'flex-col',
      explanation: 'flex-col sets flex direction to column, stacking items vertically.',
      category: 'Flexbox',
      difficulty: 'easy'
    },
    {
      id: '7',
      css: 'justify-content: space-between;',
      tailwindClass: 'justify-between',
      explanation: 'justify-between distributes items with equal space between them.',
      category: 'Flexbox',
      difficulty: 'easy'
    },
    {
      id: '8',
      css: 'align-items: stretch;',
      tailwindClass: 'items-stretch',
      explanation: 'items-stretch makes flex items stretch to fill the container height.',
      category: 'Flexbox',
      difficulty: 'medium'
    },
    {
      id: '9',
      css: 'display: grid;\ngrid-template-columns: repeat(2, 1fr);\ngap: 1rem;',
      tailwindClass: 'grid grid-cols-2 gap-4',
      explanation: 'Creates a 2-column grid with 1rem gap between items.',
      category: 'Grid',
      difficulty: 'medium'
    },
    {
      id: '10',
      css: 'position: relative;',
      tailwindClass: 'relative',
      explanation: 'relative positioning allows child elements to be positioned relative to this element.',
      category: 'Positioning',
      difficulty: 'easy'
    },
    {
      id: '11',
      css: 'position: fixed;\ntop: 0;\nright: 0;',
      tailwindClass: 'fixed top-0 right-0',
      explanation: 'Positions element fixed at the top-right corner of the viewport.',
      category: 'Positioning',
      difficulty: 'medium'
    },
    {
      id: '12',
      css: 'flex-wrap: wrap;',
      tailwindClass: 'flex-wrap',
      explanation: 'flex-wrap allows flex items to wrap to new lines when needed.',
      category: 'Flexbox',
      difficulty: 'medium'
    },
    {
      id: '13',
      css: 'align-self: center;',
      tailwindClass: 'self-center',
      explanation: 'self-center aligns a single flex item to the center of the cross axis.',
      category: 'Flexbox',
      difficulty: 'medium'
    },
    {
      id: '14',
      css: 'display: grid;\ngrid-template-rows: repeat(3, 1fr);',
      tailwindClass: 'grid grid-rows-3',
      explanation: 'Creates a 3-row grid with equal row heights.',
      category: 'Grid',
      difficulty: 'medium'
    },
    {
      id: '15',
      css: 'z-index: 50;',
      tailwindClass: 'z-50',
      explanation: 'z-50 sets the z-index to 50, controlling the stacking order.',
      category: 'Positioning',
      difficulty: 'hard'
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
    },
    {
      id: '6',
      css: 'font-size: 3rem;',
      tailwindClass: 'text-5xl',
      explanation: 'text-5xl sets font-size to 3rem (48px) for large headings.',
      category: 'Font Size',
      difficulty: 'easy'
    },
    {
      id: '7',
      css: 'font-weight: 300;',
      tailwindClass: 'font-light',
      explanation: 'font-light sets font-weight to 300 for lighter text.',
      category: 'Font Weight',
      difficulty: 'easy'
    },
    {
      id: '8',
      css: 'text-decoration: underline;',
      tailwindClass: 'underline',
      explanation: 'underline adds an underline decoration to text.',
      category: 'Text Decoration',
      difficulty: 'easy'
    },
    {
      id: '9',
      css: 'text-transform: uppercase;',
      tailwindClass: 'uppercase',
      explanation: 'uppercase transforms text to all capital letters.',
      category: 'Text Transform',
      difficulty: 'easy'
    },
    {
      id: '10',
      css: 'line-height: 2;',
      tailwindClass: 'leading-8',
      explanation: 'leading-8 sets line-height to 2rem for more spacing between lines.',
      category: 'Line Height',
      difficulty: 'medium'
    },
    {
      id: '11',
      css: 'font-style: italic;',
      tailwindClass: 'italic',
      explanation: 'italic applies italic styling to text.',
      category: 'Font Style',
      difficulty: 'easy'
    },
    {
      id: '12',
      css: 'text-align: justify;',
      tailwindClass: 'text-justify',
      explanation: 'text-justify aligns text to both left and right margins.',
      category: 'Text Alignment',
      difficulty: 'medium'
    },
    {
      id: '13',
      css: 'letter-spacing: -0.05em;',
      tailwindClass: 'tracking-tight',
      explanation: 'tracking-tight decreases letter spacing for tighter text.',
      category: 'Letter Spacing',
      difficulty: 'medium'
    },
    {
      id: '14',
      css: 'text-decoration: line-through;',
      tailwindClass: 'line-through',
      explanation: 'line-through adds a strikethrough decoration to text.',
      category: 'Text Decoration',
      difficulty: 'medium'
    },
    {
      id: '15',
      css: 'font-size: 0.75rem;',
      tailwindClass: 'text-xs',
      explanation: 'text-xs sets font-size to 0.75rem (12px) for very small text.',
      category: 'Font Size',
      difficulty: 'easy'
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
    },
    {
      id: '6',
      css: 'background-color: #FFFFFF;',
      tailwindClass: 'bg-white',
      explanation: 'bg-white sets background color to pure white.',
      category: 'Background Color',
      difficulty: 'easy'
    },
    {
      id: '7',
      css: 'color: #1F2937;',
      tailwindClass: 'text-gray-800',
      explanation: 'text-gray-800 sets text color to a dark gray.',
      category: 'Text Color',
      difficulty: 'easy'
    },
    {
      id: '8',
      css: 'background: linear-gradient(to bottom, #F59E0B, #EF4444);',
      tailwindClass: 'bg-gradient-to-b from-yellow-500 to-red-500',
      explanation: 'Creates a vertical gradient from yellow to red.',
      category: 'Gradients',
      difficulty: 'hard'
    },
    {
      id: '9',
      css: 'border-color: #6B7280;',
      tailwindClass: 'border-gray-500',
      explanation: 'border-gray-500 sets border color to medium gray.',
      category: 'Border Color',
      difficulty: 'medium'
    },
    {
      id: '10',
      css: 'background-color: rgba(59, 130, 246, 0.1);',
      tailwindClass: 'bg-blue-500/10',
      explanation: 'Sets background to blue-500 with 10% opacity.',
      category: 'Opacity',
      difficulty: 'medium'
    },
    {
      id: '11',
      css: 'color: #DC2626;',
      tailwindClass: 'text-red-600',
      explanation: 'text-red-600 sets text color to a darker red.',
      category: 'Text Color',
      difficulty: 'easy'
    },
    {
      id: '12',
      css: 'background: linear-gradient(45deg, #8B5CF6, #EC4899);',
      tailwindClass: 'bg-gradient-to-br from-purple-500 to-pink-500',
      explanation: 'Creates a diagonal gradient from purple to pink.',
      category: 'Gradients',
      difficulty: 'hard'
    },
    {
      id: '13',
      css: 'background-color: #000000;',
      tailwindClass: 'bg-black',
      explanation: 'bg-black sets background color to pure black.',
      category: 'Background Color',
      difficulty: 'easy'
    },
    {
      id: '14',
      css: 'color: #059669;',
      tailwindClass: 'text-green-600',
      explanation: 'text-green-600 sets text color to a darker green.',
      category: 'Text Color',
      difficulty: 'easy'
    },
    {
      id: '15',
      css: 'border-color: #7C3AED;',
      tailwindClass: 'border-purple-600',
      explanation: 'border-purple-600 sets border color to a darker purple.',
      category: 'Border Color',
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
    },
    {
      id: '9',
      css: 'margin-top: 1.5rem;',
      tailwindClass: 'mt-6',
      explanation: 'mt-6 applies margin-top of 1.5rem (24px).',
      category: 'Margin',
      difficulty: 'easy'
    },
    {
      id: '10',
      css: 'padding: 3rem;',
      tailwindClass: 'p-12',
      explanation: 'p-12 applies padding of 3rem (48px) on all sides.',
      category: 'Padding',
      difficulty: 'medium'
    },
    {
      id: '11',
      css: 'width: 50%;',
      tailwindClass: 'w-1/2',
      explanation: 'w-1/2 sets width to 50% of the parent container.',
      category: 'Width',
      difficulty: 'easy'
    },
    {
      id: '12',
      css: 'height: 100vh;',
      tailwindClass: 'h-screen',
      explanation: 'h-screen sets height to 100% of viewport height.',
      category: 'Height',
      difficulty: 'easy'
    },
    {
      id: '13',
      css: 'min-height: 100vh;',
      tailwindClass: 'min-h-screen',
      explanation: 'min-h-screen sets minimum height to 100% of viewport height.',
      category: 'Min Height',
      difficulty: 'medium'
    },
    {
      id: '14',
      css: 'margin-bottom: 0.5rem;',
      tailwindClass: 'mb-2',
      explanation: 'mb-2 applies margin-bottom of 0.5rem (8px).',
      category: 'Margin',
      difficulty: 'easy'
    },
    {
      id: '15',
      css: 'padding-left: 1.25rem;\npadding-right: 1.25rem;',
      tailwindClass: 'px-5',
      explanation: 'px-5 applies horizontal padding of 1.25rem (20px).',
      category: 'Padding',
      difficulty: 'easy'
    }
  ],
  effects: [
    {
      id: '1',
      css: 'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);',
      tailwindClass: 'shadow-sm',
      explanation: 'shadow-sm applies a small subtle shadow.',
      category: 'Shadows',
      difficulty: 'easy'
    },
    {
      id: '2',
      css: 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);',
      tailwindClass: 'shadow-lg',
      explanation: 'shadow-lg applies a large shadow for elevated elements.',
      category: 'Shadows',
      difficulty: 'medium'
    },
    {
      id: '3',
      css: 'border-radius: 0.5rem;',
      tailwindClass: 'rounded-lg',
      explanation: 'rounded-lg applies large border radius for rounded corners.',
      category: 'Border Radius',
      difficulty: 'easy'
    },
    {
      id: '4',
      css: 'transform: scale(1.05);',
      tailwindClass: 'scale-105',
      explanation: 'scale-105 scales element to 105% of its original size.',
      category: 'Transform',
      difficulty: 'medium'
    },
    {
      id: '5',
      css: 'transition: all 0.3s ease;',
      tailwindClass: 'transition-all duration-300',
      explanation: 'Creates smooth transitions for all properties over 300ms.',
      category: 'Transitions',
      difficulty: 'medium'
    },
    {
      id: '6',
      css: 'opacity: 0.5;',
      tailwindClass: 'opacity-50',
      explanation: 'opacity-50 sets element opacity to 50%.',
      category: 'Opacity',
      difficulty: 'easy'
    },
    {
      id: '7',
      css: 'transform: rotate(45deg);',
      tailwindClass: 'rotate-45',
      explanation: 'rotate-45 rotates element 45 degrees clockwise.',
      category: 'Transform',
      difficulty: 'medium'
    },
    {
      id: '8',
      css: 'border-radius: 9999px;',
      tailwindClass: 'rounded-full',
      explanation: 'rounded-full creates perfectly circular elements.',
      category: 'Border Radius',
      difficulty: 'easy'
    },
    {
      id: '9',
      css: 'box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);',
      tailwindClass: 'shadow-2xl',
      explanation: 'shadow-2xl applies an extra large shadow for dramatic depth.',
      category: 'Shadows',
      difficulty: 'medium'
    },
    {
      id: '10',
      css: 'transform: translateX(0.5rem);',
      tailwindClass: 'translate-x-2',
      explanation: 'translate-x-2 moves element 0.5rem to the right.',
      category: 'Transform',
      difficulty: 'medium'
    },
    {
      id: '11',
      css: 'backdrop-filter: blur(8px);',
      tailwindClass: 'backdrop-blur-sm',
      explanation: 'backdrop-blur-sm applies a small blur effect to the background.',
      category: 'Backdrop Filter',
      difficulty: 'hard'
    },
    {
      id: '12',
      css: 'transition: transform 0.2s ease;',
      tailwindClass: 'transition-transform duration-200',
      explanation: 'Creates smooth transitions for transform properties over 200ms.',
      category: 'Transitions',
      difficulty: 'medium'
    },
    {
      id: '13',
      css: 'filter: grayscale(100%);',
      tailwindClass: 'grayscale',
      explanation: 'grayscale converts element to grayscale (black and white).',
      category: 'Filters',
      difficulty: 'hard'
    },
    {
      id: '14',
      css: 'transform: skew(-12deg, 0);',
      tailwindClass: 'skew-x-12',
      explanation: 'skew-x-12 skews element 12 degrees along the X-axis.',
      category: 'Transform',
      difficulty: 'hard'
    },
    {
      id: '15',
      css: 'border-radius: 0.25rem;',
      tailwindClass: 'rounded',
      explanation: 'rounded applies default border radius for slightly rounded corners.',
      category: 'Border Radius',
      difficulty: 'easy'
    },
    {
      id: '16',
      css: 'box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);',
      tailwindClass: 'shadow-inner',
      explanation: 'shadow-inner applies an inset shadow for depressed appearance.',
      category: 'Shadows',
      difficulty: 'medium'
    },
    {
      id: '17',
      css: 'transform: scale(0.95);',
      tailwindClass: 'scale-95',
      explanation: 'scale-95 scales element to 95% of its original size.',
      category: 'Transform',
      difficulty: 'medium'
    },
    {
      id: '18',
      css: 'filter: blur(4px);',
      tailwindClass: 'blur-sm',
      explanation: 'blur-sm applies a small blur effect to the element.',
      category: 'Filters',
      difficulty: 'hard'
    },
    {
      id: '19',
      css: 'transition: opacity 0.5s ease-in-out;',
      tailwindClass: 'transition-opacity duration-500 ease-in-out',
      explanation: 'Creates smooth opacity transitions over 500ms with ease-in-out timing.',
      category: 'Transitions',
      difficulty: 'hard'
    },
    {
      id: '20',
      css: 'transform: translateY(-0.25rem);',
      tailwindClass: 'translate-y-1',
      explanation: 'translate-y-1 moves element 0.25rem upward.',
      category: 'Transform',
      difficulty: 'medium'
    }
  ],
  responsive: [
    {
      id: '1',
      css: '@media (min-width: 768px) {\n  display: block;\n}',
      tailwindClass: 'md:block',
      explanation: 'md:block applies display block on medium screens and up (768px+).',
      category: 'Display',
      difficulty: 'easy'
    },
    {
      id: '2',
      css: '@media (min-width: 1024px) {\n  grid-template-columns: repeat(3, 1fr);\n}',
      tailwindClass: 'lg:grid-cols-3',
      explanation: 'lg:grid-cols-3 creates 3 columns on large screens and up (1024px+).',
      category: 'Grid',
      difficulty: 'medium'
    },
    {
      id: '3',
      css: '@media (min-width: 640px) {\n  font-size: 1.5rem;\n}',
      tailwindClass: 'sm:text-2xl',
      explanation: 'sm:text-2xl applies larger text on small screens and up (640px+).',
      category: 'Typography',
      difficulty: 'easy'
    },
    {
      id: '4',
      css: '@media (min-width: 1280px) {\n  padding: 2rem;\n}',
      tailwindClass: 'xl:p-8',
      explanation: 'xl:p-8 applies larger padding on extra large screens (1280px+).',
      category: 'Spacing',
      difficulty: 'medium'
    },
    {
      id: '5',
      css: '@media (min-width: 768px) {\n  flex-direction: row;\n}',
      tailwindClass: 'md:flex-row',
      explanation: 'md:flex-row changes flex direction to row on medium screens and up.',
      category: 'Flexbox',
      difficulty: 'medium'
    },
    {
      id: '6',
      css: '@media (max-width: 639px) {\n  display: none;\n}',
      tailwindClass: 'hidden sm:block',
      explanation: 'hidden sm:block hides on mobile, shows on small screens and up.',
      category: 'Display',
      difficulty: 'medium'
    },
    {
      id: '7',
      css: '@media (min-width: 1024px) {\n  width: 50%;\n}',
      tailwindClass: 'lg:w-1/2',
      explanation: 'lg:w-1/2 sets width to 50% on large screens and up.',
      category: 'Width',
      difficulty: 'easy'
    },
    {
      id: '8',
      css: '@media (min-width: 768px) {\n  margin: 2rem;\n}',
      tailwindClass: 'md:m-8',
      explanation: 'md:m-8 applies larger margin on medium screens and up.',
      category: 'Spacing',
      difficulty: 'easy'
    },
    {
      id: '9',
      css: '@media (min-width: 640px) {\n  grid-template-columns: repeat(2, 1fr);\n}',
      tailwindClass: 'sm:grid-cols-2',
      explanation: 'sm:grid-cols-2 creates 2 columns on small screens and up.',
      category: 'Grid',
      difficulty: 'medium'
    },
    {
      id: '10',
      css: '@media (min-width: 1536px) {\n  max-width: 80rem;\n}',
      tailwindClass: '2xl:max-w-7xl',
      explanation: '2xl:max-w-7xl sets large max-width on 2xl screens (1536px+).',
      category: 'Width',
      difficulty: 'hard'
    },
    {
      id: '11',
      css: '@media (min-width: 768px) {\n  justify-content: space-between;\n}',
      tailwindClass: 'md:justify-between',
      explanation: 'md:justify-between applies space-between on medium screens and up.',
      category: 'Flexbox',
      difficulty: 'medium'
    },
    {
      id: '12',
      css: '@media (min-width: 1024px) {\n  font-size: 3rem;\n}',
      tailwindClass: 'lg:text-5xl',
      explanation: 'lg:text-5xl applies very large text on large screens and up.',
      category: 'Typography',
      difficulty: 'medium'
    }
  ]
};

export const groupNames: Record<string, string> = {
  layout: 'Layout & Positioning',
  typography: 'Typography',
  colors: 'Colors & Backgrounds',
  spacing: 'Spacing & Sizing',
  effects: 'Effects & Animations',
  responsive: 'Responsive Design'
};