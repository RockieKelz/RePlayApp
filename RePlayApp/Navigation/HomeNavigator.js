import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerStyle: {
              backgroundColor: "blue",
              borderBottomColor: "green",
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "purple",
            },
            headerBackTitleVisible: false,
          }}
        />
        <HomeStack.Screen
          name="AlbumScreen"
          component={AlbumScreen}
          options={{
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: "blue",
              borderBottomColor: "green",
            },
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
