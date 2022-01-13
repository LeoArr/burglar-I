const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class DoorBasicClosed extends GameObject {
  constructor(game, position, interactions) {
    super({
      game,
      position,
      interactions,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 8,
        y: 12,
      }),
    })
    this.blocks = true
  }
}

module.exports = DoorBasicClosed