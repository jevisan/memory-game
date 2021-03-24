import { html, css, LitElement } from 'lit-element';

export class MemoryGame extends LitElement {
  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: sans-serif;
        --primary-color: #123C69;
        --secondary-color: #AC3B61;
        --bleu: #2880de;
        --bg-color-1: #EDC7B7;
        --bg-color-2: #EEE2DC;
        --bg-color-3: #BAB2B5;
      }
      #board {
        background: var(--bg-color-1);
        border: 5px solid white;
        border-radius: 20px;
        padding: 40px 0;
        box-shadow: 11px 13px 31px -4px rgba(114,86,86,0.6);
        -webkit-box-shadow: 11px 13px 31px -4px rgba(114,86,86,0.6);
        -moz-box-shadow: 11px 13px 31px -4px rgba(114,86,86,0.6);
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
        type: Array
      },
      playSet: {
        type: Array
      },
      player1: {
        type: Object
      },
      player2: {
        type: Object
      }
    }
  }

  constructor() {
    super();
    this.availableSymbols = ['🎁', '🎈', '🎠', '🏈', '🪁', '🎯', '🎮', '🎹', '🎸', '🍕', '🍔', '🚗', '🚁', '🚀', '🚢'];
    this.playSet = this.__getPlaySet(15);
    this.revealedCard1 = null;
    this.revealedCard2 = null;
    this.player1 = this.setPlayer('Player 1', 0);
    this.player2 = this.setPlayer('Player 2', 0);
    this.currentPlayer = this.player1;
  }

  setPlayer(name, score) {
    return {
      name: name,
      score: score
    }
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

  handdlePlay(e) {
    if (this.revealedCard1 === null) {
      this.revealedCard1 = e.target;
      this.revealedCard1.setState('show');
    } else if (this.revealedCard2 === null && e.target != this.revealedCard1) {
      this.revealedCard2 = e.target;
      this.revealedCard2.setState('show');
      setTimeout(() => {
        if (this.revealedCard1.symbol === this.revealedCard2.symbol) {
          this.currentPlayer.score ++;
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
    switch (player) {
      case 'active':
        if (this.currentPlayer === this.player1) {
          return this.shadowRoot.getElementById('player1');
        } else {
          return this.shadowRoot.getElementById('player2');
        }
      case 'inactive':
        if (this.currentPlayer === this.player1) {
          return this.shadowRoot.getElementById('player2');
        } else {
          return this.shadowRoot.getElementById('player1');
        }
    }
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
            .score='${this.player1.score}' 
            .active='${this.currentPlayer === this.player1}'>
          </player-score-card>
          <player-score-card 
            id="player2" 
            .playerName="${this.player2.name}" 
            .score='${this.player2.score}' 
            .active='${this.currentPlayer === this.player2}'>
          </player-score-card>
        </div>
        <div class="cards-wrapper">
          ${this.playSet.map((symbol) => {
            return html`
              <card-memory 
                .symbol="${symbol}" 
                @card-selected='${this.handdlePlay}' 
                .state="${'hidden'}">
              </card-memory>
            `;
          })}
        </div>
      </div>
    `;
  }
}
