import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    NullableBooleanInput,
    required,
    DateInput,
    ReferenceArrayInput,
    AutocompleteArrayInput,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import { styles } from './EmployeesStyles';
import { formatText } from '../../utils/utils';

export const EmployeesCreate = props => {
    const classes = styles();

    const optionRenderer = choice => `${choice.name} - ${choice.code}`;

    return (
        <Create {...props}>
            <SimpleForm redirect="list" className={classes.createForm}>
                <Card>
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
                                        <TextInput format={formatText} required source="firstName"
                                            fullWidth
                                        />
                                    </Box>
                                    <Box
                                        flex={1}
                                        ml={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <TextInput format={formatText} required source="surname"
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
                                <TextInput format={formatText} required source="email"
                                    fullWidth
                                />
                                <Typography variant="h6" gutterBottom>
                                    Working Status
                                </Typography>
                                <Box display={{ xs: 'block', sm: 'flex' }}>
                                    <Box
                                        flex={2}
                                        mr={{ xs: 0, sm: '0.5em' }}
                                    >
                                        <NullableBooleanInput
                                            label="Status"
                                            source="workingStatus"
                                            fullWidth
                                            nullLabel="None"
                                            trueLabel="Working"
                                            falseLabel="Not working"
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
                                <ReferenceArrayInput filter={{ employee: null }} allowEmpty
                                    fullWidth label="Properties" source="property" reference="properties">
                                    <AutocompleteArrayInput suggestionLimit={5} allowEmpty={false} optionText={optionRenderer}/>
                                </ReferenceArrayInput>
                                <ReferenceArrayInput allowEmpty
                                    fullWidth label="Project" source="organization" reference="organizations">
                                    <AutocompleteArrayInput suggestionLimit={5} allowEmpty={false} optionText="name" />
                                </ReferenceArrayInput>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </SimpleForm>
        </Create>
    );
};