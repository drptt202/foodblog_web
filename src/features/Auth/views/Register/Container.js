import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {register} from "@features/Auth/redux/actions";
import {Redirect} from "react-router-dom";

class Container extends Component {
    handleRegister = (data) => {
        this.props.register(data)
    }

    render() {
        const {register} = this.props.auth;
        let data = register.data ?? {}

        if (data.success === true) {
            return (
                <Redirect to={'/login'}/>
            )
        }

        return (<President
            register={register}
            handleRegister={this.handleRegister}/>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => {
            dispatch(register(data));
        },
    };
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)