import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API_URL } from './constants';

export default function App() {
  const [text, setText] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const inputRef = useRef(null);

  const handleChangeText = (newText) => {
    setText(newText);
  };

  const handleTweetButtonPress = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApiResponse('sent!');
        setText('');
        setTimeout(() => {
          setApiResponse('');
        }, 5000);
      })
      .catch((error) => {
        setApiResponse('error!');
        setTimeout(() => {
          setApiResponse('');
        }, 5000);
        console.error('Error:', error);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consume less, create more</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onChangeText={handleChangeText}
        placeholder="Enter tweet text here"
        maxLength={280}
        onBlur={() => Keyboard.dismiss()}
        multiline
        returnKeyType="done"
      />
      <Text style={[styles.count, text.length > 280 ? styles.error : null]}>
        {`${text.length}/280`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleTweetButtonPress}>
        <Text style={styles.buttonText}>Tweet</Text>
      </TouchableOpacity>
      {apiResponse && (
        <Text style={styles.apiResponse}>{apiResponse}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: 'lightgray',
    width: '90%',
    height: '50%',
    fontSize: 20,
  },
  count : {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  error: {
    color: 'red',
  },
  button: {
    backgroundColor: 'blue',
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  apiResponse: {
    color: 'green',
  },
});