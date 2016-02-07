'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'kefir'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('kefir'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.kefir);
        global.kefirReact = mod.exports;
    }
})(this, function (exports, _react, _kefir) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _kefir2 = _interopRequireDefault(_kefir);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _slicedToArray = (function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    })();

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

    var KefirReact = (function (_React$Component) {
        _inherits(KefirReact, _React$Component);

        function KefirReact(props) {
            _classCallCheck(this, KefirReact);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(KefirReact).call(this, props));
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

                var streamPairs = [];
                Object.keys(streams).map(function (key) {
                    return streamPairs.push([key, streams[key]]);
                });

                var stream = _kefir2.default.combine(streamPairs.map(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2);

                    var _ = _ref3[0];
                    var s = _ref3[1];
                    return s;
                }), function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return args.reduce(function (result, v, i) {
                        result[streamPairs[i][0]] = v;
                        return result;
                    }, {});
                });

                if (this.props.debounce) {
                    stream = stream.debounce(this.props.debounce);
                }

                this.subscriptions = this.subscriptions || [];

                var handler = function handler(v) {
                    return _this2.setState(v);
                };

                this.subscriptions.push({
                    stream: stream,
                    handler: handler
                });
                stream.onValue(handler);
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                this._subscribe(this.props.streams);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                var _this3 = this;

                if (Object.keys(nextProps.streams).length !== Object.keys(this.props.streams) || Object.keys(nextProps.streams).some(function (k) {
                    return !(k in _this3.props.streams);
                })) {
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
                return this.props.render(this.state);
            }
        }]);

        return KefirReact;
    })(_react2.default.Component);

    exports.default = KefirReact;
});
