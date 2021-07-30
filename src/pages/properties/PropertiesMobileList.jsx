import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    EditButton,
    TextField,
    DateField,
    DeleteButton,
    NumberField,
} from 'react-admin';
import { FilesListView } from '../../components/PreviewFiles/FilesListView';


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
        alignItems: 'center',
        "& .file-list": {
            display: 'flex'
        },
        "& .file-list > div > div": {
            height: '20px !important'
        }
    },
    cardTitleContentText: {
        marginRight: '5px',
        fontSize: '20px'
    }
}));

const FilesListField = ({ record }) => {
    return (
        record.attachments && record.attachments.length !== 0 ?
            <FilesListView
                record={record}
                showName={false}
            /> : null
    )
};

export const PropertiesMobileList = ({ ids, data, basePath }) => {
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
                                        <TextField source="name" />
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
                                <span>Category:</span>
                                <TextField
                                    record={data[id]}
                                    source="category"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Description:</span>
                                <TextField record={data[id]} source="description" />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Purchase date:</span>
                                <DateField
                                    record={data[id]}
                                    source="purchaseDate"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Purchase cost:</span>
                                <NumberField
                                    record={data[id]}
                                    source="purchaseCost"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Warranty:</span>
                                <NumberField
                                    record={data[id]}
                                    source="warranty"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <FilesListField label="Attachments" record={data[id]} />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};