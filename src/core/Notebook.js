
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

  static fromFile(path) {
    console.log('Reading notebook:', path)
    let files = fs.readdirSync(path, 'utf-8')
    files = files.filter(f => f.endsWith('.md'))
    return new Notebook({
      title: Path.basename(path),
      path: path,
      notes: files.map(file => Note.fromFile(Path.join(path, file)))
    })
  }
}
