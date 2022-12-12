import md from './Markdown'

/** @type {import('fs')} */
const fs = window.fs

/** @type {import('path')} */
const Path = window.Path

function parseHtml(html) {
  const template = document.createElement('div')
  template.innerHTML = html
  return template
}

export default class Note {
  title = ''
  content = null
  mdContent = null
  path = ''
  loaded = true
  modified = false
  onUpdate = () => {}

  constructor(props={}) {
    Object.assign(this, props)

    if (!this.title && this.directory) {
      // New untitled file: Untitled or Untitled 1, Untitled 2, etc.
      if (!this.path.endsWith('.md')) {
        let newPath = Path.join(this.directory, 'Untitled.md')
        if (fs.existsSync(newPath)) {
          let i = 1
          while (fs.existsSync(newPath = Path.join(this.directory, `Untitled ${i}.md`)))
            i++
        }
        this.path = newPath
        this.title = Path.basename(newPath, '.md')
      }

    } else {
      if (!this.path)
        this.path = this.title
    }
  }

  async load() {
    console.log('Loading note:', this.path)
    const body = fs.readFileSync(this.path, 'utf-8')
    this.mdContent = body
    const html = md.makeHTML(body)
    const dom = parseHtml(html)

    const h1 = dom.querySelector('h1')
    if (h1) {
      this.title = h1.textContent
      dom.removeChild(h1)
    }
    this.content = dom.innerHTML
    this.loaded = true
    this.onUpdate()
  }

  async save() {
    console.log('Saving note:', this.path)

    // Rename file if title changed (unless the name is already taken)
    if (this.title.length > 0 && Path.basename(this.path, '.md') !== this.title) {
      const newPath = Path.join(Path.dirname(this.path), this.title + '.md')
      if (!fs.existsSync(newPath)) {
        fs.renameSync(this.path, newPath)
        this.path = newPath
      }
    }

    const html = `<h1>${this.title}</h1>` + this.content
    this.mdContent = md.makeMarkdown(html)

    fs.writeFileSync(this.path, this.mdContent)
    this.modified = false
    this.onUpdate()
  }

  static fromFile(path) {
    return new Note({title: Path.basename(path, '.md'), path, loaded: false})
  }
}
