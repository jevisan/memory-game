import { html, css, LitElement } from "lit-element";

export class PlayerScoreCard extends LitElement {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      playerName: {
        type: String,
      },
      score: {
        type: Number
      }
    }
  }

  constructor() {
    super();
    this.playerName = '';
    this.score = 0;
  }

  getScore() {
    return this.score;
  }
  
  setScore(score) {
    this.score = score;
  }

  render() {
    return html`
      <h2>${this.playerName}</h2>
      <span>${this.score}</span>
    `;
  }
}