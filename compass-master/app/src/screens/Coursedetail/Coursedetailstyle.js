import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
    },
    container2: {
        position: 'absolute',
        top: 50,
        zIndex: 1
    },
    image1: {
        height: 320,
        width: '100%'
    },
    heading: {
        position: 'absolute',
        top: 230,
        color: '#FFFFFF',
        fontSize: 22,
        paddingLeft: 24,
        paddingEnd: 24,
        fontFamily: "Montserrat-SemiBold"
    },
    subHeading: {
        color: '#8287A2',
        fontSize: 12,
        position: 'absolute',
        top: 270,
        paddingLeft: 24,
        paddingEnd: 24,
        fontFamily: "Raleway-Regular"
    },
    course: {
        fontSize: 10,
        color: '#8287A2',
        fontFamily: "Raleway-SemiBold"
    },
    container3: {
        paddingLeft: 24,
        paddingTop: 30,
        flexDirection: 'row'
    },
    count: {
        height: 18,
        width: 30,
        backgroundColor: '#393939',
        marginLeft: 15,
        fontSize: 10,
        color: '#FFFFFF',
        borderRadius: 5,
        paddingLeft: 9,
        paddingTop: 2,
        marginTop: -2,
        borderColor: '#FFFFFF1A',
        borderWidth: 1,
        fontFamily: "Montserrat-Regular"
    },
    firstContainer: {
        padding: 20,
        flex: 1,
        overflow: "hidden",
    },
    noMedia: {
        color: '#4454FF',
        fontSize: 14,
        textAlign: 'center',
        margin: 50,
        fontFamily: "Montserrat-SemiBold"
    }
})