import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput
} from "react-native";
import Icon from "../components/Icon";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import MaterialCheckbox from "../components/MaterialCheckbox";
// import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";

function Signup(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconStackColumnRow}>
        <View style={styles.iconStackColumn}>
          <View style={styles.iconStack}>
            <Icon style={styles.icon}></Icon>
            <EntypoIcon
              name="chevron-thin-left"
              style={styles.icon2}
            ></EntypoIcon>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Welcome")}
              style={styles.button}
            ></TouchableOpacity>
          </View>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>
        <Image
          source={require("../../assets/images/unnamed.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Icon style={styles.icon8}></Icon>
      </View>
      <TextInput
        placeholder="Nickname"
        placeholderTextColor="rgba(72,66,255,1)"
        inlineImagePadding={"null"}
        style={styles.textInput}
      ></TextInput>
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(72,66,255,1)"
        inlineImagePadding={"null"}
        style={styles.textInput2}
      ></TextInput>
      <View style={styles.textInput3Stack}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(72,66,255,1)"
          inlineImagePadding={"null"}
          secureTextEntry={true}
          style={styles.textInput3}
        ></TextInput>
        <FontAwesomeIcon name="eye" style={styles.icon3}></FontAwesomeIcon>
      </View>
      <View style={styles.textInput4Stack}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="rgba(72,66,255,1)"
          inlineImagePadding={"null"}
          secureTextEntry={true}
          style={styles.textInput4}
        ></TextInput>
        <FontAwesomeIcon name="eye" style={styles.icon4}></FontAwesomeIcon>
      </View>
      <View style={styles.group3}>
        {/* <MaterialCheckbox style={styles.materialCheckbox}></MaterialCheckbox> */}
        <Text style={styles.loremIpsum}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Text>
      </View>
      <View style={styles.group4}>
        {/* <MaterialCheckbox style={styles.materialCheckbox2}></MaterialCheckbox> */}
        <Text style={styles.text5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Text>
      </View>
      {/* <MaterialButtonViolet1 onPress={() => props.navigation.navigate("Assesment")}
        style={styles.materialButtonViolet1}
      ></MaterialButtonViolet1> */}
      <View style={styles.group5}>
        <View style={styles.rect2}></View>
        <Text style={styles.or3}>or</Text>
        <View style={styles.rect}></View>
      </View>
      <View style={styles.group6}>
        <FontAwesomeIcon
          name="facebook-square"
          style={styles.icon5}
        ></FontAwesomeIcon>
        <EntypoIcon name="twitter" style={styles.icon7}></EntypoIcon>
        <FontAwesomeIcon
          name="instagram"
          style={styles.icon6}
        ></FontAwesomeIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    position: "absolute",
    left: 9,
    top: 0,
    width: 39,
    height: 37,
    backgroundColor: "#fff"
  },
  icon2: {
    top: 4,
    left: 15,
    position: "absolute",
    color: "rgba(255,251,251,1)",
    fontSize: 23
  },
  button: {
    top: 0,
    left: 0,
    width: 57,
    height: 37,
    position: "absolute",
    backgroundColor: "rgba(230,230, 230,0)"
  },
  iconStack: {
    width: 57,
    height: 37
  },
  welcome: {
    fontFamily: "roboto-regular",
    color: "rgba(72,66,255,1)",
    letterSpacing: 2,
    fontSize: 30,
    marginTop: 45,
    marginLeft: 9
  },
  iconStackColumn: {
    width: 157,
    marginBottom: 35
  },
  image: {
    width: 127,
    height: 108,
    marginLeft: 39,
    marginTop: 46
  },
  icon8: {
    width: 39,
    height: 37,
    backgroundColor: "#fff",
    marginLeft: 117,
    marginTop: 10
  },
  iconStackColumnRow: {
    height: 154,
    flexDirection: "row",
    marginTop: 55,
    marginLeft: 16,
    marginRight: -120
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 304,
    height: 25,
    lineHeight: 0,
    fontSize: 21,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: "rgba(72,66,255,1)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 31
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 304,
    height: 25,
    lineHeight: 0,
    fontSize: 21,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: "rgba(72,66,255,1)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: "left",
    marginTop: 38,
    marginLeft: 25
  },
  textInput3: {
    top: 13,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 303,
    height: 25,
    lineHeight: 0,
    fontSize: 21,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: "rgba(72,66,255,1)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: "left"
  },
  icon3: {
    top: 0,
    position: "absolute",
    color: "rgba(189,211,255,1)",
    fontSize: 21,
    width: 18,
    right: 7,
    height: 21
  },
  textInput3Stack: {
    width: 303,
    height: 38,
    marginTop: 25,
    marginLeft: 25
  },
  textInput4: {
    top: 16,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 308,
    height: 25,
    lineHeight: 0,
    fontSize: 21,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: "rgba(72,66,255,1)",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: "left"
  },
  icon4: {
    top: 0,
    position: "absolute",
    color: "rgba(189,211,255,1)",
    fontSize: 21,
    right: 30,
    height: 21,
    width: 0
  },
  textInput4Stack: {
    width: 308,
    height: 41,
    marginTop: 20,
    marginLeft: 25
  },
  group3: {
    width: 344,
    height: 17,
    flexDirection: "row",
    marginTop: 35,
    marginLeft: 25
  },
  materialCheckbox: {
    height: 40,
    width: 40,
    margin: 1,
    backgroundColor: "rgba(206,194,194,0)"
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(92,88,255,1)",
    height: 17,
    width: 273,
    margin: 1,
    marginLeft: 8,
    marginTop: 8,
    fontSize: 15
  },
  group4: {
    width: 344,
    height: 17,
    flexDirection: "row",
    marginTop: 44,
    marginLeft: 25
  },
  materialCheckbox2: {
    height: 40,
    width: 40,
    margin: 1,
    backgroundColor: "rgba(206,194,194,0)"
  },
  text5: {
    fontFamily: "roboto-regular",
    color: "rgba(92,88,255,1)",
    height: 17,
    width: 273,
    margin: 1,
    marginLeft: 8,
    marginTop: 8,
    fontSize: 15
  },
  // materialButtonViolet1: {
  //   height: 41,
  //   width: 298,
  //   backgroundColor: "rgba(15,15, 15,0.01)",
  //   borderWidth: 3,
  //   borderColor: "rgba(106,99,254,1)",
  //   borderRadius: 22,
  //   marginTop: 59,
  //   marginLeft: 31
  // },
  group5: {
    width: 119,
    height: 21,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    marginLeft: 30
  },
  rect2: {
    width: 142,
    height: 2,
    backgroundColor: "rgba(106,99,254,0)",
    borderWidth: 1,
    borderColor: "rgba(106,99,254,1)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginRight: 7
  },
  or3: {
    fontFamily: "roboto-regular",
    color: "rgba(106,99,254,1)",
    fontSize: 19,
    marginTop: -9
  },
  rect: {
    width: 142,
    height: 2,
    backgroundColor: "rgba(106,99,254,0)",
    borderWidth: 1,
    borderColor: "rgba(106,99,254,1)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    marginLeft: 7
  },
  group6: {
    height: 38,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 350,
    justifyContent: "space-between",
    marginTop: 19,
    alignSelf: "center"
  },
  icon5: {
    color: "rgba(51,41,255,1)",
    fontSize: 40,
    marginRight: 28,
    marginLeft: 28,
    paddingRight: 0,
    paddingLeft: 0
  },
  icon7: {
    color: "rgba(51,41,255,1)",
    fontSize: 40,
    marginRight: 28,
    marginLeft: 28,
    paddingRight: 0,
    paddingLeft: 0
  },
  icon6: {
    color: "rgba(51,41,255,1)",
    fontSize: 40,
    marginRight: 28,
    marginLeft: 28,
    paddingRight: 0,
    paddingLeft: 0
  }
});

export default Signup;
