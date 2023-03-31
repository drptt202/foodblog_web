import React, { Component } from 'react';
import { ListRecipeForm } from "@features/ListRecipe/components";

class President extends Component {
    render() {
        const {
            onClickAdd
        } = this.props
        return (
            <div className="features feature-detail">
                <div className="recipe-detail-wrap">
                    <ListRecipeForm
                        onSubmit={onClickAdd}
                    />
                </div>
            </div>
        );
    }
}

export default President;