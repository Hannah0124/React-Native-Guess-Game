import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // icon package

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude); // recursion
  } else {
    return randNum;
  }
};

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1); // useRef => the component will not re-render!
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props; // destructuring

  useEffect(() => {
    if (currentGuess === userChoice) {
      // onGameOver(rounds);
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    // validation
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert(
        'Don\'t lie!', 
        'You know that this is wrong...', 
        [{text: 'Sorry!', style: 'cancel'}]
      );
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess; // change the currentHigh value (max is exclusive)
    } else {
      currentLow.current = currentGuess + 1; // min is inclusive
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber); // The component will re-render!

    // setRounds(currentRounds => currentRounds + 1); // increment by 1
    setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses]);

  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <ScrollView>
        {pastGuesses.map(guess => (
          <View key={guess}>
            <Text>{guess}</Text>
          </View>)
        )}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  }
});

export default GameScreen;