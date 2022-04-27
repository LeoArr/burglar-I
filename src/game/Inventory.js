class Inventory {
  constructor(game, items) {
    this.game = game
    this.items = items || []
  }

  add(item) {
    this.items.push(item)
  }

  draw() {
    this.items.forEach((item, index) => {
      this.game.renderer.drawAbsolute(item.sprite, createVector(index, 0))
    });
  }
}

module.exports = Inventory