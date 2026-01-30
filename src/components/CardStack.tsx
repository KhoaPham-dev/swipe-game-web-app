import { AnimatePresence } from 'framer-motion';
import { useGameState } from '../context/GameContext';
import { SwipeableCard } from './SwipeableCard';

export const CardStack = () => {
  const { state, dispatch } = useGameState();
  const { currentIndex, deck } = state;

  const currentCard = deck[currentIndex];
  const nextCard = deck[currentIndex + 1];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentCard.type === 'decision') {
      dispatch({ type: direction === 'left' ? 'SWIPE_LEFT' : 'SWIPE_RIGHT' });
    } else {
      dispatch({ type: 'CONTINUE' });
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center max-w-sm mx-auto" style={{ display: 'grid', gridTemplateAreas: '"stack"' }}>
      <AnimatePresence mode="popLayout">
        {nextCard && (
          <SwipeableCard
            key={nextCard.id}
            card={nextCard}
            isTop={false}
            onSwipe={() => {}}
          />
        )}
        
        {currentCard && (
          <SwipeableCard
            key={currentCard.id}
            card={currentCard}
            isTop={true}
            onSwipe={handleSwipe}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
