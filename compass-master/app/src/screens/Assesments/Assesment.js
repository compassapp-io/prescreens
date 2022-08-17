import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import appGlobal from '../../../constants/appglobal';
import AxiosInstance from '../../provider/Interceptor';
import styles from '../Assesments/Assesmentstyle';
import HomeHeader from '../../components/Homeheader/Homeheader';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import { AuthContext } from "../../provider/Auth";

function Assesment(props) {
  const { data } = props.route.params;
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionsIndex] = useState(0);
  const [styindex, setstyindex] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState('');
  const [spinner, setSpinner] = useState(false);
  const { setAssessmentCompleted } = useContext(AuthContext);


  useEffect(() => {
    prepareAssessmentData();
  }, [data]);
  /**
   * @description Set the question state with the question and their options.
   */
  prepareAssessmentData = () => {
    const questionData = [];
    data.forEach(element => {
      //  exxtracting the assessment with type question as the same api returns response.
      if (element.type == "question") {
        const { options } = JSON.parse(element.meta);
        questionData.push({
          question: {
            id: element.id,
            description: element.description
          },
          options
        });
      }
    });
    setQuestions(questionData);
  };
  /**
   * @description Submit the response to the api.
   */
  submitResponse = () => {
    if (selectedResponse) {
      setSpinner(true);
      const body = {
        "parentid": questions[questionIndex].question.id,
        "description": selectedResponse,
        "type": "response"
      }
      AxiosInstance.post(appGlobal.APIEndpoints.assessments, body)
        .then(async function (response) {
          setSpinner(false);
          if (response) {
            const result = response.data;
            if (result) {
              // all question done
              if ((questionIndex + 1) == questions.length) {
                setAssessmentCompleted();
                props.navigation.navigate('Landing')
              } else { // go to next question
                setQuestionsIndex(questionIndex + 1);
                setstyindex(styindex + 55);
                setSelectedResponse('');
              }
            }
          }
        })
        .catch(function (error) {
          setSpinner(false);
        });
    }

  }
  goBackIndex = () => {
    if (questionIndex === 0) {
      gotoLanding();
    } else {
      setQuestionsIndex(questionIndex - 1);
    }
  }
  gotoLanding = () => {
    props.navigation.navigate("Landing");
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animation='slide'
          overlayColor='rgba(1, 1, 1, 0.35)'
        />
        <View style={styles.questionHead}>
          <HomeHeader headStyle={styles.head} currenPage="Assesment" questions={questions.length} currentQuestionIndex={questionIndex + 1} onPress={goBackIndex} />
          <Text style={styles.inTheMinutes}>
            {questions[questionIndex]?.question?.description}
          </Text>
        </View>
        <View>
          {/* Looping through the options key to list the given options */}
          {questions[questionIndex]?.options.map((data, index) => {
            return <TouchableOpacity activeOpacity={.7} onPress={() => setSelectedResponse(data?.value)} key={index} style={[selectedResponse == data?.value ? styles.react2 : styles.rect]}>
              <Ionicons style={styles.checkBox} name="checkmark-circle" size={24} color={selectedResponse == data?.value ? "#4454FF" : "#DFE0FF"} />
              <Text style={styles.coolAsACucumber}>{data?.value}</Text>
            </TouchableOpacity>
          })}
        </View>
        <Button buttonText={(questionIndex + 1) == questions.length ? 'Finish' : 'Next'} customStyle={styles.btn} onPress={submitResponse} GradientColor={['#4454FF', '#7940FC']} />
      </ScrollView>
      <Footer onPress={gotoLanding} isShow={false} />
    </View>

  );
}

export default Assesment;
