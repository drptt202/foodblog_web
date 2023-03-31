import React, {Component} from 'react';
import {ContentTab, UserLabel} from "@features/User/components";

class President extends Component {
    render() {
        const {
                  user,
                  userFollow,
                  userFollowing,
                  listRecipe,
                  recipeByFollowUser,
                  recipeByFavorite,
                  recipeByUserId,
                  callBackRefresh
              } = this.props

        let userData       = user.user ?? {}
        let countFollowed  = user.countFollowed ?? 0
        let countFollowing = user.countFollowing ?? 0
        return (
            <div className="features feature-self-profile">
                <UserLabel
                    callBackRefresh={callBackRefresh}
                    isPublic={true}
                    user={userData}
                />
                <ContentTab
                    isPublicProfile={true}
                    listRecipe={listRecipe}
                    recipeByFavorite={recipeByFavorite}
                    recipeByFollowUser={recipeByFollowUser}
                    recipeByUserId={recipeByUserId}
                    countFollowed={countFollowed}
                    countFollowing={countFollowing}
                    userFollow={userFollow}
                    userFollowing={userFollowing}
                    callBackRefresh={callBackRefresh}
                />
            </div>
        );
    }
}

export default President;