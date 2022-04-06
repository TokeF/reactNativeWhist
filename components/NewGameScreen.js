import React from 'react'
import { TextInput, Text, View, ScrollView, Pressable } from 'react-native';
import { AntDesign} from '@expo/vector-icons'
import { AppButton, styles } from './StyleSheet.js';

export function NewGameScreen({navigation}){
	// this will be attached with each input onChangeText
  const [textValue, setTextValue] = React.useState(''); 
	// our number of inputs, we can add the length or decrease the length
  const [numInputs, setNumInputs] = React.useState(1);
  // all our input fields are tracked with this array
  const refInputs = React.useRef([textValue]); 

  const inputs = []
  for (let i = 0; i < numInputs; i ++)
  {
    inputs.push(
      <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{i + 1}.</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="placeholder"
        />
        {/* To remove the input */}
        <Pressable onPress={() => removeInput(i)} style={{marginLeft: 5}}>
          <AntDesign name="minuscircleo" size={20} color="red" />
        </Pressable>
      </View>
    );
  }

  const setInputValue = (index, value) => {
    // first, we are storing input value to refInputs array to track them
    const inputs = refInputs.current;
    inputs[index] = value;
    // we are also setting the text value to the input field onChangeText
    setTextValue(value)
  }

  const addInput = () => {
    // add a new element in our refInputs array
    refInputs.current.push('');
    // increase the number of inputs
    setNumInputs(value => value + 1);
  }

  const removeInput = (i) => {
    // remove from the array by index value
		refInputs.current.splice(i, 1)[0];
    // decrease the number of inputs
		setNumInputs(value => value - 1);
	}

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {inputs}
        <AppButton onPress={addInput} title = "Add new" />
          {console.log(refInputs)}
          {console.log("hej " + refInputs.current)}
          {console.log(typeof refInputs.current[0])}
        
         <AppButton onPress={() => navigation.navigate('Rules', {paramKey: refInputs})} title = "Next" />
	</ScrollView>
  );
};