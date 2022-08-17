import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(166,196,255,1)",
    },
    scrollArea_contentContainerStyle: {
        overflow: "hidden",
    },
    spinnerTextStyle: {
        color: '#FFF',
        marginTop: -40
    },
    video: {
        height: 230,
        width: Dimensions.get("window").width,
        backgroundColor: "black",
        borderRadius: 11,
    },
    indicator: {
        position: "absolute",
        marginTop: -80,
        alignSelf: "center"
    },
    iosindicator: {
        position: "absolute",
        alignSelf: "center",
        marginTop: 80,
        zIndex: 1
    },
    fullscreenVideo: {
        height: Dimensions.get("window").width,
        width: Dimensions.get("window").height,
        backgroundColor: "black",
        marginTop: -40,
    },
    fullscreenButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        right: 10,
        position: "absolute",
        top: 0,
        marginTop: 10,
        backgroundColor: '#232b2b',
        height: 28,
        width: 40,
        borderRadius: 10
    },
    expandicon: {
        padding: 5
    },
    controlOverlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: '#000000c4',
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
        paddingBottom: 5
    },
    rect: {
        backgroundColor: "rgba(209,225,255,1)",
        borderRadius: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 40,
    },
    image: {
        height: 200,
        borderRadius: 11,
        width: "100%",

    },
    head1: {
        position: "absolute",
        right: 0,
        margin: 10,
    },
    loremIpsum: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 22,
        marginTop: 20,
        marginLeft: 21,
    },
    scene: {
        margin: 10,
        height: 70,
        width: 70,
        justifyContent: "center",
        alignSelf: "center",
    },
    group: {
        width: 78,
        height: 15,
        flexDirection: "row",
        marginTop: 35,
        marginLeft: 19,
    },
    loremIpsum2: {
        fontFamily: "roboto-regular",
        color: "rgba(133,123,123,1)",
        fontSize: 13,
    },
    johnSmith: {
        fontFamily: "roboto-regular",
        color: "rgba(129,123,123,1)",
        width: 104,
        height: 17,
        fontSize: 13,
        marginLeft: 7,
    },
    loremIpsum2Row: {
        height: 17,
        flexDirection: "row",
        flex: 1,
        marginRight: -101,
    },
    group2: {
        width: 164,
        height: 92,
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 19,
    },
    group4: {
        flexDirection: "row",
        width: "100%",
        height: 92,
    },
    rect2: {
        width: 157,
        height: 92,
        backgroundColor: "rgba(63,177,181,1)",
        borderRadius: 5,
    },
    mentalPerformance: {
        top: 12,
        fontFamily: "roboto-regular",
        color: "rgba(239,237,237,1)",
        fontSize: 10,
        textAlign: "center",
    },
    group3: {
        width: "100%",
        height: 40,
        marginLeft: 8,
    },
    group5: {
        height: 40,
        width: "100%",
    },
    rect3: {
        width: "100%",
        height: 40,
        backgroundColor: "rgba(222,205,245,1)",
        borderRadius: 5,
    },
    changeManagement: {
        top: 9,
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 10,
        textAlign: "left",
        marginLeft: 10,
    },
    group6: {
        height: 40,
        width: "100%",
        alignSelf: "flex-start",
    },
    rect4: {
        width: "100%",
        height: 40,
        backgroundColor: "rgba(255,223,211,1)",
        borderRadius: 5,
        marginTop: 9,
    },
    mentalHealth: {
        top: 9,
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 10,
        textAlign: "left",
        marginLeft: 10,
    },
    loremIpsum3: {
        top: 18,
        left: 15,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
    },
    rect5: {
        width: 413,
        height: 1,
        backgroundColor: "rgba(51,41,255,1)",
        marginTop: 16,
        alignSelf: "center",
    },
    loremIpsum4: {
        width: "100%",
        padding: '4%',
    },
    heading: {
        color: "#121212",
    },
    icon: {
        color: "rgba(250,250,250,1)",
        fontSize: 23,
    },
    browser: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 12,
        marginLeft: 12,
        marginTop: 5,
    },
    iconRow: {
        height: 23,
        flexDirection: "row",
        marginTop: 50,
        marginLeft: 18,
    },
});