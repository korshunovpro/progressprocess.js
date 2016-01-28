/*!
 * ProgressProcess v0.1.0
 * Copyright (c) 2016 Sergey Korshunov
 * https://github.com/korshunovpro/js.stepprogress/blob/master/LICENSE
 */

/**
 * ProgressProcess
 * @constructor
 */
var ProgressProcess = function () {

    var _this = this,
        interval,
        percentLast;

    this.proceed = false;

    /**
     * run
     * @param stepCurrent
     * @param stepCount
     * @param callback
     * @param showCallback
     */
    this.run = function (stepCurrent, stepCount, callback, showCallback) {

        if (stepCurrent > stepCount || stepCurrent <= 0 || stepCount <= 0) {
            throw new Error('"stepCount" must be greater then "stepCurrent" and both arguments must be greater then 0');
        }

        if (typeof callback !== 'function') {
            throw new Error('"callback" is not a function');
        }

        if (typeof showCallback !== "undefined" && typeof showCallback !== 'function') {
            throw new Error('"showCallback" is not a function');
        }

        // first step 0%
        callback(_this);
        show(0, stepCount, showCallback);

        // main loop
        interval = setInterval( function() {

            if (_this.proceed) {
                _this.proceed = false;

                show(stepCurrent, stepCount, showCallback);

                ++stepCurrent;
                if (stepCurrent <= stepCount) {
                    callback(_this);
                }
            }

            if (stepCurrent > stepCount) {
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




