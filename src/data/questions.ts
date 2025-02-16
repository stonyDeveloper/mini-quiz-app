// src/data/questions.ts
import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    text: 'What do plants need for photosynthesis?',
    points: 10,
    options: [
      { id: 'a', text: 'Oxygen & Sugar', isCorrect: false },
      { id: 'b', text: 'Sunlight, Water & Carbon Dioxide', isCorrect: true },
      { id: 'c', text: 'Protein & Salt', isCorrect: false },
    ],
    feedback: {
      correct: 'That\'s right! Plants need sunlight, water, and carbon dioxide for photosynthesis.',
      incorrect: 'Think about what gives plants energy to make their food.',
    },
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    text: 'What is the role of sunlight in photosynthesis?',
    points: 10,
    options: [
      { id: 'a', text: 'It provides energy to make food', isCorrect: true },
      { id: 'b', text: 'It helps plants absorb water', isCorrect: false },
      { id: 'c', text: 'It turns leaves green', isCorrect: false },
    ],
    feedback: {
      correct: 'Correct! Sunlight provides the energy plants need to convert water and CO2 into glucose.',
      incorrect: 'Think about the energy source in photosynthesis.',
    },
  },
  {
    id: 'q3',
    type: 'drag-and-drop',
    text: 'Match the Algebraic Terms!',
    points: 10,
    items: [
      { id: 'variable', text: 'Variable', matchesTo: 'def1' },
      { id: 'constant', text: 'Constant', matchesTo: 'def2' },
      { id: 'expression', text: 'Expression', matchesTo: 'def3' },
      { id: 'equation', text: 'Equation', matchesTo: 'def4' },
    ],
    definitions: [
      { id: 'def1', text: 'A symbol that represents a number that can change' },
      { id: 'def2', text: 'A fixed number that does not change' },
      { id: 'def3', text: 'A statement that has numbers, variables, and operations' },
      { id: 'def4', text: 'A statement that two expressions are equal' },
    ],
    feedback: {
      correct: 'Great job matching all the algebraic terms!',
      incorrect: 'Some matches are incorrect. Try again!',
    },
  },
];

export const GOAL_POINTS = 30;