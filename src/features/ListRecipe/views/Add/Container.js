import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {withRouter} from "react-router-dom";
import {reset} from "@common/crud";
import {postListRecipe} from "@features/ListRecipe/redux/actions";

class Container extends Component {
    onClickAdd = (data) => {
        this.props.postListRecipe(data)
    }

    render() {
        const {
                  add
              } = this.props.listRecipe

        return (
            <President
                add={add}
                onClickAdd={this.onClickAdd}
            />
        )
    }

    componentWillUnmount() {
        this.props.reset()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentAdd = this.props.listRecipe.add
        let prevAdd = prevProps.listRecipe.add

        if (currentAdd.data !== prevAdd.data){
            this.props.history.push(`/profile`)
        }
    }

    componentDidMount() {
        //
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reset: () => {
            dispatch(reset());
        },

        postListRecipe: (data) => {
            dispatch(postListRecipe(data));
        },
    };
}

function mapStateToProps(state) {
    return {
        listRecipe: state.listRecipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))