import { CHARACTER_ASSETS, ASSET_KEYS } from './assets';
import * as Phaser from 'phaser';

export class Character extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, ControlsManager) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 50;

        this.controlsManager = ControlsManager;
    }

    update() {

    }
}

export default Character;