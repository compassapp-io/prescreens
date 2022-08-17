import React, { useContext, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import styles from './MoodStyle';
import { AuthContext } from "../../provider/Auth";
import Button from '../../components/Button/Button';
import AxiosInstance from '../../provider/Interceptor';
import Spinner from 'react-native-loading-spinner-overlay';
import appGlobal from '../../../constants/appglobal';
import HomeHeader from '../../components/Homeheader/Homeheader';
import Slider from '@react-native-community/slider';

const Mood = (props) => {
    const { user, updateLastMoodDate } = useContext(AuthContext);
    const [spinner, setSpinner] = useState(false);
    const [moodValue, setMoodValue] = useState(1);


    let errorHandler = (error) => {
        console.error(error)
        setSpinner(false)
    }

    const updateProfile = () => {
        setSpinner(true);
        let addMoodModel = {
            userId: user.userid,
            value: moodValue
        }

        AxiosInstance.post(appGlobal.APIEndpoints.mood, addMoodModel)
            .then(function (response) {
                setSpinner(false);
                if (response && response.status == 200) {
                    updateLastMoodDate();
                    props.navigation.goBack();
                } else {
                    errorHandler(response.status);
                }
            })
            .catch(errorHandler);
    }
    let minStep = 1;
    let maxStep = 10;
    let steps = [];
    for (let index = minStep; index <= maxStep; index++) {
        steps.push({ step: index })
    }
    const RenderSteps = ({ item }) => {
        let color = item.step === moodValue ? 'black' : 'lightgray';
        let textStyle = { color: color }
        return (<Text style={textStyle}>{item.step}</Text>);
    }
    return (
        <View style={styles.container} >
            <HomeHeader headStyle={styles.head} currenPage="Home" showMoodButton={false} />

            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                animation='slide'
                overlayColor='rgba(1, 1, 1, 0.35)'
            />

            <View style={styles.moodContainer}>
                <Text style={styles.infoText}>Choose a value from 1 to 10.</Text>
                <FlatList
                    contentContainerStyle={styles.stepContainer}
                    horizontal={true}
                    data={steps}
                    keyExtractor={item => item.step.toString()}
                    renderItem={RenderSteps}
                />
                <Slider
                    step={1}
                    style={styles.slider}
                    minimumValue={minStep}
                    value={moodValue}
                    maximumValue={maxStep}
                    onValueChange={setMoodValue}
                    minimumTrackTintColor="#6c49fd"
                    maximumTrackTintColor="#4454FF"
                    thumbTintColor="lightblue"

                />
            </View>

            <View >

            </View>
            <Button buttonText='Continue' onPress={updateProfile} customStyle={styles.floatBtn} profileStyle={styles.btn2} GradientColor={['#4454FF', '#7940FC']} />
        </View >
    )
}

export default Mood