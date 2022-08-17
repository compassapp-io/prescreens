import React, { useEffect, useState, useContext, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
import EpisodesCard from '../Episodecard/Episodescard';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const STEP_STATUS = {
    CURRENT: 'current',
    FINISHED: 'finished',
    UNFINISHED: 'unfinished',
};

function StepIndicator(data) {
    const navigation = useNavigation();
    const {  currentPosition = 0,
        stepCount = 5,
        customStyles,
        labels = [],
        onPress,
        renderStepIndicator: renderCustomStepIndicator,
        rotate,
        isDetailPage,
        isFinished,
        headerText } = data;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [margin, setmargin] = useState(0);
    const [progressBarSize, setProgressBarSize] = useState(0);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const sizeAnim = useRef(
        new Animated.Value(customStyles.stepIndicatorSize)
    ).current;
    const staleSizeAnim = useRef(
        new Animated.Value(customStyles.stepIndicatorSize)
    ).current;
    const borderRadiusAnim = useRef(
        new Animated.Value(customStyles.stepIndicatorSize / 2)
    ).current;

    const renderProgressBarBackground = () => {
        let progressBarBackgroundStyle = {
            backgroundColor: customStyles.separatorUnFinishedColor,
            position: 'absolute',
        };
        progressBarBackgroundStyle = {
            ...progressBarBackgroundStyle,
            left: (width - customStyles.separatorStrokeWidth) / 2,
            top: height / (2 * stepCount),
            bottom: height / (2 * stepCount),
            width:
                customStyles.separatorStrokeUnfinishedWidth === 0
                    ? customStyles.separatorStrokeWidth
                    : customStyles.separatorStrokeUnfinishedWidth,
        };
        return (
            <View
                onLayout={(event) => {
                    setProgressBarSize(event.nativeEvent.layout.height);
                }}
                style={progressBarBackgroundStyle}
            />
        );
    };

    const goToDetail = (media) => {
        if (media.type == 'audio') {
            navigation.navigate('audioscreen', media)
        } else if (media.type == 'video') {
            navigation.navigate('videoscreen', media)
        } else {
            navigation.navigate('articlescreen', media)
        }
    }
    const renderProgressBar = () => {
        let progressBarStyle = {
            backgroundColor: customStyles.separatorFinishedColor,
            position: 'absolute',
        };
        progressBarStyle = {
            ...progressBarStyle,
            left: (width - customStyles.separatorStrokeWidth) / 2,
            top: height / (2 * stepCount),
            bottom: height / (2 * stepCount),
            width:
                customStyles.separatorStrokeFinishedWidth === 0
                    ? customStyles.separatorStrokeWidth
                    : customStyles.separatorStrokeFinishedWidth,
            height: progressAnim,
        };
        return <Animated.View style={progressBarStyle} />;
    };

    const renderStepIndicator = () => {
        let steps = [];
        for (let position = 0; position < stepCount; position++) {
            steps.push(
                <TouchableWithoutFeedback
                    key={position}
                >
                    <View
                        onLayout={(event) => {
                            if (position === currentPosition) {
                                setmargin(event.nativeEvent.y)
                            }

                        }}
                        style={[
                            styles.stepContainer,
                            { flexDirection: 'column' },
                            { transform: [{ rotate: rotate }] }
                        ]}
                    >

                        {renderStep(position)}
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return (

            <View
                onLayout={(event) => {
                    setWidth(event.nativeEvent.layout.width);
                    setHeight(event.nativeEvent.layout.height);

                }}
                style={[
                    styles.stepIndicatorContainer,
                    {
                        flexDirection: 'column',
                        width: customStyles.currentStepIndicatorSize,
                    }
                ]}
            >
                {steps}
            </View>
        );
    };

    const renderStepLabels = () => {
        if (!labels || labels === '') {
            return;
        }
        var labelViews = labels.map((label, index) => {
            const indexNumber = index + 1;
            const selectedStepLabelStyle =
                indexNumber === currentPosition
                    ? { color: customStyles.currentStepLabelColor }
                    : { color: customStyles.labelColor, display: 'none' };

            return (
                <TouchableWithoutFeedback
                    style={styles.stepLabelItem}
                    key={index}>
                    <View style={styles.stepLabelItem}>

                        <Text
                            style={[
                                styles.stepLabel,
                                selectedStepLabelStyle,
                                {
                                    fontSize: customStyles.labelSize,
                                    fontFamily: "Montserrat-Regular",
                                },
                                { transform: [{ rotate: rotate }] }
                            ]}>
                            {label}
                        </Text>

                    </View>
                </TouchableWithoutFeedback>
            );
        });

        return (
            <View
                style={[
                    styles.stepLabelsContainer,
                    { flexDirection: 'column', paddingHorizontal: 4 }
                ]}
            >
                {labelViews}
            </View>
        );
    };

    const renderDetailStepLabels = () => {
        if (!labels || labels === '') {
            return;
        }
        var labelViews = labels.map((label, index) => {
            return (
                <View style={{ flexDirection: 'row' }} key={index}>
                    {label.isMediaFinished ? (
                        <Ionicons name="ios-checkmark-circle-sharp" size={18} color="#FFFFFF" style={styles.icon} />
                    ) : (
                        <Entypo name="circle" size={18} color="#4E4E4E" style={styles.icon} />
                    )}
                    <EpisodesCard isHome={true} episodeData={label} customStyle={styles.headtext} custumContainer={styles.back} onEpisodeCardPress={() => goToDetail(label)}/>
                </View>
            );
        });

        return (
            <View
                style={[
                    styles.stepLabelsContainer,
                    { flexDirection: 'column', paddingHorizontal: 4 }]}>
                {labelViews}
            </View>
        );
    };

    const renderStep = (position) => {
        let stepStyle;
        let indicatorLabelStyle = {};
        switch (getStepStatus(position)) {
            case STEP_STATUS.CURRENT: {
                stepStyle = {
                    backgroundColor: customStyles.stepIndicatorCurrentColor,
                    borderWidth: customStyles.currentStepStrokeWidth,
                    borderColor: customStyles.stepStrokeCurrentColor,
                    height: sizeAnim,
                    width: sizeAnim,
                    borderRadius: borderRadiusAnim,
                    overflow: 'hidden',
                };
                indicatorLabelStyle = {
                    overflow: 'hidden',
                    fontSize: customStyles.currentStepIndicatorLabelFontSize,
                    color: customStyles.stepIndicatorLabelCurrentColor,
                };

                break;
            }
            case STEP_STATUS.FINISHED: {
                stepStyle = {
                    backgroundColor: customStyles.stepIndicatorFinishedColor,
                    borderWidth: customStyles.stepStrokeWidth,
                    borderColor: customStyles.stepStrokeFinishedColor,
                    height: staleSizeAnim,
                    width: staleSizeAnim,
                    borderRadius: customStyles.stepIndicatorSize / 2,
                    overflow: 'hidden',
                };
                indicatorLabelStyle = {
                    overflow: 'hidden',
                    fontSize: customStyles.stepIndicatorLabelFontSize,
                    color: customStyles.stepIndicatorLabelFinishedColor,
                };
                break;
            }

            case STEP_STATUS.UNFINISHED: {
                stepStyle = {
                    backgroundColor: customStyles.stepIndicatorUnFinishedColor,
                    borderWidth: customStyles.stepStrokeWidth,
                    borderColor: customStyles.stepStrokeUnFinishedColor,
                    height: staleSizeAnim,
                    width: staleSizeAnim,
                    borderRadius: customStyles.stepIndicatorSize / 2,
                    overflow: 'hidden',
                };
                indicatorLabelStyle = {
                    overflow: 'hidden',
                    fontSize: customStyles.stepIndicatorLabelFontSize,
                    color: customStyles.stepIndicatorLabelUnFinishedColor,
                };
                break;
            }
            default:
        }

        return (
            <Animated.View key={'step-indicator'} style={[styles.step, stepStyle]}>
                {renderCustomStepIndicator ? (
                    renderCustomStepIndicator({
                        position,
                        stepStatus: getStepStatus(position + 1),
                    })
                ) : (
                    <Text style={indicatorLabelStyle}>{`${position}`}</Text>
                )}
            </Animated.View>
        );
    };

    const getStepStatus = (stepPosition) => {
        if (isDetailPage !== true) {
            if (stepPosition === currentPosition) {
                return STEP_STATUS.CURRENT;
            } else if (stepPosition < currentPosition) {
                return STEP_STATUS.FINISHED;
            } else {
                return STEP_STATUS.UNFINISHED;
            }
        }
    };

    const renderHeader = () => {
        return (
            <View style={styles.headProgressContainer}>
                <View style={{ flexDirection: 'row', marginLeft: -10, marginBottom: -1 }}>
                    {isFinished ? (
                        <Ionicons name="ios-checkmark-circle-sharp" size={24} color="#4454FF" />
                    ) : (
                        <Entypo name="circle" size={24} color="white" />
                    )}
                    <Text style={styles.headText}>{headerText}</Text>
                </View>
                <View style={styles.headProgress}>
                </View>
            </View>
        )
    }

    return (
        <>
            {isDetailPage && (
                renderHeader()
            )}
            <View
                style={[
                    styles.container,
                    { flexDirection: 'row', flex: 1 }
                ]}
            >
                {width !== 0 && (
                    <>
                        {renderProgressBarBackground()}
                        {renderProgressBar()}
                    </>
                )}
                {renderStepIndicator()}
                {isDetailPage ? (
                    renderDetailStepLabels()
                ) : (
                    renderStepLabels()
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(1,0,0,0)',
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(1,0,0,0)',
    },
    stepLabelsContainer: {
        justifyContent: 'space-around',
    },
    step: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        width: '100%'
    },
    stepContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        width: '100%',
        fontFamily: "Montserrat-Regular"
    },
    stepLabelItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    headtext: {
        fontSize: 11,
        color: '#FFFFFF'
    },
    headProgress: {
        width: 2,
        height: 40,
        backgroundColor: '#4E4E4E'
    },
    headProgressContainer: {
        marginLeft: 7,
        marginBottom: -41,
        marginTop: 5,
        zIndex: 1
    },
    headText: {
        color: '#FFFFFF',
        fontSize: 14,
        marginLeft: 17,
        marginTop: 5,
        fontFamily: "Raleway-Regular"
    },
    back: {
        backgroundColor: '#2d2d2d'
    },
    icon: {
        position: 'absolute',
        top: 40,
        left: -20,
        backgroundColor: '#222222'
    }
});

export default StepIndicator;
