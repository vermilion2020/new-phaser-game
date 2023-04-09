import { GameObjects } from "phaser";

export const createInteractiveGameObject = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  name: string,
  origin = { x: 0, y: 1 }
) => {
  const customCollider: GameObjects.Rectangle & { iSCustomCollider?: boolean } = new GameObjects.Rectangle(
    scene,
    x,
    y,
    width,
    height,
  ).setOrigin(origin.x, origin.y);

  customCollider.name = name;
  customCollider.iSCustomCollider = true;

  scene.physics.add.existing(customCollider);
  const body = <Phaser.Physics.Arcade.Body>customCollider.body;
  body.setAllowGravity(false);
  body.setImmovable(true);

  return customCollider;
}