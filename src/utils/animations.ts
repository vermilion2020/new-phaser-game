export const createHeroWalkingAnimation = (scene: Phaser.Scene, direction: string) => {
  scene.anims.create({
    key: `walking-${direction}`,
    frames: [
      { key: 'hero', frame: `walking-${direction}-1.png` },
      { key: 'hero', frame: `walking-${direction}-2.png` },
      { key: 'hero', frame: `walking-${direction}-3.png` },
    ],
    showOnStart: false,
    frameRate: 8,
    repeat: -1,
    yoyo: true
  });
}

export const createHeroAttackingAnimation = (scene: Phaser.Scene, direction: string) => {
  scene.anims.create({
    key: `attacking-${direction}`,
    frames: [
      { key: 'hero', frame: `attacking-${direction}-0.png` },
      { key: 'hero', frame: `attacking-${direction}-1.png` },
      { key: 'hero', frame: `attacking-${direction}-2.png` },
      { key: 'hero', frame: `attacking-${direction}-3.png` },
    ],
    showOnStart: false,
    frameRate: 8,
    repeat: -1,
    yoyo: false
  });
}