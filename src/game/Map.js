const Player = require("./objects/Player")
const FloorBasic = require("./objects/world/FloorBasic")
const WallBasic = require("./objects/world/WallBasic")

class Map {
  constructor(game, mapData) {
    this.game = game
    this.mapData = mapData || DEFAULT_MAP
    this.objects = {}
    this.cachedObjectsArray = null
    this.populateObjects()
  }

  paintObject(paint, layer, position) {
    const data = paint.getData(position)
    if (!this.mapData[layer]) {
      this.mapData[layer] = []
    }
    this.mapData[layer].push(data)
    if (!this.objects[layer]) {
      this.objects[layer] = []
    }
    this.objects[layer].push(this.createObject(data))
    this.cachedObjectsArray = null
  }

  populateObjects() {
    this.cachedObjectsArray = null
    for (const layer of Object.keys(this.mapData)) {
      this.objects[layer] = this.mapData[layer].map((data) => this.createObject(data))
    }
  }

  getObjectsArray() {
    if (this.cachedObjectsArray) {
      return this.cachedObjectsArray
    }
    let result = []
    for (const layer of Object.keys(this.objects).sort()) {
      result = result.concat(this.objects[layer])
    }
    this.cachedObjectsArray = result
    return result
  }

  getObjectsAtPosition(position) {
    return this.getObjectsArray().filter((object) => object.getPosition().equals(position))
  }

  createObject(data) {
    switch(data.type) {
      case 'FloorBasic': {
        return new FloorBasic(this.game, createVector(data.x, data.y))
        break
      }
      case 'WallBasic': {
        return new WallBasic(this.game, createVector(data.x, data.y))
        break
      }
      case 'Player': {
        return new Player(this.game, createVector(data.x, data.y))
        break
      }
      default: {
        console.error('No such object: ' + data.type)
      }
    }
  }
}

const DEFAULT_MAP = {
  0: [
    {
      type: 'FloorBasic',
      x: 0,
      y: 0,
    },
    {
      type: 'WallBasic',
      x: -1,
      y: 0,
    }
  ],
  100: [
    {
      type: 'Player',
      x: 0,
      y: 0,
    }
  ]
}

module.exports = Map