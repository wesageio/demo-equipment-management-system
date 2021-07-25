import React, { useEffect, useState } from 'react';
import { cloneElement } from 'react';
import {
    List,
    Datagrid,
    Filter,
    EditButton,
    TopToolbar,
    CreateButton,
    useListContext,
    sanitizeListRestProps,
    NumberField,
    NumberInput,
    TextField,
    FilterLiveSearch,
    TextInput,
    DateField,
    DateInput,
    SelectInput,
} from 'react-admin';
import { Card, CardContent, useMediaQuery } from '@material-ui/core';

import { styles } from './PropertiesStyles';
import ImportButtonCsv from '../../components/ImportCsv';
import { FilesListView } from '../../components/PreviewFiles/FilesListView';
import { RowsPerPage } from '../../components/Pagination/Pagination';
import { PropertiesMobileList } from './PropertiesMobileList';

const ListActions = (props) => {
    const {
        className,
        filters,
        ...rest
    } = props;
    const {
        resource,
        displayedFilters,
        filterValues,
        basePath,
        showFilter,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <CreateButton basePath={basePath} />
            <ImportButtonCsv {...props} />
        </TopToolbar>
    );
};

const PropertiesFilter = (props) => (
    <Card className={props.card}>
        <CardContent>
            <Filter {...props}>
                <FilterLiveSearch label="Search All" source="q" alwaysOn />
                <TextInput label="Name" source="name" alwaysOn />
                <SelectInput label="Category" source="category"
                    choices={[
                        { id: 'furniture', name: 'Furniture' },
                        { id: 'telephone', name: 'Telephone' },
                        { id: 'laptop', name: 'Laptop' },
                        { id: 'monitor', name: 'Monitor' },
                        { id: 'pc', name: 'PC' },
                        { id: 'keyboard', name: 'Keyboard' },
                        { id: 'mouse', name: 'Mouse' },
                    ]}
                    alwaysOn
                />
                <TextInput label="Description" source="description" alwaysOn />
                <DateInput label="Purchase date" source="purchaseDate" alwaysOn />
                <NumberInput label="Warranty" source="warranty" alwaysOn />
                <NumberInput label="Purchase cost ($)" source="purchaseCost" alwaysOn />
                <SelectInput source="status"
                    choices={[
                        { id: 'active', name: 'Active' },
                        { id: 'reparation', name: 'Reparation' },
                        { id: 'brokenNotFfixable', name: 'Broken - Not fixable' },
                        { id: 'archived', name: 'Archived' },
                    ]}
                    alwaysOn
                />
            </Filter>
        </CardContent>
    </Card>
);

const FilesListField = ({ record }) => {
    return (
        record.attachments && record.attachments.length !== 0 ?
            <FilesListView
                attachments={record.attachments}
                list={true}
            /> : null
    )
};

const DataList = (props) => {
    const { rootTable } = styles();
    return (
        <Datagrid className={rootTable} hasBulkActions={true}>
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="description" />
            <DateField source="purchaseDate" />
            <NumberField source="purchaseCost" />
            <NumberField source="warranty" />
            <FilesListField label="Attachments" record={props.resource} />
            <TextField source="status" />
            <EditButton label='' />
        </Datagrid>
    )
}

export const PropertiesList = (props) => {
    const { listBlock, card } = styles();
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
            empty={false}
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
