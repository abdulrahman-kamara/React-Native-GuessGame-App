import React from "react";
import { View, Text, StyleSheet, ProgressViewIOSComponent } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Number}> {props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Number: {
    color: Colors.secondary,
    fontSize: 22,
  },
});

export default NumberContainer;