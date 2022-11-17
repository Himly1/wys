import { View } from 'react-native';
import React, { useReducer } from 'react';
import WorkingMode from './workingMode';
import ExploringMode from './exploringMode';
import Logo from './logo';
import Settings from './settings';
import { Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';

import { translate, change, lngOptions, currentLngName } from '../international/language'
import { homePage } from '../international/keyRefs'


function Home() {
    const [states, setStates] = useReducer((p, n) => {
        return { ...p, ...n }
    }, {
        //Means current page is on 
        setpOfMode: 0,
        randomValueRepresentChange: true,
    })

    const modes = [
        [
            homePage.nameOfWorkingModeButtion,
            <WorkingMode/>
        ],
        [
            homePage.nameOfExploringModeButton,
            <ExploringMode/>
        ],
        [
            homePage.nameOfSettingsModeButton,
            <Settings onLngChange={() => {
                setStates({
                    randomValueRepresentChange: !states.randomValueRepresentChange
                })
            }}/>
        ]
    ]

    function changeMode() {
        const max = modes.length - 1
        const nextMode = states.setpOfMode === max ? 0 : states.setpOfMode + 1
        setStates({
            setpOfMode: nextMode
        })
    }

    return (
        <View style={{ height: '100%', width: '100%' }} >
            <Logo />
            <Button onPress={changeMode} style={{ alignSelf: 'center' }} size='sm' leftIcon={<FontAwesome name="exchange" size={24} color="black" />}>{translate(modes[states.setpOfMode][0])}</Button>
            <View style={{ marginTop: '10%' }}>
               {modes[states.setpOfMode][1]}
            </View>
        </View>
    )
}

export default Home