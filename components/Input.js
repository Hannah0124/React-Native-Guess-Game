import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

// How to add style
const Input = props => {
  return (
    // ...props.style => outside of style
    <TextInput {...props} style={{...styles.input, ...props.style}}
    />
    // ...props => 'forwarding' your props to the component you're using in your custom component
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
});

export default Input;
