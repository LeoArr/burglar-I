const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class FloorWoodRight extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 19,
        y: 11
      })
    })
  }
}

module.exports = FloorWoodRight