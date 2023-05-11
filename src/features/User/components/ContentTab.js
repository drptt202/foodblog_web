import React, { Component } from 'react';
import { Tabs } from "antd";
import { withRouter } from "react-router-dom";
import { RecipeCarousel } from "@features/Home/components/HomePage/components";
import { ListRecipeCarousel } from "./";
import UserList from "@features/User/components/UserList";

class UserLabel extends Component {
    render() {
        return (
            <div className="content-block">
                <Tabs defaultActiveKey="1"
                    items={this.items()}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    items = () => {
        const {
            isPublicProfile,
            listRecipe,
            recipeByFavorite,
            recipeByUserId,
            countFollowed,
            countFollowing,
            userFollow,
            userFollowing,
            callBackRefresh
        } = this.props

        let recipeByUserIdData = recipeByUserId.data ?? {}
        recipeByUserIdData = recipeByUserIdData.recipe ?? []
        return [
            {
                key: '1',
                label: 'Thư viện',
                children: <ListRecipeCarousel
                    isPublicProfile={isPublicProfile}
                    title="Danh sách công thức"
                    listRecipe={listRecipe.data}
                    loading={listRecipe.loading}
                />,
            },
            {
                key: '2',
                label: `Công thức (${recipeByUserIdData ? recipeByUserIdData.length : 0})`,
                children: <RecipeCarousel
                    title="Công thức"
                    callBackRefresh={callBackRefresh}
                    listRecipe={recipeByUserIdData}
                    loading={recipeByUserId.loading}
                />
            },
            {
                key: '3',
                label: `Yêu thích (${recipeByFavorite.data ? recipeByFavorite.data.length : 0})`,
                children: <RecipeCarousel
                    title="Công thức yêu thích"
                    callBackRefresh={callBackRefresh}
                    listRecipe={recipeByFavorite.data}
                    loading={recipeByFavorite.loading}
                />
            },
            {
                key: '4',
                label: `Đang theo dõi (${countFollowing})`,
                children: <UserList
                    callBackRefresh={callBackRefresh}
                    users={userFollowing.data}
                    loading={userFollowing.loading}
                />
            },
            {
                key: '5',
                label: `Người theo dõi (${countFollowed})`,
                children: <UserList
                    callBackRefresh={callBackRefresh}
                    users={userFollow.data}
                    loading={userFollow.loading}
                />
            },
        ];
    }
}

export default withRouter(UserLabel)