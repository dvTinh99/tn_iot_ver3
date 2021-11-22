import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Switch
} from 'react-native';
import Slider from "react-native-slider";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MenuIcon from '../image/menu.svg';
import NhietDoIcon from '../image/nhietdo.svg';
import DoDucIcon from '../image/doduc.svg';
import DenIcon from '../image/den.svg';
import MaiCheIcon from '../image/maiche.svg';
import SucKhiIcon from '../image/suckhi.svg';
import SunIcon from '../image/sun.png';
import ScrollViewExample from '../Components/ScrollViewExample';
import {LineChart} from 'react-native-chart-kit';

const ChartScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ width:'100%', height:'89.9%'}}>
    <View
      style={{
        backgroundColor: '#f9f8fd',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          height: '9%',
          paddingHorizontal: 15,
          flexDirection: 'row',
          paddingVertical: 18,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 19,
            color: '#0c9869',
            textAlign: 'right',
          }}>
          Biểu đồ
        </Text>
      </View>
      {/* Biểu đồ*/}
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          paddingHorizontal: 15,
          marginTop: 10,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        
        <ScrollViewExample />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block_ngang: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
});

var customStyles = StyleSheet.create({
    track: {
      height: 40,
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        borderTopStartRadius : 20,
        //borderTopEndRadius : 20, // không được
        //borderBottomEndRadius:20, // khong được
        //borderTopRightRadius : 20, // không được

      backgroundColor: '#b6e0d2',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      shadowOpacity: 0.15,
    },
    thumb: {
      width: 20,
      height: 20,
      backgroundColor: '#10815c',
      borderColor: '#10815c',
      borderWidth: 5,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 2,
      shadowOpacity: 0.35,
    }
  });

  var customStyles4 = StyleSheet.create({
    track: {
      height: 10,
      borderRadius: 4,
      backgroundColor: '#b6e0d2',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      shadowOpacity: 0.15,
    },
    thumb: {
      width: 20,
      height: 20,
      backgroundColor: '#10815c',
      borderColor: '#10815c',
      borderWidth: 5,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 2,
      shadowOpacity: 0.35,
    }
  });

export default ChartScreen;
