import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TextInput, View, Text } from 'react-native'

export function TextEditor({style}) {
  const [blocks, setBlocks] = React.useState(['Hello, world!'])
  const [active, setActive] = React.useState(0)
  const lines: any = React.useRef(blocks.map(() => null))

  function focus(line) {
    line = Math.max(0, Math.min(blocks.length - 1, line))
    lines.current[line].focus()
  }
  
  function addBlock() {
    // TODO: Insert at active line
    setBlocks([...blocks, ''])
    setActive(blocks.length)
  }

  function setBlock(i, text) {
    if (text === '\n') {
      return
    }
    let newBlocks = [...blocks]
    newBlocks[i] = text
    setBlocks(newBlocks)
  }

  return (
    <View style={style}>
      <View style={{marginBottom: 12}}>
        <Text style={{color: '#ddd', fontSize: 20}}>Title</Text>
      </View>
      
      {blocks.length == 0
        && <Text style={{color: '#ddd'}}>Note</Text>}
        
      {blocks.map((block, i) => (
        <TextBlock
          key={`block-${i}`}
          ref={ref => lines.current[i] = ref}
          line={i+1}
          active={i === active}
          autoFocus={i === active}
          onFocus={() => setActive(i)}
          text={block}
          setText={text => setBlock(i, text)}
          onKeyPress={({nativeEvent: {key}}) => {
            switch (key) {
              case 'Enter':
                addBlock()
                break
              case 'ArrowUp':
                focus(i-1)
                break
              case 'ArrowDown':
                focus(i+1)
                break
              default:
                console.log(key)
                break
            }
          }}
        />
      ))}
    </View>
  )
}

const TextBlock = React.forwardRef(({text, setText, onFocus, line, active=false, onKeyPress, ...props}, ref: any) => {
  const [selection, setSelection] = React.useState({start: 0, end: 0})
  return <View style={{flexDirection: 'row', backgroundColor: active ? '#f0f0f0' : '#ffffff'}}>
    <Text style={{
      color: active ? '#000' : '#aaa',
      flex: 0.05,
      fontFamily: 'monospace',
      fontSize: 16,
      paddingLeft: 16,
    }}>
      {line}
    </Text>
    <TextInput
      ref={ref}
      onFocus={onFocus}
      style={{outline: 'none', flex: 1}}
      value={text}
      onChangeText={setText}
      onKeyPress={onKeyPress}
      onSelectionChange={({nativeEvent: {selection}}) => setSelection(selection)}
      {...props}
    />
  </View>
})
