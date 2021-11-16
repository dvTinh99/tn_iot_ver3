import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home'
import Detail from '../screens/Detail'
import ChartScreen from '../screens/ChartScreen'
import Control from '../screens/Control'
import HomeIcon from '../Images/feather/home.svg'
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
                
                // style : {
                //     height:65,
                //     justifyContent: 'center',
                //     paddingVertical:15,
                //     backgroundColor: '#fff',
                //     elevation: 2,
                // },
                tabBarActiveTintColor:'#0c9869',
            }}
        >
            <Tab.Screen
                name="Tổng Quan"
                component={Home}
                options={{
                    title:"Tổng quan",
                    tabBarIcon:({ focused }) => (
                        <TongQuanIcon 
                        style={{ 
                            tintColor: focused ? '#0c9869' : '#000000'
                         }}
                        width={40} 
                        height={30} 
                        />
                    )
                 }}
            />
            <Tab.Screen
                name="Biểu đồ"
                component={ChartScreen}
                options={{ 
                    tabBarLabel:"Biểu Đồ",
                    tabBarIcon:({ focused }) => (
                        <BieuDoIcon style={{ 
                            tintColor: focused ? '#0c9869' : '#000000'
                         }}
                          width={40} 
                          height={30} />
                    )
                 }}
            />

            <Tab.Screen
                name="Điều Khiển"
                component={Control}
                options={{ 
                    tabBarLabel:"Điều khiển",
                    tabBarIcon:({ focused }) => (
                        <ControlIcon style={{ 
                            tintColor: focused ? '#0c9869' : '#000000'
                         }}
                         width={40} 
                         height={30} 
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