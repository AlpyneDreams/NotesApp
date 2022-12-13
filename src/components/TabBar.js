import React from 'react'
import Reorder, {reorder} from 'react-reorder'

function getSplice(arr, ...args) {
  arr = [...arr]
  arr.splice(...args)
  return arr
}

export default function Tabs({
  tabs: tabList = [{name: 'Tab'}], setTabs: setTabList = null,
  direction = 'horizontal',
  id='tab-bar',
  activeTab = 0, setActiveTab = null,
  onChange = (tab, idx) => {},
  newTab = () => {return {name: 'Tab'}},
  Tab=BarTab,
  Root=BarRoot,
  New=BarNew
}) {
  let [tabs, setTabs] = []
  if (!setTabList)
    [tabs, setTabs] = React.useState(tabList)
  else
    [tabs, setTabs] = [tabList, setTabList]
  
  let [active, _setActive] = []
  if (!setActiveTab)
    [active, _setActive] = React.useState(activeTab)
  else
    [active, _setActive] = [activeTab, setActiveTab]

  const setActive = (i, tab) => {_setActive(i); onChange(tab ?? tabs[i], i)}

  function addTab() {
    const tab = newTab()
    setTabs([...tabs, tab])
    setActive(tabs.length, tab)
  }

  function closeTab(i) {
    setTabs(getSplice(tabs, i, 1))
    if (active >= i)
      if (active == tabs.length - 1)
        setActive(active - 1)
  }

  const newButton = <New key='new-tab' onClick={addTab} />

  function onReorder(event, previousIndex, nextIndex, fromId, toId) {
    if (newButton != null && previousIndex === tabs.length)
      return

    setTabs(reorder(tabs, previousIndex, nextIndex))

    // Map indices to new order to keep current tab
    let indices = Array(tabs.length).fill().map((_, i) => i)
    indices = reorder(indices, previousIndex, nextIndex)

    setActive(indices.indexOf(active))
  }

  return pug`
    Reorder(
      reorderId=id
      lock=(direction === 'vertical') ? 'horizontal' : 'vertical'
      component=Root
      onReorder=onReorder
      holdTime=200
      placeholder=${<Tab/>}
    )
      each tab, i in [...tabs, -1]
        if tab != -1
          Tab(
            key=i
            index=i
            active=(i === active)
            focus=() => setActive(i)
            close=tabs.length > 1 && (e => {e.stopPropagation(); closeTab(i)})
            ...tab
          )
        else
          = newButton
  `

}

const BarTab = ({active, focus, close, name}) => pug`
  li.nav-item(
    onClick=focus
  )
    a.nav-link.py-1(
      className=active ? 'active bg-transparent border-bottom' : ''
    )
      = name
      if close
        a.btn-close.ms-2(onClick=close)
`

const BarRoot = ({children}) => pug`
  ul.nav.nav-tabs.align-items-end.bg-body-tertiary
    = children
`

const BarNew = ({onClick}) => pug`
  a.btn.btn-link.btn-sm.h-100.text-body(onClick=onClick)
    span.icon.icon-plus
`
