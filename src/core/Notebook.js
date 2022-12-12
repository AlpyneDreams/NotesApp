
import Note from './Note'

export default class Notebook {
  title = ''
  path = null
  color = null
  notes = []
  noteIdx = 0

  constructor(props = {}) {
    Object.assign(this, props)

    if (this.notes.length === 0)
      this.notes.push(new Note())
  }

  static fromFile(path, props={}) {
    console.log('Reading notebook:', path)
    let files = fs.readdirSync(path, 'utf-8')
    files = files.filter(f => f.endsWith('.md'))
    return new Notebook({
      title: Path.basename(path),
      path: path,
      notes: files.map(file => Note.fromFile(Path.join(path, file))),
      ...props
    })
  }

  static loadNotebooks() {
    return Notebook.loadNotebookList().map(
      ({path, ...props}) => Notebook.fromFile(path, props)
    )
  }

  /// Notebook List ///

  static storeNotebookList(notebooks) {
    notebooks = notebooks.map(({title, path, color}) => ({title, path, color}))
    localStorage.setItem('notebooks', JSON.stringify({notebooks}))
  }

  static #loadNotebookList() {
    return JSON.parse(localStorage.getItem('notebooks')).notebooks
  }

  static loadNotebookList() {
    if (!localStorage.getItem('notebooks')) {
      let list = [...fs.readdirSync('notes').map(
        path => ({
          path: Path.join('notes', path),
          color: '#737475'
        })
      )]
      this.storeNotebookList(list)
      return list
    } else {
      return this.#loadNotebookList()
    }
  }
}
