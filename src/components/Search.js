import hotkeys from 'hotkeys-js'
import React from 'react'
import bootstrap from '../dist/bootstrap/js/bootstrap.bundle.min.js'

export default function Search() {
  const searchBar = React.useRef()
  const dropdown = React.useRef()

  async function startSearch() {
    return await electronAPI.findInPage(searchBar.current.value, {findNext: true})
  }

  async function nextSearch() {
    return await electronAPI.findInPage(searchBar.current.value, {findNext: false})
  }

  async function prevSearch() {
    return await electronAPI.findInPage(searchBar.current.value, {forward: false, findNext: false})
  }

  React.useEffect(() => {
    // Stop searching when closed
    dropdown.current.addEventListener('hidden.bs.dropdown', () => {
      electronAPI.stopFindInPage()
      hotkeys.setScope('default')
    })

    // Autofocus, and search again if already searching
    dropdown.current.addEventListener('shown.bs.dropdown', async () => {
      if (searchBar.current.value)
        await startSearch()
      searchBar.current.focus()
      hotkeys.setScope('search')
    })
    
    // Start search on change
    searchBar.current.addEventListener('change', async e => {
      startSearch()
    })
    
  }, [])

  return pug`
    #search.dropdown.ms-auto.me-1
      button.btn.btn-body.btn-sm.btn-dropdown(data-bs-toggle='dropdown' data-bs-auto-close='outside' ref=dropdown)
        i.bi.bi-search
      .dropdown-menu.dropdown-menu-end.p-2(style={minWidth: 380})
        .dropdown-arrow
        //-.input-group
        .row.align-items-stretch
          input#search-bar.fill.form-control.form-control-sm.me-2(
            type='text' placeholder='Search' ref=searchBar
          )
          .input-group(style={width: 'unset'}).me-2
            a.bttn.bttn-light.bttn-sm.link-secondary.text-decoration-none.center-content(
              style={marginRight: 1} href='#' onClick=e => prevSearch()
            )
              i.bi.bi-chevron-up
            a.bttn.bttn-light.bttn-sm.link-secondary.text-decoration-none.center-content(
              href='#' onClick=e => nextSearch()
            )
              i.bi.bi-chevron-down
          a.center-content.bttn.bttn-light.bttn-sm.link-secondary.text-decoration-none(
            href='#' onClick=e => {
              bootstrap.Dropdown.getOrCreateInstance(e.target.closest('.dropdown')).hide()
              electronAPI.stopFindInPage()
              hotkeys.setScope('default')
            }
          )
            i.bi.bi-x-lg
  `
}