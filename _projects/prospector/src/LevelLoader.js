import MineEntrance from './sprites/MineEntrance'
import Blocker from './sprites/Blocker'

export default class LevelLoader {
  static get ObjMapper()
  {
    return {
      'MineEntrance' : MineEntrance,
      'Blocker': Blocker,
      'MinerStart' : (game, x, y) => { this.x = x; this.y = y;}
    }
  }

  get game() {
    return this._game;
  }

  get map() {
    return this._map;
  }

  get playerStart() {
    return this._playerStart;
  }

  get collidables() {
    return this._collidables;
  }

  get onLayerLoaded() {
    return this._onLayerLoaded;
  }

  get layerObjects() {
    return this._layerObjects;
  }

  constructor(game) {
    this._game = game
    this._playerStart = new PIXI.Point();
    this._onLayerLoaded = new Phaser.Signal();
    this.layers = [];
    this._layerObjects = {};

    // parent, name, addToStage, enableBody, physicsBodyType
  }

  loadMap(name) {
    this._map = game.add.tilemap(name);
    // Load all layers
    this._loadAllLayers();
    this._loadTilesetsFromCache()

    return this._map
  }

  _loadTilesetsFromCache() {
    this.map.tilesets.forEach( (ts) => {
      const name = ts.name
      // tilesetName, key
      this._map.addTilesetImage(name, name);
    })
  }

  _loadAllLayers() {
    this._map.layers.forEach((layer, index) =>{
      //createLayer(layer [, width] [, height] [, group])
      this._layerObjects[layer.name] = this.game.add.group();
      let newLayer = this.map.createLayer(index, null, null, this._layerObjects[layer.name]);
      newLayer.visible = false;
      this.layers.push(newLayer);
    })
  }

  loadLayer(name, setPlayerCoordinates=false) {
    const SCALE = 3;
    let map = this.map;
    const game = this.game;

    if(this.collidables) {
      this.collidables.destroy();
    }

    if(this.layer) {
      this._layerObjects[this.layer.layer.name].visible = false;
      this.layer.visible = false;
    }

    this.layer = this.layers.find((layer)=>{
      return layer.layer.name == name;
    })
    this._layerObjects[this.layer.layer.name].visible = true;
    this.layer.visible = true;

    this.map.setLayer(this.layer);

    this.layer.setScale(SCALE);
    this.layer.resizeWorld();

    if(setPlayerCoordinates) {
      let x = this.layer.layer.properties.PlayerStartX*SCALE;
      let y = this.layer.layer.properties.PlayerStartY*SCALE;
      this._setPlayerStart(x, y);
    }

    this._collidables = game.add.group(this.game.world, 'collidables', false, true, Phaser.Physics.ARCADE);

    this._loadLayerObjects(name)

    this.layer.sendToBack();
    this.onLayerLoaded.dispatch();

    this.setupPhysics()
  }

  _loadLayerObjects(layerName) {
    const SCALE = 3;
    const map = this.map;
    const game = this.game;
    let layerObjects = map.objects[layerName + ' Objects'];
    let mapObjInstance = null;
    let properties = {};
    let x, y;

    layerObjects.forEach( (obj, index, array) => {
      properties = obj.properties || {}

      // TODO: get center of obj for placement.
      console.log(obj.type, obj)

      x = obj.x * SCALE
      y = obj.y * SCALE
      properties.width  = obj.width * SCALE
      properties.height = obj.height * SCALE

      if (obj.type === 'MineEntrance') {
        mapObjInstance = new MineEntrance(game, x, y, properties);
        mapObjInstance.onTransition.add((properties) => {
          this._setPlayerStart(properties.TransportX *SCALE, properties.TransportY*SCALE);
          this.loadLayer(properties.LayerName)
        })
      } else {
        mapObjInstance = new LevelLoader.ObjMapper[obj.type](game, x, y, properties);
      }

      if(mapObjInstance.isCollidable) {
        this.collidables.add(mapObjInstance);
        //console.log("collidables", this.collidables.children)
      } else {
        game.add.existing(mapObjInstance);
      }
    })
  }

  _setPlayerStart(x, y) {
    console.log(`Setting player start: (${x}, ${y})`)
    this.playerStart.set(x,y);
  }

  setupPhysics() {
    this.collidables.forEach( (c) => c.setupPhysics() )
  }
}
