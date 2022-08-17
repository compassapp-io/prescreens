import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    head: {
        height: 260
    },
    result: {
        fontSize: 10,
        color: '#989EBE',
        paddingTop: 20,
        paddingLeft: 20,
        textTransform: 'uppercase'
    },
    firstCard: {
        marginTop: 20,
        marginLeft: 20,
        height: 200,
        width: '89%',
        backgroundColor: '#1C2037',
        borderRadius: 16,
        shadowColor: "#4454FF40",
        shadowOffset: { width: 5, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10,
    },
    outercircle: {
        width: 104,
        height: 105,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginTop: 20,
        marginLeft: 20
    },
    image1: {
        width: '55%',
    },
    innercircle: {
        width: '85%',
        height: '85%',
        borderRadius: 50,
        margin: 7,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    text: {
        color: '#1C2037',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    head1: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    head2: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        opacity: 0.7,
        paddingLeft: 20,
        paddingTop: 5
    },
    container: {
        height: 169,
        width: 162,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: "#4454FF40",
        shadowOffset: { width: 5, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10,
        margin: 16,
        overflow: 'hidden',
        alignItems: 'center'
    },
    container2 : {
        height: 48,
        width: 162,
        backgroundColor: '#ECEEFE',
        borderRadius: 8,
        margin: 16,
        overflow: 'hidden',
        alignItems: 'center',
        flexDirection: 'row'
    },
    progressCount : {
        position: 'absolute',
        top: 26,
        left: 22,
        color: '#1C2037',
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
        transform: [{ scaleX: -1 }]
    },
    progressCount2 : {
        position: 'absolute',
        top: 9.5,
        left: 8.5,
        color: '#1C2037',
        fontSize: 8,
        fontFamily: "Montserrat-Bold",
        transform: [{ scaleX: -1 }]
    },
    title :{
        color: '#1C2037',
        fontSize: 11,
        fontFamily: "Montserrat-Bold",
        marginTop: 15
    },
    title2: {
        color: '#1C2037',
        fontSize: 11,
        fontFamily: "Montserrat-Bold",
        justifyContent: 'center',
        marginLeft: 20
    },
    description :{
        fontSize: 10,
        color: '#989EBE',
        fontFamily: "Raleway-Regular",
        textAlign: 'center'
    },
    mainHead: {
        fontSize: 10,
        color: '#989EBE',
        margin: 20,
        textTransform: 'uppercase',
        fontFamily: "Raleway-SemiBold"
    },
    heading: {
        fontSize: 15,
        color: '#1C2037',
        marginLeft: 20,
        fontFamily: "Montserrat-SemiBold"
    },
    subHeading: {
        color: '#989EBE',
        fontSize: 10,
        fontFamily: "Raleway-Regular",
        marginLeft: 20,
        marginTop: 8
    },
    recommendedBtn: {
        marginTop: 20,
        width: "90%",
        height: 45,
        marginBottom: 20,
        alignSelf: 'center'
    }
})