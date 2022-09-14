import React, { useEffect, useState } from 'react';
import { useHistory} from "react-router-dom";
import {
    List,
    Datagrid,
    Filter,
    EditButton,
    NumberField,
    TextField,
    TextInput,
    DateField,
    ReferenceField,
    DateInput,
    FunctionField,
    SelectInput,
} from 'react-admin';
import { Card, CardContent, useMediaQuery } from '@material-ui/core';

import { styles } from './PropertiesStyles';
import { FilesListView } from '../../components/PreviewFiles/FilesListView';
import { RowsPerPage } from '../../components/Pagination/Pagination';
import { PropertiesMobileList } from './PropertiesMobileList';
import { Empty } from '../../components/Toolbar/EmptyList';
import { CountNumberInput } from '../../components/InputFields/CountNumberInput';
import { ListActions, SearchAll } from '../../components/Toolbar/TopBar';

const PropertiesFilter = (props) => (
    <Card className={props.card}>
        <CardContent>
            <Filter {...props}>
                <TextInput label="Code" source="code" alwaysOn />
                <TextInput label="Name" source="name" alwaysOn />
                <TextInput label="Serial number" source="serialNumber" alwaysOn />
                <SelectInput label="Category" source="category"
                    choices={[
                        { id: 'Furniture', name: 'Furniture' },
                        { id: 'Telephone', name: 'Telephone' },
                        { id: 'Laptop', name: 'Laptop' },
                        { id: 'Monitor', name: 'Monitor' },
                        { id: 'PC', name: 'PC' },
                        { id: 'Keyboard', name: 'Keyboard' },
                        { id: 'Mouse', name: 'Mouse' },
                    ]}
                    alwaysOn
                />
                <TextInput label="Description" source="description" alwaysOn />
                <DateInput label="Purchase date" source="purchaseDate" alwaysOn />
                <CountNumberInput label="Warranty (month)" source="warranty" alwaysOn />
                <CountNumberInput label="Purchase cost ($)" source="purchaseCost" alwaysOn />
                <SelectInput source="status"
                    choices={[
                        { id: 'Active', name: 'Active' },
                        { id: 'Reparation', name: 'Reparation' },
                        { id: 'Broken', name: 'Broken' },
                        { id: 'Archived', name: 'Archived' },
                    ]}
                    alwaysOn
                    emptyText="All"
                    emptyValue=""
                />
            </Filter>
        </CardContent>
    </Card>
);

const FilesListField = ({ record }) => {
    return (
        record.attachments && record.attachments.length !== 0 ?
            <FilesListView
                record={record}
                showName={false}
            /> : null
    )
};

const DataList = (props) => {
    const { rootTable } = styles();
    return (
        <Datagrid className={rootTable} hasBulkActions={true}>
            <TextField emptyText='-' source="code" />
            <TextField emptyText='-' source="name" />
            <TextField emptyText='-' source="serialNumber" />
            <TextField emptyText='-' source="category" />
            <TextField emptyText='-' source="description" />
            <DateField emptyText='-' source="purchaseDate" />
            <NumberField emptyText='-' source="purchaseCost" label="Purchase cost ֏"/>
            <NumberField emptyText='-' source="warranty" />
            <FilesListField label="Attachments" record={props.resource} />
            <ReferenceField
                emptyText='-'
                label="Employee"
                source="employee"
                reference="employees"
            >
                <FunctionField render={record => `${record.firstName + ' ' + record.surname}`} />
            </ReferenceField>
            <TextField source="status" />
            <EditButton label='' />
        </Datagrid>
    )
}

export const PropertiesList = (props) => {
    const { listBlock, card } = styles();
    const history = useHistory();
    const { status } = history.location.state || false;
    const [count, setCount] = useState(5);
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    useEffect(async () => {
        const settingsData = JSON.parse(localStorage.getItem('settings'));
        setCount(settingsData ? settingsData.defaultNumberOfEquipments : 25)
    }, []);

    return (
        <List
            {...props}
            aside={!isSmall && <PropertiesFilter className={card} />}
            className={listBlock}
            empty={<Empty />}
            filters={<SearchAll style={{margin: 0, alignItems: 'center'}} />}
            filter={status && { status }}
            actions={<ListActions />}
            perPage={count}
            pagination={<RowsPerPage count={count} />}
        >
            {isSmall ? (
                <PropertiesMobileList {...props} />
            ) : (
                <DataList />)}
        </List>
    );
};
