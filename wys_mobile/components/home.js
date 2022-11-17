import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect, useReducer} from 'react';
import WorkingMode from './workingMode';
import ExploringMode from './exploringMode';
import Logo from './logo';

function Home() {
    const [states, setStates] = useReducer((p, n) => {
        return {...p, ...n}
    }, {
        //Means current page is on the workingMode
        workingMode: true,
    })

    return (
        <View>
            <Logo/>
            {states.workingMode ? <WorkingMode/> : <ExploringMode/>}
        </View>
    )
}

export default Home