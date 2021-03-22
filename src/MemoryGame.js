import { html, css, LitElement } from 'lit-element';

export class MemoryGame extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--memory-game-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      symbols: {
        type: Array
      },
      playSet: {
        type: Array
      }
    }
  }

  constructor() {
    super();
    this.availableSymbols = ['🎁', '🎈', '🎠', '🏈', '🪁', '🎯', '🎮', '🎹', '🎸', '🍕', '🍔', '🚗', '🚁', '🚀', '🚢'];
    this.playSet = this.__getPlaySet(15);
    console.log(this.playSet);
  }

  __getPlaySet(nPairs) {
    const playSet = [];
    for (let i = 0; i < nPairs; i++) {
      // adding to the playset twice
      playSet.push(this.availableSymbols[i]);
      playSet.push(this.availableSymbols[i]);
    }
    return this.__shuffleArray(playSet);
  }

  __shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  render() {
    return html`
      <div id="score-board">
        <player-score-card .playerName="${'Player 1'}"></player-score-card>
        <player-score-card .playerName="${'Player 2'}"></player-score-card>
      </div>
      <div id="board">
        ${this.playSet.map((symbol) => {
          return html`
            <card-memory .symbol="${symbol}"></card-memory>
          `;
        })}
      </div>
    `;
  }
}
