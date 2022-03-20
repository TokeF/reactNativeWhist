import React from 'react'
import { StyleSheet, SafeAreaView, TextInput, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign} from '@expo/vector-icons'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator   screenOptions={{headerShown: false}}>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Details" component={DetailsScreen} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
        <AppButton 
          onPress={() =>  navigation.navigate('Details')}
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

const DetailsScreen = () => {
	// this will be attached with each input onChangeText
  const [textValue, setTextValue] = React.useState(''); 
	// our number of inputs, we can add the length or decrease the length
  const [numInputs, setNumInputs] = React.useState(1);
  // all our input fields are tracked with this array
  //const refInputs = React.useRef<[6]>([textValue]); 

  const inputs = []
  for (let i = 0; i < 5; i ++)
{
  inputs.push(
    <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text>{i + 1}.</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setInputValue(i, value)}
        //value={refInputs.current[i]}
        placeholder="placeholder"
      />
      {/* To remove the input */}
      <AppButton onPress={() => removeInput(i)} style={{marginLeft: 5}}>
        <AntDesign name="minuscircleo" size={20} color="red" />
      </AppButton>
    </View>
  );
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
			{inputs}
			<AppButton onPress={addInput} style={styles.addButton}>
				<Text style={{color: 'white', fontWeight: 'bold'}}>+ Add a new input</Text>
			</AppButton>
			<View style={{ marginTop: 25 }}>
				<Text>You have answered:</Text>
{/* 				{refInputs.current.map((value, i) => {
					return <Text key={i} style={styles.answer}>{`${i+ 1} - ${value}`}</Text>
				})}  */}
			</View>
		</ScrollView>
  );
};

function addInput () {}

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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
