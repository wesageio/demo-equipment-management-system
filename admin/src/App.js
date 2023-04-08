import React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import { Dialog } from '@material-ui/core';

import Dashboard from './pages/dashboard/Dashboard';
import { EmployeesList, EmployeesEdit, EmployeesCreate } from './pages/employees';
import { PropertiesList, PropertiesCreate, PropertiesEdit } from './pages/properties';
import { OrganizationsList, OrganizationsCreate, OrganizationsEdit } from './pages/organizations';
import { SettingsEdit } from './pages/settings';
import NavBarLayout from './components/Navigation/NavBarLayout';

import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';

import themeReducer from './store/themeReducer';

const i18nProvider = polyglotI18nProvider(() =>
    englishMessages,
'en',
{ allowMissing: true }
);

const App = () => {
    return (
        <Admin
            customReducers={{ theme: themeReducer }}
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
                options={{ label: 'Properties' }}
                list={PropertiesList}
                create={PropertiesCreate}
                edit={PropertiesEdit}
            />
            <Resource name="organizations"
                options={{ label: 'Projects' }}
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
