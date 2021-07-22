import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    EditButton,
    TextField,
    DeleteButton,
} from 'react-admin';


const useListStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        width: 'auto !important',
        display: 'flex',
        flexDirection: 'column !important',
        margin: '1.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: theme.typography.body1,
    cardContentRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '0.5rem 0',
    },
    cardBody: {
        padding: '0 15px',
        display: 'flex',
        flexDirection: 'row !important',
        alignItems: 'center'
    },
    cardTitleContentText: {
        marginRight: '5px',
        fontSize: '20px'
    }
}));

export const OrganizationsMobileList = ({ ids, data, basePath }) => {
    const classes = useListStyles();

    if (!ids || !data || !basePath) {
        return null;
    }

    return (
        <div style={{ margin: '1em', flexDirection: 'row' }}>
            {ids.map(id => {
                return (
                    <Card key={id} className={classes.card}>
                        <CardHeader
                            style={{ padding: '0 15px' }}
                            title={
                                <div className={classes.cardTitleContent}>
                                    <span>
                                        {/* <TextField source="name" />
            <NumberField source="telephone" />
            <NumberField source="email" />
            <TextField source="location" />
            <TextField source="website" />
            <TextField source="workers" /> */}
                                        <TextField
                                            className={classes.cardTitleContentText}
                                            record={data[id]}
                                            source="name"
                                        />
                                    </span>
                                    <div>
                                        <EditButton
                                            resource="employees"
                                            basePath={basePath}
                                            record={data[id]}
                                        />
                                        <DeleteButton
                                            resource="employees"
                                            basePath={basePath}
                                            record={data[id]}
                                        />
                                    </div>
                                </div>
                            }
                        />
                        <CardContent className={classes.cardContent}>
                            <div className={classes.cardBody}>
                                <span>Telephone:</span>
                                <TextField
                                    record={data[id]}
                                    source="telephone"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Location:</span>
                                <TextField record={data[id]} source="location" />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Website:</span>
                                <TextField
                                    record={data[id]}
                                    source="website"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Workers:</span>
                                <TextField
                                    record={data[id]}
                                    source="workers"
                                />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};
