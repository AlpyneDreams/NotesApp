import React from 'react'
import Tabs from './TabBar'

export default function NavRail() {
  return <Tabs
    Root={({children}) => pug`
      .pane.pane-mini.sidebar
        nav.nav-group
          = children
    `}
    Tab={({active, focus, close, color}) => pug`
      a.nav-group-item(className=(active && 'active') onClick=focus)
        span.icon.icon-book(style={color})
    `}
    New={() => null}
    tabs={[
      {color: '#fc605b'},
      {color: '#fdbc40'},
      {color: '#34c84a'},
      {color: '#57acf5'},
    ]}
  />
  return pug`
    .pane.pane-mini.sidebar
      nav.nav-group
        a.nav-group-item.active: span.icon.icon-book(style={color: '#fc605b'})
        a.nav-group-item: span.icon.icon-book(style={color: '#fdbc40'})
        a.nav-group-item: span.icon.icon-book(style={color: '#34c84a'})
        a.nav-group-item: span.icon.icon-book(style={color: '#57acf5'})
`
}