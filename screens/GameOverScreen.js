import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image 
            fadeDuration={300}
            source={require('../assets/success.png')} 
            // source={{uri: 'https://cdn.dribbble.com/users/4851961/screenshots/10129725/dribble2_4x.jpg?compress=1&resize=1200x900'}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        {/* resizeMode: cover (default) => keeps image ratio */}

        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}> {props.roundsNumber} </Text>
            rounds to guess the number{' '}
            <Text style={styles.highlight}> {props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    // width: 300,
    // height: 300,
    // borderRadius: 150, // half of width and height
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7, // same size as width!
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    // marginVertical: 30
    marginVertical: Dimensions.get('window').height / 30
    // This effectively sets the vertical margin to 5% of the device height! (e.g.) heidht / 40 would set it to 2.5% etc.
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    // marginHorizontal: 80,
    // marginBottom: 20,
    // fontSize: 20
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOverScreen;