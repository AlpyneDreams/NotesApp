import React from 'react'

export default function HTML({children, live = false, deps=[], ...props}) {
    const ref = React.useRef()
  
    React.useEffect(() => {
      ref.current.innerHTML = children
    }, deps.concat(live ? [] : [children]))
  
    return pug`
      span(ref=ref ...props)
    `
  }
  