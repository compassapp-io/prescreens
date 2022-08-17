import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useState } from 'react'
import appGlobal from '../../constants/appglobal';
import auth0 from "./Auth0Client";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login: (userData) => {

                    if (!userData || (userData && !userData.userid)) {
                        AsyncStorage.removeItem(appGlobal.localStorageKeys.user)
                        return
                    }

                    const user = {
                        userid: userData.userid,
                        name: userData.name,
                        email: userData.email,
                        admin: userData.admin,
                        createdtime: userData.createdtime,
                        photourl: userData.photourl,
                        incompleteProfile: userData.incompleteProfile,
                        auth0Token: userData.auth0Token,
                        firstAssessmentCompleted: userData.firstAssessmentCompleted,
                        lastMoodDate: userData.lastMoodDate
                    };

                    AsyncStorage.setItem(appGlobal.localStorageKeys.user, JSON.stringify(user)).then(() => { });
                    AsyncStorage.setItem(appGlobal.localStorageKeys.token, userData.token).then(() => { });

                    setUser(user);
                    setToken(userData.token);
                },
                updateUserName: (name) => {
                    setUser(user => {
                        user.name = name;
                        user.incompleteProfile = false;
                        AsyncStorage.setItem(appGlobal.localStorageKeys.user, JSON.stringify(user)).then(() => { });
                        return user;
                    })

                },
                logout: async () => {
                    await auth0.webAuth.clearSession()
                    await AsyncStorage.removeItem(appGlobal.localStorageKeys.user);
                    await AsyncStorage.removeItem(appGlobal.localStorageKeys.token);
                    setUser(null);
                },
                setAssessmentCompleted: () => {
                    setUser(user => {
                        user.firstAssessmentCompleted = true;
                        AsyncStorage.setItem(appGlobal.localStorageKeys.user, JSON.stringify(user)).then(() => { });
                        return user;
                    })
                },
                updateLastMoodDate: () => {
                    setUser(user => {
                        user.lastMoodDate = moment.utc().format();
                        AsyncStorage.setItem(appGlobal.localStorageKeys.user, JSON.stringify(user)).then(() => { });
                        return user;
                    })
                },
            }}>{children}</AuthContext.Provider>
    )
}


