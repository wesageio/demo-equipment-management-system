import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    EditButton,
    TextField,
    ReferenceField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    DateField,
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

export const EmployeesMobileList = ({ ids, data, basePath }) => {
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
                                        <TextField
                                            className={classes.cardTitleContentText}
                                            record={data[id]}
                                            source="firstName"
                                        />
                                        <TextField
                                            className={classes.cardTitleContentText}
                                            record={data[id]}
                                            source="surname"
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
                                <span>Email:</span>
                                <TextField record={data[id]} source="email" />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Date of birth:</span>
                                <DateField
                                    record={data[id]}
                                    source="dateOfBirth"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Gender:</span>
                                <TextField
                                    record={data[id]}
                                    source="gender"
                                />
                            </div>
                            <div className={classes.cardBody}>
                                <span>Organization:</span>
                                <ReferenceField
                                    reference="organizations"
                                    record={data[id]}
                                    source="organization"
                                >
                                    <TextField source="name" />
                                </ReferenceField>
                            </div>
                            <div className={classes.cardBody}>
                                <span>Equipments:</span>
                                <ReferenceArrayField
                                    reference="properties"
                                    record={data[id]}
                                    source="property"
                                >
                                    <SingleFieldList style={{ margin: '0', flexDirection: 'column' }}>
                                        <ChipField style={{ height: 'auto', margin: '0' }} source="name" />
                                    </SingleFieldList>
                                </ReferenceArrayField>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};
