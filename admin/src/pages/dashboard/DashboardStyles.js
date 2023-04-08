import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
    box: {
        color: 'white',
        marginTop: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        borderRadius: '10px',
        cursor: 'pointer',
        '& h1': {
            marginBottom: '0'
        },
        '& h3': {
            marginTop: '0'
        }
    },
    subBox: {
        padding: '30px',
        cursor: 'pointer',
        '& h5': {
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    icon: {
        fontSize: '60px'
    },
    info: {
        marginRight: '15px',
    },
    boxUnread: {
        backgroundColor: '#57889c',
    },
    boxSent: {
        backgroundColor: '#fccb66',
    },
    boxFailedSocks: {
        backgroundColor: '#62c481',
    },
    boxFailedUsers: {
        backgroundColor: '#d95042',
    },
    boxStatus: {
        backgroundColor: '#97d4c5',
    },
    boxServer: {
        backgroundColor: '#000000',
    },
    active: {
        fill: 'green',
        cursor: 'pointer',
    },
    notActive: {
        fill: 'red',
        cursor: 'pointer',
    }
});