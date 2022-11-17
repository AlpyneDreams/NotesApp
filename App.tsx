import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TextInput, View } from 'react-native'
import { TextEditor } from './components/TextEditor'
import { Stickies } from './components/Stickies'
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [activeNote, setNote] = React.useState('stickies');
  return (
    <View style={styles.container}>
      <Sidebar activeNote={activeNote} setNote={setNote} />
      <NoteView name={activeNote} />
      <StatusBar style="auto" />
    </View>
  );
}

// Placeholder
function NoteView({name}) {
  switch (name) {
    case 'note1':
      return <View>

      </View>
    case 'sidebyside':
      return <View style={styles.container}>
        <TextEditor style={styles.textBox} />
        <TextEditor style={styles.textBox} />
      </View>
    case 'stickies':
      return <Stickies/>
    case 'stickies2':
      return <Stickies freeform/>
    default:
      return <TextEditor style={styles.textBox} />
    
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100%'
  },
  /*container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 100,
  },*/
  textBox: {
    flex: 1,
    width: '80%',
  }
});
