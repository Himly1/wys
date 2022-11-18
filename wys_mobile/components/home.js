import React, { useReducer } from 'react';
import WorkingMode from './workingMode';
import ExploringMode from './exploringMode';
import Logo from './logo';
import Settings from './settings';
import { Button, Box } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';

import { translate} from '../international/language'
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
        <Box style={{ height: '100%', width: '100%' }} >
            <Logo />
            <Button onPress={changeMode} style={{ alignSelf: 'center', backgroundColor: '#753a88'}}  leftIcon={<FontAwesome name="exchange" size={24} color="black" />}>{translate(modes[states.setpOfMode][0])}</Button>
            <Box style={{ width: '100%', marginTop: '5%' }}>
               {modes[states.setpOfMode][1]}
            </Box>
        </Box>
    )
}

export default Home