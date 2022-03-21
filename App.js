import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewGameScreen from './components/NewGameScreen.js'
import { AppButton, styles } from './components/StyleSheet.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator   screenOptions={{headerShown: false}}>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="NewGameScreen" component={NewGameScreen} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
        <AppButton 
          onPress={() =>  navigation.navigate('NewGameScreen')}
          title="New Game"
        />
        <View style={{marginVertical: 10}} />
        <AppButton
          onPress={() => ""}
          title="History"
        />
      </View>
  )
}
