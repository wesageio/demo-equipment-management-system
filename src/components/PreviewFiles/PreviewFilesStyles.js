import { makeStyles } from '@material-ui/core/styles';

export const previewStyles = makeStyles({
    attachmentBlock: {
        display: 'flex',
        flexDirection: 'row !important',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        color: '#2d2d2d',
    },
    viewIcon: {
        objectFit: 'contain',
        width: 'auto',
        height: 'auto',
        maxHeight: '100%',
        maxWidth: '100%',
        cursor: 'pointer',
    },
    imageBlock: {
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    attachmentName: {
        width: '130px',
        color: '#3c8dbc',
        fontSize: '15px',
        textAlign: 'right',
        cursor: 'pointer'
    },
    carouselBlock: {
        position: 'relative',
        "& .MuiDialog-paperFullScreen": {
            backgroundColor: 'transparent',
            boxShadow: 'unset',
            margin: '0',
            height: 'auto'
        },
        "& .alice-carousel__next-btn": {
            textAlign: 'left'
        },
        "& .alice-carousel__dots": {
            marginTop: '15px',
            "& .alice-carousel__dots-item": {
                width: '15px',
                height: '15px'
            },
            "& .alice-carousel__dots-item:not(.__custom).__active": {
                backgroundColor: 'black !important'
            }
        }
    }
});