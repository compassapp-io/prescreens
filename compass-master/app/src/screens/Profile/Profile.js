import React, { useEffect, useRef, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import BackButton from '../../components/Backbutton/Backbutton';
import { APIContext } from '../../provider/API';
import appGlobal from "../../../constants/appglobal";
import { AuthContext } from "../../provider/Auth";
import styles from './Profilestyle';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/Card/Card';
import Tabview from '../../components/Tabview/Tabview';
import EpisodesCard from '../../components/Episodecard/Episodescard';
import Button from '../../components/Button/Button';
import ProgressBar from "../../components/Progressbar/Progressbar";
import AxiosInstance from '../../provider/Interceptor';
import moment from 'moment';
import HTML from "react-native-render-html";

function Profile(props) {
  const { user } = useContext(AuthContext);
  const defaultImageText = user.name.charAt(0);
  const joinedAgo = moment(user.createdtime).format('Do MMMM YYYY');
  const { onGoingContentWithSection, getAllContentsConsumptionWithSection, assessmentScore, getContentWithSubSection,
    recommendedContent, getFollowingCategory, getCategoryForProfile, categoryForProfile, putFollowForCategory, inProgressCount, completedCount } = useContext(APIContext);
  const btnClick = (data) => {
    props.navigation.navigate('coursedetail', data)
  }
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getContentWithSubSection();
      getAllContentsConsumptionWithSection();
      getFollowingCategory();
      getCategoryForProfile(user.userid);
    });
    return unsubscribe;
  }, [onGoingContentWithSection]);

  function unFollowCategory(data) {
    const followedUserIds = [];
    var followUers;
    if (data.isFollowing === false) {
      followedUserIds.push({
        "userid": user.userid
      })
      if (data.followedData.length != 0) {
        data.followedData.forEach(o => {
          followedUserIds.push({
            "userid": o.userid
          })
        })
      }
    } else {
      if (data.followedData.length > 1) {
        data.followedData.forEach(o => {
          if (o.userid !== user.userid) {
            followedUserIds.push({
              "userid": o.userid
            })
          }
        })
      }
    }
    const body = JSON.stringify({
      "title": data.title,
      "description": data.description,
      "subsectionids": data.subsectionids,
      "followedby": followedUserIds.length ? JSON.stringify(followedUserIds) : null,
      "meta": data.meta,
      "displayorder": data.displayorder,
    });
    putFollowForCategory(data.id, body);
    setTimeout(() => {
      getCategoryForProfile(user.userid);
    }, 100);
  }
  function goBack() {
    props.navigation.navigate('Home')
  }
  loadAssessments = () => {
    AxiosInstance.get(appGlobal.APIEndpoints.assessments)
      .then(function (response) {
        if (response) {
          const result = response.data;
          if (result && result.length) {
            props.navigation.navigate("Assesment", {
              data: result,
            });
          }
        }
      })
      .catch(function (error) {
      });
  };
  const FirstRoute = () => (
    <>
      {inProgressCount !== 0 ? (
        <ScrollView style={styles.firstContainer}>
          {onGoingContentWithSection.map((data, contentIndex) => {
            return (
              <View key={contentIndex}>
                {data.currentsubsection.length !== 0 && (
                  <Card cardWidth='100%' buttonText='Continue' data={data} title={data.title} description={data.description} subSection={data.currentsubsection[0]} GradientColor={['#131B75', '#7940FC6E']}
                    opacity={1} width="60%" goToDetail={() => btnClick(data.id)} />
                )}
              </View>
            )
          })}
        </ScrollView>
      ) : (
        <Text style={styles.noMedia}>No Media Available</Text>
      )}
    </>
  );
  const SecondRoute = () => (
    <ScrollView style={styles.firstContainer}>
      {assessmentScore.map((score, index) => {
        return (<View style={styles.skillContainer} key={index}>
          <Text style={styles.headTitle}>{score.subsectionName}</Text>
          <HTML tagsStyles={{
            span: {
              fontFamily: "Raleway-Regular",
              fontSize: 10,
              color: '#1C2037',
              opacity: 0.7,
              paddingTop: 8
            }
          }}
            source={{ html: "<span>" + appGlobal.trimText(score.description, 100) + "<span>" }} />
          <View style={styles.progress}>
            <ProgressBar
              currentTime={score.percentage}
              duration={100}
              isProfile={true}
            />
            <View style={styles.progressTime}>
              <Text style={styles.startTime}>0</Text>
              <Text style={styles.startTime}>100</Text>
            </View>
          </View>
        </View>
        )
      })}
    </ScrollView>
  );
  const ThirdRoute = () => (
    <>
      {completedCount !== 0 ? (
        <ScrollView style={styles.firstContainer} >
          {onGoingContentWithSection.map((data, contentIndex) => {
            return (
              <View key={contentIndex}>
                {data.isCompleted && (
                  <Card cardWidth='100%' buttonText='Start Again' data={data} title={data.title} description={data.description} subSection={data.currentsubsection[0]} GradientColor={['#131B75', '#7940FC6E']}
                    opacity={1} width="60%" isProfile={true} goToDetail={() => btnClick(data.id)} />
                )}
              </View>
            )
          })}
        </ScrollView >
      ) : (
        <Text style={styles.noMedia}>No Media Available</Text>
      )}
    </>
  );
  const FourthRoute = () => (
    <ScrollView style={styles.firstContainer}>
      {categoryForProfile && categoryForProfile.map((data, contentIndex) => {
        return (
          <View key={contentIndex} style={{ flexDirection: "row" }}>
            <EpisodesCard title={data.title} description={data.description} image={data.artwork} isRecent={true} width={styles.width} />
            <Button buttonText={data.isFollowing ? 'Unfollow' : 'Follow'} customStyle={styles.btn} GradientColor={['#FFFFFF', '#FFFFFF']} customText={styles.btnText} onPress={() => unFollowCategory(data)} />
          </View>
        )
      })}
    </ScrollView>
  );
  const Tabs = {
    first: FirstRoute,
    second: SecondRoute,
    Third: ThirdRoute,
    Fourth: FourthRoute
  }
  const initialRoutes = [
    { key: "first", title: "In Progress" },
    { key: "second", title: "Skills" },
    { key: "Third", title: "Completed" },
    { key: "Fourth", title: "Follow" }
  ]

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#ECEEFE' }}>
        <View style={{ overflow: "hidden", width: '100%', borderBottomEndRadius: 70 }}>
          <LinearGradient
            colors={['#4454FF', '#6c49fd']}
            locations={[0.2, 0.8]}
            style={styles.background}>
            <ImageBackground
              source={require("../../assets/images/backprofile.png")}
              resizeMode="cover"
              style={styles.image1}>
              <BackButton isMenu={false} onBackPress={goBack} menuColor="white" />
              <Text style={styles.profile}>Profile</Text>
              <View style={styles.container2}>
                {user.photourl ? (
                  <Image
                    source={{ uri: user.photourl }}
                    resizeMode="cover"
                    style={styles.image8} />
                ) : (
                  <View style={styles.image8}>
                    <Text style={styles.imageText}>{defaultImageText}</Text>
                  </View>
                )}
                <View style={styles.container3}>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileEmail}>{user.email}</Text>
                  <Text style={styles.time}>Joined on {joinedAgo}</Text>
                </View>
              </View>
              <View style={styles.container4}>
                <View style={styles.conatiner5}>
                  <Text style={styles.recommend}>recommended</Text>
                  <Text style={styles.courseLength}>{recommendedContent.length}</Text>
                  <Text style={styles.course}>Course</Text>
                </View>
                <View style={styles.border} />
                <View style={styles.conatiner5}>
                  <Text style={styles.recommend}>In Progress</Text>
                  <Text style={styles.courseLength}>{inProgressCount}</Text>
                  <Text style={styles.course}>Course</Text>
                </View>
                <View style={styles.border} />
                <View style={styles.conatiner5}>
                  <Text style={styles.recommend}>Completed</Text>
                  <Text style={styles.courseLength}>{completedCount}</Text>
                  <Text style={styles.course}>Course</Text>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>
      </View>
      <Tabview backcolor='#4454FF' renderSceneData={Tabs} route={initialRoutes} isProfile={true} customStyle={styles.tabView} />
      <Button buttonText='Re-Take Assessment' onPress={loadAssessments} customStyle={styles.floatBtn} profileStyle={styles.btn2} GradientColor={['#4454FF', '#7940FC']} />
    </View>
  );
}

export default Profile;
