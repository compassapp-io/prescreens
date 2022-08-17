import React from 'react'
import { View, Text } from 'react-native'
import styles from './Footerstyle'

function Footer({ onPress, isShow }) {
    return (
        <View style={styles.container}>
            {isShow && (
                <Text style={styles.firstText}>Want to explore?</Text>
            )}
            <Text style={styles.secondText} onPress={onPress}>Skip</Text>
        </View>
    )
}

export default Footer
