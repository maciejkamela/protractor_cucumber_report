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
    filters.displaySteps(filtering_btn, steps, all_btn);

};

