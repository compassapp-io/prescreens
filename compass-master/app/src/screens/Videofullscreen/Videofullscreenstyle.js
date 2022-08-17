import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    fullScreenVideo: {
        height: Dimensions.get("window").width,
        width: Dimensions.get("window").height,
        backgroundColor: "black",
    },
    video: {
        height: '100%',
        width: Dimensions.get("window").width,
        backgroundColor: "black",
    },
    controlOverlay: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        justifyContent: "space-between",
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
    },
    fullScreenControlOverlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        justifyContent: "space-between",
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11
    },
    fullScreenButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        right: 20,
        position: "absolute",
        top: 0,
        marginTop: 10,
    },
    icon: {
        color: "rgba(250,250,250,1)",
        fontSize: 18,
        paddingTop: 5
    },
    iosindicator: {
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    indicator: {
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        top: '50%',
        zIndex: 1,
    },
    cancelicon: {
        position: "absolute",
        zIndex: 1,
        top: 115,
        left: 30,
        height: 33,
        width: 50,
        backgroundColor: "#353839",
        borderRadius: 10,
    },
    icon2: {
        color: "rgba(250,250,250,1)",
        fontSize: 18,
        paddingLeft: 18,
        paddingTop: 7,
    },
    progess: {
        width: Dimensions.get("window").height,
        marginLeft: 40,
    },
    mediaName: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 16,
        fontFamily: "Montserrat-Bold",
    },
    mediaDesc: {
        color: '#989EBE',
        fontSize: 10,
        paddingLeft: 16,
        paddingBottom: 30,
        paddingTop: 3,
        fontFamily: "Raleway-Regular"
    },
    container: {
        backgroundColor: "black",
        flex: 1
    },
    youtubevideo: {
      marginTop: '70%'
    },
    youtube:{
    }
});