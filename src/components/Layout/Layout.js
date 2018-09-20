import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxs from '../../hoc/Auxs';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer : false});
    }

    toggleClickHandler = () => {
        this.setState({showSideDrawer : !this.state.showSideDrawer});
    }

    render() {
        return (
            <Auxs>
                <Toolbar 
                    isAdmin= {this.props.isAdmin}
                    isAuth= {this.props.isAuthenticated}
                    toggleClick={this.toggleClickHandler}/>
                <SideDrawer 
                    isAdmin= {this.props.isAdmin}
                    isAuth= {this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxs>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isAdmin: state.auth.isAdmin
    }    
}

export default connect(mapStateToProps)(Layout);