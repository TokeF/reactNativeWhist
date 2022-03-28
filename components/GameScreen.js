import { View } from 'react-native';
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import react from 'react';

export default function GameScreen(){

    return (
        <View style={{ flexDirection: 'row', marginTop: 80 }}>
            <Picker default = 'alm' inputItems = {[
                {label: 'Alm.', value: 'alm'},
                {label: 'Vip', value: 'vip'},
                {label: 'Halve', value: 'halve'},
                {label: 'Sang', value: 'sang'},
                {label: 'Gode', value: 'gode'},
                {label: 'Sol', value: 'sol'},
                {label: 'Ren Sol', value: 'rsol'},
                {label: 'Bordlægger', value: 'bord'}
                ]}
            />
            <Picker default = '8' inputItems = {[
                {label: '7', value: '7'},
                {label: '8', value: '8'},
                {label: '9', value: '9'},
                {label: '10', value: '10'},
                {label: '11', value: '11'},
                {label: '12', value: '12'},
                {label: '13', value: '13'}
                ]}
            />

        </View>
    )
}

const Picker = (props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(props.default);
    const [items, setItems] = React.useState(props.inputItems);

    return (
        <View style={{ width: 100 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
        </View>
    )
}