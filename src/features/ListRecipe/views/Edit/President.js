import React, { Component } from 'react';
import { ListRecipeForm } from "@features/ListRecipe/components";

class President extends Component {
    render() {
        const {
            id,
            detail,
            onClickUpdate,
            onClickDelete,
        } = this.props
        return (
            <div className="features feature-detail">
                <div className="recipe-detail-wrap">
                    <ListRecipeForm
                        id={id}
                        formData={detail}
                        onSubmit={onClickUpdate}
                        onDelete={onClickDelete}
                    />
                </div>
            </div>
        );
    }
}

export default President;