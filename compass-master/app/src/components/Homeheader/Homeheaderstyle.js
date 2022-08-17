import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    container: {
        height: 270,
    },
    image1: {
        flex: 1,
        width: '90%',
        alignSelf: 'flex-end',
    },
    main:{
        borderBottomRightRadius: 70,
        overflow: 'hidden',
       width: '82%'
    },
    homeText: {
        color: "#FFFFFF",
        fontSize: 13,
        paddingTop: 60,
        marginLeft: -10,
        fontFamily: 'Montserrat-Bold'
    },
    helloText: {
        color: "#FFFFFF",
        fontSize: 13,
        paddingTop: 40,
        paddingLeft: 5,
        fontFamily: 'Montserrat-Regular'
    },
    great: {
        color: "#FFFFFF",
        fontSize: 13,
        paddingTop: 10,
        paddingLeft: 5
    },
    HowText: {
        color: "#FFFFFF",
        fontSize: 18,
        paddingLeft: 5,
        fontFamily: 'Raleway-Regular'
    },
    success :{
        color: "#FFFFFF",
        fontSize: 18,
        paddingLeft: 5,
        paddingTop: 5
    },
    addBtn:{
        width: 117,
        marginTop: 36,
        borderRadius: 8
    },
    image8: {
        width: 15,
        marginTop: 40,
        marginLeft: 30
    },
    container: {
        flexDirection: 'row',
        overflow: 'hidden',
       
    },
    arrow: {
        paddingLeft: 36,
        paddingTop: 60
    },
    textView: {
         flexDirection: 'column',
         paddingLeft: 10,
         paddingTop: 52
    },
    question: {
        color: "#FFFFFF",
        fontSize: 13,
        fontFamily: "Montserrat-Bold"
    },
    outOf : {
        fontSize: 10,
        color: "#FFFFFF",
        opacity: 0.7,
        fontFamily: "Raleway-SemiBold"
    },
    searchContainer: {
        paddingTop: 80,
        paddingLeft: 16,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    search: {
        paddingLeft: 10,
        color: "#FFFFFF",
        fontSize: 13,
        paddingTop: 2,
        fontFamily: "Montserrat-Bold",
    },
    check: {
        paddingTop: 95
    }
})