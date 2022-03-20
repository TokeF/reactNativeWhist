import React from 'react'
import { StyleSheet, Button, Text, View, Alert, TouchableOpacity } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>

      <AppButton 
        onPress={() => this.props.navigation.navigate('NewGameScreen')}
        title="New Game"
      />
      <View style={{marginVertical: 10}} />
      <AppButton
        onPress={() => ""}
        title="History"
      />

    </View>
    
  );
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer} activeOpacity={0.8}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  appButtonContainer: {
    elevation: 8,
    justifyContent: 'center',
    width: '40%',
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
