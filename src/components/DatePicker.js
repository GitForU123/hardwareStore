import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Alert,
  Animated,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';
import customColor from '../assets/colors/customColor';

const DatePicker = props => {
  const {navigation, route} = props;
  const {colors} = useTheme();
  const {current} = useCardAnimation();
  const {screen} = route.params;

  //   const [selectedDate, setSelectedDate] = useState(null);
  const currentDateString = () => {
    const date = new Date();
    const [month, day, year] = date.toLocaleDateString().split('/');
    console.log(day, month, year);
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          width: '90%',

          borderRadius: 3,
          backgroundColor: colors.card,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}></Animated.View>
      <View>
        <Calendar
          onDayPress={day => {
            console.log(day);
            // setSelectedDate(day.dateString);
            navigation.navigate({
              name: `${screen}`,
              params: {datePicked: day.dateString},
              // route.params.name === 'fromIncoming'
              //   ? {incomingDate: day.dateString}
              //   : {outGoingDate: day.dateString},
              merge: true,
            });
          }}
          //   theme={{
          //     selectedDayBackgroundColor: customColor.primaryColor,
          //     selectedDayTextColor: customColor.white,
          //   }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: customColor.white,
  },
});

export default DatePicker;
