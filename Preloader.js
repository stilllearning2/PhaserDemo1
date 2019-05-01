class Preloader extends Phaser.Scene {
    constructor (config) {
        super(config);
    }
}

Preloader.prototype = {

    preload: function () {
        this.ready = false;
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    },

    update: function() {
        this.ready = true;
        this.scene.start('GameOne');
    }
}