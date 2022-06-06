import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SettingsScreen  from "../screens/SettingsScreen"

const Header = ({ navigation }) => {
    {/*useEffect(()=>{
        navigation.navigate("Settings", { screen: SettingsScreen})
      },[])*/}
    return (
        <View style={styles.topCont}>
            <View>
                <Text style={styles.Text}>  RePlay</Text>
            </View>
            <View style={styles.iconCont}>
                <MaterialCommunityIcons style = {styles.icon} 
                name="cog-outline" 
                size={30} 
                color="white" 
                onPress={() => navigation}/>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    topCont:{
        flexDirection:"row", 
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent:"space-between"
    },
    Text:{
        color:"white",
        fontSize:32,
        fontWeight:"bold",
        lineHeight: 30,
    },
    iconCont:{
        flexDirection:"row"
    },
    icon:{
        marginLeft:15
    }
})