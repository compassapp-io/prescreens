import React, { useState } from 'react'
import { useWindowDimensions, Text } from 'react-native'
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

function Tabview({ renderSceneData, route, backcolor, isProfile, customStyle }) {
    let indicatorWidth;
    let margin;
    if (isProfile) {
        indicatorWidth = '2%',
        margin = '8%'
    } else {
        indicatorWidth = '17%',
        margin = '5%'
    }
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const renderScene = SceneMap(renderSceneData);
    const [routes] = useState(route);
    const renderTabBar = (props) => (
        <TabBar
            {...props}

            indicatorStyle={{
                backgroundColor: backcolor,
                marginLeft: margin,
                width: indicatorWidth,
                alignSelf: 'center',
                height: 3,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}
            style={[customStyle]}
            renderLabel={({ route }) => (
                <Text style={{ color: "#000000", fontSize: 11, fontFamily: "Raleway-Regular" }}>
                    {route.title}
                </Text>
            )}

        />
    );
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            swipeEnabled={false}
            initialLayout={{ width: layout.width }}
        />
    )
}

export default Tabview
