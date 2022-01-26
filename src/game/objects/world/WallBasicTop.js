const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasicTop extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: Math.floor(Math.random() * 3 + 1),
        y: 8
      })
    })
    this.blocks = true
  }
}

module.exports = WallBasicTop