import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
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
import database from '@react-native-firebase/database';

const Home = ({navigation}) => {

    const [nhietDo, setNhietDo] = useState(0);
    const [doDuc, setDoDuc] = useState(0);
    const [anhSang, setAnhSang] = useState(0);
    const [sucKhi, setSucKhi] = useState(0);
    const [den, setDen] = useState(0);
    const [maiChe, setMaiChe] = useState(0);
    
  useEffect(() => {
    database()
      .ref('/')
      .on('value', snapshot => {
        // setSucKhi(snapshot.child('control_devices').child('airpump').val());
        setDen(snapshot.child('control_devices').child('led').val().status);
        setMaiChe(snapshot.child('control_devices').child('motor').val().status);

    }); 
    database().ref('/value_of_sensors').limitToLast(1).on('value', data => {
        data.forEach(d => {
            setSucKhi(d.child('air_flow').val());
            setNhietDo(d.child('temper').val());
            setDoDuc(d.child('turbidity').val());
            setAnhSang(d.child('lux').val());
        })
    });
  });
  return (
    <View
      style={{
        backgroundColor: '#f9f8fd',
        flex: 1,
      }}>
      <StatusBar backgroundColor="#0c9869" barStyle="light-content" />
      <View
        style={{
          backgroundColor: '#0c9869',
          height: '23%',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingHorizontal: 15,
        }}>
        <View style={{height: '10%'}}>
          <MenuIcon width={30} height={30} marginTop={20} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            width: '100%',
          }}>
          <View style={{width: '65%'}}>
            <Text
              style={{
                fontSize: 28,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Hệ thống IoT nuôi trồng vi tảo
            </Text>
          </View>
          <View style={{width: '35%', alignItems: 'flex-end'}}>
            <Image
              source={require('../image/chlorelle_2.png')}
              style={{height: 120, width: 120}}
            />
          </View>
        </View>
      </View>

      {/* content    các thông số cần điều khiển */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          alignItems: 'center',
          width: '100%',
        }}>
        {/* view này sẽ sắp xếp nằm ngang nè */}
        <View style={styles.block_ngang}>
          {/* trong này sẽ có view nhỏ */}
          {/* nhiệt độ và độ đục */}
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              width: '45%',
              height: 80,
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#fff',
              marginRight: 30,
            }}>
            <View style={{width: '72%'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Nhiệt độ (°C)
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0c9869'}}>{nhietDo}</Text>
            </View>
            <View>
              <NhietDoIcon width={30} height={30} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              width: '45%',
              height: 80,
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <View style={{width: '72%'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Độ đục (V)
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0c9869'}}>{doDuc}</Text>
            </View>
            <View>
              <DoDucIcon width={30} height={30} />
            </View>
          </View>
        </View>

        {/*ánh sáng và sục khí */}
        <View style={styles.block_ngang}>
          {/* trong này sẽ có view nhỏ */}
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              width: '45%',
              height: 80,
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#fff',
              marginRight: 30,
            }}>
            <View style={{width: '72%'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Ánh sáng(lux)
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0c9869'}}>
                {anhSang}
              </Text>
            </View>
            <View>
              <Image
                source={require('../image/sun.png')}
                style={{height: 40, width: 40}}
                tintColor="#0c9869"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              width: '45%',
              height: 80,
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <View style={{width: '72%'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Sục khí(dm3)
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0c9869'}}>{sucKhi}</Text>
            </View>
            <View>
              <SucKhiIcon width={30} height={30} />
            </View>
          </View>
        </View>

        {/* Đèn và màn che */}
        <View style={styles.block_ngang}>
          {/* trong này sẽ có view nhỏ */}
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              width: '45%',
              height: 80,
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#fff',
              marginRight: 30,
            }}>
            <View style={{width: '72%'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Đèn (°C)
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0c9869'}}>
                {den ? 'Bật' : 'Đóng'}
              </Text>
            </View>
            <View>
              <DenIcon width={30} height={30} color={den ? '#0c9869' : '#000'} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              width: '45%',
              height: 80,
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <View style={{width: '72%'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Màn che
              </Text>
              <Text style={{fontWeight: 'bold', color: '#0c9869'}}>
                {maiChe ? "Mở" : "Đóng"}
              </Text>
            </View>
            <View>
              <MaiCheIcon width={30} height={30} color={maiChe ? '#0c9869' : '#000'} />
            </View>
          </View>
        </View>
      </View>
    </View>
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

export default Home;
