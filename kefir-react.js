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
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.KefirReact = exports.KefirReactComponent = undefined;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
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
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

    var T = _react2.default.PropTypes;
    var h = _react2.default.createElement;

    var KefirReactComponent = exports.KefirReactComponent = function (_React$Component) {
        _inherits(KefirReactComponent, _React$Component);

        function KefirReactComponent() {
            var _Object$getPrototypeO;

            var _temp, _this, _ret;

            _classCallCheck(this, KefirReactComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(KefirReactComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
                values: null
            }, _this._subscribe = function (props$) {
                var handler = function handler(values) {
                    _this.setState({
                        values: values
                    });
                };
                props$.onValue(handler);
                _this._unsubscribe = function () {
                    props$.offValue(handler);
                    _this._unsubscribe = null;
                };
            }, _temp), _possibleConstructorReturn(_this, _ret);
        } // props => component


        _createClass(KefirReactComponent, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                this._subscribe(this.props.props$);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.props$ !== this.props.props$) {
                    this._unsubscribe();
                    this._subscribe(nextProps.props$);
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
                return this.props.render(this.state.values);
            }
        }]);

        return KefirReactComponent;
    }(_react2.default.Component);

    KefirReactComponent.propTypes = {
        props$: T.any.isRequired, // Kefir.Observable
        render: T.func.isRequired };
    var KefirReact = exports.KefirReact = function KefirReact(props$, Component) {
        var Loader = arguments.length <= 2 || arguments[2] === undefined ? Component : arguments[2];

        return function (props) {
            return h(KefirReactComponent, {
                props$: props$,
                render: function render(values) {
                    return values ? h(Component, _extends({}, props, values)) : h(Loader, props);
                }
            });
        };
    };
});
