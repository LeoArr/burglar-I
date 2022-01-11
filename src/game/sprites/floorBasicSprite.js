const Sprite = require("../Sprite");

module.exports = () => new Sprite({
  tileset: 'dungeonTiles',
  x: Math.floor(Math.random() * 3 + 1),
  y: Math.floor(Math.random() * 3 + 1),
})