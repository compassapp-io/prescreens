import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
} from "react-native";
import appGlobal from "../../../constants/appglobal";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../provider/Auth";
import AxiosInstance from '../../provider/Interceptor';
import styles from './Getstartedstyle';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

function Getstarted(props) {
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    if (user.incompleteProfile) {
      props.navigation.navigate("EditProfile");
    } else if (!user.firstAssessmentCompleted) {
      props.navigation.navigate("Getstarted");
    } else {
      props.navigation.navigate("Landing");
    }
  }, [user])

  loadAssessments = () => {
    setSpinner(true);
    AxiosInstance.get(appGlobal.APIEndpoints.assessments)
      .then(function (response) {
        setSpinner(false);
        if (response) {
          const result = response.data;
          // check if there are assessments send the data to the assessment component.
          if (result && result.length) {
            props.navigation.navigate("Assesment", {
              data: result,
            });
          } else {
            props.navigation.navigate("Landing");
          }
        }
      })
      .catch(function (error) {
        setSpinner(false);
      });
  };
  gotoLanding = () => {
    props.navigation.navigate("Landing");
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
        animation="slide"
        overlayColor="rgba(1, 1, 1, 0.35)"
      />
      <ImageBackground
        source={require("../../assets/images/Backimage.png")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
          marginLeft: 60,
          marginTop: -80
        }}>
        <Text style={styles.howWasYour}>Welcome,<Text style={{ fontFamily: "Montserrat-Bold" }}>  </Text></Text>
        <Text style={styles.howWasYour1}>To give you a personalized experience, we would like to know you more.</Text>
        <Text style={styles.howWasYour2}></Text>
        <View style={styles.btnView}>
          <Button buttonText='Continue' onPress={loadAssessments} customStyle={styles.buttonviolet} GradientColor={['#4454FF', '#7940FC']} />
        </View>
        <Footer onPress={gotoLanding} isShow={true} />
      </ImageBackground>
    </View>
  );
}


export default Getstarted;
