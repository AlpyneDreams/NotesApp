import React from 'react'
import Tabs from './TabBar'
import HTML from './HTML'
import { NotesContext } from '../views/App'

function AddButton({...props}) {
  return pug`
    button.bttn.bttn-white.btn-mini.m-1(style={padding: '2px 6px'} ...props)
      i.bi.bi-plus
  `
}

export function NavRail({notebooks=[], switchNotebook=(i) => {}}) {
  
  function AddNotebook() {
    const [folder, setFoler] = React.useState()
    const [color, setColor] = React.useState('#737475')
    const app = React.useContext(NotesContext)

    return pug`
      .dropdown
        AddButton(data-bs-toggle='dropdown' data-bs-auto-close='outside')
        .dropdown-menu.bs-grid.dropdown-menu-start.p-3(style={minWidth: 450})
          .dropdown-arrow
          .row.mb-1
            label.col-2.col-form-label Folder
            .col-10.input-group.input-group-sm(style={height: 10})
              button.bttn.bttn-white.bttn-sm(
                type='file'
                value=folder
                onClick=${async e => {
                  let folder = await electronAPI.showFolderPicker()
                  if (folder)
                    setFoler(folder)
                }}
              )
                | Select Folder
              input.form-control(value=(folder || 'No folder selected') readOnly=true)
          .row
            label.col-2.col-form-label Color
            .col-10: input.form-control.form-control-sm(type='color' value=color onChange=e => setColor(e.target.value) style={maxWidth: 80})
          .d-flex
            button.btn.w-100.btn-primary.mt-3(disabled=!folder onClick=() => {
              app.addNotebook(folder, color)
            })
              | Create Notebook
    `
  }

  return <Tabs
    id='nav-rail'
    direction='vertical'
    Root={({children}) => pug`
      .pane.sidebar(style={maxWidth: 150, width: 150, overflow: 'visible'})
        nav.nav-group
          .row.justify-content-between
            h5.nav-group-title Notebooks
            AddNotebook
          = children
    `}
    Tab={({active, index, focus, close, ...notebook}) => pug`
      a.nav-group-item.w-100(className=(active && 'active') onClick=() => {
        switchNotebook(index)
        focus()
      })
        span.icon.icon-book(style={color: notebook.color})
        = notebook.title
    `}
    New={() => null}
    tabs={notebooks}
  />

}

export function Sidebar({notes=[], active, addNote=() => {}, switchNote=() => {}}) {

  return pug`
    .pane.pane-sm.sidebar
      nav.list-group(style={overflow: 'auto'})
        .row.justify-content-between
          h5.nav-group-title Notes
          AddButton(onClick=addNote)
        each note, i in notes
          li.list-group-item(key=i className=(active === i ? 'active' : '') onClick=() => switchNote(i))
            //img.img-circle.media-object.pull-left(src=placeholder width='32' height='32')
            .media-body
              if note.title
                h6
                  if note.modified
                    | *
                  = note.title
              else
                h6.text-muted Untitled
              p(style={maxHeight: '1.5em'})
                HTML= note.content
  `
}