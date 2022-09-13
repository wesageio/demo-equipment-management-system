import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    DateInput,
    SelectInput,
    required
} from 'react-admin';
import { Box, Typography, Card, CardContent, useMediaQuery } from '@material-ui/core';

import { styles } from './PropertiesStyles';
import { FilesCreateEdit } from '../../components/PreviewFiles/FilesCreateEdit';
import { CountNumberInput } from '../../components/InputFields/CountNumberInput';
import { formatText } from '../../utils/utils';

export const PropertiesCreate = props => {
    const classes = styles();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Create {...props}>
            <SimpleForm redirect="list" className={classes.createForm}>
                <Card>
                    <CardContent>
                        <Box display={{ md: 'block', lg: 'flex' }}>
                            <Box flex={2} mr={{ md: 0, lg: '1em' }} className={classes.box}>
                                <Typography variant="h6" gutterBottom>
                                    Information
                                </Typography>
                                <TextInput format={formatText} required source="name"
                                    className={isSmall ? '' : classes.editField}
                                    formClassName={classes.editCell}
                                    fullWidth
                                />
                                <TextInput format={formatText} source="serialNumber"
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
                                    validate={[required()]}
                                    fullWidth
                                />
                                <TextInput format={formatText} multiline source="description"
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
        </Create>
    );
};
