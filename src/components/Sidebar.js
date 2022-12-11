import React from 'react'
import Tabs from './TabBar'
import HTML from './HTML'

function AddButton({...props}) {
  return pug`
    button.bttn.bttn-white.btn-mini.m-1(style={padding: '2px 6px'} ...props)
      i.bi.bi-plus
  `
}

export function NavRail({notebooks=[], switchNotebook=(i) => {}}) {
  
  function AddNotebook() {
    return pug`
      .dropdown
        AddButton(data-bs-toggle='dropdown')
        .dropdown-menu.bs-grid.dropdown-menu-start.p-3(style={minWidth: 300})
          .dropdown-arrow
          .row.mb-1
            label.col.col-form-label.me-4 Name
            .col-8: input.form-control.form-control-sm(type='text' placeholder='Notebook')
          .row.justify-content-between
            label.col.col-form-label.me-4 Color
            .col-8: input.form-control.form-control-sm(type='color' value='#737475' style={maxWidth: 80})
          .d-flex
            button.btn.w-100.btn-primary.mt-3 Create Notebook
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
                h6= note.title
              else
                h6.text-muted Untitled
              p(style={maxHeight: '1.5em'})
                HTML= note.content
  `
}