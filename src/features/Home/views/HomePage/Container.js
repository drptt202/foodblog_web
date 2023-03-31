import React, { Component } from 'react';
import { connect } from 'react-redux';
import President from './President';
import {
    getIngredientBySeason,
    getRecipeAll,
    getRecipeByFollowUser, getRecipeByKeyword, getRecipeIngredient,
    getRecipePopular
} from "@features/Home/redux/actions";
import helpers from '@src/ultis/helpers';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientSelected: null,
        }
    }

    /**
     * On select badge
     * @param e
     */
    onSelectedIngredient = (e) => {
        let id = e.currentTarget.dataset.id ?? null
        id = id ? id : null
        let { ingredientSelected } = this.state
        ingredientSelected = ingredientSelected !== id ? id : null
        this.setState({
            ...this.state,
            ingredientSelected: ingredientSelected
        })
        if (ingredientSelected) {
            this.props.getRecipeIngredient(ingredientSelected)
        }
        else {
            this.props.getRecipeAll();
        }
    }

    /**
     * Refresh list recipe by ingredient
     */
    refreshListRecipeByIngredient = () => {
        let { ingredientSelected } = this.state
        if (ingredientSelected) {
            this.props.getRecipeIngredient(ingredientSelected)
        }
        else {
            this.props.getRecipeAll();
        }
    }

    /**
     * Refresh list recipe by ingredient
     */
    callBackRefreshRecipe = () => {
        const id = helpers.getAuthUserId();
        let { ingredientSelected } = this.state
        if (ingredientSelected) {
            this.props.getRecipeIngredient(ingredientSelected)
        }
        else {
            this.props.getRecipeAll();
        }

        this.props.getRecipeByFollowUser();
        this.props.getRecipePopular();

        const {
            recipeBySearch,
        } = this.props.home
        this.props.getRecipeByKeyword(recipeBySearch.keyword);
    }

    render() {
        const {
            ingredientList,
            recipeAll,
            recipeByFollowUser,
            recipeByPopular,
            recipeByIngredient,
            recipeBySearch,
        } = this.props.home

        const { ingredientSelected } = this.state
        return (
            <President
                ingredientList={ingredientList}
                recipeAll={recipeAll}
                recipeByFollowUser={recipeByFollowUser}
                recipeByPopular={recipeByPopular}
                recipeByIngredient={recipeByIngredient}
                recipeBySearch={recipeBySearch}

                ingredientSelected={ingredientSelected}
                onSelectedIngredient={this.onSelectedIngredient}

                callBackRefreshRecipe={this.callBackRefreshRecipe}
            />
        )
    }

    componentDidMount() {
        const id = helpers.getAuthUserId();
        this.props.getIngredientBySeason();
        this.props.getRecipeAll();
        this.props.getRecipeByFollowUser();
        this.props.getRecipePopular();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIngredientBySeason: () => {
            dispatch(getIngredientBySeason());
        },

        getRecipeAll: () => {
            dispatch(getRecipeAll());
        },

        getRecipeByFollowUser: () => {
            dispatch(getRecipeByFollowUser());
        },

        getRecipePopular: () => {
            dispatch(getRecipePopular());
        },

        getRecipeIngredient: (ingredient) => {
            dispatch(getRecipeIngredient(ingredient));
        },
        
        getRecipeByKeyword: (keyword) => {
            dispatch(getRecipeByKeyword(keyword));
        },
    };
}

function mapStateToProps(state) {
    return {
        home: state.home
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)