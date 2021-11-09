import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';
import ButtomComponent from './ButtomComponent';
import ScrollViewExample from './ScrollViewExample';

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 
  return (
    <View style={styles.container}>
      <Text>Auto Mode </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <ScrollViewExample />
      <ButtomComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HomeScreen;
