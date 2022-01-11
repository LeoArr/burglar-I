const GameObject = require("../../GameObject");
const wallBasicSprite = require("../../sprites/wallBasicSprite");

class WallBasic extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: wallBasicSprite()
    })
    this.blocks = true
  }
}

module.exports = WallBasic