const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class DoorBasicBarred extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 9, y: 12
      })
    })
    this.blocks = true
  }
}

module.exports = DoorBasicBarred