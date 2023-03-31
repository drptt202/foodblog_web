import React, {Component} from 'react';
import {RecipeForm} from "@features/Recipe/components";

class President extends Component {
    render() {
        const {
                  detail,
                  onClickUpdate
              } = this.props
        return (
            <div className="features feature-detail">
                <div className="recipe-detail-wrap">
                    <RecipeForm
                        formData={detail}
                        onSubmit={onClickUpdate}
                    />
                </div>
            </div>
        );
    }
}

export default President;