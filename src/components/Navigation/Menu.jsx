import React, { useState } from 'react';
import { MenuItemLink, getResources } from 'react-admin';
import { useSelector } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Home';

export const Menu = ({ onMenuClick }) => {
    const resources = useSelector(getResources);
    const [view, setView] = useState(false);

    const handleClick = () => {
        setView(!view)
    }

    //////////////// NOTIFICATION PART ////////////////
    // subscribeToSocket((err, data) => {
    //     if (data) {
    //         dispatch(commentApprove('ADD_COUNT', { 
    //             value: count.value + 1,
    //             resource: data.resource
    //         }))
    //     }
    // });
    // const showValue = (item, count) => {
    //     const title = item.options && item.options.label || item.name;
    //     return (
    //         <>
    //             <span>{title}</span>
    //             {title === count.resource &&
    //             count.value !== 0 &&
    //                 <span className="get-count">{count.value}</span>
    //             }
    //         </>
    //     )
    // }
    ///////////////////////////////////////////////////

    return (
        <div className="nav-menu">
            <>
                <MenuItemLink
                    to={`/`}
                    primaryText=''
                    leftIcon={<DashboardIcon />}
                    className="dashboardIcon"
                    onClick={handleClick}
                />
                <DashboardIcon onClick={handleClick} className="hamburgerDashboardMenu" />
                {view &&
                    <div className="hamburger-menu">
                        {resources.map((item, key) => {
                            return <MenuItemLink
                                to={`/${item.name}`}
                                key={key}
                                primaryText={item.options && item.options.label || item.name}
                                onClick={() => { return onMenuClick, setView(false) }}
                            />

                        })}
                    </div>
                }
                {resources.map((item, key) => {
                    return <MenuItemLink
                        to={`/${item.name}`}
                        key={key}
                        className="resource-links"
                        primaryText={item.options && item.options.label || item.name}
                        onClick={() => { return onMenuClick, setView(false) }}
                    />

                })}
            </>
        </div>
    );
};
