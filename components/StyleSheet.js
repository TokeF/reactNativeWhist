import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer} activeOpacity={0.8}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  
export const styles = StyleSheet.create({
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