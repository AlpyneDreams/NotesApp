import React from 'react'
import bootstrap from '../dist/bootstrap/js/bootstrap.bundle.min.js'

// TODO: Fade out animation is broken...

export default function Modal({title, close=true, header=true, style={}, children}) {
  const ref = React.useRef()

  React.useEffect(() => {
    let modal = bootstrap.Modal.getOrCreateInstance(ref.current)
    modal.show()
  }, [])

  return pug`
    #exampleModal.modal.fade.py-5(ref=ref tabIndex='-1' role='dialog')
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

export function ModalConfirm() {
  return pug`
    Modal(style={maxWidth: '350px'} header=false)
      .modal-body.p-4.text-center
        h5.mb-1 Enable this setting?
        p.mb-0 You can always change your mind in your account settings.
      .modal-footer.flex-nowrap.p-0
        button.fill.bttn-light.bttn.bttn-lg.bttn-link.fs-6.text-decoration-none.col-6.m-0.rounded-0.border-end(type='button')
          strong Yes, enable
        button.fill.bttn-light.bttn.bttn-lg.bttn-link.fs-6.text-decoration-none.col-6.m-0.rounded-0(type='button' data-bs-dismiss='modal')
          | No thanks
  `
}