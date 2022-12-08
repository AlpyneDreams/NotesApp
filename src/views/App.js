import React from 'react'
import placeholder from '../assets/placeholder.png'
import Toolbar from '../components/Toolbar'
import TabBar from '../components/TabBar'

const App = () => pug`
  .window-content.col
    Toolbar
    TabBar
    .row.fill
      NavRail
      Sidebar
      .pane.col.fill
        Main

`

export default App

const NavRail = () => pug`
  .pane.pane-mini.sidebar
    nav.nav-group
      a.nav-group-item.active: span.icon.icon-book(style={color: '#fc605b'})
      a.nav-group-item: span.icon.icon-book(style={color: '#fdbc40'})
      a.nav-group-item: span.icon.icon-book(style={color: '#34c84a'})
      a.nav-group-item: span.icon.icon-book(style={color: '#57acf5'})
    
`


const Sidebar = () => pug`
  .pane.pane-sm.sidebar
    nav.nav-group
      h5.nav-group-title Favorites
      a.nav-group-item.active
        span.icon.icon-home
        |                 user
      span.nav-group-item
        span.icon.icon-download
        |                 Downloads
      span.nav-group-item
        span.icon.icon-folder
        |                 Documents
      span.nav-group-item
        span.icon.icon-signal
        |                 AirPlay
      span.nav-group-item
        span.icon.icon-print
        |                 Applications
      span.nav-group-item
        span.icon.icon-cloud
        |                 Desktop
    nav.nav-group
      h5.nav-group-title Tags
      span.nav-group-item(href='#')
        span.icon.icon-record(style={color: '#fc605b'})
        |                 Red
      span.nav-group-item(href='#')
        span.icon.icon-record(style={color: '#fdbc40'})
        |                 Orange
      span.nav-group-item(href='#')
        span.icon.icon-record(style={color: '#34c84a'})
        |                 Green
      span.nav-group-item(href='#')
        span.icon.icon-record(style={color: '#57acf5'})
        |                 Blue
    nav.nav-group
      h5.nav-group-title Devices
      span.nav-group-item
        span.icon.icon-drive
        |                 Backup disk
      span.nav-group-item
        span.icon.icon-drive
        |                 Backup disk
      span.nav-group-item
        span.icon.icon-drive
        |                 Backup disk
      span.nav-group-item
        span.icon.icon-drive
        |                 Backup disk
`

const Sidebar1 = () => pug`
  .pane.pane-sm.sidebar
    ul.list-group
      li.list-group-header
        input.form-control(type='text' placeholder='Search for someone')
      li.list-group-item.active
        img.img-circle.media-object.pull-left(src=placeholder width='32' height='32')
        .media-body
          strong List item title
          p Lorem ipsum dolor sit amet.
      li.list-group-item
        img.img-circle.media-object.pull-left(src=placeholder width='32' height='32')
        .media-body
          strong List item title
          p Lorem ipsum dolor sit amet.
`

function Main() {

  return pug`
    .selectable-text.padded(contentEditable="true" suppressContentEditableWarning style={flex: 1, outline: 'none'}).
      The quick brown fox jumps over the lazy dog.
  `
}

/*
const Main = () => pug`
  .pane
    table.table-striped
      thead
        tr
          th Name
          th Kind
          th Date Modified
          th Author
      tbody
        tr.file_arq
          td bars.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td base.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td button-groups.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td buttons.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td docs.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td forms.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td grid.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td icons.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td images.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td lists.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td mixins.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td navs.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td normalize.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td photon.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td tables.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td tabs.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td utilities.scss
          td Document
          td Oct 13, 2015
          td user
        tr.file_arq
          td variables.scss
          td Document
          td Oct 13, 2015
          td user
        
    div(style={margin: 15})
      button.btn.btn-default Default
      | 
      button.btn.btn-primary Primary
      | 
      button.btn.btn-positive Positive
      | 
      button.btn.btn-negative Negative
      | 
      button.btn.btn-warning Warning
`*/