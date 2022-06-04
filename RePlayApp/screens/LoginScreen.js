
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { storeData } from "../utils/storage";
import { getCurrentUser } from "../reducers/user";
import HomeScreen from "./HomeScreen";

const { width: wWidth, height: wHeight } = Dimensions.get("window");
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'fa3defefdad641c9bc8540d03281e562',
      clientSecret: 'e3c666b77dfd4c0ca891a3682ca05029',
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.1.27:19000/",
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      storeData("@access_token", access_token);
      dispatch(getCurrentUser());
      navigation.navigate("Home", { screen: HomeScreen });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => promptAsync()}>
        <View
          style={{
            backgroundColor: "blue",
            width: wWidth * 0.9,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;


import React from "react";
import { View, Button, Alert, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { storeData } from "../utils/storage";
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from "../redux/slices/user";
import { registerRootComponent } from 'expo'
const { width: wWidth, height: wHeight } = Dimensions.get("window");

/*class App extends React.Component {
  render() {
    return <View />;
  }
}

registerRootComponent(App);*/

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'fa3defefdad641c9bc8540d03281e562',
      clientSecret: 'e3c666b77dfd4c0ca891a3682ca05029',
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.1.27:19000/",
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      storeData("@access_token", access_token);
      dispatch(getCurrentUser());
      navigation.navigate("Home", { screen: "Home" });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => promptAsync()}>
        <View
          style={{
            backgroundColor: "green",
            width: wWidth * 0.9,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default (LoginScreen);

