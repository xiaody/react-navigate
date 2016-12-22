[![dependencies Status](https://david-dm.org/xiaody/react-navigate/status.svg)](https://david-dm.org/xiaody/react-navigate)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# react-navigate

Navigation on web for React.JS https://xiaody.github.io/react-navigate

## Installation

To install the stable version:

```
npm install --save react-navigate
```

## Usage

```jsx
import Navigation, {NavLink} from 'react-navigate'
import 'react-navigate/src/Navigation.css'

const views = {
  home: {
    name: 'home',
    title: 'Home page',
    content () {
      return (
        <NavLink to='about'>go to About</NavLink>
      )
    }
  },
  about: {
    name: 'about',
    title: 'Abount',
    content: 'Oh!'
  }
}

<Navigation
  viewsMap={views}
  defaultViewName='home'
/>
```

## Options

- props.viewsMap
- props.defaultViewName
- props.height
- props.headerHeight
- props.backButton
- props.className
- props.titleClassName
- props.bodyClassName
- props.onWillNav
- props.onDidNav

## Limitations

- scroll position isn't kept when switching between views, because the DOM is destroyed and re-created
- no back button title support
- require modern browsers env

## License

MIT
