import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../Button/buttonstyle'
import { TouchableRipple } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

function Button({ buttonText, onPress, customStyle, GradientColor, customText, profileStyle}) {
    return (
        <View style={[profileStyle]}>
            <TouchableWithoutFeedback onPress={onPress} >
                <LinearGradient
                    colors={GradientColor}
                    start={[0.3, 1]} end={[0.8, 1]}
                    style={[styles.btn, customStyle]}>
                    <Text style={[styles.text, customText]}>{buttonText}</Text>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Button
//rnfe
