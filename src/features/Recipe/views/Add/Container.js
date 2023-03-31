import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {getRecipe, postRecipe} from "@features/Recipe/redux/actions";
import {withRouter} from "react-router-dom";
import {getIngredientBySeason} from "@features/Home/redux/actions";
import {reset} from "@common/crud";

class Container extends Component {
    onClickAdd = (data) => {
        this.props.postRecipe(data)
    }

    render() {
        const {
                  add
              } = this.props.recipe

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
        let currentAdd = this.props.recipe.add
        let prevAdd = prevProps.recipe.add

        console.log(prevAdd)
        console.log(currentAdd)
    }

    componentDidMount() {
        this.props.getIngredientBySeason()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reset: () => {
            dispatch(reset());
        },

        getRecipe: (id) => {
            dispatch(getRecipe(id));
        },

        getIngredientBySeason: () => {
            dispatch(getIngredientBySeason());
        },

        postRecipe: (data) => {
            dispatch(postRecipe(data));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))