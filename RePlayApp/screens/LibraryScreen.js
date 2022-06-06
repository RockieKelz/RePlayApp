import React, { useEffect, useState } from "react";
import { TouchableOpacity, Button, FlatList, StyleSheet, View, Text, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import Header from '../components/Header';


const LibraryScreen= ({navigation}) => {
  useEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
  },[])
  const onPress = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={['#adff2f', '#00ffff', '#00bfff', '#0000cd','#4b0082','#800080']}
          start={{x:-0.1, y:0.2}}
          end={{x:1, y:1}}
          locations={[0.01,0.2,0.3,1,1,1]} >
          <Header />
        </LinearGradient>
        <View style={{paddingTop: 50, justifyContent:'center', flex:1}}>
          <View style={{justifyContent:'center',  flexDirection: 'row', flex:1}}>
          <TouchableOpacity onPress={onPress} style={styles.button} alignItems='center'>
            <Text style={styles.buttonText}>Artists</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Albums</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Paylists</Text>
          </TouchableOpacity>
          </View>
          <View>
            <Text style = {{paddingTop:50, paddingLeft:15, fontSize: 18,
                  fontWeight:"bold", justifyContent:'center', flex:1}}>Library List View</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
  export default LibraryScreen

  const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    subContainer:{
      paddingRight: 15,
      paddingLeft: 15
    },
    button: {
      backgroundColor: 'rgba(8, 148, 289, 1)',
      padding: 18,
      borderRadius: 10,
      marginBottom: 10,
      marginHorizontal: 15
    },
    buttonText: {
      color: "white",
      alignItems:'center',
      fontSize: 18,
      fontWeight:"bold",
    },
  })