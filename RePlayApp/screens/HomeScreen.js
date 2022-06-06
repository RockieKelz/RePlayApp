import React, { useEffect, useState } from "react";
import { Animated, Button, FlatList, Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import Header from '../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { PlayListCard } from "../components/PlayList";
import APIKit from "../utils/axiosInterceptor"
import {
  setPlayList,
} from '../actions/result';
import { Box } from "../components/theme";
import { get } from '../utils/api';
const HomeScreen = ({navigation}) => {
  
  useEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
  },[])
  
  
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
        <View style={{position: 'absolute', paddingTop: 100, justifyContent:'center', flex:1}}>
        <Box marginVertical="m">
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => 
              <Box
                borderRadius="s"
                paddingHorizontal="m"
                paddingVertical="xxl"
                flexDirection="row"
                alignItems="center"
              >
                <Text style={{fontSize:25, color: "purple"}}>Recently Played</Text>
    {/*             {cardData.map(dat=>
                  <PlayListCard key={dat.title} title={dat.title}
                  img={dat.img} />)} */}
               </Box>}
          /><FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => 
            <Box
              borderRadius="s"
              paddingHorizontal="m"
              paddingVertical="xxl"
              flexDirection="row"
              alignItems="center"
            >
              <Text style={{fontSize:25, color: "purple"}}>Recommendations</Text>
  {/*             {cardData.map(dat=>
                <PlayListCard key={dat.title} title={dat.title}
                img={dat.img} />)} */}
             </Box>}
        /><FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => 
          <Box
            borderRadius="s"
            paddingHorizontal="m"
            paddingVertical="xxl"
            flexDirection="row"
            alignItems="center"
          >
            <Text style={{fontSize:25, color: "purple"}}>New Music</Text>
{/*             {cardData.map(dat=>
              <PlayListCard key={dat.title} title={dat.title}
              img={dat.img} />)} */}
           </Box>}
      />
          </Box>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

  const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    subContainer:{
      paddingRight: 15,
      paddingLeft: 15
    }
  })