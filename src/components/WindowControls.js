import React from 'react'

export default function WindowControls() {
  return pug`
    .toolbar-actions.row(style={marginLeft: 12, marginRight: 4, paddingTop: 4, paddingBottom: 4})
      Close
      Maximize
      Minimize
  `
}

const Close = () => <TrafficLight color='#ff5250' stroke='#df4340' />
const Maximize = () => <TrafficLight color='#ffbd00' stroke='#de9f34' />
const Minimize = () => <TrafficLight color='#00ce1e' stroke='#1fa82f' />

function TrafficLight({color, stroke}) {
  return pug`
    span.icon.icon-record(style={
      color: color,
      WebkitTextStroke: stroke ? '0.5px ' + stroke : null,
      fontSize: 18,
      marginRight: 8,
      lineHeight: 1,
      marginTop: 3,
    })
  `
}