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
  
  const [active, _setActive] = React.useState(activeTab)

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
      each tab, i in [...tabs, null]
        if tab != null
          .row.fill(key=i)
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
  .tab-item(
    className=active ? 'active' : ''
    onClick=focus
  )
    if close
      span.icon.icon-cancel.icon-close-tab(onClick=close)
    = name
`

const BarRoot = ({children}) => pug`
  .tab-group
    = children
`

const BarNew = ({onClick}) => pug`
  .tab-item.tab-item-fixed(onClick=onClick)
    span.icon.icon-plus
`
