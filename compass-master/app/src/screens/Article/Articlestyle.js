import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
    },
    container2 :{
        position: 'absolute',
        top: 50,
        zIndex: 1
    },
    image1: {
        height: 320,
        width: '100%'
    },
    mainHeading :{
        color: '#4454FF',
        fontSize: 10,
        position: 'absolute',
        top: 230,
        paddingLeft: 24,
        paddingEnd: 24,
        textTransform: 'uppercase',
        fontFamily: "Raleway-SemiBold"
    },
    heading :{
        position: 'absolute',
        top: 245,
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: "Montserrat-Bold",
        paddingLeft: 24,
        paddingEnd: 24
    },
    subHeading :{
        color: '#8287A2',
        fontSize: 10,
        position: 'absolute',
        top: 270,
        paddingLeft: 24,
        paddingEnd: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    container3 :{
        padding: 24,
        textAlign: 'left'
    },
    btn:{
        height: 50,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 8,
        width: '80%'
    },
})