import 'core-js/fn/array/find-index' // IE 11
import 'raf/polyfill' // IE 9

import React from 'react'
import ReactDOM from 'react-dom'
import Navigation, {NavLink, BackButton} from '../src/Navigation'
import '../src/Navigation.css'

const $id = (id) => document.getElementById(id)
const backButton = <span className='demo-backButton ion-chevron-left' />
const usageTemplate = $id('usage-template').innerHTML.trim()
const optionsTemplate = `
props.viewsMap
props.defaultViewName
props.height
props.headerHeight
props.backButton
props.titleClassName
props.bodyClassName
props.onWillNav
props.onDidNav
`.trim()

const height = window.location.search.slice(1) || Navigation.defaultProps.height

function Link (props) {
  return (
    <NavLink
      component='a'
      href='#'
      onClick={(e) => e.preventDefault()}
      {...props}
    />
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.views = {
      home: {
        name: 'home',
        title: 'Home page',
        content: HomePage
      },
      page1: {
        name: 'page1',
        title: 'Installation',
        content: this.renderPage1View
      },
      page2: {
        name: 'page2',
        title: 'Usage',
        content: this.renderPage2View
      },
      page3: {
        name: 'page3',
        title: 'Options',
        content: this.renderPage3View
      },
      page4: {
        name: 'page4',
        title: 'License',
        content: Page4,
        noHeader: true
      }
    }
  }

  renderPage1View = () => {
    return (
      <div>
        <pre>
          <code className='u-block'>npm install --save react-navigate</code>
        </pre>
        <ul>
          <li><Link to='page2'>Usage</Link></li>
          <li><Link to='page3'>Options</Link></li>
        </ul>
      </div>
    )
  }

  renderPage2View = () => {
    return (
      <div>
        <pre><code className='u-block'>{usageTemplate}</code></pre>
        <Link to='page4'>License</Link>
      </div>
    )
  }

  renderPage3View = () => {
    return (
      <div>
        <pre><code className='u-block'>{optionsTemplate}</code></pre>
        <Link to='page4'>License</Link>
      </div>
    )
  }

  render () {
    return (
      <Navigation
        viewsMap={this.views}
        defaultViewName='home'
        titleClassName='demo-title'
        bodyClassName='demo-body'
        backButton={backButton}
        height={height}
      />
    )
  }
}

class HomePage extends React.Component {
  render () {
    return (
      <div>
        <p>react-navigate is a navigation component for React.JS</p>
        <Link to='page1'>Installation</Link>
      </div>
    )
  }
}

function Page4 () {
  return (
    <div>
      <p>MIT</p>
      <BackButton component='button'>go back</BackButton>
      <BackButton to='home' component='button'>go home</BackButton>
    </div>
  )
}

window.requestAnimationFrame(function bootstrap () {
  const isMobile = /mobile/i.test(navigator.userAgent)
  const ndContainer = $id(isMobile ? 'react-mobile-root' : 'react-root')
  ndContainer.removeAttribute('hidden')
  if (!isMobile) {
    $id('iphone').removeAttribute('hidden')
  }
  ReactDOM.render(<App />, ndContainer)
})
