import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRefreshWhenVisible, RefreshIconButton } from 'react-admin';

const useStyles = makeStyles(
    {
        loader: {
            margin: 14,
        },
        loadedIcon: {},
    },
    { name: 'RaLoadingIndicator' }
);

const Switcher = props => {
    const { classes: classesOverride, className, ...rest } = props;
    useRefreshWhenVisible(); // <= comment this line to disable auto-refresh
    const loading = useSelector(state => state.admin.loading > 0);
    const classes = useStyles(props);
    return loading ? (
        <CircularProgress
            className={classNames('app-loader', classes.loader, className)}
            color="inherit"
            size={18}
            thickness={5}
            {...rest}
        />
    ) : (
        <RefreshIconButton className={classes.loadedIcon} />
    );
};

Switcher.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.string,
};

export default Switcher;