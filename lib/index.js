'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLink = exports.BackButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _throttleit = require('throttleit');

var _throttleit2 = _interopRequireDefault(_throttleit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSITION_DURATION = 500;
var CONTEXT_TYPES = {
  navigation: _react.PropTypes.object.isRequired
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
      direction: 'forward'
    };
    _this.history = [view0];
    _this.goto = (0, _throttleit2.default)(_this.goto.bind(_this), TRANSITION_DURATION);
    _this.back = (0, _throttleit2.default)(_this.back.bind(_this), TRANSITION_DURATION);
    _this.onNav = _this.onNav.bind(_this);
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
      this.onNav();
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
      }, this.onNav);
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
        }, this.onNav);
      }
    }
  }, {
    key: 'onNav',
    value: function onNav() {
      if (this.props.height === 'auto') {
        this.container.style.height = this.props.headerHeight + this.body.clientHeight + 'px';
      }
      this.props.onNav(this.state.current, this.state.direction);
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
      var _this2 = this;

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
            return _this2.container = node;
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
              _react2.default.createElement(
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
                return _this2.body = node;
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
  onNav: function onNav() {}
};

Navigation.propTypes = {
  height: _react2.default.PropTypes.oneOf(['fixed', 'auto']),
  viewsMap: _react.PropTypes.object.isRequired,
  defaultViewName: _react.PropTypes.string.isRequired,
  headerHeight: _react.PropTypes.number.isRequired,
  backButton: _react.PropTypes.node,
  className: _react.PropTypes.string,
  titleClassName: _react.PropTypes.string,
  bodyClassName: _react.PropTypes.string,
  onNav: _react.PropTypes.func
};

function BackButton(props, context) {
  var navigation = context.navigation;

  var component = props.component,
      to = props.to,
      onClick = props.onClick,
      rest = _objectWithoutProperties(props, ['component', 'to', 'onClick']);

  var Tag = component || 'span';
  var handleClick = function handleClick(e) {
    var preventNav = false;
    if (typeof onClick === 'function') {
      preventNav = onClick(e) === false;
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
  children: _react.PropTypes.node
};

function NavLink(props, context) {
  var navigation = context.navigation;

  var component = props.component,
      to = props.to,
      onClick = props.onClick,
      rest = _objectWithoutProperties(props, ['component', 'to', 'onClick']);

  var Tag = component || 'span';
  var name = to;
  var handleClick = function handleClick(e) {
    var preventNav = false;
    if (typeof onClick === 'function') {
      preventNav = onClick(e) === false;
    }
    if (!preventNav) {
      navigation.goto(name);
    }
  };
  return _react2.default.createElement(
    Tag,
    _extends({ onClick: handleClick }, rest),
    props.children
  );
}

NavLink.propTypes = {
  to: _react.PropTypes.string.isRequired,
  children: _react.PropTypes.node
};

Navigation.childContextTypes = BackButton.contextTypes = NavLink.contextTypes = CONTEXT_TYPES;

function Transition(_ref) {
  var part = _ref.part,
      direction = _ref.direction,
      props = _objectWithoutProperties(_ref, ['part', 'direction']);

  return _react2.default.createElement(_reactAddonsCssTransitionGroup2.default, _extends({
    component: 'div',
    transitionEnterTimeout: TRANSITION_DURATION,
    transitionLeaveTimeout: TRANSITION_DURATION
  }, props, {
    transitionName: 'Navigation-' + part + '-' + direction
  }));
}

Transition.propTypes = {
  part: _react2.default.PropTypes.oneOf(['header', 'body', 'backButton', 'title']),
  direction: _react2.default.PropTypes.oneOf(['forward', 'backward'])
};

exports.default = Navigation;
exports.BackButton = BackButton;
exports.NavLink = NavLink;

