import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AuthContext } from "../../provider/Auth";
import Icon from "react-native-vector-icons/FontAwesome";
import appGlobal from "../../../constants/appglobal";
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from "react-native-video";
import PlayerControls from "../../components/Playercontrol/Playercontrols";
import Orientation from "react-native-orientation-locker";
import ProgressBar from "../../components/Progressbar/Progressbar";
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesome5 } from '@expo/vector-icons';
import AxiosInstance from '../../provider/Interceptor';
import AsyncStorage from "@react-native-async-storage/async-storage";
import HTML from "react-native-render-html";
import moment from 'moment';
import styles from './Detailstyle';

function DetailPage(props) {
  const videoRef = useRef(null);
  const scrollRef = useRef();
  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
    showindicator: true,
    showPlayer: false,
    showioscontrol: false
  });
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);
  const [content, setContent] = useState([]);
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [getComsumptiondata, setComsumptiondata] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [agoTime, setAgoTime] = useState("");
  const [articleConsumptionLength, setArticleConsumptionLength] = useState('');
  let intervalId = 0;
  const cardId = props.route.params;
  useEffect(() => {
    getContentData();
    return () => {
      clearInterval(intervalId);
    }
  }, []);
  getContentData = () => {
    setSpinner(false);
    AxiosInstance.get(`${appGlobal.APIEndpoints.contentbyid}${cardId}`)
      .then(function (response) {
        // setSpinner(false);
        if (response) {
          const result = response.data;
          if (result) {
            var da = moment(result.createdAt).format("ddd MMM DD YYYY HH:mm:ss");
            // agoTime = moment(da).fromNow();
            setAgoTime(moment(da).fromNow());

            if (result.media && result.media.length) {
              result.media[0].meta = JSON.parse(result.media[0].meta);
            }

            setContent(result);
            if (result.media[0].type === "article") {
              setType("article");
              checkForArticleConsumption(result);
            } else if (result.media[0].type === "video") {
              setType("video");
              checkForVideoConsumption(result);
            }
          }
        }
      })
      .catch(function (error) {
        setSpinner(false);
      });
  };
  /**
   * @description Method used to check for the consumption of the article and also has a setInterval method
   * @param {*} result 
   */
  function checkForArticleConsumption(result) {
    AxiosInstance.get(`${appGlobal.APIEndpoints.consumption}${result.media[0].id}`)
      .then(async function (response) {
        setSpinner(false);
        if (response) {
          const result = response.data;
          if (result.title && result.title === "Not Found") {
            await AsyncStorage.removeItem(appGlobal.localStorageKeys.articleConsumptionLength);
            await AsyncStorage.removeItem(appGlobal.localStorageKeys.articleConsumptionId);
            
          } else {
            await AsyncStorage.setItem(appGlobal.localStorageKeys.articleConsumptionLength, `${result.consumptionlength}`);
            await AsyncStorage.setItem(appGlobal.localStorageKeys.articleConsumptionId, `${result.id}`);
            setArticleConsumptionLength(result.consumptionlength)
            scrollRef.current.scrollTo({ x: 0, y: result.consumptionlength, animated: true })
          }
        }
        intervalId = setInterval(async () => {
          const articleY = await AsyncStorage.getItem(appGlobal.localStorageKeys.articleYOffset);
          const previousLength = await AsyncStorage.getItem(appGlobal.localStorageKeys.articleConsumptionLength);
          if (articleY && articleY != previousLength) {
            try {
              const body = {
                "mediaid": result.media[0].id,
                "contentid": result.id,
                "consumptionlength": articleY,
                "meta": "{}",
                "totallength": 0
              }
              const articleContentConsumptionId = await AsyncStorage.getItem(appGlobal.localStorageKeys.articleConsumptionId);
              if (!articleContentConsumptionId) {

                AxiosInstance.post(appGlobal.APIEndpoints.consumption, body)
                  .then(async function (response) {
                    if (response) {
                      await AsyncStorage.setItem(appGlobal.localStorageKeys.articleConsumptionId, `${response.data.id}`);
                      await AsyncStorage.setItem(appGlobal.localStorageKeys.articleConsumptionLength, `${response.data.consumptionlength}`);
                    }
                  })
                  .catch((error) => console.error({ error }))
              } else {
                AxiosInstance.put(`${appGlobal.APIEndpoints.consumption}/${articleContentConsumptionId}`, body)
                  .then(async function (response) {
                    if (response) {
                      await AsyncStorage.setItem(appGlobal.localStorageKeys.articleConsumptionLength, `${articleY}`);
                    }
                  })
                  .catch((error) => console.error({ error }))
              }
            } catch (error) {
              console.log(error)
            }
          }
        }, 1500);
      })
      .catch(function (error) {
        setSpinner(false);
      });
  }
  function checkForVideoConsumption(result) {
    AxiosInstance.get(`${appGlobal.APIEndpoints.consumption}${result.media[0].id}`)
      .then(function (response) {
        // setSpinner(false);
        if (response) {
          const result = response.data;
          if (result.title && result.title === "Not Found") {
            setValue("postNew")
          } else {
            setComsumptiondata(result);
            setState((s) => ({
              ...s,
              currentTime: result.consumptionlength,
            }));
            setValue("updateRecent")
          }
        }
      })
      .catch(function (error) {
        setSpinner(false);
      });
  }
  function onLoadEnd(data) {
    console.log(data)
    videoRef.current.seek(state.currentTime);
    setState((s) => ({
      ...s,
      duration: data.duration,
      currentTime: state.currentTime,
    }));
    if (data.duration > 0) {
      setState((s) => ({
        ...s,
        showioscontrol: true
      }));
    }
  }
  function onProgress(data) {
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
      setState({ ...state, play: false, showControls: true });
      return;
    }

    setState({ ...state, play: true });
    if (value == "postNew") {
      console.log(state)
      setContentConsumption();
    } else if (value == "updateRecent") {
      updateContentConsumption();
    }
    // setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
  }

  function setContentConsumption() {
    const body = {
      "mediaid": content.media[0].id,
      "contentid": content.id,
      "consumptionlength": state.currentTime,
      "meta": "{}",
      "totallength": state.duration
    }
    AxiosInstance.post(appGlobal.APIEndpoints.consumption, body)
      .then(function (response) {
        if (response) { }
      })
      .catch((error) => console.error({ error }))
  }

  function updateContentConsumption() {
    const body = {
      "mediaid": content.media[0].id,
      "contentid": content.id,
      "consumptionlength": state.currentTime,
      "meta": "{}",
      "totallength": state.duration
    }
    console.log(body)
    AxiosInstance.put(`${appGlobal.APIEndpoints.consumption}/${getComsumptiondata.id}`, body)
      .then(function (result) {
        if (result) {
        }
      })
      .catch((error) => console.error({ error }))
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({ ...state, currentTime: state.currentTime - 15 });
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({ ...state, currentTime: state.currentTime + 15 });
  }
  function handleOrientation(orientation) {
    orientation === "LANDSCAPE-LEFT" || orientation === "LANDSCAPE-RIGHT"
      ? (setState((s) => ({ ...s, fullscreen: true })),
        StatusBar.setHidden(true))
      : (setState((s) => ({ ...s, fullscreen: false })),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }
  function onSeek(data) {
    videoRef.current.seek(data.currentTime);
    setState({ ...state, currentTime: data.currentTime });
    if (data.currentTime != state.currentTime) {
      setState((s) => ({
        ...s,
        showindicator: true
      }));
    }
  }
  //  https://www.npmjs.com/package/react-native-video#onplaybackratechange
  function playbackRateChange(event) {
    if (event.playbackRate == 0) {
      if (value == "postNew") {
        setContentConsumption();
      } else if (value == "updateRecent") {
        updateContentConsumption();
      }
    }
  }
  function backButtnpress() {
    props.navigation.navigate("Home");
    if (value == "postNew") {
      setContentConsumption();
    } else if (value == "updateRecent") {
      updateContentConsumption();
    }
  }
  async function handleScroll(event) {
    const { y } = event.nativeEvent.contentOffset;
    await AsyncStorage.setItem(appGlobal.localStorageKeys.articleYOffset, `${y}`)
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textStyle={styles.spinnerTextStyle}
        animation='slide'
        overlayColor='rgba(1, 1, 1, 0.35)'
      />
      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
        onScroll={handleScroll}
        ref={scrollRef}>
        {!state.fullscreen && (
          <TouchableOpacity
            onPress={backButtnpress}
            style={styles.container2}
          >
            <View style={styles.iconRow}>
              <Icon name="angle-left" style={styles.icon}></Icon>
              <Text style={styles.browser}>Browser</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.rect}>
          {type === "video" && Platform.OS == 'android' && (
            <View>
              <Video
                ref={videoRef}
                source={{
                  uri: `${appGlobal.S3URL}${content.media[0].name}`,
                }}
                style={state.fullscreen ? styles.fullscreenVideo : styles.video}
                controls={false}
                resizeMode={"contain"}
                paused={state.play}
                onLoad={onLoadEnd}
                onProgress={onProgress}
                onEnd={onEnd}
                bufferConfig={{
                  minBufferMs: 20000,
                  maxBufferMs: 70000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000
                }}
              />
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.fullscreenButton}
              >
                {state.fullscreen ? (
                  <FontAwesome5 name="compress" style={styles.expandicon} size={15} color="white" />
                ) : (
                  <FontAwesome5 name="expand" style={styles.expandicon} size={15} color="white" />
                )}
              </TouchableOpacity>
              {state.showControls && (
                <View style={styles.controlOverlay}>
                  <ProgressBar
                    currentTime={state.currentTime}
                    duration={state.duration > 0 ? state.duration : 0}
                    onSlideStart={handlePlayPause}
                    onSlideComplete={handlePlayPause}
                    onSlideCapture={onSeek}
                  />
                  {state.showindicator === true && (
                    <View style={styles.indicator} >
                      <ActivityIndicator size="large" color="rgba(250,250,250,1)" />
                    </View>
                  )}
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

                </View>
              )}
            </View>
          )}
          {type === "video" && Platform.OS == 'ios' && (
            <View>
              {state.showioscontrol == false && (
                <View style={styles.iosindicator}>
                  <ActivityIndicator size="large" color="rgba(250,250,250,1)" />
                </View>
              )}
              <Video
                ref={videoRef}
                source={{
                  uri:
                    `${appGlobal.S3URL}${content.media[0].name}`,
                }}
                style={styles.video}
                onPlaybackRateChange={playbackRateChange}
                controls={state.showioscontrol}
                resizeMode={'cover'}
                paused={state.play}
                onLoad={onLoadEnd}
                onProgress={onProgress}
                onEnd={onEnd}
              />
            </View>
          )}
          {type === "article" && (
            <Image
              source={{
                uri: `${appGlobal.S3URL}${content.media[0].name}`,
              }}
              resizeMode="cover"
              style={styles.image}
            ></Image>
          )}
          {!state.fullscreen && (
            <>
              <Text style={styles.loremIpsum}>{content.title}</Text>
              <View style={styles.group}>
                <View style={styles.loremIpsum2Row}>
                  <Text style={styles.loremIpsum2}>{agoTime}</Text>
                  <Text style={styles.johnSmith}>- {content?.media && content?.media[0]?.meta?.artist}</Text>
                </View>
              </View>
              <View style={styles.group2}>
                <View style={styles.group4}>
                  <View style={styles.rect2}>
                    <Text style={styles.mentalPerformance}>
                      Mental Performance
                    </Text>
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
                      <Text style={styles.changeManagement}>
                        Change Management
                      </Text>
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
                <Text style={styles.loremIpsum3}></Text>
              </View>
              <View style={styles.rect5}></View>
              <View style={styles.loremIpsum4}>
                <HTML tagsStyles={{ p: { color: "#121212" } }} source={{ html: "<p>" + content.description + "<p>" }} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default DetailPage;
