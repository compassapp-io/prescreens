import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 5,
        paddingEnd: 5,
        paddingBottom: 20
    },
    wrapper2:{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1
    },
    slider: {
        width: '100%'
    },
    timeWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    timeLeft: {
        fontSize: 10,
        color: "#989EBE",
        paddingLeft: 10,
        fontFamily: "Montserrat-Regular"
    },
    timeRight: {
        fontSize: 10,
        color: "#989EBE",
        textAlign: "right",
        paddingRight: 10,
        fontFamily: "Montserrat-Regular"
    },
    pointer: {
        width: 20,
        height: 25,
        paddingTop: 3,
        marginBottom: 4
    },
    currentTime: {
        color: '#1C2037',
        fontSize: 8,
        fontFamily: "Montserrat-SemiBold",
        textAlign: 'center'
    }
});