import React from 'react';
import { cloneElement } from 'react';
import {
    Filter,
    TopToolbar,
    CreateButton,
    useListContext,
    sanitizeListRestProps,
    FilterLiveSearch,
} from 'react-admin';

import ImportButtonCsv from '../../components/ImportCsv';

export const ListActions = (props) => {
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

export const SearchAll = (props) => {
    return (
        <Filter {...props}>
            <FilterLiveSearch label="Search All" source="q" alwaysOn />
        </Filter>
    );
}