import React from "react";
import { Text, StyleSheet } from "react-native";

// this a text we can use at ant part ofthe body of our appplicatioin

const BodyText = (props) => <Text style={styles.body}>{props.children}</Text>;

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});

export default BodyText;
