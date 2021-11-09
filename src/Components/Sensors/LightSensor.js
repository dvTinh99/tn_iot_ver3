import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';

const LightSensor = () => {
  return(
    <View>
      <Text>Cường Độ Ánh Sáng</Text>
        <LineChart
          style={styles.lineChart}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
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