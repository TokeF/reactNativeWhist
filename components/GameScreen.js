import { View, Button, Text, FlatList } from 'react-native';
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import react from 'react';
import { DataTable } from 'react-native-paper';

export default function GameScreen(){

    const meldinger = [
        {label: 'Alm.', value: 'alm'},
        {label: 'Vip', value: 'vip'},
        {label: 'Halve', value: 'halve'},
        {label: 'Sang', value: 'sang'},
        {label: 'Gode', value: 'gode'},
        {label: 'Sol', value: 'sol'},
        {label: 'Ren Sol', value: 'rsol'},
        {label: 'Bordlægger', value: 'bord'}];
        
    const tricks = [
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'}];
    
    const names = ["Hans", "Toke", "Lars", "Peter"]
    const initialPlayers = {}
    names.map((name) => initialPlayers[name] = new Player(name))
    const nameDrop = []
    names.map((name) => nameDrop.push({label: name, value: name}))

    const [value, setValue] = React.useState("alm");
    const [trickValue, setTrick] = React.useState('8');
    const [caller, setCaller] = React.useState(names[0]);
    const [partner, setPartner] = React.useState(names[1]);
    const [history, setHistory] = React.useState([]);
    const [players, setPlayers] = React.useState(initialPlayers);

    function handleOnPress(){
        const newBet = new Bet(value, trickValue, "caller", "partner");
        // this.state.players[0].score += 1
        setHistory(history.concat([newBet]))
        const updatedPlayers = {...players}
        updatedPlayers["Hans"].score +=1
        setPlayers(updatedPlayers)
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 80 }}>
                <Picker default = 'alm' inputItems = {meldinger} setValue={setValue} value={value}/>
                <Picker default = '8' inputItems = {tricks} setValue={setTrick} value={trickValue} />
                <Picker default = {names[0]} inputItems = {nameDrop} setValue={setCaller} value={caller} />
                <Picker default = {names[1]} inputItems = {nameDrop} setValue={setPartner} value={partner} />
            </View>
            <Button 
                onPress={() => handleOnPress()}
                title = "Add play"
            />
            <Text>hello {value}</Text>
            <Text>YOYO {trickValue}</Text>
            <ScoreTable players = {players}/>
            <FlatList 
                data={history}
                // keyExtractor = {(item, index) => index.toString}
                renderItem = { (h) => {
                    return(
                        <Text>{h.item.toString()}</Text>
                    )
                }}
            />
        </View>
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
                    <div key = {key}>
                        {
                            Object.entries(value).map(([k, v]) => {
                                return(
                                    <DataTable.Row key = {k}>
                                        <DataTable.Cell>{v.name}</DataTable.Cell>
                                        <DataTable.Cell numeric>{v.score}</DataTable.Cell>
                                        <DataTable.Cell numeric>{v.score}</DataTable.Cell>
                                    </DataTable.Row>
                                    )                
                                })
                        }
                    </div>
                )             
            })
        }
        </DataTable>
    );
}

function TableEntry(){

}


class Player {
    constructor(name){this.name = name, this.score = 0}
}

class Bet {
    constructor(melding, trick, caller, partner) { 
        this.melding = melding,
        this.trick = trick,
        this.caller = caller,
        this.partner = partner
    }
    toString() {
        return `${this.trick} ${this.melding} ${this.caller} ${this.partner}`;
    }
} 


const Picker = (props) => {
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState(props.inputItems);

    return (
        <View style={{ width: 100 }}>
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