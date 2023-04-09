import { Directions } from "../model";
import { HeroCollider, createInteractiveGameObject } from "../utils";

class Hero extends Phaser.Physics.Arcade.Sprite {
  private collider: HeroCollider;
  private _isAttacking = false;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
    super(scene, x, y,  texture, frame);
    this.scene.add.existing(this);
    this.collider = createInteractiveGameObject(scene, x, y, 16, 16,'attack'); 
  }

  get actionCollider() {
    return this.collider;
  }

  get isAttacking() {
    return this._isAttacking;
  }

  setAttacking(val: boolean) {
    this._isAttacking = val;
  }

  updateHeroCollider(facingDirection: Directions) {
    switch (facingDirection) {
      case Directions.DOWN: {
        this.collider.setX(this.x);
        this.collider.setY(this.y + 44);
        break;
      }
  
      case Directions.UP: {
        this.collider.setX(this.x);
        this.collider.setY(this.y + 26);
        break;
      }
  
      case Directions.LEFT: {
        this.collider.setX(this.x - 16);
        this.collider.setY(this.y + 28);
        break;
      }
  
      case Directions.RIGHT: {
        this.collider.setX(this.x + 16);
        this.collider.setY(this.y + 28);
        break;
      }
  
      default: {
          break;
      }
    }
  } 
  
}

export default Hero;