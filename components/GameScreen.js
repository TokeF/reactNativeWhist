import { View, Pressable, Text, FlatList } from 'react-native';
import React, {useEffect} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable, Button, Dialog, Portal , Provider, Paragraph} from 'react-native-paper';
import { AppButtonCustStyle, styles } from './StyleSheet.js';
import SwitchSelector from "react-native-switch-selector";

export default function GameScreen({route, navigation}){

    const meldinger = [
        {label: 'Alm.', value: 'alm', point: 1},
        {label: 'Vip', value: 'vip', point: 1.5},
        {label: 'Halve', value: 'halve', point: 1.5},
        {label: 'Sang', value: 'sang', point: 1.5},
        {label: 'Gode', value: 'gode', point: 1.5},
        {label: 'Sol', value: 'sol', point: 0.5},
        {label: 'Ren Sol', value: 'rsol', point: 1.5},
        {label: 'Bordlægger', value: 'bord', point: 1.5}];
        
    const maxValues = [
        {label: '0', value: '0'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'}];

    const values = maxValues.slice(7);
    
    const names = Object.values(route.params.paramKey.current)
    
    const initialPlayers = {}
    names.map((name) => initialPlayers[name] = new Player(name))
    const nameDrop = []
    names.map((name) => nameDrop.push({label: name, value: name}))

    const [trick, setTrick] = React.useState("alm");
    const [value, setValue] = React.useState('8');
    const [caller, setCaller] = React.useState(names[0]);
    const [partner, setPartner] = React.useState(names[1]);
    const [history, setHistory] = React.useState([]);
    const [players, setPlayers] = React.useState(initialPlayers);
    const [isWin, setIsWin] = React.useState(1);
    const [visible, setVisible] = React.useState(false);
    const [actualValue, setActualValue] = React.useState(value);
    const [actualValues, setActualValues] = React.useState(values.slice(value-7));

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    function handleOnPress(){
        const updatedPlayers = {...players}
        const points = CalculatePoints(value, trick, actualValue, isWin, meldinger)
        const newBet = new Bet(trick, value, caller, partner, points, actualValue);
        setHistory(history.concat([newBet]))
        updatedPlayers[caller].score += points
        updatedPlayers[partner].score += points
        setPlayers(updatedPlayers)
    }

    return (
        <Provider>
        <View>
            
            
            <View style={{ flexDirection: 'row', marginTop: 80}}>
                <Picker default = 'alm' inputItems = {meldinger} setValue={setTrick} value={trick}/>
                <Picker default = '8' inputItems = {values} setValue={setValue} value={value} />
                <Picker default = {names[0]} inputItems = {nameDrop} setValue={setCaller} value={caller} />
                <Picker default = {names[1]} inputItems = {nameDrop} setValue={setPartner} value={partner} />
            </View>
            
            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog} style={{height: '40%'}}>
                        <Dialog.Title>Actual tricks Won</Dialog.Title>
                        <Dialog.Content>
                            <Picker default = {value} inputItems = {actualValues} setValue={setActualValue} value={actualValue} />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => {hideDialog(); handleOnPress();}}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            
            <SwitchSelector
                options={[
                    { label: "Won", value: 1 },
                    { label: "Lost", value: -1 }
                ]}
                initial={0}
                onPress={value => {
                    setIsWin(value);
                    if(value < 0){
                        
                    }
                    }
                }
            />

            <AppButtonCustStyle
                onPress={() => {
                    if(isWin < 0){
                        setActualValues(maxValues.slice(0,value))
                        setActualValue((value - 1).toString());
                    }
                    else {
                        setActualValues(values.slice(value-7)); 
                        setActualValue(value);
                    }
                    showDialog();}}
                title = "Add Play"
                style = {{backgroundColor: "#009688", paddingVertical: 10, paddingHorizontal: 12}}
            />

            <ScoreTable players = {players}/>
            
            
            <FlatList
                inverted = {true}
                data={history}
                // keyExtractor = {(item, index) => index.toString}
                renderItem = { (h) => {
                    return(
                        <Text>{h.item.toString()}</Text>
                    )
                }}
                contentContainerStyle = {{flexGrow: 0}}
            />
        
        </View>
        </Provider>
    )
}

function ScoreTable(players) {
    
    return (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Score</DataTable.Title>
            <DataTable.Title numeric>Score/Win</DataTable.Title>
          </DataTable.Header>
          {
            Object.entries(players).map(([key, value]) => {
                return(    
                    Object.entries(value).map(([k, v]) => {
                        return(
                            <DataTable.Row key = {k}>
                                <DataTable.Cell>{v.name}</DataTable.Cell>
                                <DataTable.Cell numeric>{v.score}</DataTable.Cell>
                                <DataTable.Cell numeric>{v.score}</DataTable.Cell>
                            </DataTable.Row>
                            )                
                        })                    
                )             
            })
        }
        </DataTable>
    );
}

/* Hvis man går hjem: c^(S-8)*(1+(ST-S)/h)*b*M*N
Hvis man ikke går hjem: c^(S-8)*(-1+ST-S/h)*M*N
Hvor c er en eksponentiel faktor, S er stik meldt, ST er stik taget, b er gå hjem bonus, h er hældningen, M er meldingen og N er en normeringsfaktor. De vigtige faktorer vi her har ændret på er c og h. Vi har øget c så man bliver belønnet for at melde højere, og vi har øget h, så man bliver belønnet mindre for at gå over. */

function CalculatePoints(amtCalled, trick, amtWon, isWin, meldinger){
    const c = 2
    const h = 2
    const n = 1
    const winBonus = 1

    const trickFactor = (meldinger.find(x => x.value == trick)).point

    var point = c ** (amtCalled - 7) * (isWin + (amtWon - amtCalled) / h) * winBonus * trickFactor * n
    console.log("Points: " + point)
    return Math.ceil(point)
}

function MyComponent ({setVisible, visible}) {
 
    return (
      
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={setVisible(false)}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This is simple dialog</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={setVisible(false)}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      
    );
  };


class Player {
    constructor(name){this.name = name, this.score = 0}
}

class Bet {
    constructor(melding, trick, caller, partner, points, actualValue) { 
        this.melding = melding,
        this.trick = trick,
        this.caller = caller,
        this.partner = partner
        this.points = points
        this.actualValue = actualValue
    }
    toString() {
        return `Bet: ${this.trick}, Act: ${this.actualValue} ${this.melding} ${this.caller} ${this.partner} Points: ${this.points} `;
    }
} 


const Picker = (props) => {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState(props.inputItems);

    return (
        <View style={{ width: 100}}>
            <DropDownPicker
                open={open}
                value={props.value}
                items={items}
                setOpen={setOpen}
                setValue={props.setValue}
                setItems={setItems}
            />
        </View>
    )
}