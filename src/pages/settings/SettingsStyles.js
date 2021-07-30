import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
    nameHeaderClass: {
        color: 'black',
        padding: '5px',
        textAlign: 'center',
    },
    nameCellClass: {
        padding: '5px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        maxWidth: '85px',
        overflowWrap: 'break-word',
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
    }
});