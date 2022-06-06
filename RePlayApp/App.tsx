import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@shopify/restyle";
import TabNavigation from './Navigation/TabNavigation'
import LoginScreen from './screens/LoginScreen'
import { getData } from "./utils/storage"; 
import { theme } from "./components/theme";
import { Provider } from 'react-redux';
import { store } from './reducers';

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <StatusBar  backgroundColor={theme.colors.darkLight} style="dark"/> */}
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
                name="TabNavigation"
                component={TabNavigation}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
