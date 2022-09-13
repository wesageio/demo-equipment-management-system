import React from  'react';
import { AppBar } from 'react-admin';

import { styles } from './NavBarStyles';
import { Menu } from './Menu';
import { ChangeTheme } from './ChangeTheme';

const NavBar = props => {
    const { root } = styles();

    return (
        <AppBar {...props} className={root}>
            <Menu />
            {/* <ChangeTheme /> */}
        </AppBar>
    );
};

export default NavBar;