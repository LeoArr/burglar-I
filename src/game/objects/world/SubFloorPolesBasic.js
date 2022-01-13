const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class SubFloorPolesBasic extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 0, y: 5
      })
    })
    this.blocks = true
  }
}

module.exports = SubFloorPolesBasic