import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import database from '@react-native-firebase/database';
const TurbiditySensor = () => {

  const [doDuc,setDoDuc] = useState([0]);
  const [time,setTime] = useState([]);

  useEffect(() => {
    database()
    .ref('/value_of_sensors')
    .on('value', snapshot => {
      var date_time = [];
      var turbidity = [];
      snapshot.forEach((snap)=> {
        console.log("tur",snap.child("turbidity").val());
        // var now = Time("2012-11-02 21:00:29").format('MMM DD, YYYY');
        let hour = snap.child("datetime").val().split(' ')[1];
        if(date_time.length > 3){
          date_time.shift();
          date_time.push(hour);
        }else{
          date_time.push(hour);
        }
        //ánh sáng
        if(turbidity.length > 3){
          turbidity.shift();
          turbidity.push(snap.child("turbidity").val())
        }else{
          turbidity.push(snap.child("turbidity").val())
        }
      });
      setDoDuc(turbidity);
      setTime(date_time);
    });
  }, []);

  return (
    <View>
      <Text>Độ đục nước</Text>
      <LineChart
        style={styles.lineChart}
        data={{
          labels: time,
          datasets: [
            {
              data: doDuc,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={200}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#ADD8E6',
          backgroundGradientTo: '#2F4F4F',
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
};

const styles = StyleSheet.create({
  lineChart: {
    margin: 10,
  },
});

export default TurbiditySensor;
