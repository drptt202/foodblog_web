import React, {Component} from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import {Card} from "antd";
import helpers from "@ultis/helpers";
import {withRouter} from "react-router-dom";

class ListRecipeItem extends Component {

    /**
     * Redirect to detail page
     */
    redirectToDetail = () => {
        this.props.history.push(`/list-recipe/${this.props.listRecipe.recipeListId}/edit`)
    }

    render() {
        const listRecipe = this.props.listRecipe;
        return (
            <Card
                className="card-recipe"
                hoverable
                cover={
                    <img
                        alt=""
                        src={helpers.generateFullImage(listRecipe.image) ?? recipeImgDefault}
                    />
                }
                onClick={this.redirectToDetail}
            >
                <div className="mask-card">
                    <div className="mark-title">
                        {listRecipe.name}
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ListRecipeItem)