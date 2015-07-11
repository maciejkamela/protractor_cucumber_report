window.onload = function () {
    var errors = document.querySelectorAll('.step.failed'),
        filtering_btn = document.getElementsByClassName('btn'),
        scenarios = document.querySelectorAll('.scenario-container'),
        display_btn = document.querySelector('.display'),
        all_btn = document.querySelector('.all_btn'),
        steps = document.querySelectorAll('.step'),
        close_btn = document.querySelector('.close_chart'),
        displayChart_btn = document.querySelector('.generate_chart');
    /** Displaying detailed information about failed step */
    for (var i = 0; i < errors.length; i++) {
        errors[i].onclick = function (e) {
            e.stopPropagation();
            var display = this.querySelector('.error-details').style.display;
            if (display === 'block') {
                this.querySelector('.error-details').style.display = 'none';
            } else {
                this.querySelector('.error-details').style.display = 'block';
            }
        }
    }
    /** Displaying and hiding steps */
    for (var i = 0; i < scenarios.length; i++) {
        scenarios[i].onclick = function () {
            var steps = this.querySelectorAll('.step');
            for (var k = 0; k < steps.length; k++) {
                if (steps[k].style.display === 'block') {
                    steps[k].style.display = 'none';
                } else {
                    steps[k].style.display = 'block';
                }
            }
        }
    }
    for (var k = 0; k < filtering_btn.length; k++) {
        filtering_btn[k].onclick = function () {
            var btnState = this.dataset.state;
            if (btnState !== 'all') {
                removeClass(filtering_btn);
                this.classList.add('active');
                filterScenarios(btnState);
            } else {
                removeClass(filtering_btn);
                this.classList.add('active');
                displayAllScenarios();
            }
        }
    }
    /*
     * @param string buttonsList indicate the group of buttons that have the "active" class name
     *
     * Removing "active" class from all buttons except for the active one
     */
    function removeClass(buttonsList) {
        for (var j = 0; j < buttonsList.length; j++) {
            buttonsList[j].classList.remove('active');
        }
    }

    /** Hide all scenario's steps */
    function displaySteps() {
        removeClass(filtering_btn);
        this.classList.add('active');
        for (var i = 0; i < steps.length; i++) {
            var display = steps[i].style.display;
            if (display === 'none' || display === '') {
//                        this.classList.add('active');
                steps[i].style.display = 'block';
            } else {
//                        removeClass(filtering_btn);
                all_btn.classList.add('active');
                steps[i].style.display = 'none';
            }
        }
    }

    /** Filtering scenarios */
    function filterScenarios(buttonState) {
        var scenarios = document.querySelectorAll('.scenario');
        for (var i = 0; i < scenarios.length; i++) {
            var hasClass = scenarios[i].classList.contains(buttonState);
            if (hasClass === true) {
                if (scenarios[i].parentNode.style.display === 'none') {
                    scenarios[i].parentNode.style.display = 'block';
                }
            } else {
                scenarios[i].parentNode.style.display = 'none';
            }
        }
    }

    /** Displaying all scenarios */
    function displayAllScenarios() {
        for (var i = 0; i < scenarios.length; i++) {
            if (scenarios[i].style.display != 'block') {
                scenarios[i].style.display = 'block';
            }
        }
    }

    /** Displaying all steps within scenarios */
    display_btn.onclick = displaySteps;

    /** ================================================================================== */

    /** Drawing report's chart */
    var canvas = document.getElementById("chart"),
        chart = canvas.getContext("2d"),
        statistics = getStatistics(),
        data = {
            numberOfParts: statistics.scenariosAmount,// total amount of scenarios
            parts: {"pt": [statistics.passed, statistics.failed]},//percentage of each parts
            colors: {"cs": ["#73c904", "#c90417"]}//color of each part
        };

    function DrawdountChart(canvas) {
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
    }

    function getStatistics() {
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

    var drawDount = new DrawdountChart(chart);
    drawDount.set(200, 200, 130, 0, Math.PI * 2, 70, "blue");
    drawDount.draw(data);
    /** Finding mouse position*/
    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return {x: curleft, y: curtop};
        }
        return undefined;
    }

    /** Transforming RGB colors to Hex */
    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    canvas.onmousemove = function (e) {
        var pos = findPos(this),
            x = e.pageX - pos.x,
            y = e.pageY - pos.y,
            c = this.getContext('2d'),
            p = c.getImageData(x, y, 1, 1).data,
            hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        /** Displaying text inside donout chart*/
        var a = 200;
        var b = 200;
//                var text = hex;
        chart.font = '30pt Calibri';
        chart.textAlign = 'center';
        chart.fillStyle = 'blue';
        var statistics = getStatistics();
        var passed = statistics.passed;
        var passedRound = Math.round(passed) + "%";
        var failed = statistics.failed;
        var failedRound = Math.round(failed) + "%";
        chart.clearRect(120, 150, 150, 90);
        if (hex === data.colors.cs[0]) {
            chart.fillText(passedRound, a, b);
        } else if (hex === data.colors.cs[1]) {
            chart.fillText(failedRound, a, b);
        } else {
            chart.fillText("", a, b);
        }
        chart.textBaseline = 'middle';
    }
    /** Close module with scenario chart using close button on chart module */
    close_btn.onclick = function () {
        document.querySelector('.scenario-chart').style.display = 'none';
        greyBackground();
        displayAllScenarios();
        removeClass(filtering_btn);
        all_btn.classList.add('active');
    }
    /** Display module with scenario chart */
    function displayChart() {
        var chart = document.querySelector('.scenario-chart');
        chart.style.display = (chart.style.display != 'block' ? 'block' : 'none');
        greyBackground();
    }

    /** Display chart with scenarios statistics*/
    displayChart_btn.onclick = function () {
        removeClass(filtering_btn);
        this.classList.add('active');
        displayChart();
    }
    function greyBackground() {
        var documentContainer = document.querySelector('.document_container');
        documentContainer.style.display = (documentContainer.style.display != 'block' ? 'block' : 'none');
    }
}
