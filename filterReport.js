var filters = {

    /** Displaying detailed information about failed step */
    stepsDetails: function (errors) {
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
    },
    /** Displaying and hiding steps */
    displayHideSteps: function (scenarios) {
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
    },
    /** Filtering scenarios */
    filterScenarios: function (buttonState) {
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
    },
    /** Displaying all scenarios */
    displayAllScenarios: function (scenarios) {
        for (var i = 0; i < scenarios.length; i++) {
            if (scenarios[i].style.display != 'block') {
                scenarios[i].style.display = 'block';
            }
        }
    },
    /*
     * @param string buttonsList indicate the group of buttons that have the "active" class name
     *
     * Removing "active" class from all buttons except for the active one
     */
    removeClass: function (buttonsList) {
        for (var j = 0; j < buttonsList.length; j++) {
            buttonsList[j].classList.remove('active');
        }
    },
    filterButtons: function (filtering_btn, scenarios) {
        var self = this;
        for (var k = 0; k < filtering_btn.length; k++) {
            filtering_btn[k].onclick = function () {
                var btnState = this.dataset.state;
                if (btnState !== 'all') {
                    self.removeClass(filtering_btn);
                    this.classList.add('active');
                    self.filterScenarios(btnState);
                } else {
                    self.removeClass(filtering_btn);
                    this.classList.add('active');
                    self.displayAllScenarios(scenarios);
                }
            }
        }
    },
    /** Hide all scenario's steps */
    displaySteps: function (filtering_btn, steps, all_btn) {
        var display_btn = document.querySelector('.display'),
            self = this;
        display_btn.onclick = function () {
            self.removeClass(filtering_btn);
            this.classList.add('active');
            for (var i = 0; i < steps.length; i++) {
                var display = steps[i].style.display;
                if (display === 'none' || display === '') {
                    //          this.classList.add('active');
                    steps[i].style.display = 'block';
                } else {
                    //          removeClass(filtering_btn);
                    all_btn.classList.add('active');
                    steps[i].style.display = 'none';
                }
            }
        }
    }
}