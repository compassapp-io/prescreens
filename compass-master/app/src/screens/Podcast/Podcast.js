import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  BackHandler,
  ActivityIndicator,
  Platform
} from "react-native";
import { AuthContext } from "../../provider/Auth";
import Slider from '@react-native-community/slider';
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import appGlobal from "../../../constants/appglobal";
import AxiosInstance from '../../provider/Interceptor';

import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
} from "react-native-track-player";
import { useProgress } from 'react-native-track-player/lib/hooks';
import HTML from "react-native-render-html";
import styles from './Podcaststyle';
const { width, height } = Dimensions.get('window');
function Podcast(props) {
  //  {State.None} --       0
  //  {State.Ready} --      2
  //  {State.Playing} --    3
  //  {State.Stopped} --    1
  //  {State.Buffering} --  6
  //  {State.Connecting} -- 8

  const playbackState = usePlaybackState(); // used by track player to decide the track player state
  const [currentAudio, setCurrentAudio] = useState(null); // used to store the selected audio for playing
  const [audioEpisodes, setAudioEpisodes] = useState([]); // used to store all the audios
  const [content, setContent] = useState(null); // used to store the content data retrived from get by id
  const isPlaying = useRef('paused'); //paused play loading
  const isFullScreen = useRef(false);
  const contentId = props.route.params;
  const scrollX = useRef(new Animated.Value(0)).current;
  const position = useRef(Animated.divide(scrollX, width)).current;
  const { position: progressPosition, duration } = useProgress();
  function handleBackButtonClick() {
    if(isFullScreen.current) {
      isFullScreen.current = false;
      return true;
    }
    return false;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick.bind(this));
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  useEffect(() => {
    getContentData();
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
    return () => {
      TrackPlayer.destroy();
      setAudioEpisodes([]);
      setCurrentAudio(null);
      setContent(null)
    };
  }, []);
  useEffect(() => {
    // console.log('Player State', playbackState);

    //set the player state 
    if (playbackState === 'playing' || playbackState === 3) {
      isPlaying.current = 'playing';
    } else if (playbackState === 'paused' || playbackState === 2 || playbackState == 'idle' || playbackState == 'ready') {
      isPlaying.current = 'paused';
    } else if ((playbackState === 'stopped' || playbackState === 1)) {
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
  const togglePlayback = async (data = currentAudio) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (data && currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(data);
      await TrackPlayer.play();
      if (data.isPreviouslyPlayed) {
        TrackPlayer.seekTo(data.consumptionlength);
      }
    } else if (currentAudio && currentAudio.id !== data.id) {
      await TrackPlayer.reset();
      await TrackPlayer.add(data);
      await TrackPlayer.play();
    } else {
      if (playbackState === State.Paused) {
        await TrackPlayer.play();
      } else {
        const pos = await TrackPlayer.getPosition();
        // last played positon
        await TrackPlayer.pause();
        updateTime(pos);
      }
    }
    if(isPlaying.current == 'completed') {
      await TrackPlayer.reset();
      await TrackPlayer.add(data);
      await TrackPlayer.play();
    }
    setCurrentAudio(data);
  };
  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };
  /**
   * @description Method to update the time to the API after pausing the audio.
   * @param {*} time 
   */
  const updateTime = (time) => {
    let url = '';
    if (currentAudio && currentAudio.contentConsumptionId == -1) {
      url = appGlobal.getEndpoint(appGlobal.APIEndpoints.consumption);
    } else if (currentAudio && currentAudio.contentConsumptionId) {
      url = `${appGlobal.getEndpoint(appGlobal.APIEndpoints.consumption)}/${currentAudio.contentConsumptionId}`;
    }
    if (time) {
      var raw = JSON.stringify({
        "mediaid": currentAudio.id,
        "contentid": contentId,
        "totallength": duration,
        "meta": "{}",
        "consumptionlength": time,
      });
      if (currentAudio.contentConsumptionId == -1) {
        AxiosInstance.post(url, raw)
          .then(function () { })
          .catch(function () { });
      } else {
        AxiosInstance.put(url, raw)
          .then(function () { })
          .catch(function () { });
      }
    }
  }
  /**
   * @description Method to get the data of content consumption for a particular content.
   * @param {*} contentData  Content data retrived from content get by id.
   */
  const getContentConsumption = (contentData) => {
    AxiosInstance.get(`${appGlobal.APIEndpoints.contentconsumptionbycontent}/${contentId}`)
      .then(function (response) {
        if (response) {
          const result = response.data;
          const songs = [];
          setContent(contentData);
          if (contentData && contentData.mediaids && contentData.mediaids.length) {
            contentData.media.map(media => {
              let isPreviouslyPlayed;
              if (result && result.length) {
                isPreviouslyPlayed = result.find(o => o.mediaid == media.id);
              }
              const mediaMeta = JSON.parse(media.meta);
              media.meta = JSON.parse(media.meta);
              songs.push({
                title: media.description,
                artist: mediaMeta.artist,
                artwork: mediaMeta.artwork,
                url: `${appGlobal.S3URL}${media.name}`,
                id: media.id,
                isPreviouslyPlayed: isPreviouslyPlayed == undefined ? false : true,
                consumptionlength: isPreviouslyPlayed == undefined ? 0 : isPreviouslyPlayed.consumptionlength,
                contentConsumptionId: isPreviouslyPlayed == undefined ? -1 : isPreviouslyPlayed.id,
                totallength: isPreviouslyPlayed == undefined ? 0 : isPreviouslyPlayed.totallength,
              });
            });
            setAudioEpisodes(songs);
          }
        }
      })
      .catch(function (error) {
      });
  }
  /**
   * @description Method to retrive the content data by Id.
   */
  const getContentData = () => {
    AxiosInstance.get(`${appGlobal.APIEndpoints.contentbyid}${contentId}`)
      .then(function (response) {
        if (response) {
          const result = response.data;
          if (result) {
            getContentConsumption(result);
          }
        }
      })
      .catch((error) => console.error({ error }));
  }
  const goBack = async () => {
    if(playbackState == 'playing'  || playbackState === 3){
      updateTime(progressPosition);
      await TrackPlayer.pause();
    }
    props.navigation.navigate("Home");
  }

  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100,
              ),
            },
          ],
        }}>
        <Animated.Image
          source={{
            uri: item && item.artwork
          }}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        />
      </Animated.View>
    );
  };
  const returnPlayBtn = () => {
    console.log(playbackState);
    switch (isPlaying.current) {
      case 'playing':
        return <Icon color="#fff" name="pause" size={35} />;
      case 'paused':
        return <FontAwesomeIcon color="#fff" name="play" size={35} />;
      case 'completed':
        return <MaterialCommunityIcons color="#fff" name="replay" size={35} />;
      default:
        return <ActivityIndicator size={30} color="#fff" />;
    }
  };
  const handleChange = async (val, forward = false, backward = false) => {
    let currectTime = await TrackPlayer.getPosition();
    if (forward) {
      val += currectTime;
    }
    if (backward) {
      val = currectTime - val;
    }
    if (val <= duration) {
      TrackPlayer.seekTo(val);
    }
  };
  const PlayerScreen = () => {
    return (
      <View style={styles.playerScreenContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#030303" />
        <TouchableOpacity
          onPress={() => isFullScreen.current = false} style={styles.container2}>
          <View style={styles.iconRow}>
            <Icon name="angle-left" style={styles.icon}></Icon>
            <Text style={styles.browser}>Back</Text>
          </View>
        </TouchableOpacity>
        <SafeAreaView style={styles.playerScreenSafeAreaViewContainer}>
          <SafeAreaView style={{ height: 350 }}>
            <Animated.FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              data={audioEpisodes}
              renderItem={renderItem}
              keyExtractor={(item) => item.url}
            />
          </SafeAreaView>
          <View>
            <Text style={styles.title}>{currentAudio && currentAudio.title}</Text>
            <Text style={styles.artist}>{currentAudio && currentAudio.artist}</Text>
          </View>
          <View style={styles.progressContainer}>
            <Slider
              step={1}
              style={{ width: 320, height: 40 }}
              minimumValue={0}
              value={progressPosition}
              maximumValue={duration}
              minimumTrackTintColor="#ffffff"
              onSlidingComplete={handleChange}
              maximumTrackTintColor="rgba(255, 255, 255, .5)"
              thumbTintColor="#fff"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timers}>{formatTime(progressPosition)}</Text>
              <Text style={styles.timers}>{formatTime(duration)}</Text>
            </View>
          </View>
          <View style={styles.controlContainer}>
            <MaterialCommunityIcons
              onPress={() => handleChange(30, false, true)}
              name="rewind-30"
              size="45"
              style={styles.playicon}></MaterialCommunityIcons>
            <TouchableOpacity onPress={() => togglePlayback()}>
              {returnPlayBtn()}
            </TouchableOpacity>
            <MaterialCommunityIcons
              onPress={() => handleChange(30, true)}
              name="fast-forward-30"
              size="65"
              style={styles.playicon}></MaterialCommunityIcons>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {isFullScreen.current ? <PlayerScreen/> :
        <View>
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}>
            <TouchableOpacity
              onPress={() => goBack()} style={styles.container2}>
              <View style={styles.iconRow}>
                <Icon name="angle-left" style={styles.icon}></Icon>
                <Text style={styles.browser}>Browser</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.rect}>
              <View style={styles.contain5r2}>
                <View style={styles.group9}>
                  {content && <Image
                    source={{ uri: content.media[0].meta.artwork }}
                    resizeMode="cover"
                    style={styles.image}
                  ></Image>}
                </View>
                <View style={styles.group8}>
                  <Text style={styles.voiceInSport}>{content?.title}</Text>
                  {/* <Text style={styles.loremIpsum6}>Lorem Ipsum</Text> */}
                  <View style={styles.group11}>
                    <View style={styles.group10}>
                      <View style={styles.rect6}>
                        <Text style={styles.follow}>Follow</Text>
                      </View>
                    </View>
                    <View style={styles.group12}>
                      <View style={styles.rect7}></View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.textcontainer}>
                <HTML tagsStyles={{ p: { fontSize: 12, color: "#121212"} }} source={{ html: "<p>" + content?.description + "</p>"}} />
              </View>
              <View style={styles.group2}>
                <View style={styles.group4}>
                  <View style={styles.rect2}>
                    <Text style={styles.mentalPerformance}>Mental Performance</Text>
                    <Image
                      source={require("../../assets/images/sc.png")}
                      resizeMode="cover"
                      style={styles.scene}
                    ></Image>
                  </View>
                </View>
                <View style={styles.group3}>
                  <View style={styles.group5}>
                    <View style={styles.rect3}>
                      <Text style={styles.changeManagement}>Change Management</Text>
                      <Image
                        source={require("../../assets/images/head2.png")}
                        resizeMode="cover"
                        style={styles.head1}
                      ></Image>
                    </View>
                  </View>
                  <View style={styles.group6}>
                    <View style={styles.rect4}>
                      <Text style={styles.mentalHealth}>Mental Health</Text>
                      <Image
                        source={require("../../assets/images/head1.png")}
                        resizeMode="cover"
                        style={styles.head1}
                      ></Image>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.bordercontainer}></View>
              <View style={styles.episodecontainer}>
                <Text style={styles.episodes}>Episodes</Text>
                {audioEpisodes.map((data, index) => {
                  return (
                    <View style={styles.lastcontainer} key={index}>
                      <View style={styles.seccontainer}>
                        <View style={styles.group14}>
                          <Text style={styles.loremIpsum8}>{data.title}</Text>
                          <Text style={styles.loremIpsum9}>{data.artist}</Text>

                          <View style={styles.group16}>
                            {Platform.OS == 'android' && (
                              (playbackState == State.Ready ||
                                playbackState == State.Stopped) || ((playbackState === State.Playing || playbackState == State.Buffering) && (currentAudio && currentAudio.id != data.id))) && (
                                <FontAwesomeIcon
                                  onPress={() => togglePlayback(data)}
                                  name="play"
                                  style={styles.icon3}
                                ></FontAwesomeIcon>
                              )}
                            {Platform.OS == 'android' && (playbackState === State.Playing && (currentAudio && currentAudio.id == data.id)) && (
                              <FontAwesomeIcon
                                onPress={() => togglePlayback(data)}
                                name="pause"
                                style={styles.icon3}
                              ></FontAwesomeIcon>
                            )}
                            {Platform.OS == 'android' && (playbackState === State.Buffering && (currentAudio && currentAudio.id == data.id)) && (
                              <ActivityIndicator size={22} color="rgba(51,41,255,1)" />
                            )}
                            {Platform.OS == 'ios' && ((isPlaying.current == 'paused') || ((currentAudio && currentAudio.id != data.id))) && (<FontAwesomeIcon
                              onPress={() => togglePlayback(data)}
                              name="play"
                              style={styles.icon3}
                            ></FontAwesomeIcon>)}
                            {Platform.OS == 'ios' && ((isPlaying.current == 'playing' && currentAudio && currentAudio.id == data.id)) && (<FontAwesomeIcon
                              onPress={() => togglePlayback(data)}
                              name="pause"
                              style={styles.icon3}
                            ></FontAwesomeIcon>)}
                            {Platform.OS == 'ios' && ((isPlaying.current == 'loading' && currentAudio && currentAudio.id == data.id)) && (
                              <ActivityIndicator size={22} color="rgba(51,41,255,1)" />
                            )}
                            {Platform.OS == 'ios' && ((isPlaying.current == 'loading') && ((currentAudio && currentAudio.id == data.id))) && (<ActivityIndicator size={30} color="black" />)}
                            <FontAwesomeIcon
                              name="plus-circle"
                              style={styles.icon4}
                            ></FontAwesomeIcon>
                            <FontAwesomeIcon
                              name="arrow-circle-o-down"
                              style={styles.icon5}
                            ></FontAwesomeIcon>

                          </View>
                          <View style={styles.lastbordercontainer}></View>
                        </View>
                        <View style={styles.group15}>
                          <FontAwesomeIcon
                            name="ellipsis-h"
                            style={styles.icon2}
                          ></FontAwesomeIcon>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          {currentAudio && <View style={styles.bottomplayer}>
            <TouchableOpacity onPress={() => isFullScreen.current = true}>
              <Image
                source={{
                  uri: currentAudio && currentAudio.artwork
                }}
                resizeMode="cover"
                style={styles.playerimg}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.bottomplayertitle}>
              {currentAudio && currentAudio.title}
            </Text>

            {(isPlaying.current == 'paused') && (
              <FontAwesomeIcon
                onPress={() => togglePlayback(currentAudio)}
                name="play"
                style={styles.playicon}
              ></FontAwesomeIcon>
            )}
            {(playbackState == State.Buffering) && (
              returnPlayBtn()
            )}

            {isPlaying.current == 'playing' && (
              <FontAwesomeIcon
                onPress={() => togglePlayback(currentAudio)}
                name="pause"
                style={styles.playicon}
              ></FontAwesomeIcon>
            )}
            <MaterialCommunityIcons
              onPress={() => handleChange(30, true)}
              name="fast-forward-30"
              style={styles.playicon}></MaterialCommunityIcons>
          </View>}</View>}
    </View>
  );
}
export default Podcast;
