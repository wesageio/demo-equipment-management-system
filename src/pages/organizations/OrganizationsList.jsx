import React, { useEffect, useState } from 'react';
import { cloneElement } from 'react';
import {
    List,
    Datagrid,
    TextField,
    Filter,
    TextInput,
    EditButton,
    TopToolbar,
    CreateButton,
    useListContext,
    sanitizeListRestProps,
    NumberField,
    NumberInput,
    FilterLiveSearch,
} from 'react-admin';
import { Card, CardContent, useMediaQuery } from '@material-ui/core';

import { styles } from './OrganizationsStyles';
import ImportButtonCsv from '../../components/ImportCsv';
import { RowsPerPage } from '../../components/Pagination/Pagination';
import { OrganizationsMobileList } from './OrganizationsMobileList';
import { Empty } from '../../components/Toolbar/EmptyList';

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

const OrganizationsFilter = (props) => (
    <Card className={props.card}>
        <CardContent>
            <Filter {...props}>
                <FilterLiveSearch label="Search All" source="q" alwaysOn />
                <TextInput label="Name" source="name" alwaysOn />
                <TextInput label="Telephone" source="telephone" alwaysOn />
                <TextInput label="Email" source="email" alwaysOn />
                <TextInput label="Location" source="location" alwaysOn />
                <TextInput label="Website" source="website" alwaysOn />
                <NumberInput label="Workers" source="workers" alwaysOn />
            </Filter>
        </CardContent>
    </Card>
);

const DataList = () => {
    const { rootTable } = styles();
    return (
        <Datagrid className={rootTable} optimized hasBulkActions={true}>
            <TextField source="name" />
            <NumberField source="telephone" />
            <NumberField source="email" />
            <TextField source="location" />
            <TextField source="website" />
            <TextField source="workers" />
            <EditButton label='' />
        </Datagrid>
    )
}

export const OrganizationsList = (props) => {
    const { listBlock, card } = styles();
    const [count, setCount] = useState(5);
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    useEffect(async () => {
        const settingsData = JSON.parse(localStorage.getItem('settings'));
        setCount(settingsData ? settingsData.defaultNumberOfEmployees : 25)
    }, []);

    return (
        <List
            aside={!isSmall && <OrganizationsFilter className={card} />}
            className={listBlock}
            empty={<Empty />}
            actions={<ListActions />}
            {...props}
            perPage={count}
            pagination={<RowsPerPage count={count} />}
        >
            {isSmall ? (
                <OrganizationsMobileList {...props} />
            ) : (
                <DataList />)}
        </List>
    );
};
