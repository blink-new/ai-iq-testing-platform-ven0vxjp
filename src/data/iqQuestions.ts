export interface IQQuestion {
  id: string
  type: 'pattern' | 'logic' | 'spatial' | 'numerical' | 'verbal'
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  explanation: string
  points: number
}

export const iqQuestions: IQQuestion[] = [
  // Pattern Recognition Questions
  {
    id: 'pattern_001',
    type: 'pattern',
    question: 'What comes next in the sequence: 2, 6, 18, 54, ?',
    options: ['108', '162', '216', '270'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162',
    points: 10
  },
  {
    id: 'pattern_002',
    type: 'pattern',
    question: 'Complete the pattern: A1, C3, E5, G7, ?',
    options: ['H8', 'I9', 'J10', 'K11'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Letters skip one (A,C,E,G,I) and numbers increase by 2 (1,3,5,7,9)',
    points: 15
  },
  {
    id: 'pattern_003',
    type: 'pattern',
    question: 'What number should replace the question mark: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '21', '25', '34'],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: 'Fibonacci sequence: each number is the sum of the two preceding ones (8+13=21)',
    points: 15
  },
  
  // Logical Reasoning Questions  
  {
    id: 'logic_001',
    type: 'logic',
    question: 'If all roses are flowers and some flowers are red, which statement must be true?',
    options: [
      'All roses are red',
      'Some roses might be red', 
      'No roses are red',
      'All red things are roses'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Since roses are flowers and some flowers are red, it\'s possible (but not certain) that some roses are red',
    points: 15
  },
  {
    id: 'logic_002',
    type: 'logic',
    question: 'In a certain code, MONDAY is written as DFNQZB. How is SUNDAY written?',
    options: ['TFNOQZ', 'TFOQZB', 'TFNQZB', 'VONQZB'],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: 'Each letter is replaced by the letter that comes after it in reverse order: M→D, O→F, etc.',
    points: 20
  },
  {
    id: 'logic_003',
    type: 'logic',
    question: 'Five friends have different heights. Anna is taller than Bob but shorter than Carol. David is shorter than Bob but taller than Emma. Who is the shortest?',
    options: ['Anna', 'Bob', 'Carol', 'Emma'],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: 'Order from tallest to shortest: Carol > Anna > Bob > David > Emma. Emma is the shortest.',
    points: 15
  },

  // Spatial Intelligence Questions
  {
    id: 'spatial_001',
    type: 'spatial',
    question: 'How many cubes are there in total in this 3D structure? (Imagine a 3×3×3 cube with the center cube removed)',
    options: ['24', '25', '26', '27'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'A 3×3×3 cube has 27 cubes. Removing the center cube leaves 26 cubes.',
    points: 15
  },
  {
    id: 'spatial_002',
    type: 'spatial',
    question: 'Which shape would be formed if you fold this net into a 3D object? (Imagine a cross-shaped net)',
    options: ['Cube', 'Pyramid', 'Cone', 'Cylinder'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: 'A cross-shaped net with 6 squares folds into a cube',
    points: 10
  },
  {
    id: 'spatial_003',
    type: 'spatial',
    question: 'If you rotate a square 45 degrees clockwise around its center, what shape do you see?',
    options: ['Diamond', 'Circle', 'Triangle', 'Hexagon'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: 'A square rotated 45 degrees appears as a diamond (rhombus)',
    points: 10
  },

  // Numerical Reasoning Questions
  {
    id: 'numerical_001',
    type: 'numerical',
    question: 'What is 15% of 240?',
    options: ['32', '36', '38', '42'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: '15% of 240 = 0.15 × 240 = 36',
    points: 10
  },
  {
    id: 'numerical_002',
    type: 'numerical',
    question: 'If a train travels 120 km in 2 hours, what is its average speed in km/h?',
    options: ['50', '55', '60', '65'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Speed = Distance ÷ Time = 120 ÷ 2 = 60 km/h',
    points: 10
  },
  {
    id: 'numerical_003',
    type: 'numerical',
    question: 'If you invest $1000 at 5% compound interest annually, what will it be worth after 2 years?',
    options: ['$1050', '$1100', '$1102.50', '$1125'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'Year 1: $1000 × 1.05 = $1050. Year 2: $1050 × 1.05 = $1102.50',
    points: 15
  },

  // Verbal Reasoning Questions
  {
    id: 'verbal_001',
    type: 'verbal',
    question: 'Which word does not belong with the others?',
    options: ['Apple', 'Orange', 'Banana', 'Carrot'],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: 'Carrot is a vegetable, while the others are fruits',
    points: 10
  },
  {
    id: 'verbal_002',
    type: 'verbal',
    question: 'BOOK is to READ as MUSIC is to:',
    options: ['Hear', 'Listen', 'Sound', 'Note'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'You read a book and listen to music. Both are active forms of consumption.',
    points: 15
  },
  {
    id: 'verbal_003',
    type: 'verbal',
    question: 'What word can be made from the letters in SENATOR that is also a type of building?',
    options: ['STORE', 'STONE', 'ARENA', 'TOWER'],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: 'STORE can be made from the letters in SENATOR (S-T-O-R-E) and is a type of building',
    points: 20
  },

  // Advanced Pattern Questions
  {
    id: 'pattern_004',
    type: 'pattern',
    question: 'In the sequence 1, 4, 9, 16, 25, what is the next number?',
    options: ['30', '35', '36', '49'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'These are perfect squares: 1², 2², 3², 4², 5², so next is 6² = 36',
    points: 15
  },
  {
    id: 'pattern_005',
    type: 'pattern',
    question: 'What comes next: 3, 6, 12, 24, ?',
    options: ['36', '42', '48', '54'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Each number is doubled: 3×2=6, 6×2=12, 12×2=24, 24×2=48',
    points: 10
  },

  // Complex Logic Questions
  {
    id: 'logic_004',
    type: 'logic',
    question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['1 minute', '5 minutes', '20 minutes', '100 minutes'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'Each machine makes 1 widget in 5 minutes, so 100 machines make 100 widgets in 5 minutes',
    points: 20
  },
  {
    id: 'logic_005',
    type: 'logic',
    question: 'All cats are mammals. All mammals are animals. Therefore:',
    options: [
      'All animals are cats',
      'All cats are animals',
      'Some animals are not mammals',
      'No cats are animals'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Following the logical chain: cats → mammals → animals, therefore all cats are animals',
    points: 15
  },

  // Advanced Spatial Questions  
  {
    id: 'spatial_004',
    type: 'spatial',
    question: 'How many faces does a cube have?',
    options: ['4', '6', '8', '12'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'A cube has 6 faces (top, bottom, front, back, left, right)',
    points: 10
  },
  {
    id: 'spatial_005',
    type: 'spatial',
    question: 'If you look at a pyramid from directly above, what shape would you see?',
    options: ['Circle', 'Triangle', 'Square', 'Pentagon'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'Looking down at a pyramid from above, you see the base, which is typically square',
    points: 15
  }
]

// Function to get adaptive questions based on previous performance
export function getAdaptiveQuestions(
  currentScore: number,
  answeredQuestions: string[],
  totalQuestions: number = 5
): IQQuestion[] {
  const availableQuestions = iqQuestions.filter(q => !answeredQuestions.includes(q.id))
  
  if (availableQuestions.length === 0) return []

  // Determine difficulty based on current performance
  let targetDifficulty: 'easy' | 'medium' | 'hard'
  const accuracy = answeredQuestions.length > 0 ? currentScore / answeredQuestions.length : 0.5
  
  if (accuracy > 0.8) {
    targetDifficulty = 'hard'
  } else if (accuracy > 0.5) {
    targetDifficulty = 'medium'
  } else {
    targetDifficulty = 'easy'
  }

  // Get questions of target difficulty, fallback to others if needed
  let selectedQuestions = availableQuestions.filter(q => q.difficulty === targetDifficulty)
  
  if (selectedQuestions.length < totalQuestions) {
    const remaining = totalQuestions - selectedQuestions.length
    const otherQuestions = availableQuestions.filter(q => q.difficulty !== targetDifficulty)
    selectedQuestions = [...selectedQuestions, ...otherQuestions.slice(0, remaining)]
  }

  // Shuffle and return requested number of questions
  return selectedQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, totalQuestions)
}

// Function to calculate IQ score based on performance
export function calculateIQScore(
  correctAnswers: number,
  totalQuestions: number,
  averageTime: number,
  questionTypes: string[]
): number {
  // Base score calculation
  const accuracy = correctAnswers / totalQuestions
  let baseScore = 85 + (accuracy * 30) // Range: 85-115

  // Time bonus/penalty (optimal time is around 30-60 seconds per question)
  const optimalTime = 45 // seconds
  const timeFactor = Math.min(optimalTime / averageTime, 1.5) // Cap bonus at 1.5x
  baseScore *= timeFactor

  // Difficulty bonus
  const typeVariety = new Set(questionTypes).size
  const varietyBonus = typeVariety * 2 // Up to 10 points for variety

  // Final score calculation
  let iqScore = Math.round(baseScore + varietyBonus)
  
  // Clamp between reasonable bounds
  iqScore = Math.max(70, Math.min(160, iqScore))
  
  return iqScore
}