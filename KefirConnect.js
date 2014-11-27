(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        /* global module */
        module.exports = factory();
    } else {
        root.KefirConnect = factory();
    }
}(this, function () {
    'use strict';

    function keyValue(key, value) {
        var obj = {};
        obj[key] = value;
        return obj;
    }
    return function (observable, statePropertyName) {
        var mixin = {};
        mixin.componentDidMount = function () {
            this.subscriptions = this.subscriptions || [];
            var handler = function (value) {
                this.setState(keyValue(statePropertyName, value));
            }.bind(this);
            this.subscriptions.push(handler);
            observable.onValue(handler);
        };
        mixin.componentWillUnmount = function () {
            this.subscriptions.forEach(function (handler) {
                observable.offValue(handler);
            });
        };
        if ('_current' in observable) {
            mixin.getInitialState = function () {
                return keyValue(statePropertyName, observable._current);
            };
        }
        return mixin;
    };
}));
