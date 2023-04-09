import { GameObjects } from "phaser";
import { Directions } from "../model";

export type HeroCollider = GameObjects.Rectangle  & { iSCustomCollider?: boolean };

export const updateHeroCollider = (collider: HeroCollider, hero: Phaser.Physics.Arcade.Sprite, facingDirection: any)=> {
  switch (facingDirection) {
    case Directions.DOWN: {
        collider.setX(hero.x);
        collider.setY(hero.y + 44);

        break;
    }

    case Directions.UP: {
        collider.setX(hero.x);
        collider.setY(hero.y + 26);

        break;
    }

    case Directions.LEFT: {
        collider.setX(hero.x - 16);
        collider.setY(hero.y + 28);

        break;
    }

    case Directions.RIGHT: {
        collider.setX(hero.x + 16);
        collider.setY(hero.y + 28);

        break;
    }

    default: {
        break;
    }
  }
} 