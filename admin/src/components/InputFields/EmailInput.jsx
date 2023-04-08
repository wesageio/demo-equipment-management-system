import * as React from 'react';
import {
    TextInput, regex, required
} from 'react-admin';

export const EmailInput = ({label, source, requiredField}) => {
    //eslint-disable-next-line
    const emailFormat = regex(/\S+@\S+\.\S+/,'Not valid email address');
    const validateEmail = [requiredField && required("Email is required"), emailFormat];
    return (
        <TextInput 
            fullWidth
            label={label}
            source={source}
            validate={validateEmail} 
        />
    )
}