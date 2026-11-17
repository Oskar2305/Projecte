import { CHARACTER_ASSETS, ASSET_KEYS } from './assets';
import * as Phaser from 'phaser';

export class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, ControlsManager, tileSize = 32) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 100;

        this.controlsManager = ControlsManager;

        // 1. Calculamos el factor de escala exacto para que mida 1 casilla de ancho (32px)
        // Si la imagen mide 177px, scale será: 32 / 177 = 0.1807
        const scale = tileSize / this.width;
        this.setScale(scale);

        // 2. Configuramos la hitbox sobre los píxeles ORIGINALES (177x351)
        // Phaser multiplicará automáticamente estas medidas por el 'scale' de arriba
        const hitWidth = this.width * 0.6;    // ~106px originales -> ~19px en pantalla
        const hitHeight = this.height * 0.25; // ~88px originales  -> ~16px en pantalla

        this.body.setSize(hitWidth, hitHeight);

        // 3. Centramos en X y bajamos a los pies en Y (en coordenadas originales)
        const offsetX = (this.width - hitWidth) / 2;
        const offsetY = this.height - hitHeight;

        this.body.setOffset(offsetX, offsetY);

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