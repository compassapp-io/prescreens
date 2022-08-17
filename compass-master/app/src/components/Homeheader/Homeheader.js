import React, { useContext, useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Homeheader/Homeheaderstyle';
import Button from '../Button/Button'
import { AuthContext } from "../../provider/Auth";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
const HomeHeader = ({ headStyle, currenPage, questions, currentQuestionIndex, onPress, goToAssesmentResult, showMoodButton = true }) => {
    const {
        user, logout
    } = useContext(AuthContext)
    const name = user?.name
    const [visible, setVisible] = React.useState(false);
    const [firstName, setFirstName] = useState('')
    useEffect(() => {
        if (name) {
            const splitName = name.split(" ");
            setFirstName(splitName[0])
        }
    }, [])
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <LinearGradient
                    colors={['#4454FF', '#6c49fd']}
                    locations={[0.2, 0.8]}
                    style={[styles.background, headStyle]}>

                    {currenPage === "Home" && (
                        <ImageBackground
                            source={require("../../assets/images/backhead.png")}
                            resizeMode="cover"
                            style={styles.image1}>
                            <>
                                <Text style={styles.homeText}>HOME</Text>
                                <Text style={styles.helloText}>Hello, {firstName}</Text>
                                <Text style={styles.HowText}>How are you feeling today?</Text>
                                {showMoodButton && <Button buttonText='Add a mood entry' customStyle={styles.addBtn} GradientColor={['#4454FF40', '#4454FF40']} onPress={goToAssesmentResult} />}
                            </>
                        </ImageBackground>
                    )}

                    {currenPage === "AssesmentResult" && (
                        <ImageBackground
                            source={require("../../assets/images/backhead.png")}
                            resizeMode="cover"
                            style={styles.image1}>
                            <>
                                <Feather name="check" size={40} color="white" style={styles.check} />
                                <Text style={styles.great}>Great Job!</Text>
                                <Text style={styles.success}>You have successfully completed the assessment</Text>
                            </>
                        </ImageBackground>
                    )}
                    {currenPage === "Assesment" && (
                        <View style={styles.container}>
                            <TouchableOpacity onPress={onPress}>
                                <Ionicons name="arrow-back" size={18} color="white" style={styles.arrow} />
                            </TouchableOpacity>
                            <View style={styles.textView}>
                                <Text style={styles.question}>Question {currentQuestionIndex}</Text>
                                <Text style={styles.outOf}>out of {questions}</Text>
                            </View>
                        </View>
                    )}

                    {currenPage === "Search" && (
                        <View style={styles.searchContainer}>
                            <TouchableOpacity onPress={onPress}>
                                <Entypo name="cross" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.search}>SEARCH</Text>
                        </View>
                    )}
                </LinearGradient>
            </View>
            {currenPage === "Home" && (
                <Provider>
                    <View>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            style={{
                                paddingTop: 50,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                            anchor={
                                <TouchableOpacity activeOpacity={.5} onPress={openMenu}>
                                    <Image
                                        source={require("../../assets/images/menuIcon.png")}
                                        resizeMode="contain"
                                        style={styles.image8}
                                    />
                                </TouchableOpacity>}>
                            <Menu.Item onPress={() => { logout() }} title="Log out" />
                        </Menu>
                    </View>
                </Provider>

            )}
        </View>
    )
}

export default HomeHeader
