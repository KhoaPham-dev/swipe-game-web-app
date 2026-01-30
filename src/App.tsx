import { CardStack } from './components/CardStack';
import { StatBar } from './components/StatBar';
import { useGameState } from './context/GameContext';
import { RefreshCcw } from 'lucide-react';

function App() {
  const { state, dispatch } = useGameState();

  if (state.isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background p-6 text-center">
        <h1 className="text-4xl font-bold text-accent mb-4">Game Over</h1>
        <p className="text-xl text-slate-300 mb-8">{state.gameOverReason}</p>
        <button
          onClick={() => dispatch({ type: 'RESET_GAME' })}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-background font-bold rounded-full hover:scale-105 transition-transform"
        >
          <RefreshCcw size={20} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-screen w-full max-w-md mx-auto bg-background relative overflow-hidden">
      <header className="p-4 pt-8 flex flex-col gap-4">
        <h1 className="text-2xl font-black text-center tracking-tighter text-slate-400">THE REIGN</h1>
        <StatBar />
      </header>

      <section className="flex-1 flex items-center justify-center p-4 relative">
        <CardStack />
      </section>

      <footer className="p-4 pb-12 text-center text-slate-500 text-xs uppercase tracking-widest">
        Swipe to make your choice
      </footer>
    </main>
  );
}

export default App;
