import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home'
import ChartScreen from '../screens/ChartScreen'
import Control from '../screens/Control'
import TongQuanIcon from '../image/summary.svg'
import BieuDoIcon from '../image/chart.svg'
import ControlIcon from '../image/control.svg'


import {Image} from 'react-native'

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown : false, // this line is very important
                headerStyle: {
                    backgroundColor: '#0c9869',
                },
                headerTintColor:'#fff',
                // labelStyle: { textTransform: "none", fontSize:30},
                // style : {
                //     height:65,
                //     justifyContent: 'center',
                //     paddingVertical:15,
                //     backgroundColor: '#fff',
                //     fontSize:100,
                //     elevation: 2,
                // },
                tabBarActiveTintColor:'#0c9869',
                tabBarLabelStyle: {
                    fontSize: 15,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title:"Home",
                    // style: {fontSize:20},
                    tabBarIcon:({ focused }) => (
                        <TongQuanIcon 
                        style={{ 
                            tintColor: focused ? '#0c9869' : '#575757'
                         }}
                        width={25} 
                        height={25} 
                        />
                    )
                 }}
            />
            <Tab.Screen
                name="Charts"
                component={ChartScreen}
                options={{ 
                    tabBarLabel:"Charts",
                    tabBarIcon:({ focused }) => (
                        <BieuDoIcon style={{ 
                            tintColor: focused ? '#0c9869' : '#575757'
                         }}
                          width={20} 
                          height={20} />
                    )
                 }}
            />

            <Tab.Screen
                name="Control"
                component={Control}
                options={{ 
                    tabBarLabel:"Control",
                    tabBarIcon:({ focused }) => (
                        <ControlIcon style={{ 
                            tintColor: focused ? '#0c9869' : '#575757'
                         }}
                         width={22} 
                         height={22} 
                         />
                    ),
                 }}
            />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();
const screenOptionStyle = {
    // headerShown : false,
}

const HomeStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="home" component={BottomTabNavigator} options={{headerShown:false}} />
            {/* <Stack.Screen name="home" component={BottomTabNavigator} options={{ 
                headerStyle:{
                    backgroundColor : "#009387",
                }
             }} /> */}
            {/* <Stack.Screen name="Detail" component={Detail}/> */}

        </Stack.Navigator>
    )
}

export default HomeStackNavigator;
// export default BottomTabNavigator;