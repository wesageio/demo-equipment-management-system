import * as React from 'react';
import {
    TextInput, regex, required,
} from 'react-admin';

export const PhoneNumberInput = ({ label, source, requiredField }) => {
    //eslint-disable-next-line
    const phoneNumberFormat = regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{0,6}$/im,
        'Not valid telephone number (e.g +51622222222)');
    const validatePhone = [requiredField && required("Phone number is required"), phoneNumberFormat];
    return (
        <TextInput
            fullWidth
            label={label}
            parse={value => value.match(/[a-z]/i) ? null : value}
            source={source}
            validate={validatePhone}
        />
    )
}