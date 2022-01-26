const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class FloorWoodBasic extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 18,
        y: Math.floor(Math.random() * 3 + 11),
      })
    })
  }
}

module.exports = FloorWoodBasic