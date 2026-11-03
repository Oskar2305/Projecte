import * as Phaser from 'phaser';
import { ASSET_KEYS } from '../assets.js';
import CameraManager from '../managers/CameraManager.js';

export class Lobby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
        console.log("Se ha creado el lobby!");
    }

    preload() {

        this.load.image(ASSET_KEYS.BACKGROUND, "/assets/Cesped.jpeg");
    }

    create() {
        // Configurar la cámara
        this.cameraManager = new CameraManager(this);

        this.cameraManager.setup({
            zoom: 2,
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
    }

}

