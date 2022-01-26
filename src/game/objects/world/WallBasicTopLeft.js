const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class WallBasicTopLeft extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 5,
        y: 9
      })
    })
    this.blocks = true
  }
}

module.exports = WallBasicTopLeft