import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    touchable: {
        padding: 5
    },
    touchablePlay: {
        padding: 5,
        backgroundColor: "#FFFFFF30",
        borderRadius: 50,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: "center",
    },
    icon: {
        fontSize: 16,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15
    }
});