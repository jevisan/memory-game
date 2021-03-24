import { html, fixture, expect, waitUntil, oneEvent } from '@open-wc/testing';

import '../memory-game.js';

describe('MemoryGame', () => {
  it('setting initial values', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    expect(el.player1.name).to.equal('Player 1');
    expect(el.player2.name).to.equal('Player 2');
    expect(el.player1.score).to.equal(0);
    expect(el.player2.score).to.equal(0);
    expect(el.currentPlayer).to.equal(el.player1);
    expect(el.playSet.length).to.equal(30);
  });
  
  it('handdling a turn without a pair', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const board = el.shadowRoot.getElementById('board');
    const cardsWrapper = board.getElementsByClassName('cards-wrapper')[0];
    const cards = cardsWrapper.getElementsByTagName('card-memory');

    const card = cards[0];
    let card2 = cards[1];
    let i = 0;
    while (card.symbol === card2.symbol) {
      card2 = cards[i + 1];
      i ++;
    }

    const currentPlayerCard = el.getPlayerCard('active');
    el.handdlePlay({
      target: card
    });
    expect(el.revealedCard1).to.equal(card);
    el.handdlePlay({
      target: card2
    });
    await oneEvent(currentPlayerCard, 'toggle-active');
    expect(el.currentPlayer).to.equal(el.player2);
  }).timeout(3000);
  
  it('handdling a turn with a pair', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const board = el.shadowRoot.getElementById('board');
    const cardsWrapper = board.getElementsByClassName('cards-wrapper')[0];
    const cards = cardsWrapper.getElementsByTagName('card-memory');

    const card = cards[0];
    let card2 = cards[1];
    let i = 0;
    while (card.symbol != card2.symbol) {
      card2 = cards[i + 1];
      i ++;
    }

    const currentPlayerCard = el.getPlayerCard('active');
    el.handdlePlay({
      target: card
    });
    expect(el.revealedCard1).to.equal(card);
    el.handdlePlay({
      target: card2
    });
    await oneEvent(currentPlayerCard, 'increment-score');
  }).timeout(3000);

  it('passing turns', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    el.passTurn();
    expect(el.currentPlayer).to.equal(el.player2);
    el.passTurn();
    expect(el.currentPlayer).to.equal(el.player1);
  });

  it('clicking a card', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const board = el.shadowRoot.getElementById('board');
    const cardsWrapper = board.getElementsByClassName('cards-wrapper')[0];
    const cards = cardsWrapper.getElementsByTagName('card-memory');

    const card = cards[0];
    const prom = oneEvent(card, 'card-selected');
    card.__onClick();
    await prom;
  });
});
