import React from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'

export function Sidebar({style={}, activeNote, setNote}) {

  function NoteItem({name, title}) {
    const active = activeNote == name
    return <Text
      style={[{padding: 8}, active && {backgroundColor: '#bbb'}]}
      onPress={() => setNote(name)}
    >
      {title}
    </Text>
  }

  return (
    <View style={{flexDirection: 'row'}}>
        <View style={[{backgroundColor: '#333'}, style]}>
            <Button title='📓' color='#333'/>
            <Button title='+' color='#333'/>
            <Button title='🔎'/>
        </View>
        <View style={[{backgroundColor: '#ccc', minWidth: 250}, style]}>
            <NoteItem name='note1' title='New Note'/>
            <NoteItem name='note2' title='My Note'/>
            <NoteItem name='stickies' title='Sticky Notes'/>
            <NoteItem name='stickies2' title='Freeform Sticky Notes'/>
            <NoteItem name='sidebyside' title='Side-by-Side Test'/>
        </View>
    </View>
  )
}
