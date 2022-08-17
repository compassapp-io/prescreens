import React from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";
import styles from '../Progressbar/Progressbarstyle';
import Slider from "@react-native-community/slider";

function ProgressBar({
  currentTime,
  duration,
  onSlideCapture,
  onSlideStart,
  onSlideComplete,
  isProfile
}) {
  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);
  const width = Dimensions.get("window").width;
  const left = currentTime * (width - 50) / 100;
  function getMinutesFromSeconds(time) {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds
      }`;
  }

  console.log(currentTime, duration)

  function handleOnSlide(time) {
    if (!isProfile) {
      onSlideCapture({ currentTime: time });
    }
  }
  return (
    <View style={styles.wrapper}>
      {isProfile ? (
        <ImageBackground
          source={require("../../assets/images/marker.png")}
          resizeMode="cover"
          style={[styles.pointer, { left: left }]}>
          <Text style={[styles.currentTime]}>{currentTime}</Text>
        </ImageBackground>
      ) : (
        <View style={[styles.wrapper2]}>
          <Text style={styles.timeLeft}>{position}</Text>
          <Text style={styles.timeRight}>{fullDuration}</Text>
        </View>
      )}
      <Slider
        style={styles.slider}
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onValueChange={handleOnSlide}
        onSlidingStart={onSlideStart}
        onSlidingComplete={onSlideComplete}
        minimumTrackTintColor={"#4454FF"}
        maximumTrackTintColor={"#808080"}
        thumbTintColor={"#4454FF"}
        disabled={isProfile}
      />
    </View>
  );
}

export default ProgressBar;
