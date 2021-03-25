import { MemoryGame } from './src/MemoryGame.js';
import { Card } from './src/Card.js';
import { PlayerScoreCard } from './src/PlayerScoreCard.js';

window.customElements.define('card-memory', Card);
window.customElements.define('player-score-card', PlayerScoreCard);
window.customElements.define('memory-game', MemoryGame);
