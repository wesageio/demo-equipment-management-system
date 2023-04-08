import * as React from 'react';
import {
    Edit,
    NumberInput,
    SimpleForm,
    TextInput,
    FormDataConsumer
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';

import { styles } from './OrganizationsStyles';
import BackButton from '../../components/BackButton';
// import LocationInput from '../../components/InputFields/LocationInput';
import { WebSiteInput } from '../../components/InputFields/WebSiteInput';
import { EditToolbar } from '../../components/Toolbar/EditToolbar';
import { CountNumberInput } from '../../components/InputFields/CountNumberInput';
import { PhoneNumberInput } from '../../components/InputFields/PhoneNumberInput';
import { formatText } from '../../utils/utils';
import { useForm } from 'react-final-form';


export const OrganizationsEdit = props => {
    const classes = styles();

    const MarginInput = () => {
        const form = useForm();
        const formData = form.getState().values;
        let totalMargin;
        let marginValue;
        if (formData.price != null && formData.cost != null && formData.risk != null) {
            marginValue = formData.price - formData.cost + (formData.cost * formData.risk) / 100;
        } else {
            marginValue = '-'
        }
        if (formData.duration && marginValue > 0) {
            totalMargin = marginValue * formData.duration;
        } else {
            totalMargin = '-'
        }
        formData.margin = marginValue;
        formData.totalMargin = totalMargin;
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Margin</label>
                <input disabled name="margin" value={marginValue} type="text" style={{ padding: '10px 5px', fontSize: '18px' }} />
                &nbsp;
                <label>Total Margin</label>
                <input disabled name="totalMargin" value={totalMargin} type="text" style={{ padding: '10px 5px', fontSize: '18px' }} />
            </div>
        )
    };

    return (
        <Edit {...props} undoable={false}>
            <SimpleForm toolbar={<EditToolbar />} redirect="list" className={classes.createForm}>
                <Card>
                    <BackButton>
                        <BackIcon />
                        Back
                    </BackButton>
                    <CardContent>
                        <Box display={{ md: 'block', lg: 'flex' }}>
                            <Box flex={2} style={{ flex: '0 0 50%' }} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                <Typography variant="h6" gutterBottom>
                                    Information
                                </Typography>
                                <Box display={{ xs: 'block', sm: 'flex' }} style={{ flexDirection: 'column' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput format={formatText} required source="name" fullWidth />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                        style={{ marginRight: '0.5em', marginLeft: '0' }}
                                    >
                                        <PhoneNumberInput requiredField label="Telephone" source="telephone" />
                                    </Box>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput required source="email" fullWidth />
                                    </Box>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput required source="location" fullWidth />
                                        {/* <LocationInput label="Location" source="location" /> */}
                                    </Box>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <WebSiteInput requiredField={false} label="Website" source="website" />
                                    </Box>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <CountNumberInput label="Workers" source="workers" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                    <Typography variant="h6" gutterBottom>
                                        Price
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <NumberInput fullWidth source="cost" />
                                            <NumberInput fullWidth source="price" />
                                            <NumberInput fullWidth source="risk" />
                                            <NumberInput fullWidth source="duration" />
                                            <FormDataConsumer>
                                                {() => {
                                                    return (
                                                        <MarginInput {...rest} />
                                                    )
                                                }}
                                            </FormDataConsumer>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </SimpleForm>
        </Edit>
    );
};
