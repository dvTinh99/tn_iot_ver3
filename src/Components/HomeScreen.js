import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';
import ButtonComponent from './ButtonComponent';
import ScrollViewExample from './ScrollViewExample';

import database from '@react-native-firebase/database';

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    database()
      .ref('/')
      .update({
        auto_mode: !isEnabled,
      })
      .then(() => {
      });
    };

  useEffect(() => {
    database()
    .ref('/auto_mode')
    .on('value', snapshot => {
      setIsEnabled(snapshot.val());
    });
    
  }, [])
 
  return (
    <View style={styles.container}>
      <Text style={styles.text_style}>Auto Mode </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <ScrollViewExample />
      <ButtonComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ADFF2F'
  },
  text_style:{
    fontWeight: 'bold',
  }
});

export default HomeScreen;
