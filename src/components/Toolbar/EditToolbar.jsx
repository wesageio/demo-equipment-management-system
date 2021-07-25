import * as React from 'react';
import {
    SaveButton,
    DeleteWithConfirmButton,
    Toolbar
} from 'react-admin';

export const EditToolbar = (props) => {
    return (
        <Toolbar {...props} style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <SaveButton />
            <DeleteWithConfirmButton
                confirmTitle={
                    `Delete - ${props.record.name ||
                    props.record.firstName + ' ' + props.record.surname}`
                }
            />
        </Toolbar>
    )
};