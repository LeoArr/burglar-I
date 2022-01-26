const C = require('./constants')
const Camera = require("./Camera")

class Renderer {
  constructor(game) {
    this.game = game
    this.loadedPercent = 0
    this.doneLoading = false
    this.tilesets = {
      dungeonTiles: {
        url: 'game/assets/tilesets/dungeon_tiles.png'
      }
    }
    this.fonts = {}
    this.camera = new Camera(game, game.player.getPosition())
  }

  loadAssets() {
    const fontsToLoad = ['alagard.ttf']
    const assetsToLoad = Object.keys(this.tilesets).length
      + fontsToLoad.length
    var loaded = 0

    fontsToLoad.forEach((font) => {
      this.fonts[font.split('.')[0]] = loadFont('game/assets/fonts/' + font, () => {
        this.loadedPercent = ++loaded / assetsToLoad
        console.log(`Loaded ${(this.loadedPercent * 100).toFixed(1)}% of assets.`)
      })
    })

    Object.keys(this.tilesets).forEach((tileset) => {
      loadImage(this.tilesets[tileset].url, (img) => {
        this.tilesets[tileset].image = img
        this.loadedPercent = ++loaded / assetsToLoad
        if (loaded === assetsToLoad) {
          this.doneLoading = true
        }
        console.log(`Loaded ${(this.loadedPercent * 100).toFixed(1)}% of assets.`)
      }, (err) => {
        console.error(err)
      })
    })
  }

  getTileset(tileset) {
    return this.tilesets[tileset] && this.tilesets[tileset].image
  }

  scale(value) {
    return value * this.camera.scaleValue
  }

  draw(sprite, position) {
    const destPos = this.camera.toCameraCoord(
      position.copy().add(sprite.offset)
    )
    image(
      this.getTileset(sprite.tileset),
      destPos.x, destPos.y,
      this.scale(sprite.tileWidth * C.TILE_WIDTH), // Dest width
      this.scale(sprite.tileHeight * C.TILE_HEIGHT), // Dest height
      sprite.x * C.TILE_WIDTH, // Source pos x
      sprite.y * C.TILE_HEIGHT, // Source pos y
      sprite.tileWidth * C.TILE_WIDTH, // Source width
      sprite.tileHeight * C.TILE_HEIGHT, // Source height
    )
  }

  drawAbsolute(sprite, position) {
    image(
      this.getTileset(sprite.tileset),
      position.x, position.y,
      this.scale(sprite.tileWidth * C.TILE_WIDTH), // Dest width
      this.scale(sprite.tileHeight * C.TILE_HEIGHT), // Dest height
      sprite.x * C.TILE_WIDTH, // Source pos x
      sprite.y * C.TILE_HEIGHT, // Source pos y
      sprite.tileWidth * C.TILE_WIDTH, // Source width
      sprite.tileHeight * C.TILE_HEIGHT, // Source height
    )
  }
}

module.exports = Renderer