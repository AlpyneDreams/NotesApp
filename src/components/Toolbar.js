import React from 'react'

const Toolbar = () => pug`
  header.toolbar.toolbar-header.window-drag
    h1.title Photon
    .toolbar-actions
      .btn-group
        button.btn.btn-default
          span.icon.icon-home
        button.btn.btn-default
          span.icon.icon-folder
        button.btn.btn-default.active
          span.icon.icon-cloud
        button.btn.btn-default
          span.icon.icon-popup
        button.btn.btn-default
          span.icon.icon-shuffle
      button.btn.btn-default
        span.icon.icon-home.icon-text
        |   Filters
      button.btn.btn-default.btn-dropdown.pull-right
        span.icon.icon-megaphone
`

export default Toolbar