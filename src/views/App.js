import React, { Children } from 'react'
import Toolbar from '../components/Toolbar'
import TabBar from '../components/TabBar'
import {NavRail, Sidebar} from '../components/Sidebar'
import Reorder from 'react-reorder'
import { Note, Notebook } from '../core/Note'
import { useForceUpdate } from '../util'
import HTML from '../components/HTML'

const notebookPaths = fs.readdirSync('notes').map(path => Path.join('notes', path))

const notebooks = notebookPaths.map(path => Notebook.fromFile(path))
/*
const notebooks = [
  new Notebook({title: 'Notebook 1', color: '#fc605b', notes: [
    new Note({title: 'Hello', content: 'Content'}),
    new Note({title: 'Hello 2', content: 'Content 2'})
  ]}),
  new Notebook({title: 'Notebook 2', color: '#fdbc40', notes: [
    new Note({title: 'Hello 3', content: 'Content 3'})
  ]}),
  new Notebook({title: 'Notebook 3', color: '#34c84a'}),
  new Notebook({title: 'Notebook 4', color: '#57acf5'}),
]
*/

export const NotesContext = React.createContext()

function App() {
  
  const forceUpdate = useForceUpdate()

  // Selected notebook
  const [notebookIdx, setNotebook] = React.useState(0)
  const notebook = notebooks[notebookIdx]

  // Selected note
  const [noteIdx, setNote] = React.useState(notebook.noteIdx)
  const note = notebook.notes[noteIdx]

  const updateNote = (props) => {
    Object.assign(notebook.notes[noteIdx], props)
    forceUpdate()
  }
  
  // Load note if it's not yet loaded
  const loaded = note.loaded
  React.useEffect(() => {
    if (!loaded) {
      note.load()
      updateNote({content: note.content})
    }
  }, [notebookIdx, noteIdx])

  const switchNotebook = (i) => {
    notebooks[notebookIdx].noteIdx = noteIdx
    setNotebook(i)
    setNote(notebooks[i].noteIdx)
  }

  function addNote() {
    const note = new Note()
    notebook.notes.push(note)
    setNote(notebook.notes.length - 1)
  }

  const NotesProvider = NotesContext.Provider

  return pug`
    NotesProvider(value={notebook, note, updateNote})
      .window-content.col
        Toolbar
        TabBar
        .row.fill(style={overflow: 'hidden'})
          NavRail(notebooks=notebooks switchNotebook=switchNotebook)
          Sidebar(notes=notebook.notes active=noteIdx addNote=addNote switchNote=setNote)
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
    .fill.col.padded
      input#note-title(
        type='text'
        placeholder='Title'
        value=note.title
        onChange=e => updateNote({title: e.target.value})
      )
      HTML.markdown-body.selectable-text.fill(
        live=true
        spellCheck=false
        deps=[note.path, note.loaded]
        contentEditable="true"
        suppressContentEditableWarning
        style={flex: 1, outline: 'none'}
        onInput=e => {
          updateNote({content: e.target.innerHTML})
        }
      )
        = note.content
  `
}
