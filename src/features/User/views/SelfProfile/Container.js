import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipeByFavorite,
    getRecipeByFollowUser, getRecipeByUserId,
} from "@features/Home/redux/actions";
import {followUser, getUser, getUserFollow, getUserFollowing, unfollowUser} from "@features/User/redux/actions";
import {reset} from "@common/crud";
import helpers from "@ultis/helpers";
import {getListRecipeManagement} from "@features/ListRecipe/redux/actions";

class Container extends Component {
    callBackRefresh = (userId) => {
        const id = helpers.getAuthUserId();
        this.refreshData(id)
    }

    render() {
        const {
                  recipeByFollowUser,
                  recipeByFavorite,
                  recipeByUserId,
              } = this.props.home
        const {
                  list,
              } = this.props.listRecipe
        const {
                  user,
                  userFollow,
                  userFollowing,
              } = this.props.user

        let userData = user.data ?? {}

        return (
            <President
                callBackRefresh={this.callBackRefresh}
                listRecipe={list}
                recipeByFollowUser={recipeByFollowUser}
                recipeByFavorite={recipeByFavorite}
                recipeByUserId={recipeByUserId}
                user={userData}
                userFollow={userFollow}
                userFollowing={userFollowing}
            />
        )
    }

    componentDidMount() {
        const id = helpers.getAuthUserId();
        this.refreshData(id)
    }

    refreshData = (userId) => {
        this.props.getRecipeByFollowUser();
        this.props.getRecipeByFavorite();
        this.props.getListRecipeManagement(userId);
        this.props.getUser(userId);
        this.props.getUserFollow(userId);
        this.props.getUserFollowing(userId);
        this.props.getRecipeByUserId(userId);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeByFollowUser: () => {
            dispatch(getRecipeByFollowUser());
        },

        getUser: (id) => {
            dispatch(getUser(id));
        },

        getListRecipeManagement: (userId) => {
            dispatch(getListRecipeManagement(userId));
        },

        reset: () => {
            dispatch(reset());
        },

        followUser: (id) => {
            dispatch(followUser(id));
        },

        unfollowUser: (id) => {
            dispatch(unfollowUser(id));
        },

        getUserFollow: (id) => {
            dispatch(getUserFollow(id));
        },

        getUserFollowing: (id) => {
            dispatch(getUserFollowing(id));
        },

        getRecipeByFavorite: () => {
            dispatch(getRecipeByFavorite());
        },

        getRecipeByUserId: (id) => {
            dispatch(getRecipeByUserId(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        home      : state.home,
        auth      : state.auth,
        listRecipe: state.listRecipe,
        user      : state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)