import { html, css, LitElement } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';

export class Card extends LitElement {

  static get styles() {
    return css`
      .game-card {
        background-color: transparent;
        width: 100px;
        height: 100px;
        perspective: 1000px;
      }
      .game-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      .game-card.show .game-card-inner {
        transform: rotateY(180deg);
      }
      .game-card-front, .game-card-back {
        position: absolute;
        width: 90%;
        height: 90%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border: 5px solid white;
        border-radius: 20px;
      }
      .game-card-front {
        background-color: var(--primary-color);
        color: white;
      }
      .game-card-back {
        background-color: var(--bleu);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        transform: rotateY(180deg);
      }

      .taken {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      symbol: {
        type: String
      },
      state: {
        type: String
      }
    }
  }
  
  constructor() {
    super();
    this.symbol = '';
    this.state = 'hidden';
    this.stateClass = { hide: true };
  }
  
  __onClick() {
    const playEvent = new CustomEvent('card-selected', {
      detail: {
        choice: this.symbol
      }
    });
    this.dispatchEvent(playEvent);
  }

  setState(state) {
    this.state = state;
    this.stateClass = {
      hide: this.state === 'hidden',
      show: this.state === 'show',
      taken: this.state === 'taken'
    };
    console.log(this.stateClass);
    this.requestUpdate();
  }

  render() {
    // console.log(this.stateClass);
    return html`
      <div @click="${this.__onClick}" class='game-card ${classMap(this.stateClass)}'>
        <div class="game-card-inner">
          <div class="game-card-front"></div>
          <div class="game-card-back">
            ${this.symbol} 
          </div>
        </div>
      </div>
    `;
  }
}