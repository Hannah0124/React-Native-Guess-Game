import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView  // For the landscape issue
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
    // listener 
    Dimensions.addEventListener('change', updateLayout); // update the new one
    return () => {
      Dimensions.removeEventListener('change', updateLayout); // clean up the old one

    };
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ) {
      Alert.alert(
        'Invalid number!', 
        'Number has to be between 1 and 99.', 
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      ); // (title, message)
      return;
    }

    setConfirmed(true);
    
    setSelectedNumber(parseInt(enteredValue)); // convert from text to num

    setEnteredValue('');
    Keyboard.dismiss(); // dismiss the keyboard (as soon as you press 'confirm')
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        {/* pass selectedNumber */}
        <NumberContainer>{selectedNumber}</NumberContainer> 
        <MainButton 
          onPress={() => props.onStartGame(selectedNumber)}>
            START GAME
        </MainButton>
      </Card>
    );
  }


  return (
    <ScrollView>
      {/* Never overlays the input you type in */}
      {/* behavior types: padding, position, height */}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}> 
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss(); // dismiss the keyboard when clicking on somewhere else
        }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input 
                style={styles.input} 
                blurOnSubmit // When clicking on the check box, the number buttons disappear!
                autoCapitalize='none'
                autoCorrect={false}
                // keyboardType='numeric'
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                {/* <View style={styles.button}> */}
                <View style={{width: buttonWidth}}>
                  <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                </View>
                {/* <View style={styles.button}> */}
                <View style={{width: buttonWidth}}>
                  <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    // width: 300,
    // maxWidth: '80%',

    // for small phones
    maxWidth: '95%',
    width: '80%',
    minWidth: 300,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    // width: 100
    width: Dimensions.get('window').width / 4 // This only calculates when the app starts, so, when the phone screen rotates, it doesn't fit.
    // width: '40%'
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
});

export default StartGameScreen;
