import React from "react";
import {
  View,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import styles from '../Playercontrol/Playercontrolesstyle';
import { Foundation } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
function PlayerControls({ playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious, }) {

  return <View style={styles.wrapper}>
    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        onPress={onPrevious}
        disabled={previousDisabled}>
        <Icon name="banckward" style={styles.icon}></Icon>
      </TouchableOpacity>
    )}

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <AntDesign name="stepbackward" size={18} style={styles.icon} />
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.touchablePlay}
      onPress={playing ? onPause : onPlay}>
      {playing ? <Entypo name="controller-play" size={24} color="white" /> : <Foundation name="pause" size={24} color="white" />}
    </TouchableOpacity>

    {showSkip && (
      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <AntDesign name="stepforward" size={24} style={styles.icon} />
      </TouchableOpacity>
    )}

    {showPreviousAndNext && (
      <TouchableOpacity
        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
        onPress={onNext}
        disabled={nextDisabled}>
        <Icon name="next" size={24} style={styles.icon}></Icon>
      </TouchableOpacity>
    )}
  </View>
}
export default PlayerControls;