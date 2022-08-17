import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import HomeHeader from '../../components/Homeheader/Homeheader';
import styles from './Assesmentresultstyle';
import { GradientCircularProgress } from "react-native-circular-gradient-progress";
import Button from '../../components/Button/Button';
import { APIContext } from '../../provider/API';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../provider/Auth";
import HTML from "react-native-render-html";
import appglobal from '../../../constants/appglobal';
import Spinner from 'react-native-loading-spinner-overlay';

function AssesmentResult() {
    const navigation = useNavigation();
    const { apiLoader, assessmentScore, getAllContentsConsumptionWithSection } = useContext(APIContext);
    useEffect(() => {
        getAllContentsConsumptionWithSection()
    }, [])
    navigateToLanding = () => {
        navigation.navigate('Landing')
    }
    return (
        <ScrollView>
            <Spinner
                visible={apiLoader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                animation='slide'
                overlayColor='rgba(1, 1, 1, 0.35)'
            />
            <HomeHeader headStyle={styles.head} currenPage="AssesmentResult" />
            {assessmentScore[0] && <><Text style={styles.result}>Results</Text>
                <View style={styles.firstCard}>
                    <View style={{ flexDirection: 'row', height: '70%' }}>
                        <View style={styles.outercircle}>
                            <View style={styles.innercircle}>
                                <Text style={styles.text}>{assessmentScore[0]?.percentage}</Text>
                            </View>
                        </View>
                        <Image
                            source={require("../../assets/images/beat.png")}
                            resizeMode="contain"
                            style={styles.image1}
                        />
                    </View>
                    <Text style={styles.head1}>{assessmentScore[0]?.subsectionName}</Text>
                    <HTML tagsStyles={{
                        span: {
                            color: '#FFFFFF',
                            fontSize: 10,
                            fontWeight: 'bold',
                            opacity: 0.7,
                            paddingLeft: 20,
                            paddingTop: 5
                        }
                    }}
                        source={{ html: "<span>" + appglobal.trimText(assessmentScore[0]?.description, 100) + "<span>" }} />
                </View>
            </>}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {assessmentScore.map((score, index) => {
                    return (
                        <View style={styles.container} key={index}>
                            <View style={{ justifyContent: 'center', marginTop: 15, transform: [{ scaleX: -1 }] }}>
                                <GradientCircularProgress
                                    startColor="#7940FC6E"
                                    middleColor={score.percentage > 50 ? "#7940FC6E" : "#ffffff00"}
                                    endColor={score.percentage > 50 ? "#7940FC6E" : "#ffffff00"}
                                    size={80}
                                    progress={score.percentage}
                                    strokeWidth={8}
                                />
                                <Text style={styles.progressCount}>{score.percentage}</Text>
                            </View>
                            <Text style={styles.title}>{score.subsectionName}</Text>
                            {/* <Text style={styles.description}>{score.description}</Text> */}
                            <HTML tagsStyles={{
                                span: {
                                    fontSize: 10,
                                    color: '#989EBE',
                                    fontFamily: "Raleway-Regular",
                                    textAlign: 'center'
                                }
                            }}
                                source={{ html: "<span>" + appglobal.trimText(score.description, 50) + "<span>" }} />
                        </View>
                    )
                })}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {assessmentScore.map((score, index) => {
                    return (
                        <View style={styles.container2} key={index}>
                            <View style={{ justifyContent: 'center', marginTop: 5, marginLeft: 5, transform: [{ scaleX: -1 }] }}>
                                <GradientCircularProgress
                                    startColor="#000000"
                                    middleColor={score.percentage > 50 ? "#000000" : "#ffffff00"}
                                    endColor={score.percentage > 50 ? "#000000" : "#ffffff00"}
                                    size={30}
                                    progress={score.percentage}
                                    strokeWidth={8}
                                />
                                <Text style={styles.progressCount2}>{score.percentage}</Text>
                            </View>
                            <Text style={styles.title2}>{score.subsectionName}</Text>
                        </View>
                    )
                })}
            </ScrollView>
            <Text style={styles.mainHead}>Based on the Assessment</Text>
            {/* <Text style={styles.heading}>Lorem Ipsum is simply dummy text of the printing</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in llit anim id est laborum.</Text> */}
            <Button buttonText='Checkout Recommended Course' customStyle={styles.recommendedBtn} GradientColor={['#4454FF', '#7940FC']} onPress={navigateToLanding} />
        </ScrollView>
    )
}

export default AssesmentResult
