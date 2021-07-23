import React, { useEffect, useState } from 'react';
import {
    DateField,
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    TextInput,
    CreateButton,
    DateInput,
    ReferenceField,
    TopToolbar,
    useListContext,
    sanitizeListRestProps,
    FunctionField,
    ReferenceInput,
    AutocompleteInput,
    FilterLiveSearch,
    NullableBooleanInput,
    ReferenceArrayField,
    SingleFieldList,
    ChipField
} from 'react-admin';
import OfflineIcon from '@material-ui/icons/Cancel';
import OnlineIcon from '@material-ui/icons/CheckCircle';

import { styles } from './EmployeesStyles';
import ImportButtonCsv from '../../components/ImportCsv';
import { RowsPerPage } from '../../components/Pagination/Pagination';
import { Card, CardContent, useMediaQuery } from '@material-ui/core';
import { FilesListView } from '../../components/PreviewFiles/FilesListView';
import { EmployeesMobileList } from './EmployeesMobileList';

const ListActions = (props) => {
    const {
        className,
        ...rest
    } = props;
    const {
        basePath,
    } = useListContext();

    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            <CreateButton basePath={basePath} />
            <ImportButtonCsv {...props} />
        </TopToolbar>
    );
};

const ImapAccountFilter = (props) => {
    return (
        <Card className={props.card}>
            <CardContent>
                <Filter {...props}>
                    <FilterLiveSearch label="Search All" source="q" alwaysOn />
                    <TextInput label="First name" source="firstName" alwaysOn />
                    <TextInput label="Surname" source="surname" alwaysOn />
                    <TextInput label="Email" source="email" alwaysOn />
                    <DateInput clearalwaysvisible="true" label="Date of birth" source="dateOfBirth" alwaysOn />
                    <ReferenceInput
                        label="Property"
                        source="property"
                        reference="properties"
                        allowEmpty={false}
                        filterToQuery={searchText => ({ name: searchText })}
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
                        filterToQuery={searchText => ({ name: searchText })}
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
            </CardContent>
        </Card>
    )
};

const TagsField = ({ record }) => {
    return (
        record.attachments && record.attachments.length !== 0 &&
        <FilesListView
            attachments={record.attachments}
            list={true}
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
                        <TagsField record={props.resource} />
                    </SingleFieldList>
                    <SingleFieldList style={{ margin: '0' }}>
                        <ChipField
                            style={{
                                background: 'transparent',
                                color: '#3c8dbc',
                                fontSize: '15px'
                            }}
                            source="name"
                        />
                    </SingleFieldList>
                </div>
            </ReferenceArrayField>
            <FunctionField
                className={svg}
                record={props}
                label="Working Status"
                render={record =>
                    record.workingStatus ?
                        <OnlineIcon className={active} />
                        :
                        <OfflineIcon className={notActive} />
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
            empty={false}
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