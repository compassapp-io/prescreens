import React, { useRef, useContext, useEffect, useState } from 'react'
import HomeHeader from '../../components/Homeheader/Homeheader';
import styles from './Audio.style';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { APIContext } from '../../provider/API';
import TrackPlayer, {
    Capability,
    Event,
    State,
    usePlaybackState,
} from "react-native-track-player";
import { useProgress } from 'react-native-track-player/lib/hooks';
import ProgressBar from "../../components/Progressbar/Progressbar";
import BackButton from '../../components/Backbutton/Backbutton';
import HTML from "react-native-render-html";
import KeepAwake from 'react-native-keep-awake';

//  {State.None} --       0
//  {State.Ready} --      2
//  {State.Playing} --    3
//  {State.Stopped} --    1
//  {State.Buffering} --  6
//  {State.Connecting} -- 8
function AudioScreen(props) {
    const { id: audioId, name, artwork, description, subsectionName, contentId, subSectionId, url, artist } = props.route.params;
    console.log(props.route.params)
    const playbackState = usePlaybackState(); // used by track player to decide the track player state
    const isPlaying = useRef('paused'); //paused play loading
    const [contentConsumptionId, setContentConsumptionId] = useState(-1);
    const { position: progressPosition, duration } = useProgress();
    const [audioData, setAudioData] = useState({});

    const {
        getMediaConsumptionByMediaId, postMediaConsumption, putMediaConsumption, getContentWithSubSection
    } = useContext(APIContext);
    useEffect(() => {
        KeepAwake.activate();
        TrackPlayer.setupPlayer().then(async () => {
            // The player is ready to be used
            // add the array of songs in the playlist
            await TrackPlayer.reset();
            await TrackPlayer.updateOptions({
                stopWithApp: true,
                alwaysPauseOnInterruption: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SeekTo
                ],
            });
            //monitor intterupt when other apps start playing music
            // TrackPlayer.addEventListener(Event.RemoteDuck, (e) => {
            //   // console.log(e);
            //   if (e.paused) {
            //     // if pause true we need to pause the music
            //     TrackPlayer.pause();
            //   } else {
            //     TrackPlayer.play();
            //   }
            // });
        });
        getMediaConsumptionByMediaId(audioId).then((response) => {
            if (response) {
                if (response.status != 404) {
                    setContentConsumptionId(response.id)
                }
                if (url) {
                    const data = {
                        url,
                        id: audioId.toString(),
                        artist: artist,
                        title: name,
                        artwork: artwork,
                        consumptionLength: response.status != 404 ? response.consumptionlength : -1
                    };
                    setAudioData(data);
                    togglePlayback(data);
                }
            }
        }).catch(err => {
            console.log(err);
        })
        return () => {
            TrackPlayer.destroy();
        }
    }, []);
    useEffect(() => {
        //set the player state 
        if (playbackState === 'playing' || playbackState === 3) {
            isPlaying.current = 'playing';
        } else if (playbackState === 'paused' || playbackState === 2 || playbackState == 'idle' || playbackState == 'ready') {
            isPlaying.current = 'paused';
        } else if (Math.floor(progressPosition) == Math.floor(duration)) {
            isPlaying.current = 'completed';
            updateTime(duration);
        } else {
            isPlaying.current = 'loading'
        }
    }, [playbackState]);
    /**
     * @description Method to play/pause the audio
     * @param {*} data selected audio.
     */
    const togglePlayback = async (data) => {
        if (data) {
            await TrackPlayer.reset();
            await TrackPlayer.add(data)
            if (data.consumptionLength != -1) {
                console.log(data)
                setTimeout(() => {
                    console.log('test')
                    onSeek(data.consumptionLength);
                    TrackPlayer.play();
                }, 3000);
            } else {
                await TrackPlayer.play();
            }
        }
    };

    const audioControl = async (event) => {
        if (event === 'replay') {
            await TrackPlayer.reset();
            await TrackPlayer.add(audioData);
            await TrackPlayer.play();
        } else {
            if (playbackState === State.Paused) {
                await TrackPlayer.play();
                KeepAwake.activate();
            } else {
                TrackPlayer.pause();
                updateTime(progressPosition);
                KeepAwake.deactivate();
            }
        }
    }
    function onSeek(time) {
        console.log('test')
        TrackPlayer.seekTo(time);
    }
    /**
  * @description Method to update the time to the API after pausing the audio.
  * @param {*} time 
  */
    const updateTime = (time, goBack = false) => {
        if (time) {
            var raw = JSON.stringify({
                "mediaid": audioId,
                "contentid": contentId,
                "totallength": duration,
                "meta": "{}",
                "consumptionlength": time,
            });
            if (contentConsumptionId > 0) {
                putMediaConsumption(contentConsumptionId, raw);
            } else {
                postMediaConsumption(raw);
            }
            if (goBack) {
                props.navigation.goBack()
                TrackPlayer.destroy();
                KeepAwake.deactivate();
            }
        }
    }
    return (
        <View style={styles.container}>
            <BackButton isMenu={true} onBackPress={() => updateTime(progressPosition, true)} menuColor="black" />
            <HomeHeader headStyle={styles.head} />
            <Image
                source={{ uri: artwork }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 16 }}
                style={styles.coverImage} />
            <View style={{ position: 'absolute', bottom: 20, width: '100%' }}>
                <View style={styles.titleView}>
                    <Text style={styles.heading}>{subsectionName}</Text>
                    <Text style={styles.title}>{name}</Text>
                    <HTML tagsStyles={{
                        span: {
                            color: '#989EBE',
                            fontSize: 13,
                            marginBottom: 8,
                            fontFamily: "Raleway-Regular"
                        }
                    }} source={{ html: "<span>" + description + "<span>" }} />
                </View>
                <ProgressBar
                    currentTime={progressPosition}
                    duration={duration > 0 ? duration : 0}
                    onSlideCapture={(data) => { onSeek(data.currentTime) }}
                    isProfile={false}
                />
                <View style={styles.btnGroup}>
                    <TouchableOpacity disabled={progressPosition < 15} onPress={() => onSeek(progressPosition - 15)}>
                        <EntypoIcon style={[{ opacity: progressPosition < 15 ? 0.2 : 1 }, styles.prevBtn]} name="controller-jump-to-start" size={20} />
                    </TouchableOpacity>
                    <View style={styles.playPauseView}>
                        {playbackState === 'playing' || playbackState === 3 ?
                            <EntypoIcon name="controller-paus" size={20} onPress={() => audioControl()} /> :
                            playbackState === 'paused' || playbackState === 2 || playbackState == 'idle' || playbackState == 'ready' ?
                                <EntypoIcon name="controller-play" size={20} onPress={() => audioControl()} /> :
                                Math.floor(progressPosition) == Math.floor(duration) && (playbackState == '6' || playbackState == 'buffering') ?
                                    <MaterialCommunityIcons color="#fff" name="replay" size={20} onPress={() => audioControl('replay')} /> :
                                    <ActivityIndicator size={20} color="#fff" />}
                    </View>
                    <TouchableOpacity disabled={duration - progressPosition < 15} onPress={() => onSeek(progressPosition + 15)}>
                        <EntypoIcon style={[{ opacity: duration - progressPosition < 15 ? 0.2 : 1 }, styles.nextBtn]} name="controller-next" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AudioScreen
