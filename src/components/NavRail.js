import React from 'react'
import Tabs from './TabBar'

export default function NavRail({notebooks=[], switchNotebook=(i) => {}}) {
  return <Tabs
    id='nav-rail'
    direction='vertical'
    Root={({children}) => pug`
      .pane.sidebar(style={flex: 0.25})
        nav.nav-group
          = children
    `}
    Tab={({active, index, focus, close, ...notebook}) => pug`
      a.nav-group-item(className=(active && 'active') onClick=() => {
        switchNotebook(index)
        focus()
      })
        span.icon.icon-book(style={color: notebook.color})
        = notebook.title
    `}
    New={() => null}
    tabs={notebooks}
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