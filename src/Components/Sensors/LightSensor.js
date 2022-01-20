import React, {useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  List
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';

import database from '@react-native-firebase/database';
import moment from 'moment';
import  {MAX_NODES, WIDTH_LINE_CHART}  from '../../Helper/MyNumber.js';
import {TEXT_COLOR, TRACK_COLOR, THUMB_COLOR} from '../../Helper/MyColors.js'

const LightSensor = (props) => {

  const scrollRef = useRef();
  const number_lenght = MAX_NODES;
 
  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: false,
    });
  }, []);


  return(
    <View style={styles.container}>
      <Text style={styles.text_style}>Light Intensity (lux)</Text>
      <ScrollView 
      ref={scrollRef}
      // showsVerticalScrollIndicator={false}
      horizontal={true}
      // onContentSizeChange={() => scrollRef.current.scrollToEnd()}
      contentOffset={{ x: 10000, y: 0 }} // i needed the scrolling to start from the end not the start
      showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
        <LineChart
        yLabelsOffset={25} // khoảng cách giữa trục y và biểu đồ
        // verticalLabelRotation={30} 
          style={styles.lineChart}
          data={{
            labels: props.time,
            datasets: [
              {
                data: props.cuongDo,
                
              }
            ],
          }}
          // onDataPointClick={({value}) => {
          //   console.log(value);
          // }}
          width={WIDTH_LINE_CHART} // from react-native
          height={200}
          // withDots={true}// show dots or not
          onDataPointClick={( {value, dataset, getColor} ) =>{console.log(value);}}
          renderDotContent={({x, y, index, indexData}) => <Text key={index} style={[styles.dots,{top:y-20,left:x-20 }]}>{indexData}</Text>}
          // yAxisSuffix = " lux"
          fromZero
          yAxisInterval={1} // gióng trụ y lên x
          // yAxisLabel = {"ok"} // thêm string trước giá trị y
          //yAxisSuffix // nối thêm string vào y
          yLabelsOffset = {20} // khoảng cách từ các số trục y đến biểu đồ
          chartConfig={{
            // decimalPlaces: 2,
            // propsForHorizontalLabels:cuongDo,
            // withDots :false,
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // số thập phân sau dấu phẩy
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 50,
            },
          }}
          
          
          bezier
        />
         </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingBottom:10,
  },
  lineChart: {
    // marginBottom: 10,
  },
  text_style:{
    fontWeight: 'bold',
    marginBottom:5,
    color: TEXT_COLOR,
  },
  dots:{ 
    position: 'absolute',
    fontSize:10,
    color: '#FFFAFA',
    opacity : 0.9,
  }
});

export default LightSensor;