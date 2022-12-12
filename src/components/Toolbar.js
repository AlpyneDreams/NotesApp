import React, { useContext } from 'react'
import WindowControls from './WindowControls'
import bootstrap from '../dist/bootstrap/js/bootstrap.bundle.min.js'
import { NotesContext } from '../views/App'

function EditBar() {
  function FormatButton({command, param=null, ...props}) {
    return pug`
      TooltipButton(...props onClick=() => document.execCommand(command, false, param))
    `
  }

  return pug`
    .toolbar-actions.row.fill(style={paddingTop: 4, paddingBottom: 4})
      .btn-group
        FormatButton(icon='type-bold' command='bold' title='Bold')
        FormatButton(icon='type-italic' command='italic' title='Italic')
        FormatButton(icon='type-underline' command='underline' title='Underline')
        FormatButton(icon='type-strikethrough' command='strikeThrough' title='Strikethrough')
      .btn-group
        FormatButton(icon='link' command='createLink' title='Insert Link')
        FormatButton(icon='code' command='fontName' param='monospace' title='Code')
        //- TODO: Need "remove formatting" icon
        //- Perhaps this should formatBlock(p) if nothing is selected
        FormatButton(icon='type' command='removeFormat' title='Clear Formatting')
      .btn-group
        FormatButton(icon='justify-left' command='formatBlock' param='p' title='Clear Block Formatting')
        FormatButton(icon='braces' command='formatBlock' param='pre' title='Code Block')
        FormatButton(icon='quote' command='formatBlock' param='blockquote' title='Blockquote')
        FormatButton(icon='list-ul' command='insertUnorderedList' title='Unordered List')
        FormatButton(icon='list-ol' command='insertUnorderedList' title='Ordered List')
        //- TODO: Todo lists
        FormatButton(icon='check2-square' command='insertUnorderedList' title='Checkboxes')
        //FormatButton(icon='type-strikethrough' command='strikeThrough')
      //.btn-group
        FormatButton(icon='type-h1' command='formatBlock' param='h1')
        FormatButton(icon='type-h2' command='formatBlock' param='h2')
        FormatButton(icon='type-h3' command='formatBlock' param='h3')
      .dropdown.ms-auto.me-1
        a.btn.btn-default(data-bs-toggle='dropdown')
          i.icon.icon-search
        div.dropdown-menu.dropdown-menu-end.p-2(style={minWidth: 300})
          .dropdown-arrow
          .input-group
            input.fill.form-control.form-control-sm(type='text' placeholder='Search')
            button.btn.btn-default(style={height: 'unset'}) Search
  `
}


function Toolbar() {

  const app = useContext(NotesContext)

  return pug`
    header.toolbar.toolbar-header.draggable.col
      .row
        .pane-mini.row(style={width: 150})
          WindowControls
          .toolbar-actions.row(style={paddingTop: 4, paddingBottom: 4})
            .dropdown
              button.btn.btn-default.btn-dropdown(data-bs-toggle='dropdown')
                i.icon.icon-cog
              ul.dropdown-menu
                .dropdown-arrow
                li: a.dropdown-item(href='#') Switch to Dark Theme
                li: hr.dropdown-divider
                li: a.dropdown-item(href='#') Quit
            TooltipButton(icon='icon-floppy' title='Save' onClick=() => app.note.save())

        .pane-sm.fill(style={pointerEvents: 'none'})
        EditBar
  `
}

function TooltipButton({title, icon, ...props}) {
  const ref = React.useRef()
  
  if (title) {
    React.useLayoutEffect(() => {
      new bootstrap.Tooltip(ref.current, {placement: 'bottom'})
    })
  }

  let className = 'bi bi-' + icon
  if (icon.startsWith('icon-'))
    className = 'icon ' + icon
  
  return pug`
    button.btn.btn-default(title=title ref=ref ...props)
      i(className=className style={fontSize: 16})
  `
}



export default Toolbar