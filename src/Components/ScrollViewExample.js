import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';

import LightSensor from './Sensors/LightSensor';
import TemperatureSensor from './Sensors/TemperatureSensor';
import TurbiditySensor from './Sensors/TurbiditySensor';
import database from '@react-native-firebase/database';
import {MAX_NODES} from '../Helper/MyNumber.js';

const ScrollViewExample = () => {
  const [time, setTime] = useState([0]);
  const number_lenght = MAX_NODES;
  const [cuongDo, setCuongDo] = useState([0]);
  const [nhietDo, setNhietDo] = useState([0]);
  const [doDuc, setDoDuc] = useState([0]);

  useEffect(() => {
    database()
      .ref('/value_of_sensors')
      .on('value', snapshot  => {
        var checkData = snapshot.exists();
        if(checkData){
          var date_time = [];
          var anhSang = [];
          var turbidity = [];
          var nhietDo = [];
          snapshot.forEach(snap => {
            let hour = snap.child('datetime').val();
            let arr = hour.split(':');
            let minute = arr[0] + ':' + arr[1];
  
            if (date_time.length > number_lenght) {
              date_time.shift();
              date_time.push(minute);
              //
              anhSang.shift();
              anhSang.push(snap.child('lux').val());
              //
              nhietDo.shift();
              nhietDo.push(snap.child('temper').val());
              //
              turbidity.shift();
              turbidity.push(snap.child('turbidity').val());
            } else {
              date_time.push(minute);
              anhSang.push(snap.child('lux').val());
              nhietDo.push(snap.child('temper').val());
              turbidity.push(snap.child('turbidity').val());
            }
          });
          setTime(date_time.reverse());
          setCuongDo(anhSang.reverse());
          setNhietDo(nhietDo.reverse());
          setDoDuc(turbidity.reverse());
          console.log(time);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      
        <LightSensor time={time} cuongDo={cuongDo} />
        <TemperatureSensor time={time} nhietDo={nhietDo} />
        <TurbiditySensor time={time} doDuc={doDuc} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginBottom:10,
    // width:'100%'
  },
  scrollView: {
    // borderRadius: 20,
    // marginHorizontal: 10,
    // paddingBottom: 10,
  },
  text: {
    fontSize: 42,
  },
});

export default ScrollViewExample;
