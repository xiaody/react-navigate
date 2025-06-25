"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackButton = BackButton;
exports.NavLink = NavLink;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactTransitionGroup = require("react-transition-group");
var _throttleit = _interopRequireDefault(require("throttleit"));
var _excluded = ["component", "to", "disabled", "onClick"],
  _excluded2 = ["component", "to", "disabled", "replace", "onClick"],
  _excluded3 = ["part", "direction"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var TRANSITION_DURATION = 500;
var CONTEXT_TYPES = {
  navigation: _propTypes["default"].object.isRequired
};
var Navigation = /*#__PURE__*/function (_React$Component) {
  function Navigation(props) {
    var _this;
    _classCallCheck(this, Navigation);
    _this = _callSuper(this, Navigation, [props]);
    var view0 = props.viewsMap[props.defaultViewName];
    if (!view0) {
      throw new Error('Invalid defaultViewName');
    }
    _this.state = {
      prev: null,
      current: view0,
      direction: 'init'
    };
    _this.history = [view0];
    _this["goto"] = (0, _throttleit["default"])(_this["goto"].bind(_this), TRANSITION_DURATION);
    _this.back = (0, _throttleit["default"])(_this.back.bind(_this), TRANSITION_DURATION);
    _this.onWillNav = _this.onWillNav.bind(_this);
    _this.updateHeight = _this.updateHeight.bind(_this);
    return _this;
  }
  _inherits(Navigation, _React$Component);
  return _createClass(Navigation, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        navigation: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateHeight();
    }
  }, {
    key: "goto",
    value: function _goto(name) {
      var view = this.props.viewsMap[name];
      if (!view) {
        throw new Error("Unknown navigation target: ".concat(name));
      }
      this.history.push(view);
      this.setState({
        prev: this.state.current,
        current: view,
        direction: 'forward'
      }, this.onWillNav);
    }
  }, {
    key: "replace",
    value: function replace(name) {
      var view = this.props.viewsMap[name];
      if (!view) {
        throw new Error("Unknown navigation target: ".concat(name));
      }
      this.history[this.history.length - 1] = view;
      this.setState({
        current: view,
        direction: 'forward'
      }, this.onWillNav);
    }
  }, {
    key: "reset",
    value: function reset(name) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'forward';
      var view = this.props.viewsMap[name];
      if (!view) {
        throw new Error("Unknown navigation target: ".concat(name));
      }
      this.history = [view];
      this.setState({
        current: view,
        direction: direction
      }, this.onWillNav);
    }
  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var history = this.history;
      if (typeof step === 'string') {
        var index = history.findIndex(function (view) {
          return view.name === step;
        });
        if (index === -1) {
          throw new Error("Invalid navigation backing target: ".concat(step));
        }
        step = history.length - 1 - index;
      }
      if (history.length > step) {
        history.length = history.length - step;
        this.setState({
          prev: history[history.length - 2] || null,
          current: history[history.length - 1],
          direction: 'backward'
        }, this.onWillNav);
      }
    }
  }, {
    key: "onWillNav",
    value: function onWillNav() {
      var _this2 = this;
      this.updateHeight();
      this.props.onWillNav(this.state.current, this.state.direction);
      setTimeout(function () {
        return _this2.props.onDidNav(_this2.state.current, _this2.state.direction);
      }, TRANSITION_DURATION);
    }
  }, {
    key: "updateHeight",
    value: function updateHeight() {
      if (typeof this.state.current.height === 'number') {
        this.container.style.height = this.state.current.height + 'px';
      } else if (this.props.height === 'auto') {
        this.container.style.height = this.props.headerHeight + this.body.clientHeight + 'px';
      } else {
        this.container.style.height = null;
      }
    }
  }, {
    key: "evalPart",
    value: function evalPart(Content) {
      if (typeof Content === 'function') {
        return Content.prototype && Content.prototype.render ? _react["default"].createElement(Content, null) : Content();
      }
      return Content;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$state = this.state,
        current = _this$state.current,
        prev = _this$state.prev,
        direction = _this$state.direction;
      var _this$props = this.props,
        height = _this$props.height,
        headerHeight = _this$props.headerHeight,
        backButton = _this$props.backButton,
        className = _this$props.className,
        titleClassName = _this$props.titleClassName,
        bodyClassName = _this$props.bodyClassName;
      return _react["default"].createElement("div", {
        className: "Navigation Navigation--".concat(height, "Height ").concat(className),
        ref: function ref(node) {
          return _this3.container = node;
        }
      }, _react["default"].createElement(Transition, {
        part: 'header',
        direction: direction
      }, !current.noHeader && (current.title || prev) && (current.header || _react["default"].createElement("div", {
        key: '@header',
        className: 'Navigation-header',
        style: {
          height: headerHeight
        }
      }, _react["default"].createElement(Transition, {
        part: 'backButton',
        direction: direction
      }, prev && _react["default"].createElement(BackButton, {
        key: '@backButton',
        className: 'Navigation-backButton'
      }, backButton)), _react["default"].createElement(Transition, {
        part: 'title',
        direction: direction,
        className: 'Navigation-titleWrapper'
      }, current.title && _react["default"].createElement("span", {
        key: current.name,
        className: "Navigation-title ".concat(titleClassName)
      }, current.title))))), _react["default"].createElement(Transition, {
        part: 'body',
        direction: direction
      }, _react["default"].createElement("div", {
        key: current.name,
        ref: function ref(node) {
          return _this3.body = node;
        },
        className: "Navigation-body ".concat(bodyClassName),
        style: current.noHeader ? null : {
          top: headerHeight
        }
      }, this.evalPart(current.content))));
    }
  }]);
}(_react["default"].Component);
Navigation.defaultProps = {
  height: 'fixed',
  headerHeight: 44,
  backButton: _react["default"].createElement("span", null, "<"),
  className: '',
  titleClassName: '',
  bodyClassName: '',
  onWillNav: function onWillNav() {},
  onDidNav: function onDidNav() {}
};
Navigation.propTypes = {
  height: _propTypes["default"].oneOf(['fixed', 'auto']),
  viewsMap: _propTypes["default"].object.isRequired,
  defaultViewName: _propTypes["default"].string.isRequired,
  headerHeight: _propTypes["default"].number.isRequired,
  backButton: _propTypes["default"].node,
  className: _propTypes["default"].string,
  titleClassName: _propTypes["default"].string,
  bodyClassName: _propTypes["default"].string,
  onWillNav: _propTypes["default"].func,
  onDidNav: _propTypes["default"].func
};
function BackButton(props, context) {
  var navigation = context.navigation;
  var component = props.component,
    to = props.to,
    disabled = props.disabled,
    onClick = props.onClick,
    rest = _objectWithoutProperties(props, _excluded);
  var Tag = component || 'span';
  var handleClick = function handleClick(e) {
    var preventNav = disabled;
    if (!disabled) {
      if (typeof onClick === 'function') {
        preventNav = onClick(e) === false;
      }
    }
    if (!preventNav) {
      navigation.back(to);
    }
  };
  return _react["default"].createElement(Tag, _extends({
    onClick: handleClick
  }, rest), props.children);
}
BackButton.propTypes = {
  children: _propTypes["default"].node
};
function NavLink(props, context) {
  var navigation = context.navigation;
  var component = props.component,
    to = props.to,
    disabled = props.disabled,
    replace = props.replace,
    onClick = props.onClick,
    rest = _objectWithoutProperties(props, _excluded2);
  var Tag = component || 'span';
  var name = to;
  var handleClick = function handleClick(e) {
    var preventNav = disabled;
    if (!disabled) {
      if (typeof onClick === 'function') {
        preventNav = onClick(e) === false;
      }
    }
    if (!preventNav) {
      navigation[replace ? 'replace' : 'goto'](name);
    }
  };
  return _react["default"].createElement(Tag, _extends({
    onClick: handleClick
  }, rest), props.children);
}
NavLink.propTypes = {
  to: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node
};
Navigation.childContextTypes = BackButton.contextTypes = NavLink.contextTypes = CONTEXT_TYPES;
function Transition(_ref) {
  var part = _ref.part,
    direction = _ref.direction,
    props = _objectWithoutProperties(_ref, _excluded3);
  return _react["default"].createElement(_reactTransitionGroup.CSSTransitionGroup, _extends({
    component: 'div',
    transitionAppear: true,
    transitionAppearTimeout: TRANSITION_DURATION,
    transitionEnterTimeout: TRANSITION_DURATION,
    transitionLeaveTimeout: TRANSITION_DURATION
  }, props, {
    transitionName: "Navigation-".concat(part, "-").concat(direction)
  }));
}
Transition.propTypes = {
  part: _propTypes["default"].oneOf(['header', 'body', 'backButton', 'title']),
  direction: _propTypes["default"].oneOf(['init', 'forward', 'backward'])
};
var _default = exports["default"] = Navigation;

