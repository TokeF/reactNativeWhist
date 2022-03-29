import { View, Button } from 'react-native';
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import react from 'react';

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

    const [value, setValue] = React.useState('alm');
    const [history, setHistory] = React.useState("nej")

    return (
        <View style={{ flexDirection: 'row', marginTop: 80 }}>

            <Picker default = 'alm' inputItems = {meldinger} setValue={setValue} value={value}/>
            <Picker default = '8' inputItems = {tricks} />
            <Button onClick={() => setHistory("JA")}>Hejsa</Button>
            <h1>hello {value}</h1>
            <h1>YOYO {history}</h1>
        </View>
    )
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