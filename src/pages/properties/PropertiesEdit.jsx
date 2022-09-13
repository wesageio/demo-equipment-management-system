import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    DateInput,
    required,
    SelectInput,
} from 'react-admin';
import { Box, Typography, CardContent, Card, useMediaQuery } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';

import { styles } from './PropertiesStyles';
import { FilesCreateEdit } from '../../components/PreviewFiles/FilesCreateEdit';
import { CountNumberInput } from '../../components/InputFields/CountNumberInput';
import BackButton from '../../components/BackButton';
import { EditToolbar } from '../../components/Toolbar/EditToolbar';


export const PropertiesEdit = props => {
    const classes = styles();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
                            <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                <Typography variant="h6" gutterBottom>
                                    Information
                                </Typography>
                                <TextInput required source="name"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                    fullWidth
                                />
                                <TextInput source="serialNumber"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                    fullWidth
                                />
                                <SelectInput source="category"
                                    choices={[
                                        { id: 'Furniture', name: 'Furniture' },
                                        { id: 'Telephone', name: 'Telephone' },
                                        { id: 'Laptop', name: 'Laptop' },
                                        { id: 'Monitor', name: 'Monitor' },
                                        { id: 'PC', name: 'PC' },
                                        { id: 'Keyboard', name: 'Keyboard' },
                                        { id: 'Mouse', name: 'Mouse' },
                                    ]}
                                    optionText="name"
                                    optionValue="id"
                                    validate={[required()]}
                                    fullWidth
                                />
                                <TextInput multiline source="description"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                    fullWidth
                                />
                            </Box>
                            <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                <Typography variant="h6" gutterBottom>
                                    Warranty
                                </Typography>
                                <DateInput source="purchaseDate"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                />
                                <CountNumberInput label="Purchase cost ($)" source="purchaseCost"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                />
                                <CountNumberInput label="Warranty (month)" source="warranty"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                />
                            </Box>
                            <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                <Typography variant="h6" gutterBottom>
                                    Status
                                </Typography>
                                <SelectInput source="status"
                                    choices={[
                                        { id: 'Active', name: 'Active' },
                                        { id: 'Reparation', name: 'Reparation' },
                                        { id: 'Broken', name: 'Broken' },
                                        { id: 'Archived', name: 'Archived' },
                                    ]}
                                    validate={[required()]}
                                    fullWidth
                                />
                            </Box>
                            <ArrayInput source="attachments">
                                <SimpleFormIterator >
                                    <FormDataConsumer>
                                        {({ getSource, scopedFormData }) => {
                                            return (
                                                <FilesCreateEdit record={scopedFormData} source={getSource('path')} />
                                            );
                                        }}
                                    </FormDataConsumer>
                                </SimpleFormIterator>
                            </ArrayInput>
                        </Box>
                    </CardContent>
                </Card>
            </SimpleForm>
        </Edit>
    );
};
