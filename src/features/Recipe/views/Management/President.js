import React, {Component} from 'react';
import {UserRecipes} from "./components";

class President extends Component {
    render() {
        const {
                  list,
                  callBackRefresh
              } = this.props

        return (
            <div className="features feature-management">
                <UserRecipes
                    title="Quản lý công thức"
                    listRecipe={list.data}
                    loading={list.loading}
                    callBackRefresh={callBackRefresh}
                />
            </div>
        );
    }
}

export default President;