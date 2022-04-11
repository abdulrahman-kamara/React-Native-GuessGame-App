import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../Components/NumberContainer";
import Card from "../Components/Card";
import PrimaryButton from "../Components/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../Components/BodyText";

//This process is called recursion which allows you to generate random numbers 
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

const renderListItem = (numOfRound, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{numOfRound - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomNumber(1, 100, props.userchoise);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [passGuess, setPassGuess] = useState([initialGuess.toString()]);
  const [availableDivisWidth, setavailableDivisWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDivisHight, setavailableDivisHight] = useState(
    Dimensions.get("window").height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // useEffect allow to run sideeffect or in general allow to run  login after every render circle
  const { userchoise, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userchoise) {
      onGameOver(passGuess.length);
    }
  }, [currentGuess, userchoise, onGameOver]);

  // A funtion that help reder the hight and the width of the windod base on the size of the device
  useEffect(() => {
    const updateLayout = () => {
      setavailableDivisWidth(Dimensions.get("window").width);
      setavailableDivisHight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    // Aclean up function to avoid unnessasary rereders

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((cutRounds) => cutRounds + 1);
    setPassGuess((curPassGuess) => [nextNumber.toString(), ...curPassGuess]);
  };

  let listContainerStyle = styles.listContainer;
  // This condition controls the width of the app on iphone and andriod apps
  if (availableDivisWidth > 350) {
    listContainerStyle = styles.listContainerBig;
  }

  // This condition controls the hight of the app on iphone and andriod apps
  if (availableDivisHight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponents Guess</Text>
        <View style={styles.control}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "Lower")}>
            <Ionicons name="remove-circle" size={24} />
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "Higher")}>
            <Ionicons name="add-circle" size={24} />
          </PrimaryButton>
        </View>

        <View style={styles.listContainerBig}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {passGuess.map((guess, index) =>
            renderListItem(guess, passGuess.length - index)
          )}
        </ScrollView> */}
          <FlatList
            data={passGuess}
            renderItem={renderListItem.bind(this, passGuess.length)}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessHandler.bind(this, "Lower")}>
          <Ionicons name="remove-circle" size={24} />
        </PrimaryButton>
        <PrimaryButton onPress={nextGuessHandler.bind(this, "Higher")}>
          <Ionicons name="add-circle" size={24} />
        </PrimaryButton>
      </Card>
      <View style={styles.listContainerBig}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {passGuess.map((guess, index) =>
            renderListItem(guess, passGuess.length - index)
          )}
        </ScrollView> */}
        <FlatList
          data={passGuess}
          renderItem={renderListItem.bind(this, passGuess.length)}
          keyExtractor={(item) => item}
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
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 30 : 10,
    width: 300,
    maxWidth: "100%",
  },
  listItem: {
    borderColor: "gray",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  list: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 500 ? "60%" : "80%",
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
});

export default GameScreen;
