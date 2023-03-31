import React, { Component } from 'react';
import President from './President';
import { connect } from 'react-redux';
import { clearToken, getAuthUser } from "@features/Auth/redux/actions";
import { getRecipeByKeyword } from '@src/features/Home/redux/actions';
import {getListRecipeManagement} from "@features/ListRecipe/redux/actions";

class Container extends Component {
    onSearch = (value) => {
        this.props.getRecipeByKeyword(value)
    };
    render() {
        return (<President
            {...this.props}
            common={this.props.common}
            handleToggleSider={this.props.toggleSider}
            handleLogout={this.props.clearToken}
            onSearch={this.onSearch}
        />)
    }

    componentDidMount() {
        this.props.getAuthUser()
        this.props.getListRecipeManagement()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAuthUser: () => {
            dispatch(getAuthUser());
        },
        clearToken: () => {
            dispatch(clearToken());
        },
        getRecipeByKeyword: (keyword) => {
            dispatch(getRecipeByKeyword(keyword));
        },

        getListRecipeManagement: (userId) => {
            dispatch(getListRecipeManagement(userId));
        },
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        auth: state.auth,
        common: state.common,
        home: state.home
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)