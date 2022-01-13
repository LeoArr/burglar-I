const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class FloorBasicTopFrame extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: Math.floor(Math.random() * 3 + 1),
        y: 0,
      })
    }
    )
  }
}

module.exports = FloorBasicTopFrame