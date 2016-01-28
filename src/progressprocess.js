/*!
 * ProgressProcess v0.1.3
 * Copyright (c) 2016 Sergey Korshunov
 * https://github.com/korshunovpro/progressprocess.js/blob/master/LICENSE
 */

/**
 * ProgressProcess
 * @constructor
 */
var ProgressProcess = function () {

    var _this = this,
        interval,
        percentLast = 0;

    var opt = {
            stepCurrent : 0,
            stepCount : 0,
            callback : null,
            showCallback : null
        };

    this.proceed = false;

    /**
     * run
     * @param options
     */
    this.run = function (options) {

        for(var prop in options) {
            if (opt.hasOwnProperty(prop)) {
                opt[prop] = options[prop];
            }
        }

        if (opt.stepCurrent > opt.stepCount || opt.stepCurrent <= 0 || opt.stepCount <= 0) {
            throw new Error('"stepCount" must be greater then "stepCurrent" and both arguments must be greater then 0');
        }

        if (typeof opt.callback !== 'function') {
            throw new Error('"callback" is not a function');
        }

        // first step 0%
        opt.callback(_this);
        show(0, opt.stepCount, opt.showCallback);

        // main loop
        interval = setInterval( function() {

            if (_this.proceed) {
                _this.proceed = false;

                show(opt.stepCurrent, opt.stepCount, opt.showCallback);

                ++opt.stepCurrent;
                if (opt.stepCurrent <= opt.stepCount) {
                    opt.callback(_this);
                }
            }

            if (opt.stepCurrent > opt.stepCount) {
                clearInterval(interval);
            }
        }, 50);
    };

    /**
     * runNext
     */
    this.runNext = function () {
        _this.proceed = true;
    };

    /**
     * show
     * @param stepCurrent
     * @param stepCount
     * @param showCallback
     */
    var show = function (stepCurrent, stepCount, showCallback) {
        var percent = Math.floor(stepCurrent / (stepCount / 100));
        if (percent > percentLast || percent == 0) {
            percentLast = percent;
            if (typeof showCallback === 'function') {
                showCallback(percent, stepCurrent, stepCount)
            }
        }
    };
};




