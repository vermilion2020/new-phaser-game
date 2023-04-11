import Hero from "../objects/hero";

export const setMap = 
(
  scene: Phaser.Scene,
  mapAlias: string,
  tilesetName: string,
  tilesetAlias: string,
  hero: Hero
):
{
  map: Phaser.Tilemaps.Tilemap,
  interactiveLayers: Phaser.GameObjects.Group
} => {
  const interactiveLayers = scene.add.group();
  const map = scene.make.tilemap({ key: mapAlias });
  map.addTilesetImage(tilesetName, tilesetAlias);

  for (let i = 0; i < map.layers.length; i++) {
    const layer = map.createLayer(i, "Overworld", 0, 0);
    scene.physics.add.collider(hero, layer);
    if (map.layers[i].name === 'bush') {
      interactiveLayers.add(layer);
    }
  }
  return { map, interactiveLayers };
}