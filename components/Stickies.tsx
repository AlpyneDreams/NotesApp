import React from 'react'
import { StyleSheet, View, Text } from 'react-native'


export function Stickies({freeform=false, style={}}) {
    return <View style={style}>
        <StickyNote>Sticky Note</StickyNote>
    </View>
}

function StickyNote({children}) {
    return <View><Text>{children}</Text></View>
}

const styles = StyleSheet.create({
    stickyNote: {
        backgroundColor: '#AAAA33',
        width: 200, height: 200,
        padding: 10
    }
})