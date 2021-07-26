import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
    rootTable: {
        "& .MuiTableRow-head .MuiTableCell-head": {
            padding: '5px',
            textAlign: 'center',
        },
        "& .datagrid-body .MuiTableCell-sizeSmall": {
            padding: '1px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            maxWidth: '65px',
            borderLeft: 'unset',
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
    listBlock: {
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
    nameHeaderClassArray: {
        flexDirection: 'column',
        padding: '0 5px 0 0',
        margin: '0',
        '& a': {
            height: '30px',
            textAlign: 'center',
            margin: '5px 0',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        '& a:visited': {
            color: 'unset',
        },
        '& p': {
            whiteSpace: 'nowrap',
            width: '70px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            margin: '0',
        }
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
    createForm: {
        color: 'red',
        "& .MuiCardContent-root": {
            "& .MuiPaper-root": {
                width: "auto",
                boxShadow: "unset",
            }
        }
    },
});