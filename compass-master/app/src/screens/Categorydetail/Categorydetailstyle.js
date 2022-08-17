import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222"
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
    headContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 250,
        padding: 20,
        width: '100%',
        justifyContent: 'space-between'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: "Montserrat-SemiBold"
    },
    menuIcon: {
        paddingTop: 10
    },
    type: {
        color: '#FFFFFF',
        fontSize: 10,
        opacity: 0.5,
        textTransform: 'uppercase',
        fontFamily: "Raleway-SemiBold",
        paddingLeft: 20,
        marginTop: -10
    },
    place: {
        color: '#989EBE',
        fontSize: 10,
        paddingLeft: 20,
        marginTop: 18,
        fontFamily: "Montserrat-Regular"
    },
    ratingContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        width: '100%',
        paddingTop: 5,
        justifyContent: 'space-between'
    },
    episodes: {
        color: '#989EBE',
        fontSize: 10,
    },
    tagConatiner: {
        backgroundColor: '#FFFFFF1A',
        borderColor: '#FFFFFF1A',
        borderWidth: 2,
        padding: 3,
        flexDirection: "row",
        alignSelf: "flex-start",
        borderRadius: 4,
        marginLeft: 20,
        marginTop: 30 
    },
    tag: {
        color: '#FFFFFF',
        fontSize: 8,
        fontFamily: "Montserrat-Regular"
    },
    description : {
        paddingLeft: 20,
        paddingTop: 10,
        color: '#989EBE',
        fontSize: 13,
        fontFamily: "Raleway-Regular",
        width: '95%'
    },
    followBtn: {
        width: '25%',
        borderRadius: 7,
        height: 31,
        margin: 20
    },
    border: {
        height: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        opacity: 0.1
    },
    episode: {
        margin: 20,
        color: '#FFFFFF',
        fontSize: 14
    },
    headtext: {
        fontSize: 11,
        color: '#FFFFFF'
    },
    back: {
        backgroundColor: '#2d2d2d'
    },
    allEpisode:{
        fontSize: 13,
        color: '#4454FF',
        textAlign: 'center',
        padding: 20,
        fontFamily: "Raleway-SemiBold"
    },
    spinnerTextStyle: {
        color: "#FFF",
    },
})