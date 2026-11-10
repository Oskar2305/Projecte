import { CHARACTER_ASSETS, ASSET_KEYS } from './assets';
import * as Phaser from 'phaser';

export class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, ControlsManager) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 100;

        this.controlsManager = ControlsManager;
    }

    update() {
        const move = this.controlsManager.getMovement();

        let velocity = new Phaser.Math.Vector2(0, 0);

        if (move.left) {
            velocity.x = -1;
            this.setFlipX(true);
        } else if (move.right) {
            velocity.x = 1;
            this.setFlipX(false);
        }

        if (move.up) {
            velocity.y = -1;
            // HA DE MIRA PARA ARRIBA CAMBIANDO EL DISEÑO
        } else if (move.down) {
            velocity.y = 1;
        }

        velocity.normalize().scale(this.speed);

        this.setVelocity(velocity.x, velocity.y);
    }
}

export default Character;