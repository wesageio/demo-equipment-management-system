import * as React from "react";
import {
    FormWithRedirect,
    SaveButton,
    PasswordInput,
    maxLength,
    minLength,
} from 'react-admin';
import { Typography, Box, Toolbar, Card, CardContent } from '@material-ui/core';

import Logo from '../../resources/logo.png';
import { CountNumberInput } from "../../components/InputFields/CountNumberInput";

const checkPass = (value, allValues) => {
    if (value && allValues.newPassword !== allValues.pass) {
        return 'The password confirmation confirmation does not match';
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
                    <Card>
                        <CardContent>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} style={{ flex: '0 0 50%' }} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Change Password
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }} style={{ flexDirection: 'column' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <PasswordInput validate={[minLength(8), maxLength(20)]} label="New Password" source="pass" fullWidth />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                            style={{ marginRight: '0.5em', marginLeft: '0' }}
                                        >
                                            <PasswordInput label="Confirm Password" source="newPassword" validate={checkPass} fullWidth />
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            List data per page
                                        </Typography>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <CountNumberInput requiredField={false} label="Employees per page" source="defaultNumberOfEmployees" />
                                        </Box>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <CountNumberInput requiredField={false} label="Properties per page" source="defaultNumberOfEquipments" />
                                        </Box>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <CountNumberInput requiredField={false} label="Projects per page" source="defaultNumberOfOrganizations" />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display={{ md: 'block', lg: 'flex' }}>
                                    <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                        <Typography variant="h6" gutterBottom>
                                            We are here to help small and medium business
                                            achieve more productivity with less time.
                                            Feel free to explore and modify the data.
                                        </Typography>
                                        <a rel="noreferrer" href="http://wesage.io" target="_blank">
                                            <Box
                                                display={{ xs: 'block', sm: 'flex' }}
                                                justifyContent="center"
                                                style={{
                                                    background: 'linear-gradient(to right, #657573 0%, #61a99e 90%), linear-gradient(to bottom, #489c52 0%, #6f4ceb 50%)'
                                                }}
                                            >
                                                <Box
                                                    display={{ xs: 'block', sm: 'flex' }}
                                                    justifyContent="center"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <img src={Logo} />
                                                </Box>
                                            </Box>
                                        </a>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <SaveButton
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                />
                            </Box>
                        </Toolbar>
                    </Card>
                </form>
            )}
        />
    )
}