import React, { useEffect, useState } from "react";
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from "../actions/result";
import { StyleSheet, View, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { Feather as Icon } from "@expo/vector-icons";
import { theme, Box, Text } from "../components/theme";
import Header from "../components/Header";
import SearchResult from '../components/SearchResult';
import SearchForm from '../components/SearchForm';

const SearchScreen= ({navigation}) =>  {
  
  useEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
  },[])
  return (
  <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#adff2f', '#00ffff', '#00bfff', '#0000cd','#4b0082','#800080']}
          start={{x:-0.1, y:0.2}}
          end={{x:1, y:1}}
          locations={[0.01,0.2,0.3,1,1,1]} >
          <Header />
        </LinearGradient>
        <View style={{paddingTop: 100, alignItems:'center', 
                          justifyContent:'center', flex:1}}>
          <Box marginVertical="m">
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => 
              <Box
                borderRadius="s"
                paddingHorizontal="m"
                flexDirection="row"
                alignItems="center"
                backgroundColor="text"
              >
              <Icon name="search" color={theme.colors.primary} size={30} />
              <TextInput
                style={styles.searchInput}
                placeholder="Artists, songs, or podcasts"
              />
              </Box> }
           numColumns={2}
            keyExtractor={(item, i) => item.id} 
          />
          </Box>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  searchInput: {
    backgroundColor: theme.colors.text,
    width: "100%",
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  subContainer:{
    paddingRight: 15,
    paddingLeft: 15
  }
});
export default SearchScreen
