import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import appGlobal from '../../../constants/appglobal';
import { AuthContext } from '../../provider/Auth';
import AxiosInstance from '../../provider/Interceptor';
import styles from './Loginstyle';
import auth0 from "../../provider/Auth0Client";

function Login(props) {
  const [spinner, setSpinner] = useState(false);
  const { user, login } = useContext(AuthContext);

  let errorHandler = (error) => {
    console.error(error)
    setSpinner(false)
    props.navigation.goBack();
  }

  useEffect(() => {
    setSpinner(false);
    auth0.webAuth
      .authorize({
        scope: 'openid profile email'
      })
      .then(credentials => {
        auth0.auth
          .userInfo({ token: credentials.accessToken })
          .then((profile) => {
            const { name, email } = profile;
            let user = `{ "auth0": ${JSON.stringify(profile)} }`;
            var raw = {
              name,
              email,
              meta: user
            };
            AxiosInstance.post(appGlobal.APIEndpoints.auth, raw)
              .then(function (response) {
                setSpinner(false);
                console.log('logged in compass')
                if (response && response.status == 200) {
                  response.data.auth0Token = credentials.accessToken;
                  login(response.data);
                } else {
                  errorHandler(response.status)
                }
              })
              .catch(errorHandler);
          })
          .catch(errorHandler)
      })
      .catch(errorHandler);

  }, []);

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        animation='slide'
        overlayColor='rgba(1, 1, 1, 0.35)'
      />
    </View>
  );
}

export default Login;
