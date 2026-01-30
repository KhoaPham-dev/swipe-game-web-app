import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction, GameStats } from '../types/game';
import { INITIAL_DECK as deckData } from '../data/deck';

const INITIAL_STATS: GameStats = {
  health: 50,
  wealth: 50,
  popularity: 50,
};

const INITIAL_STATE: GameState = {
  deck: deckData,
  currentIndex: 0,
  stats: INITIAL_STATS,
  isGameOver: false,
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SWIPE_LEFT': {
      const card = state.deck[state.currentIndex];
      if (card.type !== 'decision' || !card.leftChoice) return state;
      
      const nextStats = updateStats(state.stats, card.leftChoice.modifiers);
      return checkGameOver({
        ...state,
        stats: nextStats,
        currentIndex: state.currentIndex + 1,
      });
    }
    case 'SWIPE_RIGHT': {
      const card = state.deck[state.currentIndex];
      if (card.type !== 'decision' || !card.rightChoice) return state;
      
      const nextStats = updateStats(state.stats, card.rightChoice.modifiers);
      return checkGameOver({
        ...state,
        stats: nextStats,
        currentIndex: state.currentIndex + 1,
      });
    }
    case 'CONTINUE': {
      const card = state.deck[state.currentIndex];
      if (card.type !== 'transition') return state;
      
      if (state.currentIndex >= state.deck.length - 1) {
          return { ...INITIAL_STATE };
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    }
    case 'RESET_GAME':
      return INITIAL_STATE;
    default:
      return state;
  }
}

function updateStats(stats: GameStats, modifiers: Record<string, number>): GameStats {
  const newStats = { ...stats };
  Object.entries(modifiers).forEach(([key, value]) => {
    if (key in newStats) {
      newStats[key as keyof GameStats] = Math.min(100, Math.max(0, newStats[key as keyof GameStats] + value));
    }
  });
  return newStats;
}

function checkGameOver(state: GameState): GameState {
  if (state.stats.health <= 0) return { ...state, isGameOver: true, gameOverReason: 'Your health has failed you.' };
  if (state.stats.wealth <= 0) return { ...state, isGameOver: true, gameOverReason: 'The treasury is empty.' };
  if (state.stats.popularity <= 0) return { ...state, isGameOver: true, gameOverReason: 'The people have revolted.' };
  if (state.currentIndex >= state.deck.length) return { ...state, isGameOver: true, gameOverReason: 'Your reign has come to an end.' };
  return state;
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('swipe-game-state', JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameState must be used within a GameProvider');
  return context;
};
