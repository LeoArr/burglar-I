const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class FloorBasicLeftFrame extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 0,
        y: Math.floor(Math.random() * 3 + 1),
      })
    }
    )
  }
}

module.exports = FloorBasicLeftFrame