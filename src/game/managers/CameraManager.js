export default class CameraManager {
    constructor(scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;
    }

    setup({
        zoom = 1,
        backgroundColor = '#87CEEB',
        bounds = true
    } = {}) {
        this.camera.setZoom(zoom);
        this.camera.setBackgroundColor(backgroundColor);

        if (bounds) {
            this.camera.setBounds(
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height
            );
        }
    }

    follow(target, lerpX = 0.1, lerpY = 0.1) {
        this.camera.startFollow(
            target,
            true,
            lerpX,
            lerpY
        );
    }

    setZoom(zoom) {
        this.camera.setZoom(zoom);
    }

    setBounds(x, y, width, height) {
        this.camera.setBounds(x, y, width, height);
    }

    stopFollow() {
        this.camera.stopFollow();
    }
}