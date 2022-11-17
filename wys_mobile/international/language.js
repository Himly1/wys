import en from './en.json'
import cn from './cn.json'
const lng = {
    en: {
        name: 'English',
        lng: en
    },
    cn: {
        name: '中文',
        lng: cn
    }
}


let defaultCode = 'en'
export function change(name) {
    const code = Object.entries(lng).find(([key, value]) => {
        if(value.name === name) {
            return key
        }
    })[0]
    defaultCode = code
}

export function translate(code) {
    return lng[defaultCode].lng[code]
}

export function lngOptions() {
    return Object.entries(lng).reduce((rs, [key, value]) => {
        rs.push(value.name)
        return rs
    }, [])
}

export function currentLngName() {
    return lng[defaultCode].name
}

export function init(dfCode) {
    defaultCode = dfCode
}

