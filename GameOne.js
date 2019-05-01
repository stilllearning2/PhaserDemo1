var GameName = {};

GameName.GameOne = function() {
    this.platforms;
    this.player;
    this.stars;
    this.bombs;
    this.score = 0;
    this.scoreText ='';
    this.cursors;
    this.gameOver = false;
}

GameName.GameOne.prototype.constructor = GameName.GameOne;

GameName.GameOne.prototype = {

    preload: function () {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }, // end of preload



    create: function () {

        // sky
        this.add.image(400, 300, 'sky');

        // ground
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // player sprite
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, platforms);
        cursors = this.input.keyboard.createCursorKeys();

        // stars
        let stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(this.player, stars, collectStar, null, this);
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // bombs
        let bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(this.player, bombs, hitBomb, null, this);

        function collectStar(player, star) {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            if (stars.countActive(true) === 0) {
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        }

        function hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            gameOver = true;
            this.scene.start('gameOneOutcome', { finalScore: this.score });
        }
    }, // end of create

    update: function () {
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    } // end of update
}