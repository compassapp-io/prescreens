import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FE",
    },
    scrollArea: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(230, 230, 230,1)",
    },
    scrollArea_contentContainerStyle: {
        overflow: "hidden",
    },
    searchCategory: {
        fontFamily: "roboto-regular",
        color: "rgba(51,41,255,1)",
        fontSize: 24,
        marginLeft: 17,
        marginTop: 50,
    },
    materialSearchBarWithBackground1: {
        height: 52,
        width: "90%",
        borderRadius: 16,
        marginTop: 30,
        marginLeft: 17,
        marginBottom: 20,
        backgroundColor: "#F6F7FE",
        paddingLeft: 45,
        borderColor: '#989EBE33',
        borderWidth: 1,
        fontFamily: "Raleway-Regular"
    },
    leftIcon: {
        backgroundColor: "transparent",
        color: "rgba(161,164,178,1)",
        fontSize: 20,
        position: "absolute",
        top: 20,
    },
    scrollAreaRow: {
        height: 100,
        flexDirection: "row",
        marginTop: 33,
        marginLeft: -275,
        marginRight: 19,
    },
    mentalHealth: {
        fontFamily: "roboto-regular",
        color: "rgba(176,108,73,1)",
        fontSize: 18,
        marginLeft: 17,
    },
    nodata: {
        fontFamily: "roboto-regular",
        color: "grey",
        fontSize: 13,
        textAlign: "center",
        width: "100%",
    },
    group: {
        width: 140,
        margin: 15,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
    },
    loremIpsum: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 9,
        marginLeft: 3,
        marginTop: 12,
    },
    image: {
        height: 149,
        borderRadius: 10,
        width: "100%",
        backgroundColor: "rgba(161,164,178,1)",
    },
    group2: {
        width: 137,
        height: 149,
        margin: 15,
    },
    image1: {
        height: 149,
        borderRadius: 10,
        width: "100%",
    },
    loremIpsum1: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 9,
        marginTop: 12,
        marginLeft: -1,
    },
    groupRow: {
        flexDirection: "row",
        alignSelf: "flex-start",
        overflow: "scroll",
        flexWrap: "wrap",
        marginTop: 23,
        marginLeft: 14,
        marginRight: 31,
        width: "99%",
    },
    identity: {
        fontFamily: "roboto-regular",
        color: "rgba(51,41,255,1)",
        fontSize: 18,
        marginTop: 43,
        marginLeft: 17,
    },
    image2: {
        width: 136,
        height: 149,
        borderRadius: 10,
    },
    image3: {
        width: 137,
        height: 149,
        borderRadius: 10,
        marginLeft: 26,
    },
    image2Row: {
        flexDirection: "row",
        alignSelf: "flex-start",
        overflow: "scroll",
        flexWrap: "wrap",
        marginTop: 23,
        marginLeft: 14,
        marginRight: 31,
        width: "99%",
    },
    loremIpsum2: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 9,
    },
    loremIpsum3: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 9,
        marginLeft: 110,
    },
    loremIpsum2Row: {
        height: 11,
        flexDirection: "row",
        marginTop: 12,
        marginLeft: 25,
        marginRight: 115,
    },
    elitePerformance: {
        fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 18,
        marginTop: 21,
        marginLeft: 25,
    },
    icon3: {
        fontSize: 20,
        color: "#000000",
        paddingLeft: 10,
        paddingTop: 5,
    },
    head: {
        height: 220
    },
    mainView: {
        position: 'absolute',
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        backgroundColor: '#FFFFFF',
        top: 130,
        height: 136,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7e9',
        flexDirection: 'row',
    },
    searchIcon: {
        position: 'absolute',
        left: 30,
        zIndex: 1,
        top: 46
    },
    cancelIcon: {
        position: 'absolute',
        right: 30,
        zIndex: 1,
        top: 46,
        opacity: 0.5
    },
    firstContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        overflow: "hidden",
        marginTop: 1.2,
        marginBottom: 70
    },
    confidence: {
        color: '#4454FF',
        fontSize: 10,
        paddingLeft: 25,
        paddingTop: 18,
        marginBottom: -12,
        fontWeight: 'bold'
    },
    textView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    searchResult: {
        color: '#989EBE',
        fontSize: 10,
        fontFamily: "Raleway-SemiBold"
    },
    tabView: {
        backgroundColor: "#FFFFFF",
        height: 45,
        width: '75%',
        alignSelf: 'center',
        elevation: 0,
    },
    noMedia: {
        color: '#4454FF',
        fontSize: 14,
        textAlign: 'center',
        margin: 50,
        fontFamily: "Montserrat-SemiBold"
    }
});