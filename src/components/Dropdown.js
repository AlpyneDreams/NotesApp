import React, { useEffect } from 'react'
import bootstrap from '../dist/bootstrap/js/bootstrap.bundle.min.js'

export function Dropdown({ visible=true, onClose=() => {}, pos, children }) {

  const ref = React.useRef()

  function closeMenu(e) {
    if (e.target.closest('.dropdown-menu') != ref.current
     || e.target.classList.contains('dropdown-item')) {
      onClose()
      document.removeEventListener('click', closeMenu)
    }
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', closeMenu)
    } else {
      document.removeEventListener('click', closeMenu)
    }
  }, [visible])

  return pug`
    .dropdown
      .dropdown-menu(
        ref=ref
        className=visible ? 'show' : ''
        style=${{
          position: 'fixed',
          top: pos?.y, left: pos?.x,
        }}
      )
        = children
  `
}

export function DropdownItem({children, className='', ...props}) {
  return pug`
    a.dropdown-item(href='#' className=className ...props)
      = children
  `
}