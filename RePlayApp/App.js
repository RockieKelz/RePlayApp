import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './screens/LoginScreen'
import TabNavigation from './Navigation/TabNavigation'
import { ThemeProvider } from "@shopify/restyle";
import { Box, theme, Text } from "./components/theme";
import { Provider, useSelector } from "react-redux";

import { getData } from "./utils/storage"; 

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const user = await getData("@access_token");
    if (!user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };
  return (
    
    <ThemeProvider theme={theme}>
      {
      <StatusBar  backgroundColor={theme.colors.darkLight} style="dark"/> }
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={TabNavigation}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  
  );
}
