import React, {Component} from 'react';
import {RecipeItem} from "./";
import {AntButton, DataEmpty, Loading} from "@layouts";
import {Col, Row} from 'antd';
import {Link} from "react-router-dom";

class UserRecipes extends Component {
    render() {
        const {title, listRecipe, loading, callBackRefresh} = this.props

        let listRecipeData = listRecipe.recipe ?? []
        return (
            <div className="recipe-carousel">
                <div className="title">
                    {title}
                </div>
                <div className="btn-add">
                    <Link to={"/recipe/add"}>
                        <AntButton type="dashed">
                            Thêm công thức mới
                        </AntButton>
                    </Link>
                </div>
                <div className="recipe-list">
                    <Row gutter={12}>
                        {
                            loading ? <Loading/> : null
                        }
                        {
                            loading === false && listRecipeData.length === 0 ?
                                <DataEmpty title="Không có công thức."/> : null
                        }
                        {
                            (listRecipeData.length ?
                                listRecipeData.map((recipe, i) => {
                                    return (
                                        <Col span={6} key={i}>
                                            <RecipeItem
                                                callBackRefresh={callBackRefresh}
                                                recipe={recipe}/>
                                        </Col>
                                    )
                                }) : null)
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default UserRecipes;