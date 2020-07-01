import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

// How to add style
const Card = props => {
  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000', // shadow only works on IOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8, // this is for Andriod
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10 
  }
});

export default Card;
