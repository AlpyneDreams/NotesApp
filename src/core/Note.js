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

    if (!this.path)
      this.path = this.title
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
