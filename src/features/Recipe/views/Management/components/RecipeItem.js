import React, {Component} from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import {Card} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import helpers from "@ultis/helpers";
import {withRouter} from "react-router-dom";
import {Switch} from 'antd';
import {connect} from "react-redux";
import {
    postSwitchRecipeStatus,
} from "@features/Recipe/redux/actions";

class RecipeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: helpers.makeUUID(),
        }
    }

    onChange = (checked) => {
        this.props.postSwitchRecipeStatus(this.state.uuid, this.props.recipe.recipeId)
    };

    /**
     * Redirect to detail page
     */
    redirectToDetail = () => {
        this.props.history.push(`recipe/${this.props.recipe.recipeId}/edit`)
    }

    render() {
        const recipe = this.props.recipe;
        return (
            <Card
                className="card-recipe"
                hoverable
                cover={
                    <img
                        onClick={this.redirectToDetail}
                        alt=""
                        src={helpers.generateFullImage(recipe.image) ?? recipeImgDefault}
                    />
                }
            >
                <div className="recipe-information">
                    <div className="title">
                        {recipe.recipeName ?? ""}
                    </div>
                </div>
                <div className="like-action">
                    <span className="like-icon">
                        {
                            recipe.isFavorite ?
                                <HeartFilled style={{
                                    color: 'red'
                                }}/> : <HeartOutlined style={{
                                    color: 'red'
                                }}/>
                        }
                    </span>
                    <span className="like-number">
                        {recipe.numberOfLikes}
                    </span>
                </div>
                <div className="switch-status">
                    <Switch
                        checked={recipe.status === 'CK'}
                        loading={this.props.recipeReducer.switchRecipeStatus.loading && this.state.uuid === this.props.recipeReducer.switchRecipeStatus.uuid}
                        checkedChildren="Công khai" unCheckedChildren="Riêng tư"
                        onChange={this.onChange}
                    />
                </div>
                <span className="bookmark">
                    {recipe.date.toString().slice(0, 10)}
                </span>
            </Card>
        )
    }

    componentDidUpdate(prevProps) {
        let current = this.props.recipeReducer.switchRecipeStatus
        let prev    = prevProps.recipeReducer.switchRecipeStatus

        let isClick = this.props.recipeReducer.switchRecipeStatus.uuid === this.state.uuid;
        if ((current.data !== prev.data) && current.data === true && isClick) {
            this.props.callBackRefresh()
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postSwitchRecipeStatus: (uuid, recipeId) => {
            dispatch(postSwitchRecipeStatus(uuid, recipeId));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipeReducer: state.recipe,
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeItem))

