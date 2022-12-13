import React, { useEffect } from 'react'
import Tabs from './TabBar'
import HTML from './HTML'
import { NotesContext } from '../views/App'
import { Dropdown, DropdownItem } from './Dropdown'
import { ModalConfirm } from './Modal'

function AddButton({...props}) {
  return pug`
    button.btn.btn-body.btn-mini.m-1(style={padding: '2px 6px'} ...props)
      i.bi.bi-plus
  `
}

export function NavRail({notebooks=[], notebookIdx, switchNotebook=(i) => {}}) {
  const app = React.useContext(NotesContext)

  const [contextMenu, setContextMenu] = React.useState(false)
  
  function AddNotebook() {
    const [folder, setFoler] = React.useState()
    const [color, setColor] = React.useState('#737475')

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
          button.btn.w-100.btn-primary.mt-3(disabled=!folder style={height: 40} onClick=() => {
            app.addNotebook(folder, color)
          })
            | Create Notebook
    `
  }

  return <Tabs
    id='nav-rail'
    direction='vertical'
    activeTab={notebookIdx} setActiveTab={switchNotebook}
    Root={({children}) => pug`
      .pane.sidebar.bg-body-tertiary(style={maxWidth: 150, overflow: 'visible'})
        nav.list-group.list-group-flush
          .row.justify-content-between.p-1
            h5.small.m-1.mt-2.text-secondary Notebooks
            AddNotebook
          = children
        Dropdown(visible=!!contextMenu onClose=() => setContextMenu(false) pos=contextMenu)
          DropdownItem(onClick=() => app.removeNotebook(contextMenu.index)) Remove Notebook
    `}
    Tab={({active, index, focus, close, ...notebook}) => pug`
      a.list-group-item.w-100.d-flex(
        className=(active && 'active')
        onClick=(e) => {
          focus()
          switchNotebook(index)
        }
        onContextMenu=e => setContextMenu({index, x: e.pageX, y: e.pageY})
      )
        span.icon.icon-book.me-2(style={color: !active && notebook.color})
        = notebook.title
    `}
    New={() => null}
    tabs={notebooks}
  />

}

export function Sidebar({notes=[], active}) {

  const app = React.useContext(NotesContext)
  const [contextMenu, setContextMenu] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  
  return pug`
    .pane-sm.border-start.border-end.bg-body-tertiary
      nav.list-group.list-group-flush(style={overflow: 'auto'})
        .list-group-item.p-1.row.justify-content-between
          h5.small.m-1.mt-2.text-secondary Notes
          AddButton(onClick=app.addNote)
        each note, i in notes
          li.list-group-item(
            key=i
            style={overflow: 'hidden'}
            className=(active === i ? 'active' : '')
            onClick=() => app.switchNote(i)
            onContextMenu=e => setContextMenu({i, x: e.pageX, y: e.pageY})
          )
            //-img.img-circle.media-object.pull-left(src=placeholder width='32' height='32')
            //-.media-body
            if note.title
              h6
                if note.modified
                  | *
                = note.title
            else
              h6.text-muted Untitled
            p(style={maxHeight: '1.5em'})
              HTML= note.content.slice(0, 100)
      Dropdown(visible=!!contextMenu onClose=() => setContextMenu(false) pos=contextMenu)
        DropdownItem.link-danger(onClick=() => setModal(contextMenu.i)) Delete Note
      if modal !== false
        ModalConfirm(
          title='Delete Note'
          onClose=() => setModal(false)
          onConfirm=() => app.deleteNote(modal)
          description=${<>
            Are you sure you want to delete <b>{app.notebook.notes[modal].title}</b>?<br/>
            The file will be deleted permanently.
          </>}
          yes='Delete' yesClass='link-danger'
          no='Cancel'
        )
  `
}