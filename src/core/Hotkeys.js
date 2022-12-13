import hotkeys from 'hotkeys-js'
import bootstrap from '../dist/bootstrap/js/bootstrap.bundle.min.js'

hotkeys.filter = e => true

export default function (app) {

  hotkeys.unbind()
  
  hotkeys('ctrl+s', e => {
    app.note.save()
  })

  hotkeys('ctrl+f', e => {
    bootstrap.Dropdown.getOrCreateInstance(document.querySelector('#search')).show()
    document.querySelector('#search-bar').focus()
    hotkeys.setScope('search')
  })

  hotkeys('enter', 'search', e => {
    electronAPI.findInPage(document.querySelector('#search-bar').value, {findNext: false})
  })

  hotkeys('shift+enter', 'search', e => {
    electronAPI.findInPage(document.querySelector('#search-bar').value, {forward: false, findNext: true})
  })

  hotkeys('esc', 'search', e => {
    electronAPI.stopFindInPage()
    hotkeys.setScope('default')
    bootstrap.Dropdown.getOrCreateInstance(document.querySelector('#search')).hide()
  })
}
