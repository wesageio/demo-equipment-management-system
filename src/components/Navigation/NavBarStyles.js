import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
    root: {
        "& .MuiToolbar-dense > button:first-child": {
            display: 'none'
        },
        "& .MuiToolbar-dense, & .MuiToolbar-regular": {
            display: 'flex'
        },
        "& .MuiToolbar-regular > button:first-child": {
            display: 'none'
        },
        "& .nav-menu": {
            display: 'flex',
            marginRight: 'auto',
            marginLeft: '20px',
            "& a:first-child:hover": {
                boxShadow: 'unset !important',
                backgroundColor: 'transparent'
            },
            "& a": {
                textTransform: 'capitalize',
                color: 'white',
                position: 'relative',
                padding: '15px',
            },
            "& a:hover": {
                boxShadow: 'inset 150px 0 0 0 #84adb9',
                transition: '0.3s',
            },
            "& [aria-current]": {
                color: 'black',
            },
            "& .dashboardIcon": {
                padding: '15px',
                "& .MuiListItemIcon-root": {
                    display: 'flex',
                    justifyContent: 'center'
                }
            },
            "& .get-count": {
                background: '#83c567',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: '0',
                top: '1px',
                fontSize: '12px',
            }
        }
    }
});