import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from './ar.json'
import en from './en.json'
import fr from './fr.json'

i18n.use(initReactI18next).init({
    compatibilityJSON:'v3',
    lng:'fr',
    resources:{
        en:en, 
        ar:ar,
        fr:fr, 
    },
    react:{
        useSuspense:false,
    },
    interpolation:{
        escapeValue:false,
    }
})

export default i18n