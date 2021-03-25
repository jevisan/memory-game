import { html, css, LitElement } from 'lit-element';

export class MemoryGame extends LitElement {
  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: sans-serif;
        --primary-color: #123c69;
        --secondary-color: #ac3b61;
        --bleu: #2880de;
        --bg-color-1: #edc7b7;
        --bg-color-2: #eee2dc;
        --bg-color-3: #bab2b5;
      }
      #board {
        background: var(--bg-color-1);
        border: 5px solid white;
        border-radius: 20px;
        padding: 40px 0;
        box-shadow: 11px 13px 31px -4px rgba(114, 86, 86, 0.6);
        -webkit-box-shadow: 11px 13px 31px -4px rgba(114, 86, 86, 0.6);
        -moz-box-shadow: 11px 13px 31px -4px rgba(114, 86, 86, 0.6);
      }
      #score-board {
        display: flex;
        justify-content: space-around;
        margin-bottom: 40px;
      }
      .cards-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 1rem;
        column-gap: 1rem;
        justify-items: center;
        align-content: center;
      }
    `;
  }

  static get properties() {
    return {
      symbols: {
        type: Array,
      },
      playSet: {
        type: Array,
      },
      player1: {
        type: Object,
      },
      player2: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.availableSymbols = [
      '🎁',
      '🎈',
      '🎠',
      '🏈',
      '🪁',
      '🎯',
      '🎮',
      '🎹',
      '🎸',
      '🍕',
      '🍔',
      '🚗',
      '🚁',
      '🚀',
      '🚢',
    ];
    this.playSet = [];
    this.revealedCard1 = null;
    this.revealedCard2 = null;
    this.player1 = { name: 'Player 1', score: 0 };
    this.player2 = { name: 'Player 2', score: 0 };
    this.currentPlayer = this.player1;

    this.__getPlaySet(15);
  }

  __getPlaySet(nPairs) {
    for (let i = 0; i < nPairs; i += 1) {
      // adding to the playset twice
      this.playSet.push(this.availableSymbols[i]);
      this.playSet.push(this.availableSymbols[i]);
    }
    return this.__shufflePlaySet();
  }

  __shufflePlaySet() {
    for (let i = this.playSet.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playSet[i], this.playSet[j]] = [this.playSet[j], this.playSet[i]];
    }
  }

  handdlePlay(e) {
    if (this.revealedCard1 === null) {
      this.revealedCard1 = e.target;
      this.revealedCard1.setState('show');
    } else if (this.revealedCard2 === null && e.target !== this.revealedCard1) {
      this.revealedCard2 = e.target;
      this.revealedCard2.setState('show');
      setTimeout(() => {
        if (this.revealedCard1.symbol === this.revealedCard2.symbol) {
          this.currentPlayer.score += 1;
          this.incrementScore();
          this.revealedCard1.setState('taken');
          this.revealedCard2.setState('taken');
        } else {
          this.revealedCard1.setState('hidden');
          this.revealedCard2.setState('hidden');
          this.passTurn();
        }
        this.revealedCard1 = null;
        this.revealedCard2 = null;
      }, 2000);
    }
  }

  incrementScore() {
    const incrementScoreEvent = new CustomEvent('increment-score');
    this.getPlayerCard('active').dispatchEvent(incrementScoreEvent);
  }

  getPlayerCard(player) {
    let playerCard;
    switch (player) {
      case 'active':
      default:
        if (this.currentPlayer === this.player1) {
          playerCard = this.shadowRoot.getElementById('player1');
          break;
        } else {
          playerCard = this.shadowRoot.getElementById('player2');
          break;
        }
      case 'inactive':
        if (this.currentPlayer === this.player1) {
          playerCard = this.shadowRoot.getElementById('player2');
          break;
        } else {
          playerCard = this.shadowRoot.getElementById('player1');
          break;
        }
    }
    return playerCard;
  }

  passTurn() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
    const toggleActiveEvent = new CustomEvent('toggle-active');
    this.getPlayerCard('active').dispatchEvent(toggleActiveEvent);
    this.getPlayerCard('inactive').dispatchEvent(toggleActiveEvent);
  }

  render() {
    return html`
      <div id="board">
        <div id="score-board">
          <player-score-card
            id="player1"
            .playerName="${this.player1.name}"
            .score="${this.player1.score}"
            .active="${this.currentPlayer === this.player1}"
          >
          </player-score-card>
          <player-score-card
            id="player2"
            .playerName="${this.player2.name}"
            .score="${this.player2.score}"
            .active="${this.currentPlayer === this.player2}"
          >
          </player-score-card>
        </div>
        <div class="cards-wrapper">
          ${this.playSet.map(
            symbol => html`
              <card-memory
                .symbol="${symbol}"
                @card-selected="${this.handdlePlay}"
              >
              </card-memory>
            `
          )}
        </div>
      </div>
    `;
  }
}
