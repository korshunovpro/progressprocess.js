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
        proceed = false;

    /**
     * Options
     * @type {{callback: null, showCallback: null}}
     */
    var opt = {
        callback: null,
        showCallback: null
    };

    /**
     * Runtime vars
     * @type {{percent: number, data: {}}}
     */
    var runtime = {
        percent: 0,
        data: {}
    };

    /**
     * start
     * @param optInit
     * @param runtimeInit
     */
    this.start = function (optInit, runtimeInit) {
        if (interval) return false;

        for (var propOpt in optInit) {
            if (optInit.hasOwnProperty(propOpt) && optInit.hasOwnProperty(propOpt)) {
                opt[propOpt] = optInit[propOpt];
            }
        }

        for (var propRuntime in runtimeInit) {
            if (runtimeInit.hasOwnProperty(propRuntime) && runtime.hasOwnProperty(propRuntime)) {
                runtime[propRuntime] = runtimeInit[propRuntime];
            }
        }

        if (typeof opt.callback !== 'function') {
            throw new Error('"callback" is not a function');
        }

        return _this.run();
    };

    /**
     * run
     */
    this.run = function () {
        if (interval) return false;

        _this.next(runtime.data);
        interval = setInterval(function () {
            if (proceed) {
                proceed = false;

                if (runtime.percent >= 100) {
                    _this.pause();
                }

                show();

                if (runtime.percent < 100) {
                    opt.callback(_this, runtime);
                }
            }

        }, 20);

        return true;
    };

    /**
     * run next
     */
    this.next = function (data) {
        data = (data || runtime.data);
        for (var prop in runtime) {
            if (data.hasOwnProperty(prop) && runtime.hasOwnProperty(prop)) {
                runtime[prop] = data[prop];
            }
        }
        proceed = true;
    };

    /**
     * pause/stop
     */
    this.pause = function () {
        if (interval) {
            clearInterval(interval);
            interval = false;
        }
    };

    /**
     * show
     */
    var show = function () {
        runtime.percent = Math.floor(runtime.percent);
        if (runtime.percent >= 0 ) {
            if (typeof opt.showCallback === 'function') {
                opt.showCallback(runtime.percent, runtime.data.info)
            }
        }
    };
};




