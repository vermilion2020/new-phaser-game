import { Input, Scene } from 'phaser';
import { Directions, Sprites } from '../model';
import { createHeroAttackingAnimation, createHeroWalkingAnimation, setMap } from '../utils';
import Hero from '../objects/hero';

export default class MainScene extends Scene {
private gridEngine: any;
private hero?: Hero;
private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
private spaceBar!: Input.Keyboard.Key;

  constructor() {
    super('mainscene');
  }

  preload() {}

  create() {
    this.cursors = this.input?.keyboard?.createCursorKeys();
    this.spaceBar = this.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.hero = new Hero(this, 0, 0, Sprites.HERO, `walking-down-0.png`);

    const { map, interactiveLayers } = setMap(this, 'testmap', 'Overworld', 'tileset', this.hero);

    Object.values(Directions).forEach((d: string) => {
      createHeroWalkingAnimation(this, d);
      createHeroAttackingAnimation(this, d);
    });

    // init grid angine
    const gridEngineConfig = {
      characters: [
        {
          id: Sprites.HERO,
          sprite: this.hero,
          startPosition: { x: 8, y: 8 }
        }
      ]
    };

    this.gridEngine?.create(map, gridEngineConfig);

    this.physics.add.overlap(this.hero?.actionCollider, interactiveLayers, (objA, objB) => {
      const facingDirection = this.gridEngine?.getFacingDirection(Sprites.HERO);
      const t = [objA, objB].find((obj) => obj !== this.hero?.actionCollider);
      const tile = <Phaser.Tilemaps.TilemapLayer>t;
      if (Input.Keyboard.JustDown(this.spaceBar)) {
        this.hero?.setAttacking(true);
        this.hero?.anims.play(`attacking-${facingDirection}`);
        this.time.delayedCall(
            50,
            () => {
                tile.setVisible(false);
                console.log(tile.x, tile.y)
                map.removeTileAt(tile.x, tile.y)
            }
            
        );
      } 
    });

    // set movement frame updates and anims
    this.gridEngine?.movementStarted().subscribe(({ direction }: { direction: string }) => {
      this.hero?.anims.play(`walking-${direction}`);
    });

    this.gridEngine?.movementStopped().subscribe(({ direction }: { direction: string }) => {
      this.hero?.anims.stop();
      this.hero?.setFrame(`walking-${direction}-0.png`, false, false);
    });

    this.gridEngine?.directionChanged().subscribe(({ direction }: { direction: string }) => {
      this.hero?.setFrame(`walking-${direction}-0.png`, false, false);
    });

    this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setFollowOffset(-this.hero.width, -this.hero.height);
  }

  update() {
    const facingDirection = this.gridEngine?.getFacingDirection(Sprites.HERO);
    if (this.hero) {
      this.hero.updateHeroCollider(facingDirection);
    }

    if (Input.Keyboard.JustUp(this.spaceBar)) {
      this.hero?.setAttacking(false);
      this.hero?.setFrame(`walking-${facingDirection}-0.png`, false, false);
      this.hero?.anims.stop();
    }

    if (this.cursors?.left.isDown) {
      this.gridEngine.move(Sprites.HERO, Directions.LEFT);
    } else if (this.cursors?.right.isDown) {
      this.gridEngine.move(Sprites.HERO, Directions.RIGHT);
    } else if (this.cursors?.up.isDown) {
      this.gridEngine.move(Sprites.HERO, Directions.UP);
    } else if (this.cursors?.down.isDown) {
      this.gridEngine.move(Sprites.HERO, Directions.DOWN); 
    }   
  }
}