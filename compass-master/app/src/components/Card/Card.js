import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import styles from '../Card/Cardstyle';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../Button/Button';
import StepIndicator from '../Stepindicator/StepIndicator';
import appglobal from '../../../constants/appglobal';
import HTML from "react-native-render-html";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

function Card(props) {
    const { GradientColor,
        subSection,
        opacity,
        width,
        title,
        description,
        onCardPress,
        goToDetail,
        cardWidth,
        buttonText,
        isProfile,
        isGuidePage,
        data } = props;
    return (
        <View style={{ width: cardWidth }}>
            <TouchableWithoutFeedback onPress={onCardPress}>
                <ImageBackground
                    source={(data.artwork)
                        ? { uri: data.artwork }
                        : require("../../assets/images/default.jpg")}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 16 }}
                    style={styles.image1}>
                    <LinearGradient colors={GradientColor} start={[0.3, 1]} end={[0.8, 1]} style={[styles.card, { opacity: opacity }]}>
                    </LinearGradient>
                    <View style={styles.mainView}>
                        <View style={{ width: width }}>
                            <Text style={styles.title}>{appglobal.trimText(title, 20)}</Text>
                            <HTML tagsStyles={{ span: { color: styles.subTitle.color, fontSize: styles.subTitle.fontSize, height: styles.subTitle.height } }}
                                source={{ html: "<span>" + appglobal.trimText(description, 20) + "<span>" }} />
                            <Button buttonText={buttonText} customStyle={styles.btn} GradientColor={['#3e448e', '#3e448e']} onPress={goToDetail} />
                        </View>
                    </View>
                    {subSection && (
                        <View style={styles.indicator}>
                            <StepIndicator data={subSection} forCard={true} />
                        </View>
                    )}
                    {isProfile === true && (
                        <View style={styles.completed}>
                            <View style={styles.check}></View>
                            <Feather name="check" size={40} color="white" style={styles.checkIon} />
                        </View>
                    )}
                </ImageBackground>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Card

