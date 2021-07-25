import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';

import { styles } from './OrganizationsStyles';
import BackButton from '../../components/BackButton';
import LocationInput from '../../components/InputFields/LocationInput';
import { WebSiteInput } from '../../components/InputFields/WebSiteInput';
import { EditToolbar } from '../../components/Toolbar/EditToolbar';


export const OrganizationsEdit = props => {
    const classes = styles();

    return (
        <Edit {...props} undoable={false}>
            <SimpleForm toolbar={<EditToolbar />}  redirect="list" className={classes.createForm}>
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
                                        <TextInput required source="name" fullWidth />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                        style={{ marginRight: '0.5em', marginLeft: '0' }}
                                    >
                                        <NumberInput required source="telephone" fullWidth />
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
                                        <LocationInput label="Location" source="location" />
                                    </Box>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <WebSiteInput requiredField={false} label="Website" source="website" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                    <Typography variant="h6" gutterBottom>
                                        Workers
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <NumberInput source="workers" fullWidth />
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
