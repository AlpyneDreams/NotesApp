import React from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'

export function Sidebar({style={}}) {
  return (
    <View style={{flexDirection: 'row'}}>
        <View style={[{backgroundColor: '#333'}, style]}>
            <Button title='📓' color='#333'/>
            <Button title='+' color='#333'/>
            <Button title='🔎'/>
        </View>
        <View style={[{backgroundColor: '#ccc', minWidth: 250}, style]}>
            <Text style={{padding: 8, backgroundColor: '#bbb'}}>My Note</Text>
            <Text style={{padding: 8}}>My Note</Text>
        </View>
    </View>
  )
}
