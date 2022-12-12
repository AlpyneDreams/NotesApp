import React, { Children } from 'react'
import Toolbar from '../components/Toolbar'
import TabBar from '../components/TabBar'
import {NavRail, Sidebar} from '../components/Sidebar'
import Reorder from 'react-reorder'
import Note from '../core/Note'
import Notebook from '../core/Notebook'
import { useForceUpdate, useObjectState } from '../util'
import HTML from '../components/HTML'
import registerHotkeys from '../core/Hotkeys'

const notebooks = Notebook.loadNotebooks()

export const NotesContext = React.createContext()

function App() {
  
  const forceUpdate = useForceUpdate()

  const [tabs, setTabs] = React.useState([{name: 'Tab', notebookIdx: 0, noteIdx: 0}])
  const [tabIdx, setTabIdx] = React.useState(0)
  const tab = tabs[tabIdx]

  // Selected notebook
  const [notebookIdx, setNotebook] = React.useState(0)
  const notebook = notebooks[notebookIdx]

  // Selected note
  const [noteIdx, setNote] = React.useState(notebook?.noteIdx)
  const note = notebook.notes[noteIdx]
  
  note.onUpdate = forceUpdate

  // Load note if it's not yet loaded
  const loaded = note.loaded
  React.useEffect(() => {
    if (!loaded) {
      note.load()
      tab.name = note.title
    }
  }, [notebookIdx, noteIdx])
  
  /// Callbacks ////

  const updateNote = (props = {}) => {
    Object.assign(notebook.notes[noteIdx], props)
    forceUpdate()
  }

  const switchNotebook = (i) => {
    // Store currently open note for this notebook
    notebooks[notebookIdx].noteIdx = noteIdx

    setNotebook(i)
    setNote(notebooks[i].noteIdx)
    
    // Update current tab
    tab.notebookIdx = i
    tab.name = notebooks[i].notes[notebooks[i].noteIdx].title
    setTabs(tabs)
  }

  function switchNote(i) {
    setNote(i)

    // Update current tab
    tab.noteIdx = i
    tab.name = notebook.notes[i].title
    setTabs(tabs)
  }

  function addNotebook(path, color) {
    const notebook = Notebook.fromFile(path)
    notebook.color = color
    notebooks.push(notebook)
    Notebook.storeNotebookList(notebooks)
    setNotebook(notebooks.length - 1)
  }

  function addNote() {
    const note = new Note({directory: notebook.path})
    note.save()
    notebook.notes.push(note)
    switchNote(notebook.notes.length - 1)
  }

  const NotesProvider = NotesContext.Provider
  const context = {notebook, note, updateNote, addNotebook}

  // Register hotkeys...
  React.useEffect(() => registerHotkeys(context), [notebook, note])

  return pug`
    NotesProvider(value=context)
      .window-content.col
        Toolbar
        TabBar(
          tabs=tabs setTabs=setTabs
          onChange=(tab, i) => {
            setTabIdx(i)
            setNotebook(tab.notebookIdx)
            setNote(tab.noteIdx)
          }
          newTab=() => ({name: note.title, notebookIdx, noteIdx})
        )
        .row.fill(style={overflow: 'hidden'})
          NavRail(notebooks=notebooks switchNotebook=switchNotebook)
          Sidebar(notes=notebook.notes active=noteIdx addNote=addNote switchNote=switchNote)
          .pane.row.fill.justify-content-center
            if loaded
              Editor(note=note updateNote=updateNote)
            else
              .spinner-border.text-primary(style={margin: 20})

  `
}

export default App

function Editor({note, updateNote}) {
  if (!note)
    return null
  return pug`
    #note-body.fill.col.p-3
      input#note-title(
        type='text'
        placeholder='Title'
        value=note.title
        onChange=e => updateNote({title: e.target.value, modified: true})
      )
      HTML.fill.markdown-body.selectable-text(
        live=true
        spellCheck=false
        deps=[note.path, note.loaded]
        contentEditable="true"
        suppressContentEditableWarning
        style={flex: 1, outline: 'none'}
        onInput=e => {
          updateNote({content: e.target.innerHTML, modified: true})
        }
      )
        = note.content
  `
}
