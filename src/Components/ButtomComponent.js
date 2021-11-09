import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import database from '@react-native-firebase/database';
const ButtomComponent = () => {

  const [range,setRange] = useState(100);

  const buttonClickedHandler = () => {
    database()
    .ref('/auto_mode')
    .on('value', snapshot => {
      console.log(snapshot.val());
    });
    
    
  };
  return (
    <View>
      <View style={styles.slider_view}>
        <Text>Công Suất Máy Bơm</Text>
        <Text>{range}</Text>
        <Slider
          style={{width: 200}}
          minimumValue={0}
          maximumValue={255}
          step={5}
          minimumTrackTintColor="tomato"
          maximumTrackTintColor="#000000"
          thumbTintColor="tomato"
          value={range}
          onValueChange={value => setRange(parseInt( value ))}
        />
      </View>
      <View style={styles.viewButtons}>
        <View style={styles.light_view}>
          <Text>Đèn</Text>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.light_button}>
            <Text>On</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pumps_view}>
          <Text>Máy Bơm</Text>
          <TouchableOpacity
            disabled={true}
            onPress={buttonClickedHandler}
            style={styles.pumps_button}>
            <Text>On</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  light_button: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: '#F5DEB3',
  },
  pumps_button: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: '#66FFFF',
  },
  viewButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 55,
  },
  light_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pumps_view: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  slider_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtomComponent;
