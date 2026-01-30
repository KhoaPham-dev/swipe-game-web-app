import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { GameCard } from '../types/game';
import { DecisionCardContent } from './DecisionCardContent';
import { TransitionCardContent } from './TransitionCardContent';

interface Props {
  card: GameCard;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeableCard: React.FC<Props> = ({ card, isTop, onSwipe }) => {
  const [exitX, setExitX] = useState<number | string>(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const leftOverlayOpacity = useTransform(x, [-100, -50], [1, 0]);
  const rightOverlayOpacity = useTransform(x, [50, 100], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitX(1000);
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      setExitX(-1000);
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        zIndex: isTop ? 10 : 0,
        gridArea: 'stack',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        x: exitX,
        scale: isTop ? 1 : 0.95,
        y: isTop ? 0 : 10,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative w-full aspect-[3/4] max-w-sm cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-slate-800 border-2 border-slate-700 shadow-2xl touch-none"
    >
      {isTop && card.type === 'decision' && (
        <>
          <motion.div 
            style={{ opacity: leftOverlayOpacity }}
            className="absolute top-8 right-8 border-4 border-accent px-4 py-2 rounded-xl rotate-12 z-20 pointer-events-none"
          >
            <span className="text-accent text-3xl font-black uppercase">{card.leftChoice?.label || 'NO'}</span>
          </motion.div>
          <motion.div 
            style={{ opacity: rightOverlayOpacity }}
            className="absolute top-8 left-8 border-4 border-primary px-4 py-2 rounded-xl -rotate-12 z-20 pointer-events-none"
          >
            <span className="text-primary text-3xl font-black uppercase">{card.rightChoice?.label || 'YES'}</span>
          </motion.div>
        </>
      )}

      <div className="h-full w-full">
        {card.type === 'decision' ? (
          <DecisionCardContent card={card} />
        ) : (
          <TransitionCardContent card={card} />
        )}
      </div>

      {isTop && card.type === 'decision' && (
        <motion.div 
          className="absolute bottom-6 left-0 right-0 px-6 text-center z-20"
          style={{ 
            opacity: useTransform(x, [-50, 0, 50], [1, 0, 1]) 
          }}
        >
          <p className="text-sm font-bold text-slate-400">
            {x.get() > 0 ? card.rightChoice?.text : card.leftChoice?.text}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
