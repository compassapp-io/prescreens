import React, { useContext, useState } from 'react'
import { Text, View, ImageBackground } from 'react-native'
import { TextInput } from 'react-native-paper'
import styles from './EditProfilestyle';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from "../../provider/Auth";
import Button from '../../components/Button/Button';
import AxiosInstance from '../../provider/Interceptor';
import Spinner from 'react-native-loading-spinner-overlay';
import appGlobal from '../../../constants/appglobal';

const EditProfile = (props) => {
    const { user, updateUserName } = useContext(AuthContext);
    const [spinner, setSpinner] = useState(false);
    const [firstName, setFisrtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);


    let errorHandler = (error) => {
        console.error(error)
        setSpinner(false)
    }

    const checkErrors = () => {
        if (!firstName || !firstName.trim()) {
            setFirstNameError(true)
        } else {
            setFirstNameError(false)
        }

        if (!lastName || !lastName.trim()) {
            setLastNameError(true)
        } else {
            setLastNameError(false)
        }
    }

    const updateProfile = () => {

        checkErrors();

        if (firstNameError || lastNameError) return;

        setSpinner(true);
        let userFullName = `${firstName.trim()} ${lastName.trim()}`;

        let updateProfileModel = {
            id: user.userid,
            name: userFullName
        }

        AxiosInstance.put(appGlobal.APIEndpoints.auth, updateProfileModel)
            .then(function (response) {
                setSpinner(false);
                if (response && response.status == 200) {
                    updateUserName(userFullName);
                    props.navigation.goBack();
                } else {
                    errorHandler(response.status);
                }
            })
            .catch(errorHandler);
    }
    return (
        <View style={styles.container} >
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                animation='slide'
                overlayColor='rgba(1, 1, 1, 0.35)'
            />
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ overflow: "hidden", width: '100%', borderBottomEndRadius: 70 }}>
                    <LinearGradient
                        colors={['#4454FF', '#6c49fd']}
                        locations={[0.2, 0.8]}
                        style={styles.background}>
                        <ImageBackground
                            source={require("../../assets/images/backprofile.png")}
                            resizeMode="cover"
                            style={styles.image1}>
                            <Text style={styles.profile}></Text>
                            <View style={styles.container2}>
                                <View style={styles.container3}>
                                    <Text style={styles.profileName}>Complete your profile</Text>
                                    <Text style={styles.profileEmail}>{user.email}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </LinearGradient>
                </View>
            </View>
            <View style={styles.conatiner5}>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#989EBE"
                    style={styles.textInput}
                    onChangeText={setFisrtName}
                    error={firstNameError}
                ></TextInput>
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#989EBE"
                    style={styles.textInput}
                    onChangeText={setLastName}
                    error={lastNameError}
                ></TextInput>
            </View>
            <Button buttonText='Update' onPress={updateProfile} customStyle={styles.floatBtn} profileStyle={styles.btn2} GradientColor={['#4454FF', '#7940FC']} />
        </View >
    )
}

export default EditProfile