var MPromise = (function () {
    function MPromise() {
        this.PENDING = 0;
        this.FULLFILLED = 1;
        this.REJECTED = 2;
        this.state = this.PENDING;
        this.callbacksRejected = [];
        this.callbacksValid = [];
    }
    MPromise.prototype.then = function (onFullfilled, onRejected) {
        var p = new MPromise();
        // Chanined promises mechanisim
        if (!(onFullfilled instanceof Function)) {
            onFullfilled = function (x) { return x; };
        }
        this.manageCallback(p, onFullfilled, this.FULLFILLED);
        if (!(onRejected instanceof Function)) {
            onRejected = function (r) { return r; };
        }
        this.manageCallback(p, onRejected, this.REJECTED);
        return p;
    };
    MPromise.prototype.manageCallback = function (p, callback, state) {
        var _this = this;
        if (this.state == state) {
            this.applyCallback(p, callback);
        }
        else {
            var wrapper = function () {
                _this.applyCallback(p, callback);
            };
            if (state == this.FULLFILLED) {
                this.callbacksValid.push(wrapper);
            }
            else {
                this.callbacksRejected.push(wrapper);
            }
        }
    };
    MPromise.prototype.applyCallback = function (p, callback) {
        try {
            var callbackValue = callback.call(null, this.value);
            if (callbackValue instanceof MPromise) {
                callbackValue.then(p.validate, p.reject);
            }
        }
        catch (e) {
            p.reject(new TypeError);
        }
    };
    MPromise.prototype.changeState = function (state, callbacks, value) {
        if (this.state == this.PENDING) {
            this.state = state;
            this.value = value;
            while (callbacks.length != 0) {
                var f = callbacks.shift();
                f.call(this, value);
            }
        }
    };
    MPromise.prototype.validate = function (x) {
        this.changeState(this.FULLFILLED, this.callbacksValid, x);
    };
    MPromise.prototype.reject = function (reason) {
        this.changeState(this.REJECTED, this.callbacksRejected, reason);
    };
    return MPromise;
})();
// Usage:
// Return a new MPromise instance wherever your API
// make some async work.
// If the work finished correctly call the validate() MPromise
// method with a value if there is one.
// If the work fails call the reject() MPromise with an Error
// object as parameter. 

//# sourceMappingURL=dist/maps/promise.js.map