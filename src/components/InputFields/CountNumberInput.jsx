import * as React from 'react';
import {
    TextInput, required
} from 'react-admin';

export const CountNumberInput = ({label, source, requiredField}) => {
    return (
        <TextInput 
            fullWidth
            parse={value => {
                if (value === '') {
                    return 1
                }
                return isNaN(Number(value)) ? 5 : Number(value)}
            }
            label={label}
            validate={requiredField && [required()]}
            source={source}
        />
    )
}