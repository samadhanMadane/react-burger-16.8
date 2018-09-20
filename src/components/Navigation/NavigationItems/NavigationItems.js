import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {

    let navigationBar = null;

    if(props.isAdmin && props.isAuthenticated) {
        navigationBar = <ul className={classes.NavigationItems}>
                            <NavigationItem link="/admin">Admin</NavigationItem>
                            <NavigationItem link="/orders">Orders</NavigationItem>
                            <NavigationItem link="/logout">Logout</NavigationItem>
                        </ul>
    }
    else if (props.isAuthenticated && !props.isAdmin) {
        navigationBar = <ul className={classes.NavigationItems}>
                            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                            <NavigationItem link="/orders">Orders</NavigationItem>
                            <NavigationItem link="/cart">My Cart</NavigationItem>
                            <NavigationItem link="/logout">Logout</NavigationItem>  
                        </ul>
    }
    else {
        navigationBar = <ul className={classes.NavigationItems}>
                            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                            <NavigationItem link="/auth" exact>Authenticate</NavigationItem>
                        </ul>
    }
    return navigationBar;
};

export default navigationItems;
