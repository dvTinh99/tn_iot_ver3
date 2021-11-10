import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import database from '@react-native-firebase/database';
const ButtomComponent = () => {

  var [range,setRange] = useState();
  var [light,setLight] = useState();
  var [pump,setPump] = useState();

  useEffect(() => {
    database()
    .ref('/control_devices')
    .on('value',snapshot => {
      setRange(snapshot.child('airpump').val());
      setLight(snapshot.child('led/status').val());
      setPump(snapshot.child('motor/status').val());
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
          onValueChange={value => {
            setRange(parseInt( value ));
            database()
              .ref('/control_devices')
              .update({
                airpump: value,
              })
              .then(() => {
                console.log("air bump update");
              });
            }
          }
        />
      </View>
      <View style={styles.viewButtons}>
        <View style={styles.light_view}>
          <Text>Đèn</Text>
          <TouchableOpacity
            onPress={lightButtonClickedHandler}
            style={[styles.light_button, { backgroundColor: light ? '#F5DEB3' : '#ffffff' }]}
          >
            <Text>On</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pumps_view}>
          <Text>Máy Bơm</Text>
          <TouchableOpacity
            onPress={pumpButtonClickedHandler}
            style={[styles.pumps_button, { backgroundColor: pump ? '#F5DEB3' : '#ffffff' }]}>
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
});

export default ButtomComponent;
