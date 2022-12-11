
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true
})
md.use(require('markdown-it-front-matter'), function(fm) {})
md.use(require('markdown-it-underline'))
md.use(require('markdown-it-katex'))
md.use(require('markdown-it-highlightjs'), {hljs: require('highlight.js')})

/** @type {import('fs')} */
const fs = window.fs

/** @type {import('path')} */
const Path = window.Path

function parseHtml(html) {
  const template = document.createElement('div')
  template.innerHTML = html
  return template
}

export class Note {
  title = ''
  content = null
  mdContent = null
  path = ''
  loaded = true

  constructor(props={}) {
    Object.assign(this, props)
    if (!this.path)
      this.path = this.title
  }

  async parseContent() {
    const html = md.render(this.mdContent)
    const dom = parseHtml(html)

    
    const h1 = dom.querySelector('h1')
    if (h1) {
      this.title = h1.textContent
      dom.removeChild(h1)
    }
    this.content = dom.innerHTML
    this.loaded = true
  }

  static fromFile(path) {
    const body = fs.readFileSync(path, 'utf-8')
    let title = Path.basename(path, '.md')

    return new Note({title, mdContent: body, path, loaded: false})
  }
}

export class Notebook {
  title = ''
  color = null
  notes = []

  constructor(props={}) {
    Object.assign(this, props)

    if (this.notes.length === 0)
      this.notes.push(new Note())
  }

  static fromFile(path) {
    const files = fs.readdirSync(path, 'utf-8')
    return new Notebook({
      title: Path.basename(path),
      notes: files.map(file => Note.fromFile(Path.join(path, file)))
    })
  }
}
