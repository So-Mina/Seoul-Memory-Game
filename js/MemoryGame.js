export default class MemoryGame {
  constructor(cards) {
    this.cards = cards,
    this.pickedCards = []
  }

  shuffleCards() {
    if (!this.cards) {
      return undefined
    }

    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * this.cards.length);
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }

    return this.cards
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++

    if (card1 === card2) {
      this.pairsGuessed++
      return true
    } else {
      return false
    }
  }

  checkIfFinished() {
    if (this.pairsGuessed === (this.cards.length / 2)) {
      return true
      } else {
      return false
      }
  }

}

