import { motion } from 'framer-motion';
import { Heart, Coins, Users } from 'lucide-react';
import { useGameState } from '../context/GameContext';

export const StatBar = () => {
  const { state } = useGameState();

  return (
    <div className="flex justify-between items-center bg-slate-800/50 rounded-2xl p-4 shadow-xl border border-slate-700">
      <StatItem 
        icon={<Heart className="text-rose-500" fill="currentColor" />} 
        value={state.stats.health} 
        label="Health"
      />
      <StatItem 
        icon={<Coins className="text-amber-500" fill="currentColor" />} 
        value={state.stats.wealth} 
        label="Wealth"
      />
      <StatItem 
        icon={<Users className="text-sky-500" fill="currentColor" />} 
        value={state.stats.popularity} 
        label="Popularity"
      />
    </div>
  );
};

const StatItem = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-1 w-20">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-bold text-sm tabular-nums">{value}</span>
      </div>
      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className="h-full bg-white/50"
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>
    </div>
  );
};
