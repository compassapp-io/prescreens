import React from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './Circleprogressstyle'

function Circleprogress() {
    return (
        <>
            <View>
                <LinearGradient colors={['#7940FC6E', '#00000000',]} locations={[0.1, 1]} style={styles.card}>
                    <View style={styles.card2}></View>
                </LinearGradient>
                <View style={styles.card3}></View>
            </View>
        </>
    )
}

export default Circleprogress
