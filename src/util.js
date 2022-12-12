import React from 'react'

export function useForceUpdate() {
  const [, setState] = React.useState()
  return React.useCallback(() => setState({}), [])
}

export function useObjectState() {
  const [state, setState] = React.useState({})

  const proxy = new Proxy(state, {
    set: (target, prop, value) => {
      setState(Object.assign(state, {[prop]: value}))
      return true
    }
  })

  return [proxy, (props) => setState(Object.assign(state, props))]
}
