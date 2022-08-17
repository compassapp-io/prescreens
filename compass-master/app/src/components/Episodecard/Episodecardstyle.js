import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#4454FF29",
        height: 75,
        width: '90%',
        margin: 15,
        padding: 6,
        borderRadius: 14,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    image8: {
        borderRadius: 14,
        width: 55,
        height: 55
    },
    container2: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 8,
        width: '78%'
    },
    text1: {
        color: "#4454FF",
        fontSize: 10,
        fontFamily: "Raleway-SemiBold"
    },
    text2: {
        color: "#1C2037",
        fontSize: 11,
        fontFamily: "Montserrat-Bold",
        paddingTop: 6
    },
    text3: {
        color: "#989EBE",
        fontSize: 10,
        fontFamily: "Raleway-Regular"
    },
    container3: {
        width: 18,
        height: 18,
        backgroundColor: "#1C2037",
        borderRadius: 5,
        justifyContent: 'flex-end',
        position: 'absolute',
        right: '4%',
        top: '10%'
    },
    iconImage: {
        width: 8,
        height: 8,
        margin: 5.5
    },
    progress: {
        marginTop: -20,
        width: '84%',
        alignSelf: 'center'
    },
    progressBar: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    searchContain: {
        backgroundColor: "#FFFFFF",
        height: 75,
        width: '90%',
        margin: 10,
        padding: 6,
        borderRadius: 14,
        flexDirection: 'row'
    },
    searchText1: {
        color: '#1C2037',
        fontSize: 11,
        fontFamily: "Montserrat-Bold",
        paddingLeft: 5
    },
    searchText2: {
        color: '#989EBE',
        fontSize: 10,
        paddingTop: 5,
        paddingLeft: 5,
        fontFamily: "Raleway-Regular"
    },
    container4: {
        flexDirection: 'column',
        width: 145,
        margin: 22
    },
    image3: {
        width: '100%',
        height: 145,
        borderRadius: 14
    },
    categoryText: {
        color: '#1C2037',
        fontSize: 11,
        fontFamily: "Montserrat-Bold",
        paddingLeft: 8,
        paddingTop: 8
    },
    categoryText2: {
        color: '#989EBE',
        fontSize: 10,
        paddingTop: 5,
        paddingLeft: 8,
        fontFamily: "Montserrat-Regular"
    }
})