import React from 'react'
import bootstrap from '../dist/bootstrap/js/bootstrap.bundle.min.js'

// TODO: Fade out animation is broken...

export default function Modal({title, close=true, onClose=() => {}, staticBackdrop=false, header=true, style={}, children}) {
  const ref = React.useRef()

  React.useEffect(() => {
    let modal = bootstrap.Modal.getOrCreateInstance(ref.current)
    modal.show()

    ref.current.addEventListener('hidden.bs.modal', () => {
      onClose()
    })
  }, [])

  return pug`
    #exampleModal.modal.fade.py-5(
      ref=ref tabIndex='-1' role='dialog'
      data-bs-backdrop=staticBackdrop ? 'static' : undefined
    )
      .modal-dialog(style=style)
        .modal-content.rounded-3.overflow-hidden.shadow
          if header == true
            .modal-header.border-bottom-0
              h1.modal-title.fs-5= title
              if close
                button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
          else
            ${header}
          ${children}
  `
}

export function ModalPrompt({type, okay='Okay', cancel='Close', children, placeholder, ...props}) {
  return pug`
    Modal(style={maxWidth: '350px'} ...props)
      .modal-body.py-0
        ${children}
        input.form-control.form-control-sm(
          type=type
          placeholder=placeholder)
      .modal-footer.row.border-top-0
        button.btn.btn-lg.btn-light(type='button' data-bs-dismiss='modal')= cancel
        button.btn.btn-lg.btn-primary(type='button')= okay
  `
}

export function ModalConfirm({
  title='Title',
  description='',
  yes='Okay', onConfirm=() => {}, yesClass='',
  no='Cancel', onCancel=() => {}, noClass='',
  onClose=() => {}, 
  ...props}
) {

  const confirm = () => {onClose(); onConfirm()}
  const cancel = () => {onClose(); onCancel()}

  return pug`
    Modal(style={maxWidth: '350px'} header=false onClose=onClose ...props)
      .modal-body.p-4.text-center
        h5.mb-1= title
        p.mb-0= description
      .modal-footer.flex-nowrap.p-0
        button.fill.bttn-light.bttn.bttn-lg.bttn-link.fs-6.text-decoration-none.col-6.m-0.rounded-0.border-end(
          className=noClass
          type='button' data-bs-dismiss='modal' onClick=cancel
        )
          = no
        button.fill.bttn-light.bttn.bttn-lg.bttn-link.fs-6.text-decoration-none.col-6.m-0.rounded-0(
          className=yesClass autoFocus
          type='button' data-bs-dismiss='modal' onClick=confirm
        )
          strong= yes
  `
}