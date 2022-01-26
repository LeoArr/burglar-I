const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class StairBasicVerticalDown extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 12,
        y: 0,
      })
    })
  }
}

module.exports = StairBasicVerticalDown