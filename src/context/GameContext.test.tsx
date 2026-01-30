import { gameReducer } from './GameContext';
import { GameState, GameCard } from '../types/game';

const mockDeck: GameCard[] = [
  {
    id: '1',
    type: 'decision',
    title: 'Test Card 1',
    content: 'Choice?',
    leftChoice: { text: 'Left', modifiers: { health: -10 }, nextCardId: '3' },
    rightChoice: { text: 'Right', modifiers: { health: 10 } },
  },
  {
    id: '2',
    type: 'decision',
    title: 'Test Card 2',
    content: 'Linear Choice?',
    leftChoice: { text: 'Left', modifiers: { wealth: -10 } },
    rightChoice: { text: 'Right', modifiers: { wealth: 10 } },
  },
  {
    id: '3',
    type: 'transition',
    title: 'Test Card 3',
    content: 'Branch Target',
    transitionAction: 'Go',
  }
];

const initialState: GameState = {
  deck: mockDeck,
  currentIndex: 0,
  stats: { health: 50, wealth: 50, popularity: 50 },
  isGameOver: false,
};

describe('gameReducer', () => {
  test('SWIPE_LEFT updates stats and follows branching logic', () => {
    const action = { type: 'SWIPE_LEFT' } as const;
    const newState = gameReducer(initialState, action);

    expect(newState.stats.health).toBe(40);
    expect(newState.currentIndex).toBe(2); // Should jump to Card ID '3'
    expect(newState.deck[newState.currentIndex].id).toBe('3');
  });

  test('SWIPE_RIGHT updates stats and follows linear progression', () => {
    const action = { type: 'SWIPE_RIGHT' } as const;
    const newState = gameReducer(initialState, action);

    expect(newState.stats.health).toBe(60);
    expect(newState.currentIndex).toBe(1); // Linear
  });

  test('CONTINUE proceeds to next card', () => {
    const stateWithTransition: GameState = {
      ...initialState,
      currentIndex: 2, // Card '3' is transition
    };
    const action = { type: 'CONTINUE' } as const;
    const newState = gameReducer(stateWithTransition, action);

    expect(newState.currentIndex).toBe(3); // End of deck
    expect(newState.isGameOver).toBe(true);
  });

  test('Game Over when health hits 0', () => {
    const criticalState: GameState = {
      ...initialState,
      stats: { health: 5, wealth: 50, popularity: 50 }
    };
    const action = { type: 'SWIPE_LEFT' } as const;
    const newState = gameReducer(criticalState, action);

    expect(newState.stats.health).toBe(0);
    expect(newState.isGameOver).toBe(true);
    expect(newState.gameOverReason).toBeDefined();
  });

  test('RESET_GAME resets to initial state', () => {
    const modifiedState: GameState = {
      ...initialState,
      currentIndex: 5,
      isGameOver: true
    };
    const action = { type: 'RESET_GAME' } as const;
    const newState = gameReducer(modifiedState, action);

    expect(newState.currentIndex).toBe(0);
    expect(newState.isGameOver).toBe(false);
  });
});
