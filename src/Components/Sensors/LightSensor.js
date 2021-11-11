import React, {useState, useEffect} from 'react';
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
import moment from 'moment';

const LightSensor = () => {

  const [cuongDo,setCuongDo] = useState([0,0,0]);
  const [time,setTime] = useState([]);

  useEffect(() => {
    database()
    .ref('/value_of_sensors')
    .on('value', snapshot => {
      var date_time = [];
      var anhSang = [];
      snapshot.forEach((snap)=> {
        // var now = Time("2012-11-02 21:00:29").format('MMM DD, YYYY');
        let hour = snap.child("datetime").val().split(' ')[1];
        if(date_time.length > 3){
          date_time.shift();
          date_time.push(hour);
        }else{
          date_time.push(hour);
        }
        //ánh sáng
        if(anhSang.length > 3){
          anhSang.shift();
          anhSang.push(snap.child("lux").val())
        }else{
          anhSang.push(snap.child("lux").val())
        }
        // anhSang.push(snap.child("lux"))
        // nhietDo.push(snap.child("temper"))
        // doDuc.push(snap.child("turbidity"))
      });
      setCuongDo(anhSang);
      setTime(date_time);
    });
  }, []);

  return(
    <View>
      <Text>Cường Độ Ánh Sáng</Text>
        <LineChart
          style={styles.lineChart}
          data={{
            labels: time,
            datasets: [
              {
                data: cuongDo,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={200}
          yAxisLabel="lux "
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
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
});

export default LightSensor;