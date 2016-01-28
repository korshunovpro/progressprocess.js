var ProgressProcess = function () {

    var _this = this;

    var interval;
    var percentLast = 0;

    this.doNext = false;

    this.run = function (stepCurrent, stepCount, callback, showCallback) {

        if (stepCurrent > stepCount || stepCurrent <= 0 || stepCount <= 0) {
            throw new Error('"stepCount" must be greater then "stepCurrent" and both arguments must be greater then 0');
        }

        if (typeof callback !== 'function') {
            throw new Error('"callback" is not a function');
        }

        // first step - 0%
        callback(_this);
        show(0, stepCount, showCallback);

        interval = setInterval( function() {

            if (_this.doNext) {
                show(stepCurrent, stepCount, showCallback);
                _this.doNext = false;
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

    var show = function (stepCurrent, stepCount, showCallback) {
        var percent = Math.floor(stepCurrent / (stepCount / 100));
        if (percent > percentLast || percent == 0) {
            percentLast = percent;
            if (typeof showCallback === 'function') {
                showCallback(percent, stepCurrent, stepCount)
            } else {
                console.log(percent + '%');
            }
        }
    };

};




