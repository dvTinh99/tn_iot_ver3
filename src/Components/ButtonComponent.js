import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import database from '@react-native-firebase/database';
const ButtomComponent = () => {

  var [range,setRange] = useState();
  var [light,setLight] = useState();
  var [pump,setPump] = useState();

  var [auto,setAuto] = useState();

  useEffect(() => {
    database()
    .ref('/')
    .on('value',snapshot => {
      setAuto(snapshot.child('auto_mode').val());
      setRange(snapshot.child('control_devices/airpump').val());
      setLight(snapshot.child('control_devices/led/status').val());
      setPump(snapshot.child('control_devices/motor/status').val());
    });

  },[])

  const lightButtonClickedHandler = () => {
    light = !light;
    database()
      .ref('/control_devices/led')
      .update({
        status: light,
      })
      .then(() => {
      });
  }

  const pumpButtonClickedHandler = () => {
    pump = ! pump;
    database()
      .ref('/control_devices/motor')
      .update({
        status: pump,
      })
      .then(() => {
      });
  }

  return (
    <View>
      <View style={styles.slider_view}>
        <Text style={styles.text_style}>Công Suất Máy Bơm</Text>
        <Text>{range}</Text>
        <Slider
          disabled={auto}
          style={{width: 200}}
          minimumValue={0}
          maximumValue={255}
          step={5}
          minimumTrackTintColor="tomato"
          maximumTrackTintColor="#000000"
          thumbTintColor="tomato"
          value={range}
          onValueChange={value => {
            setRange(parseInt( value ));
            database()
              .ref('/control_devices')
              .update({
                airpump: value,
              })
              .then(() => {
              });
            }
          }
        />
      </View>
      <View style={styles.viewButtons}>
        <View style={styles.light_view}>
          <Text style={styles.text_style}>Đèn</Text>
          <TouchableOpacity
            disabled = {auto}
            onPress={lightButtonClickedHandler}
            style={[styles.light_button, { backgroundColor: light ? '#F5DEB3' : '#ffffff' }]}
          >
            <Text>{light ? "On" : "Off" }</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pumps_view}>
          <Text style={styles.text_style}>Máy Bơm</Text>
          <TouchableOpacity
          disabled = {auto}
            onPress={pumpButtonClickedHandler}
            style={[styles.pumps_button, { backgroundColor: pump ? '#F5DEB3' : '#ffffff' }]}>
             <Text>{pump ? "On" : "Off" }</Text>
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
    // backgroundColor: '#F5DEB3' ,
  },
  pumps_button: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    // backgroundColor: '#66FFFF',
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
  text_style:{
    fontWeight:'bold',
  }
});

export default ButtomComponent;
