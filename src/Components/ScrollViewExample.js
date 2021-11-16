import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import LightSensor from './Sensors/LightSensor';
import TemperatureSensor from './Sensors/TemperatureSensor';
import TurbiditySensor from './Sensors/TurbiditySensor';

const ScrollViewExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LightSensor />
        <TemperatureSensor />
        <TurbiditySensor />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:10
  },
  scrollView: {
    borderRadius: 20,
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 42,
  },
});

export default ScrollViewExample;
