import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

function Rating({ rating }) {
    const [Max_Rating, setMax_Rating] = useState(5);
    const showRating = () => {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity key={i}>
                    <Image
                        style={styles.starImage}
                        resizeMode="cover"
                        source={i <= rating
                            ? require( "../../assets/images/star-filled.png") 
                            : require("../../assets/images/star.png")} />
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.childView}>
                {React_Native_Rating_Bar}
            </View>
        );
    }
    return (
        <View style={styles.MainContainer}>
            <Text> {showRating()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'flex-end',
        paddingEnd: 20
    },
    childView: {
        flexDirection: 'row',
    },
    starImage: {
        width: 13,
        height: 13,
        margin: 1
    }
});

export default Rating