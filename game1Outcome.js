
var game1Outcome = function (game) {
    this.newScore;
    this.topScores;
    this.title;
    this.scoreDisplay;

}

game1.prototype = {

    init: function (data) {
        this.newScore = data.currentScore;
    },

    create: function () {
        game.stage.backgroundColor = '#4488AA'
        title = this.add.text(16, 16, 'Top Scores', { fontSize: '32px', fill: '#0f0' });
        topScores[0] = this.newScore;
        for (let i = 1; i < 9; i++) {
            topScores[i] = (Math.floor(Math.random() * 30) + 1) * 10
        }
        topScores.sort();

        for (let i = 1; i < 9; i++) {
            if (topScores[i] = newScore) {
                scoreDisplay = this.add.text(16, 100 + i * 30, 'score: = ' + topScores[i], { fontSize: '32px', fill: '#0f0' });
            } else {
                scoreDisplay = this.add.text(16, 100 + i * 30, 'score: = ' + topScores[i], { fontSize: '32px', fill: '#000' });
            }
        }
    }
}

