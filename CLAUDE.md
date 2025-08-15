# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload at localhost:8080
npm run dev

# Build for production with minification
npm run build
```

## Architecture Overview

This is a Vue.js 2 Minesweeper game using Webpack 2 for bundling. The application follows a component-based architecture with the following structure:

### Core Components

- **App.vue**: Root component that renders the game title and the main MinesSweeper component
- **MinesSweeper.vue**: Main game component that handles user interactions, game state, and rendering the minefield grid
- **Message.vue**: Overlay component for displaying game over/win messages with appropriate styling
- **MinesSweeper.js**: Core game logic class containing:
  - `MinesSweeper` class: Main game engine with grid management, mine detection, and win/lose logic
  - `GridElement` class: Individual cell representation with visibility, mine, and count properties  
  - `Array2D` utility function for creating 2D arrays

### Game Logic Flow

1. **Initialization**: Game creates a 15x10 grid with 5% mine density (configurable)
2. **User Interaction**: Click events on grid cells trigger the `run` method in MinesSweeper.vue
3. **Mine Detection**: Uses coordinate-based checking with the `hasMine()` method
4. **Cell Uncovering**: Recursive flood-fill algorithm reveals adjacent empty cells
5. **Win/Lose Conditions**: Automatic checking after each move with 2-second auto-restart

### Styling Approach

- Uses SCSS with component-scoped styles
- Dynamic color generation for grid cells using SASS mixins and random backgrounds
- Responsive flexbox layout for the minefield grid
- Custom fonts: 'Amatica SC' for headers, 'Boogaloo' for game text

### Key Technical Details

- Vue 2.1 with single-file components (.vue)
- ES2015 syntax with Babel transpilation
- Webpack dev server for hot reloading
- Grid coordinates use row/column indexing with some coordinate system inconsistencies between components
- Game automatically restarts after win/lose with `window.location.reload()`

### Asset Management

- Mine and death images stored in `src/assets/`
- Webpack file-loader handles image processing and optimization
- Images referenced via relative paths in Vue components