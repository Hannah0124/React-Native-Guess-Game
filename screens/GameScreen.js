import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  FlatList,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // icon package

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
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

// For ScrollView
// const renderListItem = (guess, numOfRound) => (
//   <View key={guess} style={styles.listItem}>
//     <BodyText>#{numOfRound}</BodyText>
//     <BodyText>{guess}</BodyText>
//   </View>
// );

const renderListItem = (listLength, itemData) => ( // The first argument is the one I set in 'bind'
  // key will be done by native thanks to the FlatList
  <View style={styles.listItem}> 
    <BodyText>#{listLength - itemData.index}</BodyText> 
    {/* // itemData.index => default value */}
    <BodyText>{itemData.item}</BodyText>
    {/* itemData.item == guess */}
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1); // useRef => the component will not re-render!
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props; // destructuring

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });


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
    setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>

          <NumberContainer>{currentGuess}</NumberContainer>
          
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>

        <View style={styles.listContainer}>
          <FlatList 
            keyExtractor={(item) => item} 
            data={pastGuesses} 
            renderItem={renderListItem.bind(this, pastGuesses.length)} 
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>

      {/* e.g. */}
      {/* <Card style={Dimensions.get('window').height > 600 ? styles.buttonConatiner : styles.buttonContainerSmall}></Card> */}
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView> */}
        <FlatList 
          keyExtractor={(item) => item} 
          data={pastGuesses} 
          renderItem={renderListItem.bind(this, pastGuesses.length)} 
          contentContainerStyle={styles.list}
        />
      </View>
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
    // marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listContainer: {
    flex: 1, // for scrollView (Android)
    width: '60%',
    // width: Dimensions.get('window').width > 350 ? '60%' : '80%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1, // important for flex-end (ScrollView)!
    // alignItems: 'center', // flatList
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }
});

export default GameScreen;