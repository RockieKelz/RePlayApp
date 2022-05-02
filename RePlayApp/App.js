import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import HomeScreen from "./screens/HomeScreen"
import SearchScreen from "./screens/SearchScreen"
import LibraryScreen from "./screens/LibraryScreen"

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = "Home"
        screenOptions={{
          tabBarStyle: { 
            height:65,
            paddingTop:10,
            backgroundColor: "rgb(255, 255, 255)",
            borderTopWidth:0,
          },
          tabBarLabelStyle: {
            marginBotton: 5,
            paddingBotton: 5,
            fontSize: 10,
            fontweight: "bold",
          },
          tabBarActiveTintColor: "white",
        }}>
        <Tab.Screen name ="Search" component={SearchScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="search" color={color} size={30} />
            )
          }} />
        <Tab.Screen name ="Home" component={HomeScreen} 
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            )
          }} />
        <Tab.Screen name ="Library" component={LibraryScreen} 
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="bookmark-music" color={color} size={30} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },tabStyle: {
    opacity: 1,
    width: 'auto',
    marginRight: 2,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    backgroundColor: 'black',
  },
  tab: {
    backgroundColor: 'black',
    paddingRight: 5,
    paddingLeft: 20,
    paddingTop: 20,
    marginTop: 2,
  },
});
