import {FormControl} from '@angular/forms';

export function restrictedWords(words) {
    return (control:FormControl):{[key:string]:any} => {
        if(!words) return null;
        var invalidWords = words.map(w => {
            if(control.value.includes(w)) return w;
            else null
        }).filter(w => w!=null);

        return (invalidWords && invalidWords.length>0)?{'restrictedWords':invalidWords.join(', ')}:null
    }
    }