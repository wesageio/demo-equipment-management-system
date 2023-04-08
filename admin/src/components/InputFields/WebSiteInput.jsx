import * as React from 'react';
import {
    TextInput, regex, required
} from 'react-admin';

export const WebSiteInput = ({label, source, requiredField}) => {
    //eslint-disable-next-line
    const webSiteFormat = regex(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
        'Not valid website url');
    const validateWebSite = [requiredField && required("Website is required"), webSiteFormat];
    return (
        <TextInput 
            fullWidth
            label={label}
            source={source}
            validate={validateWebSite} 
        />
    )
}