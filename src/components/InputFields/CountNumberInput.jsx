import * as React from 'react';
import {
    TextInput, required
} from 'react-admin';

export const CountNumberInput = ({label, source, requiredField}) => {
    return (
        <TextInput 
            fullWidth
            parse={value => isNaN(Number(value)) ? null : Number(value)}
            label={label}
            validate={requiredField && [required()]}
            source={source}
        />
    )
}