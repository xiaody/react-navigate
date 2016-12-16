import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import throttle from 'throttleit'

const TRANSITION_DURATION = 500
const CONTEXT_TYPES = {
  navigation: PropTypes.object.isRequired
}

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    const view0 = props.viewsMap[props.defaultViewName]
    if (!view0) {
      throw new Error('Invalid defaultViewName')
    }
    this.state = {
      prev: null,
      current: view0,
      direction: 'forward'
    }
    this.history = [view0]
    this.goto = throttle(this.goto.bind(this), TRANSITION_DURATION)
    this.back = throttle(this.back.bind(this), TRANSITION_DURATION)
  }

  getChildContext () {
    return {
      navigation: this
    }
  }

  goto (name) {
    const view = this.props.viewsMap[name]
    if (!view) {
      throw new Error(`Unknown navigation target: ${name}`)
    }
    this.history.push(view)
    this.setState({
      prev: this.state.current,
      current: view,
      direction: 'forward'
    })
  }

  back (step = 1) {
    const {history} = this
    if (typeof step === 'string') {
      const index = history.findIndex((view) => view.name === step)
      if (index === -1) {
        throw new Error(`Invalid navigation backing target: ${step}`)
      }
      step = history.length - 1 - index
    }

    if (history.length > step) {
      history.length = history.length - step
      this.setState({
        prev: history[history.length - 2] || null,
        current: history[history.length - 1],
        direction: 'backward'
      })
    }
  }

  evalPart (Content) {
    if (typeof Content === 'function') {
      return Content.prototype && Content.prototype.render ? <Content /> : Content()
    }
    return Content
  }

  render () {
    const {current, prev, direction} = this.state
    const {headerHeight, backButton, className, titleClassName, bodyClassName} = this.props
    return (
      <div className={`Navigation ${className}`}>
        <Transition part='header' direction={direction}>
          {!current.noHeader && (current.title || prev) && (
            current.header ||
            <div key='@header' className='Navigation-header' style={{height: headerHeight}}>
              <Transition part='backButton' direction={direction}>
                {prev && (
                  <BackButton key='@backButton' className='Navigation-backButton'>
                    {backButton}
                  </BackButton>
                )}
              </Transition>
              <Transition part='title' direction={direction} className='Navigation-titleWrapper'>
                <span key={current.name} className={`Navigation-title ${titleClassName}`}>{current.title}</span>
              </Transition>
            </div>
          )}
        </Transition>
        <Transition part='body' direction={direction}>
          <div key={current.name} className={`Navigation-body ${bodyClassName}`} style={current.noHeader ? null : {top: headerHeight}}>
            {this.evalPart(current.content)}
          </div>
        </Transition>
      </div>
    )
  }
}

Navigation.defaultProps = {
  headerHeight: 44,
  backButton: <span>&lt;</span>,
  className: '',
  titleClassName: '',
  bodyClassName: ''
}

Navigation.propTypes = {
  viewsMap: PropTypes.object.isRequired,
  defaultViewName: PropTypes.string.isRequired,
  headerHeight: PropTypes.number.isRequired,
  backButton: PropTypes.node,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  bodyClassName: PropTypes.string
}

function BackButton (props, context) {
  const {navigation} = context
  const {component, to, onClick, ...rest} = props
  const Tag = component || 'span'
  const handleClick = (e) => {
    let preventNav = false
    if (typeof onClick === 'function') {
      preventNav = onClick(e) === false
    }
    if (!preventNav) {
      navigation.back(to)
    }
  }
  return (
    <Tag onClick={handleClick} {...rest}>{props.children}</Tag>
  )
}

BackButton.propTypes = {
  children: PropTypes.node
}

function NavLink (props, context) {
  const {navigation} = context
  const {component, to, onClick, ...rest} = props
  const Tag = component || 'span'
  const name = to
  const handleClick = (e) => {
    let preventNav = false
    if (typeof onClick === 'function') {
      preventNav = onClick(e) === false
    }
    if (!preventNav) {
      navigation.goto(name)
    }
  }
  return (
    <Tag onClick={handleClick} {...rest}>
      {props.children}
    </Tag>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node
}

Navigation.childContextTypes = BackButton.contextTypes = NavLink.contextTypes = CONTEXT_TYPES

function Transition ({part, direction, ...props}) {
  return (
    <ReactCSSTransitionGroup
      component='div'
      transitionEnterTimeout={TRANSITION_DURATION}
      transitionLeaveTimeout={TRANSITION_DURATION}
      {...props}
      transitionName={`Navigation-${part}-${direction}`}
    />
  )
}

Transition.propTypes = {
  part: React.PropTypes.oneOf(['header', 'body', 'backButton', 'title']),
  direction: React.PropTypes.oneOf(['forward', 'backward'])
}

export default Navigation
export {BackButton, NavLink}
