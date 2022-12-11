import React from 'react'

function getSplice(arr, ...args) {
  arr = [...arr]
  arr.splice(...args)
  return arr
}

export default function Tabs({
  tabs: tabList = [{name: 'Tab'}, {name: 'Tab'}, {name: 'Tab'}],
  activeTab = 0,
  Tab=BarTab,
  Root=BarRoot,
  New=BarNew
}) {
  const [tabs, setTabs] = React.useState(tabList)
  const [active, setActive] = React.useState(activeTab)

  function newTab() {
    setTabs([...tabs, {name: 'Tab'}])
    setActive(tabs.length)
  }

  function closeTab(i) {
    setTabs(getSplice(tabs, i, 1))
    if (active >= i)
      if (active == tabs.length - 1)
        setActive(active - 1)
  }

  return pug`
    Root
      ${tabs.map((tab, i) => 
        <Tab
          key={i}
          active={i === active}
          focus={() => setActive(i)}
          close={tabs.length > 1 && (e => {e.stopPropagation(); closeTab(i)})}
          {...tab}
        />
      )}
      New(onClick=newTab)
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
