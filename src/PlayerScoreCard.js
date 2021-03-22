import { html, css, LitElement } from "lit-element";

export class PlayerScoreCard extends LitElement {
  static get properties() {
    return {
      playerName: {
        type: String,
      }
    }
  }

  constructor() {
    super();
    this.playerName = '';
  }
  
  render() {
    return html`
      <h2>${this.playerName}</h2>
    `;
  }
}