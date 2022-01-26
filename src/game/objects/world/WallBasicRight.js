const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasicRight extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 4,
        y: Math.floor(Math.random() * 3 + 8)
      })
    })
    this.blocks = true
  }
}

module.exports = WallBasicRight