const GameObject = require("../../GameObject");
const Sprite = require("../../Sprite");

class BridgeBasicHorizontal extends GameObject {
  constructor(game, position) {
    super({
      game,
      position,
      sprite: new Sprite({
        tileset: 'dungeonTiles',
        x: 9,
        y: 3,
        tileWidth: 2,
        offset: createVector(-2 / 16, 0)
      })
    })
  }
}

module.exports = BridgeBasicHorizontal