import * as React from 'react';
import { Layout } from 'react-admin';
import NavBar from './NavBar';

const NavBarLayout = (props) => <Layout {...props} appBar={NavBar} />;

export default NavBarLayout;