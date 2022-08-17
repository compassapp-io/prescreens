import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
GoogleSignin.configure({
  webClientId: '638444093691-ok11ee63l8r2epegc83lqc8es9cm41tt.apps.googleusercontent.com',
});
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userGoogleInfo: {},
      loaded: false
    }

  }
  signIn = async () => {
    try {
      console.log("asdsad");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true
      })
      console.log(this.state.userGoogleInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("e 1");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("e 2");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("e 3");
      } else {
        console.log(error);
        console.log(JSON.stringify(error));
        console.log(error.message);
      }
    }
  };
  fbLogin = (error, result) => {
    if (error) {
      console.log("login has error: " + result.error);
    } else if (result.isCancelled) {
      console.log("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          console.log(data);
          console.log(data.accessToken.toString());
          this.initUser(data.accessToken)
        });
    }
  }
  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch(() => {
        // reject('ERROR GETTING DATA FROM FACEBOOK')
      })
  }

  render() {
    return (
      <View>

        <GoogleSigninButton
          style={{ width: 222, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
        {this.state.loaded ?
          <View>
            <Text>{this.state.userGoogleInfo.user.name}</Text>
            <Text>{this.state.userGoogleInfo.user.email}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: this.state.userGoogleInfo.user.photo }}
            />

          </View>

          : <Text>Not SignedIn</Text>}
        <LoginButton
         permissions={["email", "user_friends", "public_profile"]}
          onLoginFinished={
            (error, result) => {
              this.fbLogin(error, result)

            }
          }
          onLogoutFinished={() => console.log("logout.")} />

      </View>
    );
  }
}

export default App;
