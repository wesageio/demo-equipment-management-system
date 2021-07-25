import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
    rootTable: {
        "& .MuiTableRow-head .MuiTableCell-head": {
            color: 'black',
            padding: '5px',
            textAlign: 'center',
        },
        "& .datagrid-body .MuiTableCell-sizeSmall": {
            padding: '1px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            maxWidth: '65px',
            overflowWrap: 'break-word',
        },
        "& .MuiToolbar-gutters": {
            justifyContent: 'center'
        }
    },
    card: {
        padding: '15px 5px',
        "& .filter-field": {
            width: '100%',
            display: 'inline-block',
            height: '55px',
            "& .MuiFormControl-marginDense": {
                minWidth: '100%'
            }
        }
    },
    listBlock : {
        "& div:nth-child(2)": {
            flexDirection: 'row-reverse',
            "& .MuiPaper-rounded": {
                width: '190px',
                height: '100%',
                marginRight: '10px',
                "& .MuiCardContent-root": {
                    padding: '0',
                    "& .MuiInputBase-marginDense": {
                        flexDirection: 'row',
                        "& input": {
                            fontSize: '15px',
                        }
                    }
                }
            }
        },
    },
    button: {
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        padding: '0 !important'
    },
    editCell: {
        padding: '8px',
        display: 'inline-block'
    },
    editField: {
        textAlign: 'center',
        width: '230px'
    },
    svg: {
        justifyContent: 'center'
    },
    filter: {
        margin: '0',
        '& label': {
            transform: 'unset !important',
            top: '5px',
            left: '5px',
            fontSize: '15px',
        },
        '& input': {
            paddingLeft: '5px',
            fontSize: '15px',
        }
    },
    form: {
        marginTop: '10px',
    },
    test: {
        fill: 'green',
        cursor: 'pointer',
    },
    createForm: {
        color: 'red',
        "& .MuiCardContent-root": {
            "& .MuiPaper-root": {
                width: "auto",
                boxShadow: "unset",
            }
        }
    },
    box: {
        flex: "1 1 0%"
    }
});