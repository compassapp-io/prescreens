import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './Coursedetailstyle';
import BackButton from '../../components/Backbutton/Backbutton';
import { LinearGradient } from 'expo-linear-gradient';
import appglobal from '../../../constants/appglobal';
import StepIndicator from '../../components/Stepindicator/StepIndicator';
import { APIContext } from '../../provider/API';
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from "react-native-render-html";

function Coursedetail(props) {
    const id = props.route.params;
    const { apiLoader, getCourseDetail, getDetail } = useContext(APIContext);
    const [detailData, setDetailData] = useState({});
    const [text, setText] = useState('');
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setDetailData({});
            getData();
        });
        return unsubscribe;
    }, [detailData]);
    getData = () => {
        getCourseDetail(id).then((response) => {
            if (response === 'error') {
                getNotConsumptionData();
            } else {
                if (response && !response.contentsubsection) {
                    setText('No Media Available')
                }
                setDetailData(response);
            }
        }).catch(err => {
            console.log(err);
        })
    };

    getNotConsumptionData = () => {
        getDetail(id).then((response) => {
            if (response) {
                setDetailData(response);
                if (response && !response.contentsubsection) {
                    setText('No Media Available')
                }
                console.log(response)
            }
        }).catch(err => {
            console.log(err);
        })
    };
    function goBack() {
        props.navigation.navigate('Home')
    }
    return (
        <View style={styles.container}>
            <Spinner
                visible={apiLoader}
                overlayColor='rgba(1, 1, 1, 0.35)'
            />
            {detailData && detailData.title && (
                <ImageBackground
                    source={detailData.media
                        ? { uri: detailData.artwork }
                        : require("../../assets/images/default.jpg")}
                    resizeMode="cover"
                    style={styles.image1}>
                    <BackButton isMenu={false} onBackPress={goBack} />
                    <LinearGradient colors={['#00000000', '#222222']} locations={[0.5, 1]} style={styles.image1}>
                        <Text style={styles.heading}>{appglobal.trimText(detailData.title, 25)}</Text>
                        <HTML tagsStyles={{
                            span: {
                                color: '#8287A2',
                                fontSize: 12,
                                position: 'absolute',
                                top: 270,
                                paddingLeft: 24,
                                paddingEnd: 24,
                                fontFamily: "Raleway-Regular"
                            }
                        }}
                            source={{ html: "<span>" + appglobal.trimText(detailData.description, 150) + "<span>" }} />
                    </LinearGradient>
                </ImageBackground>
            )}
            {detailData.contentsubsection ? (
                <>
                    <View style={styles.container3}>
                        <Text style={styles.course}>COURSE</Text>
                        <Text style={styles.count}>1/{detailData.contentsubsection.length}</Text>
                    </View>
                    <View style={styles.firstContainer}>
                        <StepIndicator data={detailData} forCard={false} />
                    </View>
                </>
            ) : (
                <Text style={styles.noMedia}>{text}</Text>
            )}
        </View>
    )
}

export default Coursedetail
