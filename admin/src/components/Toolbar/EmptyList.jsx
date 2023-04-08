import * as React from 'react';
import {
    CreateButton, useListContext
} from 'react-admin';
import { Box, Typography } from '@material-ui/core';

import EmptyFile from '../../resources/empty.png';

export const Empty = () => {
    const { basePath } = useListContext();

    return (
        <Box textAlign="center" m={3}>
            <Typography variant="h4" paragraph>
                <img src={EmptyFile} />
            </Typography>
            <CreateButton basePath={basePath} />
        </Box>
    );
};