import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import appGlobal from "../../../constants/appglobal";
import Video from "react-native-video";
import PlayerControls from "../../components/Playercontrol/Playercontrols";
import Orientation from "react-native-orientation-locker";
import ProgressBar from "../../components/Progressbar/Progressbar";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './Videofullscreenstyle';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../components/Backbutton/Backbutton';
import { APIContext } from '../../provider/API';
import HTML from "react-native-render-html";
import KeepAwake from 'react-native-keep-awake';
import YoutubePlayer from 'react-native-youtube-iframe';

function videoFullscreen(props) {
  const videodata = props.route.params;
  const videoRef = useRef(null);
  console.log(videodata)
  const [value, setValue] = useState("");
  const [getComsumptiondata, setComsumptiondata] = useState([]);
  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    youtubePlay: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
    showindicator: true,
    showPlayer: false,
    showioscontrol: false
  });
  const [videoId, setVideoId] = useState('');
  const {
    getMediaConsumptionByMediaId, postMediaConsumption, putMediaConsumption
  } = useContext(APIContext);
  useEffect(() => {
    KeepAwake.activate();
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        console.log("PORTRAIT")
        Orientation.lockToPortrait();
        setState((s) => ({ ...s, fullscreen: false }));
      } else {
        console.log("LANDSCAPE")
        Orientation.lockToLandscapeLeft();
        setState((s) => ({ ...s, fullscreen: true }));
      }
    })
  }, []);
  useEffect(() => {
    const url = videodata.url;
    if (url.includes("youtube.com")) {
      var video_id = url.split('v=')[1];
      if (video_id) {
        setVideoId(video_id);
      }
    } else if (url.includes("youtu.be")) {
      var video_id = url.split('youtu.be/')[1];
      if (video_id && video_id.includes("list")) {
        var listId = video_id.split('?list')[0];
        setVideoId(listId)
      } else {
        setVideoId(video_id)
      }
    }
    checkforconsumption();
  }, []);
  useEffect(() => {
    setInterval(() => {
      getCurrentTimeForYoutube();
    }, 1000)
  }, [])
  getCurrentTimeForYoutube = () => {
    if (videoId) {
      videoRef.current?.getCurrentTime().then((currentTime) => {
        if (currentTime && currentTime != state.currentTime) {
          setState((s) => ({
            ...s,
            currentTime: currentTime,
          }));
          console.log(currentTime)
        }
      });
    }
  }
  checkforconsumption = () => {
    getMediaConsumptionByMediaId(videodata.id).then((response) => {
      if (response) {
        // console.log(result);
        if (response.status === 404) {
          setValue("postNew");
        } else {
          setComsumptiondata(response);
          console.log(response);
          setState((s) => ({
            ...s,
            currentTime: response.consumptionlength,
          }));
          setValue("updateRecent");
        }
      }
    }).catch(err => {
      console.log(err);
    })
  };
  function onLoadEnd(data) {
    videoRef.current.seek(state.currentTime);
    setState((s) => ({
      ...s,
      duration: data.duration,
      currentTime: state.currentTime,
    }));
    if (data.duration > 0) {
      setState((s) => ({
        ...s,
        showioscontrol: true,
      }));
    }
  }

  function onReady() {
    videoRef.current?.getDuration().then((getDuration) => {
      setState((s) => ({
        ...s,
        play: false,
        youtubePlay: true,
        duration: getDuration,
        showindicator: false,
        showPlayer: true
      }));
    });
    if (state.currentTime) {
      videoRef.current.seekTo(state.currentTime);
    }
  }

  function onChangeState(data) {
    videoRef.current?.getCurrentTime().then((currentTime) => {
      setState((s) => ({
        ...s,
        currentTime: currentTime,
      }));
    });
  }

  function onProgress(data) {
    console.log(data)
    setState((s) => ({
      ...s,
      currentTime: data.currentTime,
    }));
    if (data.currentTime != state.currentTime) {
      setState((s) => ({
        ...s,
        showindicator: false,
        showPlayer: true
      }));
    }
  }

  function onEnd() {
    setState({ ...state, play: false });
    videoRef.current.seek(0);
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({ ...state, play: false, youtubePlay: true });
      return;
    }
    if (value == "postNew") {
      setContentConsumption();
    } else if (value == "updateRecent") {
      updateContentConsumption();
      console.log("update");
    }
    setState({ ...state, play: true, youtubePlay: false });
    console.log(state.currentTime);
    // setTimeout(() => setState(s => ({...s, showControls: false})), 8000);
  }

  function setContentConsumption() {
    const body = JSON.stringify({
      "mediaid": videodata.id,
      "contentid": videodata.contentId,
      "consumptionlength": state.currentTime,
      "meta": "{}",
      "totallength": state.duration,
    });
    console.log(body)
    postMediaConsumption(body, videodata.id, videodata.subSectionId, videodata.contentId, state.currentTime);
  }

  function updateContentConsumption() {
    const body = JSON.stringify({
      "mediaid": videodata.id,
      "contentid": videodata.contentId,
      "consumptionlength": state.currentTime,
      "meta": "{}",
      "totallength": state.duration,
    });
    putMediaConsumption(getComsumptiondata.id, body, videodata.id, videodata.subSectionId, videodata.contentId, state.currentTime);
  }
  function skipBackward() {
    if (videoId) {
      videoRef.current.seekTo(state.currentTime - 15);
    } else {
      videoRef.current.seek(state.currentTime - 15);
    }
    setState({ ...state, currentTime: state.currentTime - 15 });
  }

  function skipForward() {
    if (videoId) {
      videoRef.current.seekTo(state.currentTime + 15);
    } else {
      videoRef.current.seek(state.currentTime + 15);
    }
    setState({ ...state, currentTime: state.currentTime + 15 });
  }

  function goBack() {
    if (value == "postNew") {
      setContentConsumption();
    } else if (value == "updateRecent") {
      updateContentConsumption();
      console.log("update");
    }
    Orientation.lockToPortrait();
    props.navigation.goBack();
    KeepAwake.deactivate();
  }

  function onSeek(data) {
    if (videoId) {
      videoRef.current.seekTo(data.currentTime);
      setState((s) => ({
        ...s,
        play: false,
        youtubePlay: true,
        currentTime: data.currentTime
      }));
    } else {
      videoRef.current.seek(data.currentTime);
      setState({ ...state, currentTime: data.currentTime });
      if (data.currentTime != state.currentTime) {
        setState((s) => ({
          ...s,
          showindicator: true,
        }));
      }
    }
  }
  // playbackRateChange = (event) => {
  //   if (event.playbackRate == 0) {
  //     if (value == "postNew") {
  //       setContentConsumption();
  //     } else if (value == "updateRecent") {
  //       updateContentConsumption();
  //       console.log("update");
  //     }
  //   }
  // };
  function handleFullscreen() {
    if (state.fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscapeLeft();
    }
  }

  function showControls() {
    if (state.showControls === false) {
      setState({ ...state, showControls: true });
    } else {
      setState({ ...state, showControls: false });
    }
  }
  return (
    <View style={styles.container}>
      {state.showindicator === true && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="rgba(250,250,250,1)" />
        </View>
      )}
      <TouchableOpacity activeOpacity={1} onPress={showControls}>
        {videoId ? (
          <YoutubePlayer
            ref={videoRef}
            height={'100%'}
            webViewStyle={state.fullscreen ? styles.youtube : styles.youtubevideo}
            play={state.youtubePlay}
            videoId={videoId}
            onReady={onReady}
            initialPlayerParams={{
              controls: false
            }}
            onChangeState={onChangeState}
          />
        ) : (
          <Video
            ref={videoRef}
            source={{
              uri: videodata.url
            }}
            style={state.fullscreen ? styles.fullScreenVideo : styles.video}
            controls={false}
            resizeMode={"contain"}
            paused={state.play}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
          />
        )}
      </TouchableOpacity>
      {state.showControls && (
        <>
          <BackButton isMenu={true} onBackPress={goBack} menuColor="white" />
          <View style={state.fullscreen ? styles.fullScreenControlOverlay : styles.controlOverlay}>
            <LinearGradient
              colors={['#00000000', '#000000']}>
              <SafeAreaView>
                <Text style={styles.mediaName}>{appGlobal.trimText(videodata.name, 30)}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                  <HTML tagsStyles={{
                    span: {
                      color: '#989EBE',
                      fontSize: 10,
                      paddingLeft: 16,
                      paddingBottom: 30,
                      paddingTop: 3,
                      fontFamily: "Raleway-Regular"
                    }
                  }} source={{ html: "<span>" + appGlobal.trimText(videodata.description, 30) + "<span>" }} />
                  <TouchableOpacity
                    onPress={handleFullscreen}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={styles.fullScreenButton}
                  >
                    {state.fullscreen ? (
                      <FontAwesome5 name="compress" size={15} color="white" />
                    ) : (
                      <FontAwesome5 name="expand" size={15} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                <ProgressBar
                  currentTime={state.currentTime}
                  duration={state.duration > 0 ? state.duration : 0}
                  onSlideComplete={handlePlayPause}
                  onSlideCapture={onSeek}
                  isProfile={false}
                />
                {state.showPlayer === true && (
                  <PlayerControls
                    onPlay={handlePlayPause}
                    onPause={handlePlayPause}
                    playing={state.play}
                    showPreviousAndNext={false}
                    showSkip={true}
                    skipBackwards={skipBackward}
                    skipForwards={skipForward}
                  />
                )}
              </SafeAreaView>
            </LinearGradient>
          </View>
        </>
      )}
    </View>
  );
}

export default videoFullscreen;
