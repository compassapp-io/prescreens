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
    image8: {
        width: 85,
        height: 85,
        borderRadius: 12,
        marginLeft: 30,
        marginTop: 20,
        backgroundColor: '#0472DF',
        justifyContent: 'center',
    },
    imageText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 30,
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
    time: {
        color: '#FFFFFF',
        fontSize: 10,
        marginTop: 5,
        opacity: 0.5,
        marginTop: 15,
        fontFamily: "Montserrat-Regular"
    },
    container4: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    conatiner5: {
        flexDirection: 'column',
        padding: 25
    },
    recommend: {
        color: '#FFFFFF',
        fontSize: 10,
        marginTop: 5,
        opacity: 0.5,
        textTransform: 'uppercase',
        fontFamily: "Raleway-SemiBold"
    },
    course: {
        color: '#FFFFFF',
        fontSize: 10,
        marginTop: 5,
        opacity: 0.5,
        position: 'absolute',
        top: '110%',
        left: 45,
        fontFamily: "Montserrat-Regular"
    },
    courseLength: {
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 5,
        opacity: 1,
        fontFamily: "Montserrat-Bold"
    },
    border: {
        height: 32,
        width: 1,
        backgroundColor: '#FFFFFF',
        opacity: 0.2,
        marginTop: 35
    },
    firstContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        overflow: "hidden",
        marginTop: 1.2,
        marginBottom: 70
    },
    tabView: {
        backgroundColor: '#ECEEFE',
        height: 55,
        width: '100%',
        alignSelf: 'center',
        elevation: 0,
        borderBottomEndRadius: 50,
        paddingTop: 10
    },
    btn: {
        width: 80,
        borderWidth: 1,
        borderColor: '#4454FF',
        borderRadius: 7,
        marginTop: 20, 
    },
    btnText: {
        color: '#4454FF'
    },
    width: {
        width: '60%'
    },
    headTitle: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        color: '#1C2037'
    },
    skillContainer: {
        padding: 17,
        borderBottomWidth: 1.5,
        borderBottomColor: '#F6F7FE',
        height: 150
    },
    subHead: {
        fontFamily: "Raleway-Regular",
        fontSize: 10,
        color: '#1C2037',
        opacity: 0.7,
        paddingTop: 8
    },
    progress: {
        marginLeft: -20
    },
    progressTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        marginTop: 40,
        marginLeft: 20
    },
    startTime: {
        color: '#989EBE',
        fontSize: 11,
        fontFamily: "Raleway-Regular",
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
    subTitle: {
        color: "#A6A9CB",
        fontSize: 10,
        opacity: 0.7,
        paddingTop: 5,
        height: 50
    },
    noMedia: {
        color: '#4454FF',
        fontSize: 14,
        textAlign: 'center',
        margin: 50,
        fontFamily: "Montserrat-SemiBold"
    }
});