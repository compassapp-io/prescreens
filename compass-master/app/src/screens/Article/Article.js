import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ImageBackground, ScrollView } from 'react-native'
import styles from './Articlestyle'
import BackButton from '../../components/Backbutton/Backbutton'
import { LinearGradient } from 'expo-linear-gradient'
import appglobal from '../../../constants/appglobal'
import HTML from "react-native-render-html"
import moment from 'moment'
import Button from '../../components/Button/Button';
import { APIContext } from '../../provider/API';

function Article(props) {
    const { id: articleId, title, description, artist, artwork, contentId, subSectionId, subsectionName, createdAt } = props.route.params;
    const { postMediaConsumption, getMediaConsumptionByMediaId, putMediaConsumption, getContentWithSubSection } = useContext(APIContext);
    const [contentConsumptionId, setContentConsumptionId] = useState(-1);

    var time = moment(new Date(createdAt), "ddd MMM DD YYYY");
    var timeAgo = moment(time).fromNow();
    function goBack() {
        getContentWithSubSection()
        props.navigation.goBack();
    }
    useEffect(() => {
        getMediaConsumptionByMediaId(articleId).then((response) => {
            if (response) {
                if (response.status != 404) {
                    setContentConsumptionId(response.id)
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])
    function completeConsumption() {
        const body = JSON.stringify({
            "mediaid": articleId,
            "contentid": contentId,
            "totallength": 1,
            "meta": "{}",
            "consumptionlength": 1,
        });
        if (contentConsumptionId > 0) {
            putMediaConsumption(contentConsumptionId, body);
        } else {
            postMediaConsumption(body);
        }
        goBack();
    }
    return (
        <ScrollView style={styles.container}>
            <BackButton isMenu={false} onBackPress={goBack} />
            <ImageBackground
                source={{ uri: artwork }}
                resizeMode="cover"
                style={styles.image1}>
                <LinearGradient colors={['#00000000', '#222222']} locations={[0.5, 1]} style={styles.image1}>
                    <Text style={styles.mainHeading}>{subsectionName}</Text>
                    <Text style={styles.heading}>{appglobal.trimText(title, 25)}</Text>
                    <View style={styles.subHeading}>
                        <Text style={{ color: '#8287A2', fontSize: 10, fontFamily: "Montserrat-Regular" }}>By {artist}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.container3}>
                <HTML tagsStyles={{ span: { color: "#989EBE", fontSize: 13, fontFamily: "Raleway-Regular" } }} source={{ html: "<span>" + description + "<span>" }} />
            </View>
            <Button buttonText={'Complete Lesson'} customStyle={styles.btn} GradientColor={['#4454FF', '#7940FC']} onPress={() => completeConsumption()} />
        </ScrollView>
    )
}

export default Article
