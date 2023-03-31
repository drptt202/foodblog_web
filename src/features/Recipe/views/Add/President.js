import React, {Component} from 'react';
import {RecipeForm} from "@features/Recipe/components";

class President extends Component {
    render() {
        const {
                  onClickAdd
              } = this.props
        return (
            <div className="features feature-detail">
                <div className="recipe-detail-wrap">
                    <RecipeForm
                        onSubmit={onClickAdd}
                    />
                </div>
            </div>
        );
    }
}

export default President;