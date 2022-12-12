import hotkeys from 'hotkeys-js'

hotkeys.filter = e => true

export default function (app) {

  hotkeys.unbind()
  
  hotkeys('ctrl+s', e => {
    app.note.save()
  })
}
