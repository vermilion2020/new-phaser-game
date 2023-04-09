import { Scene } from 'phaser';

export default class Preloader extends Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tileset', 'tiles/Overworld.png');
    this.load.atlas('hero', 'tiles/hero_atlas.png', 'tiles/hero_atlas.json');
    this.load.tilemapTiledJSON('testmap', 'tiles/ttt.json');
  }

  create() {
    this.scene.start('mainscene');
  }
}