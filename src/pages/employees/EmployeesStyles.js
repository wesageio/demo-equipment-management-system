import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
    rootTable: {
        "& .MuiTableRow-head .MuiTableCell-head": {
            padding: '5px',
            textAlign: 'center',
            border: 'none'
        },
        "& .datagrid-body .MuiTableCell-sizeSmall": {
            padding: '1px',
            border: '1px solid #e0e0e0',
            borderLeft: 'unset',
            textAlign: 'center',
            // maxWidth: '65px',
            overflowWrap: 'break-word',
        },
        "& .datagrid-body .column-property": {
            maxWidth: '200px',
        },
        "& .datagrid-body .MuiTableCell-sizeSmall:last-child": {
            borderRight: 'none',
        },
        "& .MuiToolbar-gutters": {
            justifyContent: 'center'
        },
        // "& .column-property > div": {
        //     display: 'flex',
        //     // alignItems: 'center',
        //     justifyContent: 'center',
        // },
        "& .attachmentList": {
            margin: '0',
            flexDirection: 'column'
            // width: '100%',
            // height: '100%',
        },
        "& .attachmentList > div": {
            width: 'unset',
            height: '100%',
            margin: '5px 0',
            display: 'flex',
            alignItems: 'center',
        },
        "& .attachmentList > div > div": {
            height: 'auto !important',
            width: 'unset !important'
        },
        "& .attachmentList > div > div > img": {
            width: '30px !important',
        }
    },
    card: {
        // padding: '15px 5px',
        "& .filter-field": {
            height: '55px',
            width: '100%',
            display: 'inline-block',
            "& .MuiFormControl-marginDense": {
                width: '100%'
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
    RaTopToolbar: {
        root: {
            backgroundColor: 'red'
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
        textAlign: 'left',
        width: '230px'
    },
    svg: {
        justifyContent: 'center'
    },
    play: {
        backgroundColor: 'transparent',
        border: 'none',
        margin: '0 auto',
        color: '#3f51b5',
        display: 'flex',
        alignItems: 'center',
        padding: '2px 5px',
        fontSize: '0.8125rem',
        outline: 'none',
        cursor: 'pointer',
        '& svg': { color: 'green !important' },
        '&:hover': { 
            backgroundColor: '#f2f1f7',
            borderRadius: '5px'
        }
    },
    pause: {
        backgroundColor: 'transparent',
        border: 'none',
        margin: '0 auto',
        color: '#3f51b5',
        display: 'flex',
        alignItems: 'center',
        padding: '2px 5px',
        fontSize: '0.8125rem',
        outline: 'none',
        cursor: 'pointer',
        '& svg': { color: '#e61616' },
        '&:hover': { 
            backgroundColor: '#f2f1f7',
            borderRadius: '5px'
        }
    },
    active: {
        fill: 'green',
        cursor: 'pointer',
    },
    notActive: {
        fill: 'red',
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
});