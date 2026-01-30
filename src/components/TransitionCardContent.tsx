import { GameCard } from '../types/game';
import { useGameState } from '../context/GameContext';

export const TransitionCardContent = ({ card }: { card: GameCard }) => {
  const { dispatch } = useGameState();

  return (
    <div className="h-full flex flex-col p-6 bg-gradient-to-b from-primary/20 to-transparent">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
          <span className="text-4xl text-primary">✨</span>
        </div>
        <h2 className="text-2xl font-black text-primary uppercase tracking-wider">{card.title}</h2>
        <p className="text-slate-200 leading-relaxed font-medium">{card.content}</p>
      </div>
      <button 
        onClick={() => dispatch({ type: 'CONTINUE' })}
        className="p-4 bg-primary text-background font-black rounded-xl text-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        {card.transitionAction || 'Continue'}
      </button>
    </div>
  );
};
