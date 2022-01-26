const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class FloorWoodLeft extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 17,
        y: 11
      })
    })
  }
}

module.exports = FloorWoodLeft