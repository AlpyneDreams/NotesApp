import React from 'react'
import WindowControls from './WindowControls'

function EditBar() {
  function FormatButton({ icon, command, param=null }) {
    return pug`
      button.btn.btn-default(onClick=() => document.execCommand(command, false, param))
        i.bi(className='bi-' + icon style={fontSize: 16})
    `
  }

  return pug`
    .toolbar-actions.row.fill(style={paddingTop: 4, paddingBottom: 4})
      .btn-group
        FormatButton(icon='type-bold' command='bold')
        FormatButton(icon='type-italic' command='italic')
        FormatButton(icon='type-underline' command='underline')
        FormatButton(icon='type-strikethrough' command='strikeThrough')
      .btn-group
        FormatButton(icon='link' command='createLink')
        FormatButton(icon='code' command='fontName' param='monospace')
        FormatButton(icon='type-underline' command='underline')
        FormatButton(icon='type-strikethrough' command='strikeThrough')
      button.btn.btn-default(style={marginLeft: 'auto'})
        i.icon.icon-search
  `
}


const Toolbar = () => pug`
  header.toolbar.toolbar-header.draggable.col
    .row
      .pane-mini.row
        WindowControls
        .toolbar-actions(style={paddingTop: 4, paddingBottom: 4})
          button.btn.btn-default.btn-dropdown
            i.icon.icon-cog
      .pane-sm.fill(style={pointerEvents: 'none'})
      EditBar
      //.toolbar-actions.fill
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