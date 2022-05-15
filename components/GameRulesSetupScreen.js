import { View, Text } from 'react-native';
import { AppButton, styles } from './StyleSheet.js';
import {getData, setData} from './PersistentStorage.js'

export default function GameRulesSetupScreen({route, navigation}) 
{
    return (
        <View style = {styles.container}>
            <AppButton onPress={() => navigation.navigate('Game', {paramKey: route.params.paramKey})} title = "Next" />
            <AppButton onPress={() => console.log(getData("1"))} title = "GetData" />
        </View>
    )
}
