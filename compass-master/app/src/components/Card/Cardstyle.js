import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    card: {
        height: 140,
        borderRadius: 16,
        backgroundColor: "transparent",
        padding: 16,
        flexDirection: 'row',
    },
    image1: {
        height: 140,
        margin: 20,
    },
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        color: "#FFFFFF",
        fontSize: 13,
        paddingBottom: 5,
        fontFamily: "Montserrat-Bold"
    },
    subTitle: {
        color: "#A6A9CB",
        fontSize: 10,
        opacity: 0.7,
        paddingTop: 5,
        height: 50
    },
    btn:{
        width: 75,
        height: 26,
        backgroundColor: '#3e448e',
        borderRadius: 8,
    },
    indicator:{
        marginLeft: 5,
        transform: [{ rotate: '180deg'}],
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 10,
        height: '80%'
    },
    completed :{
        position: 'absolute',
        right: 20,
        height: '100%',
        top: 40
    },
    check :{
        height: 60,
        width: 60,
        backgroundColor: '#FFFFFF',
        opacity: 0.2,
        borderRadius: 50
    },
    mainView:{
        position: 'absolute', 
        top: 10, 
        left: 10, 
        flexDirection: 'row'
    },
    checkIon: {
        position: 'absolute', 
        top: 10, 
        left: 10, 
    }
})