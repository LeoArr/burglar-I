const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasic extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({ tileset: 'dungeonTiles', x: 0, y: 10 })
    })
    this.blocks = true
  }
}

module.exports = WallBasic