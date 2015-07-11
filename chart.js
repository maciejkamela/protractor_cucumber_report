var chart = {

    drawdountChart: function (canvas) {
    this.x , this.y , this.radius , this.lineWidth , this.from , this.to = null;
    this.set = function (x, y, radius, from, to, lineWidth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.from = from;
        this.to = to;
        this.lineWidth = lineWidth;
    }
    this.draw = function (data) {
        canvas.beginPath();
        canvas.lineWidth = this.lineWidth;
        canvas.arc(this.x, this.y, this.radius, this.from, this.to);
        canvas.stroke();
        var numberOfParts = data.numberOfParts;
        var parts = data.parts.pt;
        var colors = data.colors.cs;
        var df = 0;
        for (var i = 0; i < numberOfParts; i++) {
            canvas.beginPath();
            canvas.strokeStyle = colors[i];
            canvas.arc(this.x, this.y, this.radius, df, df + (Math.PI * 2) * (parts[i] / 100));
            canvas.stroke();
            df += (Math.PI * 2) * (parts[i] / 100);
        }
    }
},
    getStatistics:function() {
    var scenarioPassed = document.querySelectorAll('.scenario.passed').length,
        scenarioFailed = document.querySelectorAll('.scenario.failed').length,
        scenariosAmount = document.querySelectorAll('.scenario').length,
        passed = (scenarioPassed / scenariosAmount) * 100,
        failed = (scenarioFailed / scenariosAmount) * 100,
        statistics;
        statistics = {
            scenariosAmount: scenariosAmount,
            passed: passed,
            failed: failed
    };
    return statistics;
}

}