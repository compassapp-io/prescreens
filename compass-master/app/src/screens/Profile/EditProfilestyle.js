import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    background: {
        height: 280,
        borderBottomEndRadius: 70,
        overflow: 'hidden',
        backgroundColor: '#4454FF'
    },
    image1: {
        flex: 1,
        width: '100%',
        alignSelf: 'flex-end',
        borderBottomEndRadius: 70
    },
    profile: {
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontSize: 13,
        marginTop: 63,
        marginLeft: 50,
        fontFamily: "Montserrat-Bold"
    },

    container2: {
        flexDirection: 'row'
    },
    container3: {
        flexDirection: 'column',
        marginTop: 25,
        marginLeft: 20
    },
    profileName: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: "Montserrat-Bold"
    },
    profileEmail: {
        color: '#FFFFFF',
        fontSize: 13,
        marginTop: 5,
        opacity: 0.8,
        fontFamily: "Raleway-Regular"
    },
    editContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //position: 'absolute',
        color: 'black'
    },

    recommend: {
        color: '#FFFFFF',
        fontSize: 10,
        marginTop: 5,
        opacity: 0.5,
        textTransform: 'uppercase',
        fontFamily: "Raleway-SemiBold"
    },

    btn2: {
        width: '50%',
        position: 'absolute',
        bottom: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    floatBtn: {
        borderRadius: 7,
        height: 35,
        shadowColor: "#4454FF40",
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        margin: 10
    },
    conatiner5: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textInput: {
        height: 55,
        width: "90%",
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
        // marginBottom: 20,
        backgroundColor: "#F6F7FE",
        // paddingLeft: 45,
        // borderColor: 'white',
        // borderWidth: 1,
        fontFamily: "Raleway-Regular",
        elevation: 0

    },
});