const Sprite = require("../../Sprite");
const Key = require("../baseItem/Key");

class RustyKey extends Key {
  constructor(game, position, interactions) {
    super(
      game,
      position,
      interactions,
      new Sprite({
        tileset: 'dungeonTiles',
        x: 15,
        y: 12,
      }),
      "Rusty key",
      ["rusty"]
    )
  }
}

module.exports = RustyKey