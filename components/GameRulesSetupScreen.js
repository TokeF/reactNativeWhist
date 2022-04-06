import { View, Text } from 'react-native';
import { AppButton, styles } from './StyleSheet.js';

export default function GameRulesSetupScreen({route, navigation}) 
{
    return (
        <View style = {styles.container}>
            {console.log(route.params.paramKey)}
            <AppButton onPress={() => navigation.navigate('Game', {paramKey: route.params.paramKey})} title = "Next" />
        </View>
    )
}