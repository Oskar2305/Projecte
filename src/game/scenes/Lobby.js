import * as Phaser from 'phaser';
import { LOBBY_ASSETS, ASSET_KEYS, CHARACTER_ASSETS } from '../assets.js';
import CameraManager from '../managers/CameraManager.js';
import { Character } from '../Character.js';

export class Lobby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
        console.log("Se ha creado el lobby!");
    }

    preload() {
        LOBBY_ASSETS.forEach((asset) => {
            this.load.image(asset.assetKey, asset.path);           
        });

        CHARACTER_ASSETS.forEach((asset) => {
            this.load.image(asset.assetKey, asset.path);
        });
    }

    create() {
        // Configurar la cámara
        this.cameraManager = new CameraManager(this);

        this.cameraManager.setup({
            zoom: 1,
            backgroundColor: '#87CEEB',
            bounds: {
                x: this.width / 2,
                y: this.height / 2,
                width: 1000,
                height: 600
            }
        });

        // Ejemplo: seguir al jugador si ya está creado
        //this.cameraManager.follow(this.player);

        const { width, height } = this.scale;

        let fondoCesped = this.add.image(width / 2, height / 2, ASSET_KEYS.BACKGROUND);
        fondoCesped.setDisplaySize(width, height);

        this.player = new Character(this, width / 2, height / 2, ASSET_KEYS.CHARACTER);
        this.player.setDisplaySize(50, 100);

    }

}

