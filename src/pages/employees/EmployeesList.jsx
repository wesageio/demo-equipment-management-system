import React, { useEffect, useState } from 'react';
import {
    DateField,
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    TextInput,
    DateInput,
    ReferenceField,
    FunctionField,
    ReferenceInput,
    AutocompleteInput,
    NullableBooleanInput,
    ReferenceArrayField,
    SingleFieldList,
    SelectInput,
} from 'react-admin';
import OfflineIcon from '@material-ui/icons/Cancel';
import OnlineIcon from '@material-ui/icons/CheckCircle';

import { styles } from './EmployeesStyles';
import { RowsPerPage } from '../../components/Pagination/Pagination';
import { Card, CardContent, useMediaQuery } from '@material-ui/core';
import { FilesListView } from '../../components/PreviewFiles/FilesListView';
import { EmployeesMobileList } from './EmployeesMobileList';
import { Empty } from '../../components/Toolbar/EmptyList';
import { ListActions, SearchAll } from '../../components/Toolbar/TopBar';

const ImapAccountFilter = (props) => {
    return (
        <Card className={props.card}>
            <CardContent>
                <Filter {...props}>
                    <TextInput label="First name" source="firstName" alwaysOn />
                    <TextInput label="Surname" source="surname" alwaysOn />
                    <TextInput label="Email" source="email" alwaysOn />
                    <SelectInput label="Gender" source="gender"
                        choices={[
                            { id: 'male', name: 'Male' },
                            { id: 'female', name: 'Female' }
                        ]}
                        alwaysOn
                        emptyText="All"
                    />
                    <DateInput clearalwaysvisible="true" label="Date of birth" source="dateOfBirth" alwaysOn />
                    <NullableBooleanInput
                        falseLabel="No"
                        trueLabel="Yes"
                        options={{
                            SelectProps: { displayEmpty: true },
                            InputLabelProps: { shrink: true }
                        }}
                        nullLabel="All"
                        label="Working status"
                        source="workingStatus"
                        alwaysOn
                    />

                </Filter>
                <p style={{ textAlign: 'center', margin: '0', paddingTop: '10px' }}>Reference fields</p>
                <Filter style={{marginTop: '0'}} {...props}>
                    <ReferenceInput
                        label="Property"
                        source="property"
                        reference="properties"
                        allowEmpty={false}
                        filterToQuery={searchText => ({ q: searchText })}
                        alwaysOn
                    >
                        <AutocompleteInput
                            optionText={(record) => record.name}
                            matchSuggestion={(filterValue, choice) => {
                                if (filterValue) {
                                    return choice.name.toLowerCase().match(filterValue.toLowerCase())
                                }
                            }}
                            resettable={true}
                            clearAlwaysVisible={true}
                        />
                    </ReferenceInput>
                    <ReferenceInput
                        label="Organization"
                        source="organization"
                        reference="organizations"
                        allowEmpty={false}
                        filterToQuery={searchText => ({ q: searchText })}
                        alwaysOn
                    >
                        <AutocompleteInput
                            optionText={(record) => record.name}
                            matchSuggestion={(filterValue, choice) => {
                                if (filterValue) {
                                    return choice.name.toLowerCase().match(filterValue.toLowerCase())
                                }
                            }}
                            resettable={true}
                            clearAlwaysVisible={true}
                        />
                    </ReferenceInput>
                </Filter>
            </CardContent>
        </Card>
    )
};

const AttachmentsField = ({ record }) => {
    return (
        <FilesListView
            record={record}
            showName={true}
        />
    )
};

const DataList = (props) => {
    const { rootTable, svg, active, notActive } = styles();
    return (
        <Datagrid className={rootTable} hasBulkActions={true}>
            <TextField source="firstName" />
            <TextField source="surname" />
            <DateField source="dateOfBirth" />
            <TextField source="email" />
            <TextField source="gender" />
            <ReferenceField
                label="Organization"
                source="organization"
                reference="organizations"
            >
                <FunctionField render={record => `${record.name}`} />
            </ReferenceField>
            <ReferenceArrayField
                label="Property"
                source="property"
                reference="properties"
            >
                <div className="propertyBlock">
                    <SingleFieldList style={{ margin: '0' }} linkType={false}>
                        <AttachmentsField record={props.resource} />
                    </SingleFieldList>
                </div>
            </ReferenceArrayField>
            <FunctionField
                className={svg}
                record={props}
                label="Working Status"
                render={record =>
                    record.workingStatus ?
                        <OnlineIcon titleAccess="Working" className={active} />
                        :
                        <OfflineIcon titleAccess="Not Working" className={notActive} />
                }
            />
            <EditButton label=''
                className={svg}
            />
        </Datagrid>
    )
}

export const EmployeesList = (props) => {
    const { listBlock, card } = styles();
    const [count, setCount] = useState(5);
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    useEffect(async () => {
        const settingsData = JSON.parse(localStorage.getItem('settings'));
        setCount(settingsData ? settingsData.defaultNumberOfEmployees : 25)
    }, []);

    return (
        <List
            aside={!isSmall && <ImapAccountFilter className={card} />}
            className={listBlock}
            filters={<SearchAll style={{ margin: 0, alignItems: 'center' }} />}
            empty={<Empty />}
            actions={<ListActions />}
            perPage={count}
            pagination={<RowsPerPage count={count} />}
            {...props}
        >
            {isSmall ? (
                <EmployeesMobileList {...props} />
            ) : (
                <DataList />)}
        </List>);
};