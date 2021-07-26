import * as React from 'react';
import { Layout } from 'react-admin';
import NavBar from './NavBar';
import { darkTheme, lightTheme } from './themes';
import { useSelector } from 'react-redux';

const NavBarLayout = (props) => {
    const theme = useSelector((state) =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );
    return <Layout {...props} appBar={NavBar} theme={theme} />
};

export default NavBarLayout;