import React from 'react'

function getSplice(arr, ...args) {
  arr = [...arr]
  arr.splice(...args)
  return arr
}

function TabBar() {

  const [tabs, setTabs] = React.useState([])
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    setTabs([
      {name: 'Tab'},
      {name: 'Tab active'},
      {name: 'Tab'},
    ])
  }, [])

  function newTab() {
    setTabs([...tabs, {name: 'Tab'}])
    setActive(tabs.length)
  }

  function closeTab(i) {
    setTabs(getSplice(tabs, i, 1))
    if (active >= i)
      setActive(active - 1)
  }

  const Tab = ({name, i}) => pug`
    .tab-item(
      className=(i == active) ? 'active' : ''
      onClick=() => setActive(i)
    )
      if tabs.length > 1
        span.icon.icon-cancel.icon-close-tab(onClick=e => {e.stopPropagation(); closeTab(i)})
      = name
  `

  return pug`
    .tab-group
      ${tabs.map((tab, i) => <Tab key={i} i={i} {...tab} />)}
      .tab-item.tab-item-fixed(onClick=newTab)
        span.icon.icon-plus
  `
}

export default TabBar