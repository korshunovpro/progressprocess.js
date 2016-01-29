/*!
 * ProgressProcess.jQuery v0.1.4
 * Copyright (c) 2016 Sergey Korshunov
 * https://github.com/korshunovpro/progressprocess.js/blob/master/LICENSE
 */

;(function (window, document, $, undefined) {
    "use strict";

    var element,
        interval,
        percentLast = 0;

    var opt,
        defaults = {
            stepCurrent : 0,
            stepCount : 0,
            callback : null,
            showCallback : null
        };


    var progressProcess = $.fn.progressProcess = function(options) {
        element = this;
        opt = $.extend({}, defaults, options);
        progressProcess.run();
        return progressProcess;
    };

    progressProcess.proceed = false;

    /**
     * runNext
     */
    progressProcess.runNext = function () {
        progressProcess.proceed = true;
    };

    /**
     * run
     */
    progressProcess.run = function () {

        if (opt.stepCurrent > opt.stepCount || opt.stepCurrent <= 0 || opt.stepCount <= 0) {
            throw new Error('"stepCount" must be greater then "stepCurrent" and both arguments must be greater then 0');
        }

        if (typeof opt.callback !== 'function') {
            throw new Error('"callback" is not a function');
        }

        // first step 0%
        opt.callback(progressProcess);
        show(0, opt.stepCount, opt.showCallback);

        // main loop
        interval = setInterval( function() {

            if (progressProcess.proceed) {
                progressProcess.proceed = false;

                show(opt.stepCurrent, opt.stepCount, opt.showCallback);

                ++opt.stepCurrent;
                if (opt.stepCurrent <= opt.stepCount) {
                    opt.callback(progressProcess);
                }
            }

            if (opt.stepCurrent > opt.stepCount) {
                clearInterval(interval);
            }
        }, 50);
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

}(window, document, jQuery));