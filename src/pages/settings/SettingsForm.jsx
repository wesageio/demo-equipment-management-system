import * as React from "react";
import {
    FormWithRedirect,
    SaveButton,
    NumberInput,
    SelectInput,
    PasswordInput,
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';

const checkPass = (value, allValues) => {
    if (value && allValues.newPassword !== allValues.pass) {
        return 'Must be same';
    } else {
        return null;
    }
};


export const SettingsForm = props => {

    return (
        <FormWithRedirect
            {...props}
            render={formProps => (
                <form>
                    <Box p="1em">
                        <Box display="flex">
                            <Box flex={2} mr="1em">
                                <Typography variant="h6" gutterBottom>Admin Password</Typography>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <PasswordInput label="New Password" source="pass" fullWidth />
                                    </Box>
                                    <Box flex={1} mr="0.5em">
                                        <PasswordInput label="Confirm Password" source="newPassword" validate={checkPass} fullWidth />
                                    </Box>
                                </Box>
                                <Typography variant="h6" gutterBottom>Attachment Size</Typography>
                                <Box display="flex">
                                    <Box flex={1} ml="0.5em">
                                        <NumberInput source="defaultNumberOfEmployees" label="Employees per page" />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <NumberInput source="defaultNumberOfEquipments" label="Equipments per page" />
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <NumberInput source="defaultNumberOfOrganizations" label="Organizations per page" />
                                    </Box>
                                </Box>
                                <Box mt="1em" />
                                <Typography variant="h6" gutterBottom>Panel Status</Typography>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <SelectInput source="panelStatus"
                                            choices={[
                                                { id: 'Online', name: 'Online' },
                                                { id: 'Offline', name: 'Offline' },
                                            ]}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Toolbar>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <SaveButton
                                saving={formProps.saving}
                                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                            />
                        </Box>
                    </Toolbar>
                </form>
            )}
        />)
}