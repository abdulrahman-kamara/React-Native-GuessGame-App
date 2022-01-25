import { React, useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "./NumberContainer";
import Card from "./Card";

//This process is called recursion
const generateRandomNumber = (min, max, execlude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === execlude) {
    return generateRandomNumber(min, max, execlude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, props.userchoise)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // useEffect allow to run sideeffect or in general allow to run login login after every render circle
  const { userchoise, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userchoise) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userchoise, onGameOver]);

  // useRef hook is a hook that allows you to create object which you can bind to input that you can use
  // It also allow you to defind a value which survives component rerendred

  const nextGuessHandler = (direction) => {
    if (
      (direction === "Lower" && currentGuess < props.userchoise) ||
      (direction === "Higher" && currentGuess > props.userchoise)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong....", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "Lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((cutRounds) => cutRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "Lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "Higher")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",

    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
