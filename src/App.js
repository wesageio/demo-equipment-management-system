import React, { useEffect } from 'react';
import { Admin, Resource, defaultTheme } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import { Dialog } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import Dashboard from './pages/dashboard/Dashboard';
import { EmployeesList, EmployeesEdit, EmployeesCreate } from './pages/employees';
import { PropertiesList, PropertiesCreate, PropertiesEdit } from './pages/Properties';
import { OrganizationsList, OrganizationsCreate, OrganizationsEdit } from './pages/Organizations';
import { SettingsEdit } from './pages/settings';
import NavBarLayout from './components/Navigation/NavBarLayout';

import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';

import { initiateSocket } from './utils/connectGateway';
import reducer from './store/reducer';


const theme = createMuiTheme({
    ...defaultTheme,
    sidebar: {
        width: 0,
        closedWidth: 0,
    },
});

const i18nProvider = polyglotI18nProvider(() =>
    englishMessages,
'en',
{ allowMissing: true }
);

const App = () => {
    useEffect(() => {
        initiateSocket();
    }, []);

    return (
        <Admin
            customReducers={{ customReducer: reducer }}
            theme={theme}
            layout={NavBarLayout}
            i18nProvider={i18nProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            dashboard={Dashboard}
        >
            <Dialog open={false} BackdropProps={{ style: { backgroundColor: 'transparent' } }} />
            <Resource
                options={{ label: 'Employees' }}
                name='employees'
                list={EmployeesList}
                edit={EmployeesEdit}
                create={EmployeesCreate}
            />
            <Resource name="properties"
                options={{ label: 'Equipments' }}
                list={PropertiesList}
                create={PropertiesCreate}
                edit={PropertiesEdit}
            />
            <Resource name="organizations"
                list={OrganizationsList}
                create={OrganizationsCreate}
                edit={OrganizationsEdit}
            />
            <Resource name="settings"
                list={SettingsEdit}
            />
        </Admin>
    )
};
export default App;
