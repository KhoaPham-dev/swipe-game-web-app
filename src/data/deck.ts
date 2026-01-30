import { GameCard } from '../types/game';

export const INITIAL_DECK: GameCard[] = [
  {
    id: '1',
    type: 'transition',
    title: 'Welcome to the Kingdom',
    content: 'You have just been crowned. Your goal is to keep the balance between Health, Wealth, and Popularity. Swipe to begin your reign.',
    transitionAction: 'Start Reign',
  },
  {
    id: '2',
    type: 'decision',
    title: 'The Royal Feast',
    content: 'The people are hungry. Should we host a grand feast to boost morale?',
    leftChoice: {
      text: 'Too expensive.',
      modifiers: { popularity: -10, wealth: 5 },
      label: 'NO',
    },
    rightChoice: {
      text: 'Let them eat!',
      modifiers: { popularity: 15, wealth: -15 },
      label: 'YES',
    },
  },
  {
    id: '3',
    type: 'decision',
    title: 'Ancient Plague',
    content: 'A mysterious illness is spreading in the northern villages. Send the royal physicians?',
    leftChoice: {
      text: 'Stay in the city.',
      modifiers: { health: -20, wealth: 5 },
      label: 'IGNORE',
    },
    rightChoice: {
      text: 'Save them!',
      modifiers: { health: 10, wealth: -10, popularity: 5 },
      label: 'HELP',
    },
  },
  {
    id: '4',
    type: 'decision',
    title: 'The Golden Statue',
    content: 'The people want to honor you with a massive golden statue. It will cost a fortune but boost your ego... and popularity.',
    leftChoice: {
      text: 'A waste of gold.',
      modifiers: { wealth: 5, popularity: -5 },
      label: 'NO',
    },
    rightChoice: {
      text: 'Build it taller!',
      modifiers: { wealth: -25, popularity: 20 },
      label: 'YES',
    },
  },
  {
    id: '5',
    type: 'transition',
    title: 'First Year Passed',
    content: 'You have survived your first year as a ruler. The winter was harsh, but the kingdom stands.',
    transitionAction: 'Continue',
  },
  {
    id: '6',
    type: 'decision',
    title: 'Foreign Trade',
    content: 'A merchant from a faraway land offers a lucrative but risky trade deal.',
    leftChoice: {
      text: 'Too risky.',
      modifiers: { wealth: -5 },
      label: 'DECLINE',
    },
    rightChoice: {
      text: 'Invest now.',
      modifiers: { wealth: 20, health: -5 },
      label: 'INVEST',
    },
  },
  {
    id: '7',
    type: 'transition',
    title: 'The End (For Now)',
    content: 'You have reached the end of the demo. More challenges await in the full version!',
    transitionAction: 'Restart',
  },
];
