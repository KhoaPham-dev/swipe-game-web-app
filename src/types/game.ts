export type CardType = 'decision' | 'transition';

export interface CardChoice {
  text: string;
  modifiers: Record<string, number>;
  label?: string; // e.g. "YES" or "NO"
}

export interface GameCard {
  id: string;
  type: CardType;
  content: string;
  title: string;
  image?: string;
  leftChoice?: CardChoice;
  rightChoice?: CardChoice;
  transitionAction?: string; // e.g. "Continue"
}

export interface GameStats {
  health: number;
  wealth: number;
  popularity: number;
}

export interface GameState {
  deck: GameCard[];
  currentIndex: number;
  stats: GameStats;
  isGameOver: boolean;
  gameOverReason?: string;
}

export type GameAction =
  | { type: 'SWIPE_LEFT' }
  | { type: 'SWIPE_RIGHT' }
  | { type: 'CONTINUE' }
  | { type: 'RESET_GAME' };
