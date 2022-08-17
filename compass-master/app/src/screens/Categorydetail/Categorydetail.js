import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import styles from '../Categorydetail/Categorydetailstyle';
import BackButton from '../../components/Backbutton/Backbutton';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import Rating from '../../components/Rating/Rating';
import Button from '../../components/Button/Button';
import EpisodesCard from '../../components/Episodecard/Episodescard';
import { APIContext } from '../../provider/API';
import { AuthContext } from "../../provider/Auth";
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from "react-native-render-html";

function Categorydetail(props) {
    const id = props.route.params;
    const { apiLoader, getCategortDetail, putFollowForCategory } = useContext(APIContext);
    const { user } = useContext(AuthContext);
    const [btnText, setBtnText] = useState('Follow');
    const [categoryData, setCategoryData] = useState({});
    const [categoryMedia, setCategoryMedia] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [episodeText, setEpisodeText] = useState('See All Episodes');
    var year = moment(categoryData.createdAt).format('YYYY');
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCategortData();
        });
        return unsubscribe;
    }, [categoryMedia]);
    getCategortData = () => {
        getCategortDetail(id).then((response) => {
            if (response) {
                setBtnText('Follow')
                const data = response;
                setCategoryData(response);
                if (data.media.length > 3) {
                    setCategoryMedia(data.media.slice(0, 3));
                    setIsShow(true);
                    setEpisodeText('See All Episodes');
                } else {
                    setCategoryMedia(data.media);
                    setIsShow(false);
                }
                if (data.followed) {
                    data.followed.forEach(o => {
                        if (o.userid === user.userid) {
                            setBtnText('Unfollow')
                        }
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
    };

    function showAllMedia() {
        if (episodeText === 'See All Episodes') {
            setCategoryMedia(categoryData.media);
            setEpisodeText('See Less Episodes');
        } else {
            setCategoryMedia(categoryData.media.slice(0, 3));
            setEpisodeText('See All Episodes');
        }
    }
    const goToDetail = (media) => {
        if (media.type == 'audio') {
            props.navigation.navigate('audioscreen', media)
        } else if (media.type == 'video') {
            props.navigation.navigate('videoscreen', media)
        } else {
            props.navigation.navigate('articlescreen', media)
        }
    }
    function goBack() {
        props.navigation.navigate('SearchPage')
    }
    function followCategory() {
        const followedUserIds = [];
        if (btnText === 'Follow') {
            followedUserIds.push({
                "userid": user.userid
            })
            if (categoryData.followed) {
                categoryData.followed.forEach(o => {
                    followedUserIds.push({
                        "userid": o.userid
                    })
                })
            }
        } else {
            if (categoryData.followed.length > 1) {
                categoryData.followed.forEach(o => {
                    if (o.userid !== user.userid) {
                        followedUserIds.push({
                            "userid": o.userid
                        })
                    }
                })
            }
        }
        const body = JSON.stringify({
            "title": categoryData.title,
            "description": categoryData.description,
            "subsectionids": categoryData.subsectionids,
            "followedby": followedUserIds.length ? JSON.stringify(followedUserIds) : null,
            "meta": categoryData.meta,
            "displayorder": categoryData.displayorder,
        });
        putFollowForCategory(categoryData.id, body);
        setTimeout(() => {
            getCategortData();
        }, 100);
    }
    return (
        <ScrollView style={styles.container}>
            <Spinner
                visible={apiLoader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                animation='slide'
                overlayColor='rgba(1, 1, 1, 0.35)'
            />
            <BackButton isMenu={false} onBackPress={goBack} />
            <ImageBackground
                source={{ uri: categoryData.artwork }}
                resizeMode="cover"
                style={styles.image1}>
                <LinearGradient colors={['#00000000', '#222222']} locations={[0.5, 1]} style={styles.image1}>
                    <View style={styles.headContainer}>
                        <Text style={styles.title}>{categoryData.title}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <Text style={styles.type}>Podcast</Text>
            <View style={styles.ratingContainer}>
                {categoryData.media && (
                    <Text style={styles.episodes}>{categoryData.media.length} Episodes</Text>
                )}
            </View>
            <View style={{ flexDirection: 'row' }}>
                {categoryData.tags && categoryData.tags.map((tag, index) => {
                    return (
                        <View key={index} style={styles.tagConatiner}>
                            <Text style={styles.tag}>{tag}</Text>
                        </View>
                    )
                })}
            </View>
            <HTML tagsStyles={{
                p: {
                    paddingLeft: 20,
                    color: '#989EBE',
                    fontSize: 13,
                    fontFamily: "Raleway-Regular",
                    width: '95%',
                    paddingTop: 10
                }
            }} source={{ html: "<p>" + categoryData.description + "<p>" }} />
            <Button buttonText={btnText} customStyle={styles.followBtn} GradientColor={['#4454FF', '#7940FC']} onPress={followCategory} />
            <View style={styles.border} />
            <Text style={styles.episode}>Episodes</Text>
            {categoryData.media && categoryMedia && categoryMedia.map((media, index) => {
                return (
                    <EpisodesCard key={index} isHome={true} episodeData={media} customStyle={styles.headtext} custumContainer={styles.back} onEpisodeCardPress={() => goToDetail(media)} />
                )
            })}
            {isShow && (
                <Text style={styles.allEpisode} onPress={() => showAllMedia()}>{episodeText}</Text>
            )}
        </ScrollView>
    )
}

export default Categorydetail
