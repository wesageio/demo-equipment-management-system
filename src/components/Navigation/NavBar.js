import React from  'react';
import { AppBar } from 'react-admin';

import { styles } from './NavBarStyles';
import { Menu } from './Menu';

const NavBar = props => {
    const { root } = styles();

    return (
        <AppBar {...props} className={root}>
            <Menu />
        </AppBar>
    );
};

export default NavBar;