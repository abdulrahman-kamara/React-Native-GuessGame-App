import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import BodyText from "../Components/BodyText";
import TitleText from "../Components/TitleText";
import PrimaryButton from "../Components/PrimaryButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.container}>
          <TitleText>The Game Is Over!</TitleText>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/bird.webp")}
            style={styles.image}
            resizeMode="cover"
          />
          {/* <Image
          source={{
            uri: "https://pixabay.com/illustrations/windows-design-art-abstract-6938478/",
          }}
          style={styles.image}
          resizeMode="cover"
        /> */}
        </View>
        <View style={styles.reasultContainer}>
          <BodyText>
            You phon needed{" "}
            <Text style={styles.numberofguess}>{props.roundsNumber}</Text>{" "}
            Rounds to guess the right number!{" "}
          </BodyText>
          <BodyText>Number Was : {props.userNumber}</BodyText>
          <PrimaryButton onPress={props.onRestart}>NEW GAME</PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: Dimensions.get("window").width * 0.9,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height / 15,
  },
  reasultContainer: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  numberofguess: {
    color: "red",
  },
});

export default GameOverScreen;
