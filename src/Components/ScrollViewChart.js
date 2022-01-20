import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, ActivityIndicator} from 'react-native';

import LightSensor from './Sensors/LightSensor';
import TemperatureSensor from './Sensors/TemperatureSensor';
import TurbiditySensor from './Sensors/TurbiditySensor';
import PredictChart from './Predict/PredictChart';
import database from '@react-native-firebase/database';
import {MAX_NODES} from '../Helper/MyNumber.js';

const ScrollViewExample = () => {

  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([0]);
  const number_lenght = MAX_NODES;
  const [cuongDo, setCuongDo] = useState([0]);
  const [nhietDo, setNhietDo] = useState([0]);
  const [doDuc, setDoDuc] = useState([0]);
  const [airflow, setAirflow] = useState([0]);
  const [predict, setPredict] = useState([0]);



  const setPredictChart = async (date_time, lux, turbidity, temper, air_flow) => {
    let predict_from_api = [];
    for (let i = 0; i < date_time.length; i++) {
        var sensor = {
            "light": lux[i],
            "temper": temper[i],
            "turbidity": turbidity[i],
            "airflow": air_flow[i] * 12
        }
        await callApi(sensor).then((data) => {
           predict_from_api.push(data.y_pred.toFixed(3));
        });
    }
    setPredict(predict_from_api);
    setLoading(false);
  }

  const callApi = (sensor) => {
    return fetch('https://microalgae-api.herokuapp.com/algae_biomass_prediction',{
      method : 'POST',
      headers : { "content-type" : "application/json"},
      body: JSON.stringify(sensor)
    })
      .then((response) => response.json())
      .then((json) =>  json)
      .then((rs)=>rs)
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    database()
      .ref('/value_of_sensors')
      .on('value', snapshot  => {
        var checkData = snapshot.exists();
        if(checkData){
          var date_time = [];
          var anhSang = [];
          var turbidity = [];
          var nhietDo = [];
          var airflow = [];
          snapshot.forEach(snap => {
            let hour = snap.child('datetime').val();
            let arr = hour.split(':');
            let minute = arr[0] + ':' + arr[1];
  
            if (date_time.length > number_lenght) {
              date_time.shift();
              date_time.push(minute);
              //
              anhSang.shift();
              anhSang.push((snap.child('lux').val()).toFixed(3));
              //
              nhietDo.shift();
              nhietDo.push((snap.child('temper').val()).toFixed(3));
              //
              turbidity.shift();
              turbidity.push((snap.child('turbidity').val()).toFixed(3));
              //
              airflow.shift();
              airflow.push((snap.child('air_flow').val()).toFixed(3));
            } else {
              date_time.push(minute);
              anhSang.push((snap.child('lux').val()).toFixed(3));
              nhietDo.push((snap.child('temper').val()).toFixed(3));
              turbidity.push((snap.child('turbidity').val()).toFixed(3));
              airflow.push((snap.child('air_flow').val()).toFixed(3));
            }
          });
          setTime(date_time.reverse());
          setCuongDo(anhSang.reverse());
          setNhietDo(nhietDo.reverse());
          setDoDuc(turbidity.reverse());
          setAirflow(airflow.reverse());


          setPredictChart(date_time,anhSang,turbidity,nhietDo,airflow);
          
          // console.log(time);          
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      {
        loading ?
        <View style={styles.loading}>
          <ActivityIndicator color="#0c9869" size='large'/>
        </View>
        :
        <>
        <LightSensor time={time} cuongDo={cuongDo} />
        <TemperatureSensor time={time} nhietDo={nhietDo} />
        <TurbiditySensor time={time} doDuc={doDuc} />
        <PredictChart time={time} predict={predict} />
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    // justifyContent: 'center',
  },
  loading: {
    flex: 1,
    height: 650,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
    // backgroundColor:'#000',
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
