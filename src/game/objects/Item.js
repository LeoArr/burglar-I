const GameObject = require("../GameObject");

class Item extends GameObject {
  constructor(game, position, interactions, sprite, title) {
    super({
      game,
      position,
      interactions,
      sprite,
    })
    this.title = title

    this.interactions.push({
      owner: this,
      type: "function",
      name: "addToInventory"
    })
  }

  addToInventory() {
    this.game.player.inventory.add(this)
    this.remove()
  }
}

module.exports = Item