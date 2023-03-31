import React, { Component } from 'react';
import { connect } from 'react-redux';
import President from './President';
import { withRouter } from "react-router-dom";
import { reset } from "@common/crud";
import { deleteListRecipe, getListRecipe, updateListRecipe } from "@features/ListRecipe/redux/actions";

class Container extends Component {
    onClickUpdate = (data) => {
        const { id } = this.props.match.params;
        this.props.updateListRecipe(id, data)
    }
    
    onClickDelete = () => {
        const { id } = this.props.match.params;
        this.props.deleteListRecipe(id)
    }

    render() {
        const {
            detail,
            update
        } = this.props.listRecipe
        const { id } = this.props.match.params;
        return (
            <President
                id={id}
                detail={detail}
                update={update}
                onClickUpdate={this.onClickUpdate}
                onClickDelete={this.onClickDelete}
            />
        )
    }

    componentWillUnmount() {
        this.props.reset()
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getListRecipe(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentDelete = this.props.listRecipe.delete
        let prevDelete = prevProps.listRecipe.delete

        if (currentDelete.data !== prevDelete.data){
            this.props.history.push(`/profile`)
        }
        //console.log(currentPostComment)
        //console.log(prevPostComment)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListRecipe: (id) => {
            dispatch(getListRecipe(id));
        },

        reset: () => {
            dispatch(reset());
        },

        updateListRecipe: (id, data) => {
            dispatch(updateListRecipe(id, data));
        },

        deleteListRecipe: (id) => {
            dispatch(deleteListRecipe(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        listRecipe: state.listRecipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))