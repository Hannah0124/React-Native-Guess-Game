import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <BodyText>The Game is Over!</BodyText>
      <View style={styles.imageContainer}>
        <Image 
          fadeDuration={300}
          // source={require('../assets/success.png')} 
          source={{uri: 'https://cdn.dribbble.com/users/4851961/screenshots/10129725/dribble2_4x.jpg?compress=1&resize=1200x900'}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      {/* resizeMode: cover (default) => keeps image ratio */}

      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150, // half of wieth and height
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default GameOverScreen;