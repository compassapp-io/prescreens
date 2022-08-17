import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
} from "react-native";
import HomeHeader from '../../components/Homeheader/Homeheader';
import Card from '../../components/Card/Card';
import EpisodesCard from '../../components/Episodecard/Episodescard';
import styles from './Homestyle';
import { APIContext } from '../../provider/API';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from "moment";
import { AuthContext } from "../../provider/Auth";

function Home(props) {
  const {
    apiLoader, onGoingContentWithSection, getContentWithSubSection, recommendedContent, getRecommendedContent
  } = useContext(APIContext);

  const { user } = useContext(AuthContext);

  const [selectedContentMedia, setSelectedContentMedia] = useState([]);
  const [getStarted, setGetStarted] = useState([]);
  const [updatedRecommendation, setUpdatedRecommendation] = useState([]);
  const oneDayTick = 1000 * 60 * 60 * 24;

  useEffect(() => {

    let currentTime = moment.utc().valueOf();
    let lastMoodTime = moment.utc(user.lastMoodDate).valueOf();
    let moodTimeDiff = currentTime - lastMoodTime;

    if (moodTimeDiff > oneDayTick) {
      props.navigation.navigate("mood");
    }


    const unsubscribe = props.navigation.addListener('focus', () => {
      setSelectedContentMedia([]);
      getContentWithSubSection();
      getRecommendedContent();
      setGetStarted(recommendedContent.slice(0, 5));
      setUpdatedRecommendation(recommendedContent.slice(5, recommendedContent.length));
    });
    return unsubscribe;
  }, [onGoingContentWithSection]);
  const btnClick = (id) => {
    props.navigation.navigate('coursedetail', id)
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


  return (
    <View style={styles.container}>
      <Spinner
        visible={apiLoader}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        animation='slide'
        overlayColor='rgba(1, 1, 1, 0.35)'
      />
      <ScrollView
        contentContainerStyle={styles.scrollArea_contentContainerStyle}>
        <HomeHeader headStyle={styles.head} currenPage="Home" goToAssesmentResult={() => props.navigation.navigate('mood')} />
        {onGoingContentWithSection.length !== 0 && (
          <>
            <Text style={styles.onGoing}>In Progress</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}>
              {onGoingContentWithSection.map((data, contentIndex) => {
                return (
                  <View key={contentIndex}>
                    {data.currentsubsection && data.currentsubsection.length !== 0 && (
                      <Card cardWidth={320} buttonText='Continue' data={data} title={data.title} description={data.description} subSection={data.currentsubsection[0]} GradientColor={['#131B75', '#7940FC6E']}
                        opacity={1} width="60%" onCardPress={() => { setSelectedContentMedia(data.currentsubsection[0].media.media) }} goToDetail={() => btnClick(data.id)} />
                    )}
                  </View>
                )
              })}
            </ScrollView>
          </>
        )}
        {selectedContentMedia && selectedContentMedia.map((media, mediaIndex) => {
          return (
            <EpisodesCard key={mediaIndex} title={media.subsectionName} isHome={true} episodeData={media} onEpisodeCardPress={() => goToDetail(media)} />
          )
        })}
        {onGoingContentWithSection.length === 0 && (
          <>
            <Text style={styles.onGoing}>Get Started</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}>
              {recommendedContent.slice(0, 5).map((data, contentIndex) => {
                return (
                  <View key={contentIndex}>
                    <Card cardWidth={320} buttonText='Get Started' data={data} title={data.title} description={data.description} GradientColor={['#4454FFC7', '#BD00C4']} isTracking={false} opacity={0.4} width="80%" goToDetail={() => btnClick(data.id)} />
                  </View>
                )
              })}
            </ScrollView>
          </>
        )}
        <Text style={styles.onGoing}>RECOMMENDED</Text>
        <ScrollView horizontal
          showsHorizontalScrollIndicator={false}>
          {onGoingContentWithSection.length === 0 && recommendedContent.slice(5, recommendedContent.length) && recommendedContent.slice(5, recommendedContent.length).map((data, contentIndex) => {
            return (
              <View key={contentIndex}>
                <Card cardWidth={320} buttonText='Get Started' data={data} title={data.title} description={data.description} GradientColor={['#4454FFC7', '#BD00C4']} isTracking={false} opacity={0.4} width="80%" goToDetail={() => btnClick(data.id)} />
              </View>
            )
          })}
          {onGoingContentWithSection.length !== 0 && recommendedContent && recommendedContent.map((data, contentIndex) => {
            return (
              <View key={contentIndex}>
                <Card cardWidth={320} buttonText='Get Started' data={data} title={data.title} description={data.description} GradientColor={['#4454FFC7', '#BD00C4']} isTracking={false} opacity={0.4} width="80%" goToDetail={() => btnClick(data.id)} />
              </View>
            )
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
export default Home;
