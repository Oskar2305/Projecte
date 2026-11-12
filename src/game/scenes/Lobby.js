import * as Phaser from 'phaser';
import { LOBBY_ASSETS, ASSET_KEYS, CHARACTER_ASSETS } from '../assets.js';
import CameraManager from '../managers/CameraManager.js';
import { Character } from '../Character.js';
import { ControlsManager } from '../managers/ControlsManager.js'

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

        this.obstacles = this.physics.add.staticGroup();
        // Configurar la cámara
        const TILE_SIZE = 32;
        const mapaColumnas = 20; // Cuántas casillas de ancho quieres que tenga tu mapa
        const mapaFilas = 20;    // Cuántas casillas de alto quieres que tenga tu mapa

        // Calculamos las dimensiones lógicas en base a los tiles
        const widthBackground = TILE_SIZE * mapaColumnas;  // 32 * 20 = 640px
        const heightBackground = TILE_SIZE * mapaFilas;   // 32 * 20 = 640px

        this.cameraManager = new CameraManager(this);
        //const texture = this.textures.get(ASSET_KEYS.BACKGROUND);
        //const sourceImage = texture.getSourceImage();
        //const widthBackground = sourceImage.width;
        //const heightBackground = sourceImage.height;

        //Adaptar lienzo al tamaño de la imagen
        this.scale.resize(widthBackground, heightBackground);

        this.cameraManager.setup({
            zoom: 2,
            backgroundColor: '#87CEEB',
            bounds: {
                x: 0,
                y: 0,
                width: widthBackground,
                height: heightBackground
            }
        });



        this.physics.world.setBounds(0, 0, widthBackground, heightBackground);

        let fondoCesped = this.add.image(0, 0, ASSET_KEYS.BACKGROUND).setOrigin(0, 0);
        fondoCesped.setDisplaySize(widthBackground, heightBackground);
        this.controlsManager = new ControlsManager(this);

        this.player = new Character(
            this,
            widthBackground / 2,
            heightBackground / 2,
            ASSET_KEYS.CHARACTER,
            this.controlsManager);
        this.player.setDisplaySize(TILE_SIZE * 0.5, TILE_SIZE * 1);

        /** @type {Phaser.Physics.Arcade.Sprite} */ //
        let rockObstacle = this.obstacles.create(TILE_SIZE * 5, TILE_SIZE * 3, ASSET_KEYS.ROCK)
        this.cameraManager.follow(this.player);

        rockObstacle.setDisplaySize(TILE_SIZE, TILE_SIZE);
        rockObstacle.refreshBody();

        this.physics.add.collider(this.player, this.obstacles);


    }
    update() {
        this.player.update();
    }

}

