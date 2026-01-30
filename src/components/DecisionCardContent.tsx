import { GameCard } from '../types/game';

export const DecisionCardContent = ({ card }: { card: GameCard }) => (
  <div className="h-full flex flex-col p-6">
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
      <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center">
        <span className="text-4xl">👑</span>
      </div>
      <h2 className="text-2xl font-bold">{card.title}</h2>
      <p className="text-slate-300 leading-relaxed italic">"{card.content}"</p>
    </div>
  </div>
);
