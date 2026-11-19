export class WindowManager {

    constructor(scene) {
        this.scene = scene;
    }

    onClickOutsideCanvas(callback) {

        const handler = (event) => {

            // Comprobamos si el clic se ha producido fuera del canvas
            if (!this.scene.game.canvas.contains(event.target)) {
                callback(event);
            }
        };

        document.addEventListener('pointerdown', handler);

        // Limpiamos el evento cuando la escena se detenga
        this.scene.events.once('shutdown', () => {
            document.removeEventListener('pointerdown', handler);
        });
    }
}

export default WindowManager;