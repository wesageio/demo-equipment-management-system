import React, { useEffect } from 'react';
import { useForm } from 'react-final-form';
import { TextInput } from 'react-admin';

const LocationInput = ({ label, source }) => {
    const [place, setPLaceSearch] = React.useState(null);
    const form = useForm();

    useEffect(() => {
        const placeModule = placeSearch({
            key: process.env.LOCATION_KEY,
            container: document.querySelector('#search')
        });
        setPLaceSearch(placeModule);
    }, [])
    place && place.on('change', (e) => {
        document.querySelector('#search').value = e.result.value || '';
        form.change(source, e.result.value);
    })

    return (
        <TextInput id="search" source={source} label={label} fullWidth />
    );
};

export default LocationInput;