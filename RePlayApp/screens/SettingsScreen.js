import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, Button } from "react-native";

function SettingsScreen({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View
        //IconComponent={<Icon name="" size={50} />}
        title={item.title}
        onPress={() => console.log(`${item.title} was clicked`)}
      />
    );
  };

  return (
    <Screen>
      <FlatList
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        nestedScrollEnabled={true}
        ListHeaderComponent={
          <View style={styles.profile}>
            <View
              IconComponent={<Icon name="chevron-right" size={50} />}
              title="Username"
              subTitle="View Profile"
              size={28}
            />
          </View>
        }
        ListFooterComponent={
          <View style={styles.btnContainer}>
            <Button
              color="red"
              onPress={() => console.log('Log Out was pressed')}
              title="LOG OUT"
            />
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 110,
    marginTop: 40,
  },
  profile: {
    marginTop: 50,
    marginBottom: 40,
  },
});

export default SettingsScreen;
