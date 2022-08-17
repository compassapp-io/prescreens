import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import Step from '../Steps/Steps'
import { MaterialIcons } from '@expo/vector-icons'

function stepIndicator({ data, forCard }) {
    const [updatedData, setupdatedData] = useState([])
    useEffect(() => {
        if (forCard === false) {
            checkforconsumption();
        }
    }, []);
    const customStyles = {
        stepIndicatorSize: 20,
        currentStepIndicatorSize: 28,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 4,
        stepStrokeWidth: 4,
        stepStrokeCurrentColor: '#ffffff00',
        stepStrokeFinishedColor: '#ffffff00',
        stepStrokeUnFinishedColor: '#ffffff00',
        separatorStrokeUnfinishedWidth: 2.5,
        separatorStrokeFinishedWidth: 2.5,
        separatorFinishedColor: "#E6E6E6",
        separatorUnFinishedColor: "#aaaaaa",
        stepIndicatorFinishedColor: "#ffffff",
        stepIndicatorCurrentColor: "#ffffff",
        stepIndicatorLabelFontSize: 10,
        currentStepIndicatorLabelFontSize: 10,
        stepIndicatorLabelFinishedColor: "#ffffff",
        stepIndicatorLabelUnFinishedColor: "#aaaaaa",
        labelColor: "#FFFFFF",
        labelSize: 8,
        currentStepLabelColor: "#FFFFFF",
        labelAlign: 'flex-start'
    };
    const customStylesForDetail = {
        stepIndicatorSize: 20,
        currentStepIndicatorSize: 15,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 2,
        stepStrokeWidth: 3,
        stepStrokeCurrentColor: '#4E4E4E',
        stepStrokeFinishedColor: '#ffffff00',
        stepStrokeUnFinishedColor: '#4E4E4E',
        separatorStrokeUnfinishedWidth: 2,
        separatorStrokeFinishedWidth: 2,
        separatorFinishedColor: "#4E4E4E",
        separatorUnFinishedColor: "#4E4E4E",
        stepIndicatorFinishedColor: "#ffffff",
        stepIndicatorCurrentColor: "#222222",
        stepIndicatorLabelFontSize: 10,
        currentStepIndicatorLabelFontSize: 10,
        stepIndicatorLabelFinishedColor: "#ffffff",
        stepIndicatorLabelUnFinishedColor: "#aaaaaa",
        labelColor: "#FFFFFF",
        labelSize: 10,
        currentStepLabelColor: "#FFFFFF",
        labelAlign: 'flex-start'
    };
    const getStepIndicatorIconConfig = ({
        stepStatus,
    }) => {
        let iconConfig;
        switch (stepStatus) {
            case 'finished':
                iconConfig = {
                    name: 'check',
                    color: '#64CA1C',
                    size: 10,
                };
                break;
            case 'unfinished':
                iconConfig = {
                    name: 'circle',
                    color: '#969CDC',
                    size: 12,
                };
                break;
            case 'current':
                iconConfig = {
                    name: 'play-arrow',
                    color: '#4454FF',
                    size: 13,
                };
                break;
            default:

        }
        return iconConfig;
    };
    const renderStepIndicator = (params) => (
        <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    );
    checkforconsumption = () => {
        const NewMedia = [];
        data.contentsubsection.forEach((contentSubsection, index) => {
            const newEpisodes = [];
            var isCompleted = true;
            var isMediaFinished;
            contentSubsection.media.forEach((media, i) => {
                if (media.totallength && media.totallength !== null && media.totallength !== 0) {
                    const calculatePercent = media.totallength / 100 * 95;
                    if (media.consumptionlength) {
                        if (calculatePercent === media.consumptionlength || media.consumptionlength > calculatePercent) {
                            isMediaFinished = true;
                        } else {
                            isCompleted = false;
                            isMediaFinished = false;
                        }
                    }
                } else {
                    isCompleted = false;
                    isMediaFinished = false;
                }
                newEpisodes.push({
                    ...media,
                    isMediaFinished: isMediaFinished
                })
            })
            contentSubsection.media = newEpisodes;
            NewMedia.push({
                ...contentSubsection,
                isCompleted: isCompleted,
            })
        })
        setupdatedData(NewMedia)
        console.log(NewMedia)
    }
    return (
        <>
            {forCard ? (
                <View style={{ height: '110%' }}>
                    <Step
                        customStyles={customStyles}
                        currentPosition={data.currentPostion}
                        labels={data.alltitle}
                        stepCount={data.totalStepCount}
                        renderStepIndicator={renderStepIndicator}
                        rotate={'180deg'}
                        isDetailPage={false}
                    />
                </View>
            ) : (
                <ScrollView style={{ height: 500 }}>
                    {
                        updatedData.map((eachEpisode, index) => {
                            return (
                                <View key={index} style={{ width: '100%', marginLeft: 5, marginBottom: 15 }}>
                                    <>
                                        <Step
                                            key={index}
                                            customStyles={customStylesForDetail}
                                            labels={eachEpisode.media}
                                            stepCount={eachEpisode.media.length}
                                            rotate={'0deg'}
                                            isDetailPage={true}
                                            isMediaFinished={true}
                                            isFinished={eachEpisode.isCompleted}
                                            headerText={eachEpisode.title}
                                        />
                                    </>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            )}
        </>
    )
}

export default stepIndicator
