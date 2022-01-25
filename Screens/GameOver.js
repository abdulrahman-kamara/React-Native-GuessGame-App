import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOver = (props) => {
  return (
    <View styles={styles.container}>
      <Text>The Game Is Over!</Text>
      <Text>Number of Rounds: {props.roundsNumber}</Text>
      <Text>Number Was : {props.userNumber}</Text>
      <Button title="Start New Game" onPress={props.onRestart} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOver;
