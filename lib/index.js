'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLink = exports.BackButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _throttleit = require('throttleit');

var _throttleit2 = _interopRequireDefault(_throttleit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSITION_DURATION = 500;
var CONTEXT_TYPES = {
  navigation: _propTypes2.default.object.isRequired
};

var Navigation = function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

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
    _this.goto = (0, _throttleit2.default)(_this.goto.bind(_this), TRANSITION_DURATION);
    _this.back = (0, _throttleit2.default)(_this.back.bind(_this), TRANSITION_DURATION);
    _this.onWillNav = _this.onWillNav.bind(_this);
    _this.updateHeight = _this.updateHeight.bind(_this);
    return _this;
  }

  _createClass(Navigation, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        navigation: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateHeight();
    }
  }, {
    key: 'goto',
    value: function goto(name) {
      var view = this.props.viewsMap[name];
      if (!view) {
        throw new Error('Unknown navigation target: ' + name);
      }
      this.history.push(view);
      this.setState({
        prev: this.state.current,
        current: view,
        direction: 'forward'
      }, this.onWillNav);
    }
  }, {
    key: 'replace',
    value: function replace(name) {
      var view = this.props.viewsMap[name];
      if (!view) {
        throw new Error('Unknown navigation target: ' + name);
      }
      this.history[this.history.length - 1] = view;
      this.setState({
        current: view,
        direction: 'forward'
      }, this.onWillNav);
    }
  }, {
    key: 'reset',
    value: function reset(name) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'forward';

      var view = this.props.viewsMap[name];
      if (!view) {
        throw new Error('Unknown navigation target: ' + name);
      }
      this.history = [view];
      this.setState({
        current: view,
        direction: direction
      }, this.onWillNav);
    }
  }, {
    key: 'back',
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var history = this.history;

      if (typeof step === 'string') {
        var index = history.findIndex(function (view) {
          return view.name === step;
        });
        if (index === -1) {
          throw new Error('Invalid navigation backing target: ' + step);
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
    key: 'onWillNav',
    value: function onWillNav() {
      var _this2 = this;

      this.updateHeight();
      this.props.onWillNav(this.state.current, this.state.direction);
      setTimeout(function () {
        return _this2.props.onDidNav(_this2.state.current, _this2.state.direction);
      }, TRANSITION_DURATION);
    }
  }, {
    key: 'updateHeight',
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
    key: 'evalPart',
    value: function evalPart(Content) {
      if (typeof Content === 'function') {
        return Content.prototype && Content.prototype.render ? _react2.default.createElement(Content, null) : Content();
      }
      return Content;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          current = _state.current,
          prev = _state.prev,
          direction = _state.direction;
      var _props = this.props,
          height = _props.height,
          headerHeight = _props.headerHeight,
          backButton = _props.backButton,
          className = _props.className,
          titleClassName = _props.titleClassName,
          bodyClassName = _props.bodyClassName;

      return _react2.default.createElement(
        'div',
        { className: 'Navigation Navigation--' + height + 'Height ' + className, ref: function ref(node) {
            return _this3.container = node;
          } },
        _react2.default.createElement(
          Transition,
          { part: 'header', direction: direction },
          !current.noHeader && (current.title || prev) && (current.header || _react2.default.createElement(
            'div',
            { key: '@header', className: 'Navigation-header', style: { height: headerHeight } },
            _react2.default.createElement(
              Transition,
              { part: 'backButton', direction: direction },
              prev && _react2.default.createElement(
                BackButton,
                { key: '@backButton', className: 'Navigation-backButton' },
                backButton
              )
            ),
            _react2.default.createElement(
              Transition,
              { part: 'title', direction: direction, className: 'Navigation-titleWrapper' },
              current.title && _react2.default.createElement(
                'span',
                { key: current.name, className: 'Navigation-title ' + titleClassName },
                current.title
              )
            )
          ))
        ),
        _react2.default.createElement(
          Transition,
          { part: 'body', direction: direction },
          _react2.default.createElement(
            'div',
            {
              key: current.name,
              ref: function ref(node) {
                return _this3.body = node;
              },
              className: 'Navigation-body ' + bodyClassName,
              style: current.noHeader ? null : { top: headerHeight }
            },
            this.evalPart(current.content)
          )
        )
      );
    }
  }]);

  return Navigation;
}(_react2.default.Component);

Navigation.defaultProps = {
  height: 'fixed',
  headerHeight: 44,
  backButton: _react2.default.createElement(
    'span',
    null,
    '<'
  ),
  className: '',
  titleClassName: '',
  bodyClassName: '',
  onWillNav: function onWillNav() {},
  onDidNav: function onDidNav() {}
};

Navigation.propTypes = {
  height: _propTypes2.default.oneOf(['fixed', 'auto']),
  viewsMap: _propTypes2.default.object.isRequired,
  defaultViewName: _propTypes2.default.string.isRequired,
  headerHeight: _propTypes2.default.number.isRequired,
  backButton: _propTypes2.default.node,
  className: _propTypes2.default.string,
  titleClassName: _propTypes2.default.string,
  bodyClassName: _propTypes2.default.string,
  onWillNav: _propTypes2.default.func,
  onDidNav: _propTypes2.default.func
};

function BackButton(props, context) {
  var navigation = context.navigation;

  var component = props.component,
      to = props.to,
      disabled = props.disabled,
      onClick = props.onClick,
      rest = _objectWithoutProperties(props, ['component', 'to', 'disabled', 'onClick']);

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
  return _react2.default.createElement(
    Tag,
    _extends({ onClick: handleClick }, rest),
    props.children
  );
}

BackButton.propTypes = {
  children: _propTypes2.default.node
};

function NavLink(props, context) {
  var navigation = context.navigation;

  var component = props.component,
      to = props.to,
      disabled = props.disabled,
      replace = props.replace,
      onClick = props.onClick,
      rest = _objectWithoutProperties(props, ['component', 'to', 'disabled', 'replace', 'onClick']);

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
  return _react2.default.createElement(
    Tag,
    _extends({ onClick: handleClick }, rest),
    props.children
  );
}

NavLink.propTypes = {
  to: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node
};

Navigation.childContextTypes = BackButton.contextTypes = NavLink.contextTypes = CONTEXT_TYPES;

function Transition(_ref) {
  var part = _ref.part,
      direction = _ref.direction,
      props = _objectWithoutProperties(_ref, ['part', 'direction']);

  return _react2.default.createElement(_reactTransitionGroup.CSSTransitionGroup, _extends({
    component: 'div',
    transitionAppear: true,
    transitionAppearTimeout: TRANSITION_DURATION,
    transitionEnterTimeout: TRANSITION_DURATION,
    transitionLeaveTimeout: TRANSITION_DURATION
  }, props, {
    transitionName: 'Navigation-' + part + '-' + direction
  }));
}

Transition.propTypes = {
  part: _propTypes2.default.oneOf(['header', 'body', 'backButton', 'title']),
  direction: _propTypes2.default.oneOf(['init', 'forward', 'backward'])
};

exports.default = Navigation;
exports.BackButton = BackButton;
exports.NavLink = NavLink;

