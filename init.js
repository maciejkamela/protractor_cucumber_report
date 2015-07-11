window.onload = function () {

    var errors = document.querySelectorAll('.step.failed'),
        filtering_btn = document.getElementsByClassName('btn'),
        scenarios = document.querySelectorAll('.scenario-container'),
        display_btn = document.querySelector('.display'),
        all_btn = document.querySelector('.all_btn'),
        steps = document.querySelectorAll('.step'),
        close_btn = document.querySelector('.close_chart'),
        displayChart_btn = document.querySelector('.generate_chart');



    filters.stepsDetails(errors);
    filters.displayHideSteps(scenarios);
    filters.filterButtons(filtering_btn,scenarios);

    /** Displaying all steps within scenarios */
    display_btn.onclick = filters.displaySteps(filtering_btn, steps, all_btn);

    /** Canvas */
    /** Drawing report's chart */
    var canvas = document.getElementById("chart"),
        chart = canvas.getContext("2d"),
        statistics = chart.getStatistics(),
        data = {
            numberOfParts: statistics.scenariosAmount,// total amount of scenarios
            parts: {"pt": [statistics.passed, statistics.failed]},//percentage of each parts
            colors: {"cs": ["#73c904", "#c90417"]}//color of each part
        };
    chart.drawdountChart(canvas);
    var drawDount = new chart.DrawdountChart(chart);
    drawDount.set(200, 200, 130, 0, Math.PI * 2, 70, "blue");
    drawDount.draw(data);
};
var display_btn = document.querySelector('.display'),
    filtering_btn = document.getElementsByClassName('btn'),
    steps = document.querySelectorAll('.step'),
    all_btn = document.querySelector('.all_btn');

    display_btn.onclick = filters.displaySteps(filtering_btn, steps, all_btn);
