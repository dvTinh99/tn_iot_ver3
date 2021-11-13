import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';
import database from '@react-native-firebase/database';
const TemperatureSensor = () => {
  const [nhietDo,setNhietDo] = useState([0]);
  const [time,setTime] = useState([]);

  useEffect(() => {
    database()
    .ref('/value_of_sensors')
    .on('value', snapshot => {
      var date_time = [];
      var nhietDo = [];
      snapshot.forEach((snap)=> {
        // var now = Time("2012-11-02 21:00:29").format('MMM DD, YYYY');
        let hour = snap.child("datetime").val().split(' ')[1];
        if(date_time.length > 3){
          date_time.shift();
          date_time.push(hour);
        }else{
          date_time.push(hour);
        }
        //nhiệt độ
        if(nhietDo.length > 3){
          nhietDo.shift();
          nhietDo.push(snap.child("temper").val())
        }else{
          nhietDo.push(snap.child("temper").val())
        }
      });
      setNhietDo(nhietDo);
      setTime(date_time);
    });
  }, []);

  return(
    <View>
      <Text style={styles.text_style}>Nhiệt Độ Nước (°C)</Text>
        <LineChart
          style={styles.lineChart}
          data={{
            labels: time,
            datasets: [
              {
                data: nhietDo,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={200}
          // yAxisSuffix="°C"
          fromZero = {true}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#07EDED',
            backgroundGradientTo: '#FF9933',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 50,
            },
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  lineChart: {
    margin: 10,
  },
  text_style:{
    fontWeight: 'bold',
  }
});

export default TemperatureSensor;