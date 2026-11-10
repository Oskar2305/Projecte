import * as Phaser from "phaser";
export class ControlsManager {
    constructor(scene) {
        this.scene = scene;
        // Creamos las teclas flechas
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Añadimos WASD por si quieres dar soporte extra
        this.wasd = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    getMovement() {
        return {
            left: this.cursors.left.isDown || this.wasd.left.isDown,
            right: this.cursors.right.isDown || this.wasd.right.isDown,
            up: this.cursors.up.isDown || this.wasd.up.isDown,
            down: this.cursors.down.isDown || this.wasd.down.isDown
        };
    }

}

export default ControlsManager;