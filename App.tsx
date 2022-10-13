import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TextInput, View } from 'react-native'
import { TextEditor } from './components/TextEditor'

export default function App() {
  const [text, setText] = React.useState('Hello, world!');
  return (
    <View style={styles.container}>
      <TextEditor style={styles.textBox} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 100,
  },
  textBox: {
    flex: 1,
    width: '80%',
  }
});
