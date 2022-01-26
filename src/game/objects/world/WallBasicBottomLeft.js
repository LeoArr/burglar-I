const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasicBottomLeft extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 0,
        y: 11
      })
    })
    this.blocks = true
  }
}

module.exports = WallBasicBottomLeft