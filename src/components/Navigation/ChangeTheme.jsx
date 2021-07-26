import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LightMode from '@material-ui/icons/Brightness7';
import DarkMode from '@material-ui/icons/Brightness4';

import { changeTheme } from './actions';


export const ChangeTheme = () => {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    return theme === 'light' ? (
        <LightMode
            style={{cursor: 'pointer', color: 'white'}}
            onClick={() => dispatch(changeTheme('dark'))}
        />
    ) : (
        <DarkMode
            style={{cursor: 'pointer', color: 'black'}}
            onClick={() => dispatch(changeTheme('light'))}
        />
    );
};