import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../Components/Card";
import Colors from "../constants/colors";
import Input from "../Components/Input";
import NumberContainer from "../Components/NumberContainer";
import PrimaryButton from "../Components/PrimaryButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredvalue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setbuttonWidth] = useState(
    Dimensions.get("window").width / 3
  );

  const numberInputHandler = (inputText) => {
    setEnteredvalue(inputText.replace(/[^0-9]/g, ""));
  };

  const ResetInputHandler = () => {
    setEnteredvalue("");
    setConfirmed(false);
  };

  // A funtion that help reder the windod base on the size of the device
  useEffect(() => {
    const updateLayout = () => {
      setbuttonWidth(Dimensions.get("window").width / 3);
    };
    Dimensions.addEventListener("change", updateLayout);

    // Aclean up function to avoid unnessasary rereders
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "The numbers should be between 0 and 99", [
        { text: "Okey", style: "destructive" },
      ]);
      return;
    }

    setConfirmed(true);
    setEnteredvalue("");
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.sumarryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <PrimaryButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </PrimaryButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.startgamecontainer}>
            <Text style={styles.title}> The Game Screen</Text>
            <Card style={styles.inputContainer}>
              <Text style={styles.subtitle}>Select a Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.primary}
                    onPress={ResetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    color={Colors.secondary}
                    onPress={confirmInputHandler}
                  />
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
  startgamecontainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "80%",
    // maxWidth: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  // button: {
  //   // width: 100,
  //   width: Dimensions.get("window").width / 3,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  sumarryContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
});

export default StartGameScreen;
