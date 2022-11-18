import { Box, Select, Text } from "native-base"
import { translate, currentLngName, lngOptions, change } from '../international/language'
import { settingsPage } from '../international/keyRefs'
import { useReducer } from "react"
import { FontAwesome } from '@expo/vector-icons';

function Settings({ onLngChange }) {

    const [states, setStates] = useReducer((p, n) => {
        return { ...p, ...n }
    }, {
        randomValueRepresentChange: false
    })

    function renderOptions() {
        return lngOptions().reduce((rs, option) => {
            rs.push(<Select.Item key={option} label={option} value={option} />)
            return rs
        }, [])
    }

    function lngChanged(value) {
        change(value)
        onLngChange()
        setStates({
            randomValueRepresentChange: !states.randomValueRepresentChange
        })
    }

    return (
        <Box>
            <Text color={'white'} style={{ alignSelf: 'center'}}>{translate(settingsPage.labelOfLanguage)}</Text>
            <Box alignSelf={'center'} style={{ width: '50%' }}>
                <Select dropdownIcon={<FontAwesome name="language" size={24} color="black" />} onValueChange={lngChanged} style={{ width: '40%', alignSelf: 'center' }} selectedValue={currentLngName()}>
                    {renderOptions()}
                </Select>
            </Box>
        </Box>
    )
}

export default Settings