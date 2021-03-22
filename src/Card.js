import { html, css, LitElement } from "lit-element";

export class Card extends LitElement {

  static get properties() {
    return {
      symbol: {
        type: String
      }
    }
  }

  render() {
    return html`
      <div>
       ${this.symbol} 
      </div>
    `;
  }
}