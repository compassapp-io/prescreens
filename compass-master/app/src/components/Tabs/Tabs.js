import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../../screens/Home/Home";
import SearchPage from "../../screens/Search/Search";
import Profile from "../../screens/Profile/Profile";
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";
import DetailPage from "../../screens/Detailpage/Detailpage";
import Podcast from "../../screens/Podcast/Podcast";
import videoFullscreen from "../../screens/Videofullscreen/Videofullscreen";
import courseDetail from "../../screens/Coursedetail/Coursedetail";
import { MaterialIcons } from '@expo/vector-icons';
import AudioScreen from "../../screens/Audio/Audio";
import ArticleScreen from "../../screens/Article/Article";
import CategoryDetail from "../../screens/Categorydetail/Categorydetail";
import Mood from "../../screens/Mood/Mood";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Landing"
      activeColor="#7940FC"
      inactiveColor="#1C2037"
      labeled={false}
      barStyle={{
        backgroundColor: "#FFFFFF",
        marginTop: 5,
        paddingHorizontal: 12,
        paddingTop: 5,
        paddingBottom: 10,
        marginHorizontal: 0,
        position: "absolute",
      }}
      style={styles.bar}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function LandingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="mood" component={Mood} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen name="Podcast" component={Podcast} />
      <Stack.Screen name="videoscreen" component={videoFullscreen} />
      <Stack.Screen name="coursedetail" component={courseDetail} />
      <Stack.Screen name="audioscreen" component={AudioScreen} />
      <Stack.Screen name="articlescreen" component={ArticleScreen} />
      <Stack.Screen name="categorydetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  bar: {
    backgroundColor: "transparent",
  },
  icon: {
    height: 28,
    width: 15,
  },
});
export default LandingStack;
