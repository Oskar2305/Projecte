class ControlsManager {
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
            left: this.cursors.left.isdown || this.wasd.left.isdown,
            right: this.cursors.right.isdown || this.wasd.right.isdown,
            up: this.cursors.up.isdown || this.wasd.up.isdown,
            down: this.cursors.down.isdown || this.wasd.down.isdown
        };
    }

}