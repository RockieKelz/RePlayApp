import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Header = () => {
    return (
        <View style={styles.topCont}>
            <View>
                <Text style={styles.Text}>RePlay</Text>
            </View>
            <View style={styles.iconCont}>
                <MaterialCommunityIcons style = {styles.icon} 
                name="cog-outline" size={30} color="white" />
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
        justifyContent:"space-between"
    },
    Text:{
        color:"white",
        fontSize:22,
        fontWeight:"bold"
    },
    iconCont:{
        flexDirection:"row"
    },
    icon:{
        marginLeft:15
    }
})