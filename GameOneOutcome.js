GameName.GameOneOutcome = function () {
    this.finalScore;


}

GameName.GameOneOutcome.prototype.constructor = GameName.GameOneOutcome;

GameName.GameOneOutcome.prototype = {
    init: function (data) {
        this.finalScore = data.finalScore;
    },

    preload: function () {
        this.load.image('sky', 'assets/sky.png');
    },

    create: function () {
        // sky
        this.add.image(400, 300, 'sky');

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.setText('Your Final Score was ' + this.finalScore);
    }
}