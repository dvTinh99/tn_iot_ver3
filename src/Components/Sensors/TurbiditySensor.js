import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import database from '@react-native-firebase/database';
import  {MAX_NODES, WIDTH_LINE_CHART}  from '../../Helper/MyNumber.js';
const TurbiditySensor = (props) => {

  const scrollRef = useRef();
  const number_lenght = MAX_NODES;
  

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: false,
    });
  }, []);

  const data = {
    labels: props.time,
    datasets: [
      {
        data: props.doDuc,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_style}>Độ đục nước (V)</Text>
      <ScrollView 
      ref={scrollRef}
      // showsVerticalScrollIndicator={false}
      horizontal={true}
      // onContentSizeChange={() => scrollRef.current.scrollToEnd()}
      contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
      showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
      <LineChart
        segments={2}
        style={styles.lineChart}
        data={data}
        width={WIDTH_LINE_CHART} // from react-native
        height={200}
        fromZero = {true}
        renderDotContent={({x, y, index, indexData}) => <Text key={index} style={[styles.dots,{top:y-20,left:x-10 }]}>{indexData}</Text>}
        // yAxisSuffix="v"
        yAxisInterval={1} // optional, defaults to 1
        yLabelsOffset = {20}
        chartConfig={{
          // data: data.datasets,
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#ADD8E6',
          backgroundGradientTo: '#2F4F4F',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 50,
          },
        }}
        // fromZero
        bezier
      />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingBottom:10,
  },
  lineChart: {
    // margin: 10,
  },
  text_style:{
    fontWeight: 'bold',
  },
  dots:{ 
    position: 'absolute',
    fontSize:10,
    color: '#FFFAFA',
    opacity : 0.9,
  }
});

export default TurbiditySensor;
