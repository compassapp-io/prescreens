import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from '../Backbutton/Backbuttonstyle'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

function Backbutton({ isMenu, onBackPress, onMenuPress, menuColor }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBackPress}>
                <MaterialIcons name="arrow-back" size={18} color="white" style={styles.backIcon} />
            </TouchableOpacity>
            {isMenu && (
                <TouchableOpacity onPress={onMenuPress}>
                    <Entypo name="dots-three-horizontal" size={18} color={menuColor} style={styles.menuIcon} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Backbutton
