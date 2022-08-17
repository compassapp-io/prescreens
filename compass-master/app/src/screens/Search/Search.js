import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Header,
} from "react-native";
import HomeHeader from '../../components/Homeheader/Homeheader';
import EpisodesCard from '../../components/Episodecard/Episodescard';
import styles from './Searchstyle';
import { Feather } from '@expo/vector-icons';
import Tabview from '../../components/Tabview/Tabview'
import Card from '../../components/Card/Card';
import { Entypo } from '@expo/vector-icons';
import { APIContext } from '../../provider/API';
import Spinner from 'react-native-loading-spinner-overlay';

function SearchPage(props) {
  var backgroundColor = '#4454FF'
  var textInput;
  const [content, setContent] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [isapiloaded, setisapiloaded] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const [showTabs, setshowTabs] = useState(true);
  const {
    apiLoader, category: categories, getCategory, contentWithSection, getContentWithSection, consumption: recents, getConsumption: getRecents, search: getSearchData
  } = useContext(APIContext);
  useEffect(() => {
    // getContentData();
    getCategory();
    getRecents();
    getContentWithSection();
  }, [isapiloaded]);
  const searchFilterFunction = (text) => {
    if (text) {
      setshowTabs(false)
      setSearch(text);
      if (text.length > 3) {
        getSearchData(text).then((res) => {
          setFilteredDataSource(res);
        });
      }
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setshowTabs(true)
      setShouldShow(false);
      setFilteredDataSource(content);
      setSearch(text);
    }
  };
  const onCancelPress = () => {
    textInput.clear();
    setshowTabs(true);
  };

  const btnClick = (id) => {
    props.navigation.navigate('coursedetail', id)
  }

  const goToDetail = (media) => {
    props.navigation.navigate('categorydetail', media.id)
  }

  const goToMediaDetail = (media) => {
    if (media.type == 'audio') {
      const data = {
        ...media,
        artwork: media.image,
        artist: media.name
      }
      props.navigation.navigate('audioscreen', data)
    } else if (media.type == 'video') {
      props.navigation.navigate('videoscreen', media)
    } else {
      props.navigation.navigate('articlescreen', media)
    }
  }

  const FirstRoute = () => (
    <>
      {recents.length !== 0 && (<ScrollView style={styles.firstContainer}>
        {recents.map((recent, recentIndex) => {
          return (
            <EpisodesCard key={recentIndex} isRecent={true} title={recent.medianame} description={recent.description} image={recent.image} onEpisodeCardPress={() => goToMediaDetail(recent)} />
          )
        })}
      </ScrollView>)}
      {recents.length == 0 && (<Text style={styles.noMedia}>No Media Available</Text>)}
    </>
  );
  const SearchCategories = ({ category }) => {
    return (
      <>
        <Text style={styles.confidence}>{category.categoryTitle}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {category.subsection.map((subsection, subsectionIndex) => {
            return (
              <EpisodesCard key={subsectionIndex} isCategory={true} title={subsection.title} description={subsection.description} image={subsection.artwork} onEpisodeCardPress={() => goToDetail(subsection)} />
            )
          })}
        </ScrollView>
      </>

    )
  }
  const SecondRoute = () => (
    <>
      <ScrollView style={styles.firstContainer}>
        {categories && categories.map((category, categoryIndex) => {
          return (
            <View style={{ height: 250 }} key={categoryIndex}>
              <SearchCategories category={category} />
            </View>)
        })}
      </ScrollView>
    </>
  );
  const ThirdRoute = () => (
    <ScrollView style={styles.firstContainer} >
      {contentWithSection.map((contentSection, contentIndex) => {
        return (
          <Card key={contentIndex} title={contentSection.title} data={contentSection} description={contentSection.description} buttonText='Get Started' cardWidth='100%' GradientColor={['#4454FFC7', '#BD00C4']} isTracking={false} opacity={0.4} width="80%" goToDetail={() => btnClick(contentSection.id)} isGuidePage={true} />
        )
      })}
    </ScrollView>
  );
  const Tabs = {
    first: FirstRoute,
    second: SecondRoute,
    Third: ThirdRoute
  }
  const initialRoutes = [
    { key: "first", title: "Recents" },
    { key: "second", title: "Category" },
    { key: "Third", title: "Guide" }
  ]
  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      searchFilterFunction(textInput.value);
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
      <HomeHeader headStyle={styles.head} onPress={() => props.navigation.navigate('Home')} currenPage="Search" />
      <View style={styles.mainView}>
        <Feather name="search" size={20} color="#1C2037" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.materialSearchBarWithBackground1}
          placeholderTextColor="#989EBE"
          onChangeText={(text) => searchFilterFunction(text)}
          ref={input => { textInput = input }}
          value={search} />
        {!showTabs && (
          <TouchableOpacity onPress={() => onCancelPress()} style={styles.cancelIcon}>
            <Entypo name="cross" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {showTabs ? (
        <Tabview backcolor={backgroundColor} renderSceneData={Tabs} route={initialRoutes} isProfile={false} customStyle={styles.tabView} />
      ) : (
        <>
          <View style={styles.textView}>
            <Text style={styles.searchResult}>SEARCH RESULT</Text>
            <Text style={styles.searchResult}>{filteredDataSource.length} RESULT(S)</Text>
          </View>
          <ScrollView style={styles.firstContainer}>
            {filteredDataSource.map((data, index) => {
              return (
                <EpisodesCard title={data.name} description={data.description} image={data.artwork} key={index} isRecent={true} onEpisodeCardPress={() => goToMediaDetail(data)} />
              )
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
  // getContentData = () => {
  //   AxiosInstance.get(appGlobal.APIEndpoints.content)
  //     .then(function (response) {
  //       if (response) {
  //         const result = response.data;
  //         if (result && result.length) {
  //           setShouldShow(false);
  //           const data = [];
  //           result.forEach((result) => {
  //             if (result.media) {
  //               const mediaMeta = JSON.parse(result.media[0].meta);
  //               data.push({
  //                 title: result.title,
  //                 articalurl: `${appGlobal.S3URL}${result.media[0].name}`,
  //                 url: mediaMeta.artwork,
  //                 description: result.description,
  //                 id: result.id,
  //                 type: result.media[0].type,
  //               });
  //             }
  //           });
  //           setFilteredDataSource(data);
  //           setContent(data);
  //         }
  //       }
  //     })
  //     .catch((error) => console.error({ error }));
  // };
}
export default SearchPage;
