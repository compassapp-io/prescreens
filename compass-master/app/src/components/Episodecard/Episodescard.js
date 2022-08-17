import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from '../Episodecard/Episodecardstyle'
import { ProgressBar } from 'react-native-paper';
import appglobal from '../../../constants/appglobal';
import HTML from "react-native-render-html";
function EpisodesCard({ title, episodeData, onEpisodeCardPress,
    isHome, customStyle, custumContainer, image, description, width, isRecent, isCategory }) {
    let percentage = 0;
    let mediaIcon;
    if (episodeData && episodeData.totallength != 0) {
        percentage = episodeData.consumptionlength / episodeData.totallength;
    }
    if (episodeData && episodeData.type == 'audio') {
        mediaIcon = require("../../assets/images/headphones.png");
    } else if (episodeData && episodeData.type == 'video') {
        mediaIcon = require("../../assets/images/playing.png");
    } else {
        mediaIcon = require("../../assets/images/file.png");
    }
    return (
        <TouchableOpacity onPress={onEpisodeCardPress}>
            {isHome && (
                <>
                    <View style={[styles.container, custumContainer]}>
                        <Image
                            source={(episodeData.artwork)
                                ? { uri: episodeData.artwork }
                                : require("../../assets/images/default.jpg")}
                            resizeMode="cover"
                            style={styles.image8}
                        />
                        <View style={styles.container2}>
                            {title && (
                                <Text style={styles.text1}>{title}</Text>
                            )}
                            <Text style={[styles.text2, customStyle]}>{appglobal.trimText(episodeData.name, 20)}</Text>
                            <HTML tagsStyles={{
                                span: {
                                    color: "#989EBE",
                                    fontSize: 10,
                                    fontFamily: "Raleway-Regular"
                                }
                            }} source={{ html: "<span>" + appglobal.trimText(episodeData.description, 20) + "<span>" }} />
                        </View>
                        <View style={styles.container3}>
                            <Image
                                source={mediaIcon}
                                resizeMode="cover"
                                style={styles.iconImage}
                            />
                        </View>
                    </View>
                    <View style={styles.progress}>
                        <ProgressBar style={styles.progressBar} progress={percentage} color={"#4454FF"} />
                    </View>
                </>
            )}

            {isRecent && (
                <View style={[styles.searchContain, width]}>
                    <Image
                        source={(image)
                            ? { uri: image }
                            : require("../../assets/images/default.jpg")}
                        resizeMode="cover"
                        style={styles.image8}
                    />
                    <View style={styles.container2}>
                        <Text style={styles.searchText1}>{title}</Text>
                        <HTML tagsStyles={{
                            span: {
                                color: '#989EBE',
                                fontSize: 10,
                                paddingLeft: 5,
                                fontFamily: "Raleway-Regular",
                            }
                        }} source={{ html: "<span>" + appglobal.trimText(description, 20) + "<span>" }} />
                    </View>
                </View>
            )}

            {isCategory && (
                <View style={styles.container4}>
                    <Image
                        source={(image)
                            ? { uri: image }
                            : require("../../assets/images/default.jpg")}
                        resizeMode="cover"
                        style={styles.image3}
                    />
                    <Text style={styles.categoryText}>{title}</Text>
                    <HTML tagsStyles={{
                        span: {
                            color: '#989EBE',
                            fontSize: 10,
                            paddingTop: 5,
                            paddingLeft: 8,
                            fontFamily: "Montserrat-Regular"
                        }
                    }} source={{ html: "<span>" + appglobal.trimText(description) + "<span>" }} />
                </View>
            )}
        </TouchableOpacity>
    )
}

export default EpisodesCard
