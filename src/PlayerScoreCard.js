import { html, css, LitElement } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

export class PlayerScoreCard extends LitElement {
  static get styles() {
    return css`
      .score-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 200px;
        border-radius: 20px;
        border: 5px solid white;
        background-color: var(--bg-color-2);
        color: var(--bg-color-3);
      }
      .score-container.active {
        background-color: var(--secondary-color);
        color: white;
      }
      span {
        font-size: 2rem;
      }
    `;
  }

  static get properties() {
    return {
      playerName: {
        type: String,
      },
      score: {
        type: Number
      },
      active: {
        type: Boolean
      }
    }
  }

  constructor() {
    super();
    this.playerName = '';
    this.score = 0;
    this.active = '';
    this.activeClass = { active: this.active };

    this.addEventListener('increment-score', (e) => {
      this.score ++;
    });
    this.addEventListener('toogle-active', (e) => {
      this.active = !this.active;
    });
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('active') && this.active != undefined) {
      this.activeClass = { active: this.active };
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class='score-container ${classMap(this.activeClass)}'>
        <h2>${this.playerName}</h2>
        <span>${this.score}</span>
      </div>
    `;
  }
}