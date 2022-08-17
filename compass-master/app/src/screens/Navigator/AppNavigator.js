import React, { useState, useContext, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Assesment from "../Assesments/Assesment";
import Getstarted from "../Getstart/Getstarted";
import Login from "../Login/Login";
import Welcome from "../Welcome/Welcome";
import EditProfile from "../Profile/EditProfile";
import LandingStack from "../../components/Tabs/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appglobal from "../../../constants/appglobal";
import { AuthContext } from "../../provider/Auth";

const Stack = createStackNavigator();

function AppNavigator() {
    const { user, login } = useContext(AuthContext);

    const checkIfUserIsLoggedIn = async () => {

        try {

            if (user) return;

            let cachedUser = await AsyncStorage.getItem(appglobal.localStorageKeys.user);

            let token = await AsyncStorage.getItem(appglobal.localStorageKeys.token);

            const userData = {
                ...JSON.parse(cachedUser),
                token
            }

            login(userData);
        } catch (error) {

        }

    };

    checkIfUserIsLoggedIn()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                {user ?
                    <>
                        <Stack.Screen
                            name="Getstarted"
                            component={Getstarted}
                        />
                        <Stack.Screen
                            name="Assesment"
                            component={Assesment}
                        />
                        <Stack.Screen
                            name="Landing"
                            component={LandingStack}
                        />
                        <Stack.Screen
                            name="EditProfile"
                            component={EditProfile}
                        />
                    </>
                    :
                    <>
                        <Stack.Screen
                            name="Welcome"
                            component={Welcome}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigator;
