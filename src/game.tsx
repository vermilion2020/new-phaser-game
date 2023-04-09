import { useState, useEffect } from "react";
import { Game as GameType } from 'phaser';

const GameComponent = () => {
  const [game, setGame] = useState<GameType | null>(null);
  const dialogMessages = useState([]);
  const menuItems = useState([]);
  const gameTexts = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import('phaser');
      const { default: GridEngine } = await import('grid-engine');
      const { default: Preloader } = await import('./scenes/Preloader');
      const { default: MainScene } = await import('./scenes/MainScene');

      const phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'game-content',
        title: 'game title',
        width: 400,
        height: 300,
        pixelArt: true,
        scale: {
          zoom: 2
        },
        physics: {
          default: 'arcade',
          arcade: {
            debug: true
          }
        },
        plugins: {
          scene: [
            {
              key: 'gridEngine',
              plugin: GridEngine, 
              mapping: 'gridEngine'
            }
          ]
        },
        backgroundColor: '#000000',
        scene: [
          Preloader,
          MainScene
        ], 
      });
      setGame(phaserGame);
    };
    if (!game)initPhaser();
  }, []);
  document.getElementsByTagName('canvas')[1]?.remove();
  return (
    <>
      <div id="game-content" key="game-content"></div>
    </>
  );
}
export default GameComponent;