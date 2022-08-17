import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container : {
        height: 70,
        width: '100%',
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
        backgroundColor: "#EDEEFE",
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15
    },
    firstText: {
        color: "#1C2037",
        fontSize: 13,
        fontFamily: "Raleway-Regular"
    },
    secondText: {
        color: "#4454FF",
        fontSize: 13,
        paddingLeft: 5,
        fontFamily: "Raleway-SemiBold"
    }
})