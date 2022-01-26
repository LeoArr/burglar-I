const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasicBottomRight extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 4,
        y: 11
      })
    })
    this.blocks = true
  }
}

module.exports = WallBasicBottomRight