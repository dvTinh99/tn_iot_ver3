import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import HomeIcon from '../Images/feather/home.svg';
import SettingIcon from '../Images/feather/settings.svg';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        showLabel: false,
        tabBarStyle :{
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius : 15,
          height: 50,
        }
      }}
    >
      <Tab.Screen
       name="Home" 
       component={HomeScreen} 
       options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => (
          <HomeIcon width={40} height={30} color={'#000000'}/>
          ),
        }}
       />
      <Tab.Screen 
        name="Setting" 
        component={SettingScreen} 
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <SettingIcon width={40} height={30} color={'#000000'}/>
            ),
          }}
      />
    </Tab.Navigator>
  );
}

const Tabs = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default Tabs;