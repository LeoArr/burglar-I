const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class DoorBasicOpen extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 7,
        y: 12,
      })
    })
  }
}

module.exports = DoorBasicOpen