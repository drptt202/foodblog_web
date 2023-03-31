import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {getAuthUser, updateAuthUser} from "@features/Auth/redux/actions";

class Container extends Component {

    onUpdateAccount = (value) => {
        value.dateOfBirth = value.dateOfBirth ? value.dateOfBirth.format('YYYY-MM-DD') : null;
        this.props.updateAuthUser(value)
    }

    render() {
        return (
            <President
                onUpdateAccount={this.onUpdateAccount}
            />
        )
    }

    componentDidMount() {
        this.props.getAuthUser()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateAuthUser: (data) => {
            dispatch(updateAuthUser(data));
        },

        getAuthUser: () => {
            dispatch(getAuthUser());
        },
    };
}

function mapStateToProps(state) {
    return {
        home: state.home
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)