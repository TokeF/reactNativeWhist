import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NewGameScreen} from './components/NewGameScreen.js';
import GameRulesSetupScreen from './components/GameRulesSetupScreen';
import GameScreen from './components/GameScreen';
import { AppButton, styles } from './components/StyleSheet.js';
import {getData, setData} from './components/PersistentStorage.js'

export const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="NewGameScreen" component={NewGameScreen} />
       <Stack.Screen name="Rules" component={GameRulesSetupScreen} />
       <Stack.Screen name="Game" component={GameScreen} />
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
          onPress={() => setData("1", "yy")}
          title="History"
        />
        <AppButton
          onPress={() => GetPersistenData()}
          title="getdata"
        />
      </View>
  )
}


const GetPersistenData = () => {
  console.log("Called get persistent")    
  const data = getData("1")
  
  console.log(data)
  return data
}
