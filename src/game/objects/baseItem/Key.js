const Item = require("../Item");

class Key extends Item {
  constructor(game, position, interactions, sprite, title, keyIds) {
    super(
      game,
      position,
      interactions,
      sprite,
      title,
    )
    // Eg. red or blue or purple
    this.keyIds = keyIds
  }
}

module.exports = Key