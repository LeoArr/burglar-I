const GameObject = require("../../GameObject");

class Door extends GameObject {
  constructor(
      game,
      position,
      interactions,
      sprite,
      locked,
      lockedText,
      keyIds
      ) {
    super({
      game,
      position,
      interactions,
      sprite
    })
    this.locked = locked || true
    this.lockedText = lockedText
    this.keyIds = keyIds
    this.blocks = locked

    this.interactions.push({
      owner: this,
      type: "function",
      name: "door"
    })
  }

  door() {
    if (!this.locked) return
    const validKeys = this.game.player.inventory.items.filter((item) => item.keyIds && item.keyIds.some((id) => this.keyIds.includes(id)))
    if (validKeys.length) {
      this.locked = false
      this.blocks = false
      this.game.gameMode.addEvent({
        type: "text",
        text: "Door opens"
      })
    } else {
      this.game.gameMode.addEvent({
        type: "text",
        text: this.lockedText
      })
    }
  }
}

module.exports = Door