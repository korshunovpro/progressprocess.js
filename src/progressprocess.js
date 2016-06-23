/*!
 * ProgressProcess v0.1.5
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
     * start
     * @param options
     */
    this.start = function (options) {

        if (interval) return false;

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

        return _this.run();
    };

    /**
     * run
     * @param
     */
    this.run = function () {

        if (interval) return false;

        _this.proceed = true;

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
                _this.pause();
            }
        }, 20);

        return true;
    };

    /**
     * run next
     */
    this.next = function () {
        _this.proceed = true;
    };

    /**
     * pause
     */
    this.pause = function () {
        if (interval)  {
            clearInterval(interval);
            interval = false;
        }
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




