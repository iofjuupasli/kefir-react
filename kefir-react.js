'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.kefirReact = mod.exports;
    }
})(this, function (exports, _react) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var getPropertyValue = function getPropertyValue(property) {
        var value = undefined;

        var saveCurrentValue = function saveCurrentValue(v) {
            return value = v;
        };

        property.onValue(saveCurrentValue).offValue(saveCurrentValue);
        return value;
    };

    var map = function map(fn, obj) {
        return Object.keys(obj).reduce(function (result, key) {
            return result[key] = fn(result[key]);
        }, {});
    };

    var mapObjIndexed = function mapObjIndexed(fn, obj) {
        return Object.keys(obj).reduce(function (result, key) {
            return result[key] = fn(result[key], key);
        }, {});
    };

    var equals = function equals(a, b) {
        return a.every(function (v, i) {
            return b[i] === v;
        });
    };

    var KefirReact = (function (_React$Component) {
        _inherits(KefirReact, _React$Component);

        function KefirReact() {
            var _Object$getPrototypeO;

            var _temp, _this, _ret;

            _classCallCheck(this, KefirReact);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(KefirReact)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = map(getPropertyValue, _this.props.streams), _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(KefirReact, [{
            key: '_unsubscribe',
            value: function _unsubscribe() {
                this.subscriptions.forEach(function (_ref) {
                    var stream = _ref.stream;
                    var handler = _ref.handler;
                    stream.offValue(handler);
                });
                this.subscriptions = [];
            }
        }, {
            key: '_subscribe',
            value: function _subscribe(streams) {
                var _this2 = this;

                this.subscriptions = this.subscriptions || [];

                var handlerByKey = function handlerByKey(key) {
                    return function (value) {
                        _this2.setState(function () {
                            return _defineProperty({}, key, value);
                        });
                    };
                };

                mapObjIndexed(function (stream, key) {
                    var handler = handlerByKey(key);

                    _this2.subscriptions.push({
                        stream: stream,
                        handler: handler
                    });

                    stream.onValue(handler);
                }, streams);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this._subscribe(this.props.streams);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (!equals(Object.keys(nextProps.streams), Object.keys(this.props.streams))) {
                    this.setState(function () {
                        return {};
                    });

                    this._unsubscribe();

                    this._subscribe(nextProps.streams);
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this._unsubscribe();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                return _react2.default.createElement('div', null, _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, _this3.state);
                }));
            }
        }]);

        return KefirReact;
    })(_react2.default.Component);

    exports.default = KefirReact;
});
