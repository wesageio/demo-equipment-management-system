import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    NullableBooleanInput,
    required,
    DateInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    AutocompleteInput
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';

import { styles } from './EmployeesStyles';
import BackButton from '../../components/BackButton';

const ImapAccountTitle = ({ record }) => {
    return <span>Imap Account {record ? `"${record.host}"` : ''}</span>;
};

export const EmployeesEdit = props => {
    const classes = styles();

    return (
        <Edit title={<ImapAccountTitle />} undoable={false} {...props}>
            <SimpleForm className={classes.createForm}>
                <Card>
                    <BackButton>
                        <BackIcon />
                        Back
                    </BackButton>
                    <CardContent>
                        <Box display={{ md: 'block', lg: 'flex' }}>
                            <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                <Typography variant="h6" gutterBottom>
                                    Personal information
                                </Typography>
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput required source="firstName"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput required source="surname"
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={1}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <SelectInput source="gender"
                                            choices={[
                                                { id: 'male', name: 'Male' },
                                                { id: 'female', name: 'Female' }
                                            ]}
                                            validate={[required()]}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <DateInput source="dateOfBirth" fullWidth />
                                    </Box>
                                </Box>
                                <TextInput required source="email"
                                    fullWidth
                                />
                                <Typography variant="h6" gutterBottom>
                                    Status
                                </Typography>
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={2}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <NullableBooleanInput source="workingStatus"
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                flex={1}
                                ml={{ xs: 0, lg: '1em' }}
                                mt={{ xs: '1em', lg: 0 }}
                                className={classes.box}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Additional information
                                </Typography>
                                <ReferenceArrayInput
                                    fullWidth label="Property" source="property" reference="properties">
                                    <AutocompleteArrayInput suggestionLimit={5} allowEmpty={false} optionText="name" />
                                </ReferenceArrayInput>
                                <ReferenceInput
                                    fullWidth label="Organization" source="organization" reference="organizations">
                                    <AutocompleteInput resettable={true} allowEmpty={false} optionText="name" />
                                </ReferenceInput>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </SimpleForm>
        </Edit>
    );
};
