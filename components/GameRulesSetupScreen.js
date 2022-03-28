import { View, Text } from 'react-native';
import { AppButton, styles } from './StyleSheet.js';

export default function GameRulesSetupScreen({navigation}) 
{
    return (
        <View style = {styles.container}>
            <AppButton onPress={() => navigation.navigate('Game')} title = "Next" />
        </View>
    )
}