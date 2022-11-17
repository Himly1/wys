import {View } from 'react-native';
import React, {useReducer} from 'react';
import WorkingMode from './workingMode';
import ExploringMode from './exploringMode';
import Logo from './logo';
import {Button} from 'native-base'
import { FontAwesome } from '@expo/vector-icons';

import {translate, change, lngOptions, currentLngName} from '../international/language'
import {homePage} from '../international/keyRefs'


function Home() {
    const [states, setStates] = useReducer((p, n) => {
        return {...p, ...n}
    }, {
        //Means current page is on the workingMode
        workingMode: true,
        randomValueRepresentChange: true,
        nameForTheButton: translate(homePage.nameOfWorkingModeButtion)
    })

    function changeMode() {
        setStates({
            workingMode: !states.workingMode,
            nameForTheButton: translate(states.workingMode ? homePage.nameOfWorkingModeButtion: homePage.nameOfExploringModeButton)
        })
    }currentLngName

    return (
        <View style={{height: '100%', width: '100%'}} >
            <Logo/>
            <Button onPress={changeMode}  style={{alignSelf: 'center'}} size='sm' leftIcon={<FontAwesome name="exchange" size={24} color="black" />}>{states.nameForTheButton}</Button>
            <View style={{marginTop: '10%'}}>
               {states.workingMode ? <WorkingMode/> : <ExploringMode/>}
            </View>
        </View>
    )
}

export default Home