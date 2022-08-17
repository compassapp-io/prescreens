import React, { Component } from "react"
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, } from "react-native"
import styles from './Welcomestyle'
import Button from '../../components/Button/Button'

function Welcome(props) {
  const goToLogin = () => {
    props.navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Backimage.png")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
          marginLeft: 60,
          marginTop: -80
        }}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="cover"
          style={styles.image8}/>
        <Image
          source={require("../../assets/images/compass.png")}
          resizeMode="contain"
          style={styles.image2}/>
        <Text style={styles.howWasYour}>Find Your True North </Text>
        <Text style={styles.howWasYour1}>Personalized, immersive learning to hone your emotional fitness</Text>
        <View style={styles.responsive}>
        <Button buttonText='Get Started' onPress={goToLogin} customStyle={styles.buttonviolet} GradientColor= {['#4454FF', '#7940FC']} />
        </View>
      </ImageBackground>
    </View>
  );
}

export default Welcome;
