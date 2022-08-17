import {
    StyleSheet, Dimensions
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FE",
        paddingBottom: 70,
    },
    head: {
        height: 260
    },
    coverImage: {
        height: '60%',
        width: '91%',
        marginTop: -150,
        resizeMode: 'cover',
        borderRadius: 10,
        marginLeft: 16
    },
    titleView: {
       paddingLeft: 16,
       paddingTop: '8%',
    },
    heading: {
        color: '#4454FF',
        textTransform: 'uppercase',
        fontSize: 10,
        fontFamily: "Raleway-SemiBold"
    },
    title: {
        color: '#1C2037',
        fontSize: 17,
        paddingTop: 6,
        fontFamily: "Montserrat-Bold",
    },
    subHeading: {
        color: '#989EBE',
        fontSize: 13,
        marginBottom: 8,
        fontFamily: "Raleway-Regular"
    },
    btnGroup: {
        flexDirection: "row",
        justifyContent: 'center',
        alignSelf: 'center',
        width:'50%',
        marginTop: -12
    },
    prevBtn: {
        margin: 20
    },
    playPauseView: {
        padding: 5,
        backgroundColor: "#4454FF10",
        borderRadius: 50,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: "center",
        margin: 8
    },
    nextBtn: {
       margin: 20
    },
    progressBar : {
        marginTop: 5
    }
})
