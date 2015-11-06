(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        /* global define */
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

    function getPropertyValue(property) {
        var value;

        function saveCurrentValue(v) {
            value = v;
        }
        property.onValue(saveCurrentValue).offValue(saveCurrentValue);
        return value;
    }

    return function (observable, statePropertyName) {
        return {
            getInitialState: function () {
                return keyValue(statePropertyName, getPropertyValue(observable));
            },
            componentDidMount: function () {
                this.subscriptions = this.subscriptions || [];
                var handler = function (value) {
                    this.setState(keyValue(statePropertyName, value));
                }.bind(this);
                this.subscriptions.push(handler);
                observable.onValue(handler);
            },
            componentWillUnmount: function () {
                this.subscriptions.forEach(function (handler) {
                    observable.offValue(handler);
                });
            }
        }
    };
}));
