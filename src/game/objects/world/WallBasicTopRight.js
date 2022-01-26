const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasicTopRight extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 5,
        y: 8
      })
    })
    this.blocks = true
  }
}

module.exports = WallBasicTopRight