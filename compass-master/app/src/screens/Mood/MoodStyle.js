import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    head: {
        height: 260
    },
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
    moodContainer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    stepContainer: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '1%'
    },
    slider: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '84%',
        height: 40
    },
    infoText: {
        marginTop: '15%',
        width: '100%',
        marginLeft: 'auto',
        width: '90%',
    }

});