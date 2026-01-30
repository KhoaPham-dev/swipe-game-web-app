# Swipe Game Web App

A tactile, mobile-first card-swiping game built with React, Framer Motion, and Tailwind CSS.

## Features
- **Card Stack Engine**: High-performance 60FPS swipe animations.
- **Narrative Branching**: Choices can lead to different story paths using `nextCardId`.
- **Decision Mechanics**: Swipe left or right to make choices that impact your stats (Health, Wealth, Popularity).
- **Transition Cards**: Narrative beats between decisions to provide feedback or story progression.
- **State Management**: Robust game state handled via React Context and `useReducer`.
- **Responsive Design**: Optimized for portrait mobile view with "tactile" feel.

## Tech Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Testing**: Jest & React Testing Library
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests
To run the unit tests:
```bash
npm test
```

## Game Logic
- **Decision Cards**: Require a choice (Left/Right). Each choice has modifiers that update your stats and can specify a `nextCardId` for branching paths.
- **Transition Cards**: Provide information and require a simple swipe/click to continue.
- **Game Over**: Reaching 0 in any stat or completing the deck triggers the end of the game.

## Architecture
- `src/components`: UI components including the `SwipeableCard` engine and `StatBar`.
- `src/context`: Centralized game state management and reducer logic.
- `src/data`: Game content (deck) definition.
- `src/types`: TypeScript interfaces for the game domain.
