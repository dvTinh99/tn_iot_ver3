import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import MenuIcon from '../image/menu.svg';
import NhietDoIcon from '../image/nhietdo.svg';
import DoDucIcon from '../image/doduc.svg';
import DenIcon from '../image/den.svg';
import MaiCheIcon from '../image/maiche.svg';
import SucKhiIcon from '../image/suckhi.svg';
import database from '@react-native-firebase/database';
import Biomass from '../image/biomass.svg'

const Home = ({navigation}) => {
  const [nhietDo, setNhietDo] = useState(0);
  const [doDuc, setDoDuc] = useState(0);
  const [anhSang, setAnhSang] = useState(0);
  const [sucKhi, setSucKhi] = useState(0);
  const [den, setDen] = useState(0);
  const [maiChe, setMaiChe] = useState(0);
  const [predict, setPredict] = useState(0);
  const [loading, setLoading] = useState(true);


  callApi = async (sensor) => {
    return fetch('https://microalgae-api.herokuapp.com/algae_biomass_prediction',{
      method : 'POST',
      headers : { "content-type" : "application/json"},
      body: JSON.stringify(sensor)
    })
      .then((response) => response.json())
      .then((json) => {
        setPredict(json.y_pred.toFixed(3));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    
    database()
      .ref('/')
      .on('value', snapshot => {
        // setSucKhi(snapshot.child('control_devices').child('airpump').val());
        setDen(snapshot.child('control_devices').child('led').val().status);
        setMaiChe(
          snapshot.child('control_devices').child('motor').val().status,
        );
      });
    database()
      .ref('/value_of_sensors')
      .limitToLast(1)
      .on('value', data => {

        var checkData = data.exists();
        if(checkData) {
          var obj = Object.values(data.val())[0];

          setSucKhi(obj.air_flow.toFixed(2)/5);
          setNhietDo(obj.temper.toFixed(3));
          setDoDuc(obj.turbidity.toFixed(3));
          setAnhSang(obj.lux.toFixed(3));
          var sensor = {
            light:obj.lux,
            temper:obj.temper,
            turbidity:obj.turbidity,
            airflow :obj.air_flow * 12
          }
          callApi(sensor);
        }else{
          setLoading(false);
        }
      });
  },[]);
  return (

    <View
      style={{
        backgroundColor: '#f9f8fd',
        flex: 1,
      }}>
        {
          loading ? 
          <View style={styles.loading}> 
            <ActivityIndicator color="#0c9869" size='large'/>
          </View>
          :
          <>
           <StatusBar backgroundColor="#0c9869" barStyle="light-content" />
            <View
              style={{
                backgroundColor: '#0c9869',
                height: '35%',
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                paddingHorizontal: 15,
              }}>
              <View style={{height: '25%'}}>
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
                    IoT system for microalgae cultivation
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

            {/* content    c??c th??ng s??? c???n ??i???u khi???n */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                alignItems: 'center',
                width: '100%',
              }}>
              {/* view n??y s??? s???p x???p n???m ngang n?? */}
              {/* nhi???t ????? v?? ????? ?????c */}
              <View style={styles.block_ngang}>
                {/* trong n??y s??? c?? view nh??? */}
                {/* nhi???t ????? v?? ????? ?????c */}
                <View style={styles.block_left}>
                  <View style={{width: '70%'}}>
                    <Text style={[{ fontWeight: 'bold', marginBottom: 10 },styles._text]}>
                    Temperature(??C)
                    </Text>
                    <Text style={[{fontWeight: 'bold', color: '#0c9869'},styles._text]}>
                      {nhietDo}
                    </Text>
                  </View>
                  <View>
                    <NhietDoIcon width={40} height={40} />
                  </View>
                </View>

                <View style={styles.block_right}>
                  <View style={{width: '65%'}}>
                    <Text style={[{fontWeight: 'bold', marginBottom: 10}, styles._text]}>
                    Turbidity(V)
                    </Text>
                    <Text style={[{fontWeight: 'bold',fontSize:16.5, color: '#0c9869'}, styles._text]}>
                      {doDuc}
                    </Text>
                  </View>
                  <View>
                    <DoDucIcon width={40} height={40} />
                  </View>
                </View>
              </View>

              {/*??nh s??ng v?? s???c kh?? */}
              <View style={styles.block_ngang}>
                {/* trong n??y s??? c?? view nh??? */}
                <View style={styles.block_left}>
                  <View style={{width: '65%'}}>
                    <Text style={[{fontWeight: 'bold', marginBottom: 10}, styles._text]}>
                      Light(lux)
                    </Text>
                    <Text style={[{fontWeight: 'bold', color: '#0c9869'}, styles._text]}>
                      {anhSang}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../image/sun.png')}
                      style={{height: 50, width: 50}}
                      tintColor="#0c9869"
                    />
                  </View>
                </View>

                <View style={styles.block_right}>
                  <View style={{width: '65%'}}>
                    <Text style={[{fontWeight: 'bold', marginBottom: 10},styles._text]}>
                      Airflow (dm3/m)
                    </Text>
                    <Text style={[{fontWeight: 'bold', color: '#0c9869'}, styles._text]}>
                      {sucKhi}
                    </Text>
                  </View>
                  <View>
                    <SucKhiIcon width={40} height={40} />
                  </View>
                </View>
              </View>

              {/* ????n v?? m??n che */}
              <View style={styles.block_ngang}>
                {/* trong n??y s??? c?? view nh??? */}
                <View style={styles.block_left}>
                  <View style={{width: '65%'}}>
                    <Text style={[{fontWeight: 'bold', marginBottom: 10}, styles._text]}>
                      Led
                    </Text>
                    <Text style={[{fontWeight: 'bold', color: '#0c9869'}, styles._text]}>
                      {den ? 'On' : 'Off'}
                    </Text>
                  </View>
                  <View>
                    <DenIcon
                      width={40}
                      height={40}
                      color={den ? '#0c9869' : '#000'}
                    />
                  </View>
                </View>

                <View style={styles.block_right}>
                  <View style={{width: '65%'}}>
                    <Text style={[{fontWeight: 'bold', marginBottom: 10},styles._text]}>
                      Roof
                    </Text>
                    <Text style={{fontWeight: 'bold', color: '#0c9869'}}>
                      {maiChe ? 'Open' : 'Close'}
                    </Text>
                  </View>
                  <View>
                    <MaiCheIcon
                      width={45}
                      height={45}
                      color={maiChe ? '#0c9869' : '#000'}
                    />
                  </View>
                </View>
              </View>

              {/* block predict */}
              <View style={styles.block_ngang}>

                <View style={styles.block_centre}>

                  <View style={{width: '75%'}}>
                    <Text style={[{fontWeight: 'bold', marginBottom: 10}, styles._text]}>
                      Predict (g/l)
                    </Text>
                    <Text style={[{fontWeight: 'bold', color: '#0c9869'}, styles._text]}>
                      {predict}
                    </Text>
                  </View>

                  <View>
                  <Biomass
                      width={45}
                      height={45}
                      color={'#0c9869'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    height: 650,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
    width : '100%',
    // backgroundColor:'#000',
  },
  block_ngang: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    // backgroundColor: '#000'
  },
  block_left: {
    flexDirection: 'row',
    borderRadius: 10,
    width: '47%',
    height: 90,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    marginRight: 20,
  },
  block_right: {
    flexDirection: 'row',
    borderRadius: 10,
    width: '47%',
    height: 90,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  block_centre: {
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    height: 90,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  _text:{
    fontSize :16.5
  }
});

export default Home;
