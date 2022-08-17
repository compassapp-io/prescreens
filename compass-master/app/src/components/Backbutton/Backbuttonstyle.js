import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        height: 30,
        position: 'absolute',
        top: 62,
        flexDirection: 'row',
        justifyContent: "space-between",
        zIndex: 1,
        width: '100%'
    },
    backIcon: {
        paddingLeft: 16,
    },
    menuIcon :{
       justifyContent: 'flex-end',
       paddingEnd: 16
    }
})