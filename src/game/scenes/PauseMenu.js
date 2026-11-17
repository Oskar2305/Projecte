import * as Phaser from 'phaser';
export class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    init(data) {
        this.previousScene = data.previousScene;
    }

    create() {
        this.input.keyboard.on('keydown-ESC', () => {
            this.resumePreviousScene();
        });

        const { width, height } = this.scale;

        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x000000,
            0.6
        );

        this.add.text(width / 2, height / 2 - 100, 'PAUSA', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const resumeButton = this.add.text(
            width / 2,
            height / 2,
            'CONTINUAR',
            {
                fontSize: '28px',
                color: '#ffffff',
                backgroundColor: '#287a36',
                padding: { x: 20, y: 10 }
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        resumeButton.on('pointerdown', () => {
            this.resumePreviousScene();
        });
    }

    resumePreviousScene() {
        this.scene.stop();
        this.scene.resume(this.previousScene);
    }
}