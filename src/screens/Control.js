import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Switch, Image, ActivityIndicator} from 'react-native';

import Slider from 'react-native-slider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import DenIcon from '../image/den.svg';
import MaiCheIcon from '../image/maiche.svg';

const Control = ({navigation}) => {
  console.warn = () => {};
  const [loading, setLoading] = useState(true);
  const [auto, setAuto] = useState(false);
  const [range, setRange] = useState(30);
  const [light, setLight] = useState(true);
  const [maiChe, setMaiChe] = useState(true);
  const button_size = 65;

  const lightOn = () => {
    database()
      .ref('/control_devices/led')
      .update({
        status: true,
      })
      .then(() => {
        setLight(true);
      });
  };
  const lightOff = () => {
    
    database()
      .ref('/control_devices/led')
      .update({
        status: false,
      })
      .then(() => {
        setLight(false);
      });
  };
  const maiCheOn = () => {
    database()
      .ref('/control_devices/motor')
      .update({
        status: true,
      })
      .then(() => {
        setMaiChe(true);
      });
  };
  const maiCheOff = () => {
    
    database()
      .ref('/control_devices/motor')
      .update({
        status: false,
      })
      .then(() => {
        setMaiChe(false);
      });
  };
  const autoMode = (value) => {
    setAuto(value);
    database()
      .ref('/')
      .update({
        auto_mode: value,
      })
  }

  const airFlow = (value) => {
    setRange(parseInt(value));
    database()
      .ref('/control_devices')
      .update({
        airpump: range,
      })
      .then(() => {
      });
  }


  useEffect(() => {
    setLoading(true);
    database()
    .ref('/')
    .on('value', snapshot => {
      setAuto(snapshot.child('auto_mode').val());
      setRange(snapshot.child('control_devices/airpump').val());
      setLight(snapshot.child('control_devices/led').val().status);
      setMaiChe(snapshot.child('control_devices/motor').val().status);
      setLoading(false);
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
                {/* điều khiển tự động */}
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
                Control
              </Text>
              <Switch
                style={{
                  marginLeft: 'auto',
                  transform: [{scaleX: 1.5}, {scaleY: 1.5}],
                }}
                value={auto}
                onValueChange={value => autoMode(value)}
                backgroundActive={'green'}
                backgroundInactive={'gray'}
                circleActiveColor={'#30a566'}
                circleInActiveColor={'#000000'}
              />
            </View>
            <View style={{width: '100%', height: '100%'}}>
              {auto && (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    backgroundColor: 'rgba(63,63,63,0.5)',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  </View>
              )}

              <View style={{zindex: 1, height: '100%'}}>
                <View
                  style={{
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: '#f9f8fd',
                    zIndex: 2,
                  }}>
                </View>

                <View style={{height: '100%', position: 'absolute', zIndex: 1}}>
                  {/* điều khiển đèn */}
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: '35%',
                      paddingHorizontal: 15,
                      marginTop: 10,
                      flexDirection: 'row',
                      paddingVertical: 5,
                    }}>
                    <View
                      pointerEvents={auto ? 'none' : 'auto'}
                      style={{
                        width: '100%',
                        height: '50%',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: '#0c9869',
                          textAlign: 'left',
                        }}>
                        Light Control
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          marginTop: 10,
                          marginBottom: 10,
                        }}>
                        <DenIcon
                          width={100}
                          height={100}
                          color={light ? '#0c9869' : '#000'}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'center',
                        }}>
                        <View>
                          <TouchableOpacity
                            onPress={lightOn}
                            style={{
                              backgroundColor: light ? '#0c9869' : '#3c3f44',
                              width: button_size,
                              height: button_size,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 75,
                            }}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                              On
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{marginLeft: 50}}>
                          <TouchableOpacity
                            onPress={lightOff}
                            style={{
                              backgroundColor: !light ? '#0c9869' : '#3c3f44',
                              width: button_size,
                              height: button_size,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 75,
                            }}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                              Off
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* điều khiển màn che */}
                  <View
                    pointerEvents={auto ? 'none' : 'auto'}
                    style={{
                      backgroundColor: '#fff',
                      height: '35%',
                      paddingHorizontal: 15,
                      marginTop: 10,
                      flexDirection: 'row',
                      paddingVertical: 5,
                    }}>
                    <View
                      // pointerEvents={auto ? 'none' : 'auto'}
                      style={{
                        width: '100%',
                        height: '50%',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: '#0c9869',
                          textAlign: 'left',
                        }}>
                        Roof Control
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          marginTop: 10,
                          marginBottom: 10,
                        }}>
                        <MaiCheIcon
                          width={100}
                          height={100}
                          color={maiChe ? '#0c9869' : '#000'}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'center',
                        }}>
                        <View>
                          <TouchableOpacity
                            // disabled = {auto}
                            onPress={maiCheOn}
                            style={{
                              backgroundColor: maiChe ? '#0c9869' : '#3c3f44',
                              width: button_size,
                              height: button_size,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 75,
                            }}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                              Open
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{marginLeft: 50}}>
                          <TouchableOpacity
                            // disabled = {auto}
                            onPress={maiCheOff}
                            style={{
                              backgroundColor: !maiChe ? '#0c9869' : '#3c3f44',
                              width: button_size,
                              height: button_size,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 75,
                            }}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* điều khiển sục khí */}
                  <View
                    pointerEvents={auto ? 'none' : 'auto'}
                    style={{
                      backgroundColor: '#fff',
                      height: '15.5%',
                      paddingHorizontal: 15,
                      marginTop: 10,
                      flexDirection: 'row',
                      paddingVertical: 5,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '50%',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 19,
                          color: '#0c9869',
                          textAlign: 'left',
                        }}>
                        Airflow Control
                      </Text>
                      <View style={{marginTop: 6}}>
                        <View
                          style={{
                            position: 'absolute',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                          }}>
                          {/**  minimumTrackTintColor là màu của giá trị đã kéo */}

                          <View
                            style={{
                              zIndex: 1,
                              width: '100%',
                              alignItems: 'center',
                              position: 'absolute',
                            }}>
                            <Slider
                              width={'80%'}
                              value={range}
                              onValueChange={value => airFlow(value)}
                              maximumValue={255}
                              minimuneValue={0}
                              step={5}
                              trackStyle={customStyles4.track}
                              thumbStyle={customStyles4.thumb}
                              minimumTrackTintColor="#0c9769"
                            />
                          </View>
                          <View
                            pointerEvents="none"
                            style={{
                              zIndex: 1,
                              width: '100%',
                              alignItems: 'center',
                              position: 'absolute',
                              top: 10,
                            }}>
                            <Text
                              style={{
                                // position: 'absolute',
                                // zIndex: 2,
                                fontWeight: 'bold',
                                color: '#fff',
                              }}>
                              {range}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
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
  },
});

var customStyles4 = StyleSheet.create({
  
  track: {
    height: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(12,151,105,0.55)',
    shadowColor: 'black',
    // shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.15,
  },
  thumb: {
    width: 40,
    height: 40,
    backgroundColor: '#10815c',
    borderColor: '#10815c',
    borderWidth: 5,
    borderRadius: 20,
    shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});

export default Control;
