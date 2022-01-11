const GameObject = require("../../GameObject");
const floorBasicSprite = require("../../sprites/floorBasicSprite");

class FloorBasic extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: floorBasicSprite()
    }
    )
  }
}

module.exports = FloorBasic