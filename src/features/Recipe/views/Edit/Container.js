import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipe,
    postRecipe,
    updateRecipe
} from "@features/Recipe/redux/actions";
import {withRouter} from "react-router-dom";
import {getIngredientBySeason} from "@features/Home/redux/actions";
import {reset} from "@common/crud";

class Container extends Component {
    onClickUpdate = (data) => {
        const {id} = this.props.match.params;
        this.props.updateRecipe(id, data)
    }

    render() {
        const {
                  update
              } = this.props.recipe

        return (
            <President
                update={update}
                onClickUpdate={this.onClickUpdate}
            />
        )
    }

    componentWillUnmount() {
        this.props.reset()
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getRecipe(id)
        this.props.getIngredientBySeason()
    }

    componentDidUpdate(prevProps) {
        let currentPostComment = this.props.recipe.postComment
        let prevPostComment    = prevProps.recipe.postComment

        //console.log(currentPostComment)
        //console.log(prevPostComment)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipe: (id) => {
            dispatch(getRecipe(id));
        },

        getIngredientBySeason: () => {
            dispatch(getIngredientBySeason());
        },

        reset: () => {
            dispatch(reset());
        },

        updateRecipe: (id, data) => {
            dispatch(updateRecipe(id, data));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe,
        home  : state.home,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))