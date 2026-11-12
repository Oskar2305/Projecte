import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { AUTO, Game, Scale } from 'phaser';
import { Lobby } from './scenes/Lobby.js';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig


const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#040708',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        Boot,
        Lobby,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (divParent) => {

    return new Game({ ...config, divParent });

}

export default StartGame;
