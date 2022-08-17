import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from 'moment';
import styles from './Weekdaysstyle';
function WeekDays({onSlideCapture}) {
  const [newdata, setNewdata] = useState([]);
  const dateArray = [{
    "date": "Sun",
    "backcolor": "#E6E6E6",
  },
  {
    "date": "Mon",
    "backcolor": "#E6E6E6",
  },
  {
    "date": "Tue",
    "backcolor": "#E6E6E6",
  },
  {
    "date": "Wed",
    "backcolor": "#E6E6E6",
  },
  {
    "date": "Thu",
    "backcolor": "#E6E6E6",
  },
  {
    "date": "Fri",
    "backcolor": "#E6E6E6",
  },
  {
    "date": "Sat",
    "backcolor": "#E6E6E6",
  },
  ]
  useEffect(() => {
    getContentData();
  }, []);
  getContentData = () => {
    var newdate = moment().format('ddd');
    dateArray.forEach((result) => {
      if (result.date === newdate) {
        result.backcolor = "#3329FF";
      }
    });
    setNewdata(dateArray)
    console.log(dateArray)
  }
  function ondateChange(date) {
    const changeDate = moment().day(date).format("YYYY-MM-DD");
    // dateArray.forEach((result) => {
    //   if (result.date === date) {
    //     result.backcolor = "#3329FF";
    //   }
    // });
    // setNewdata(dateArray)
    onSlideCapture({ currentDate: changeDate });
  }
  return (
    <View style={styles.container}>
      {newdata.map((data, index) => {
        return (
          <View style={styles.group11} key={index}>
            <TouchableOpacity onPress={() => ondateChange(data.date)}>
              <View style={[styles.rect8, { backgroundColor: data.backcolor }]}></View>
              <Text style={styles.sun3}>{data.date}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default WeekDays;
