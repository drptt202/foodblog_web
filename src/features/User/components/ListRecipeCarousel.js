import React, { Component } from 'react';
import { ListRecipeItem } from "./";
import { AntButton, DataEmpty, Loading } from "@layouts";
import { Link } from "react-router-dom";

class ListRecipeCarousel extends Component {
    render() {
        const { title, listRecipe, loading, isPublicProfile, callBackRefresh } = this.props

        return (
            <div className="list-recipe-carousel">
                <div className="title">
                    {title}
                </div>
                {
                    !isPublicProfile ? <div className="btn-add">
                        <Link to={"/list-recipe/add"}>
                            <AntButton type="dashed">
                                Thêm danh sách mới
                            </AntButton>
                        </Link>
                    </div> : null
                }

                <div className="recipe-list">
                    {
                        loading ? <Loading /> : null
                    }
                    {
                        loading === false && listRecipe.length === 0 ? <DataEmpty title="Không có công thức." /> : null
                    }
                    {
                        (listRecipe.length ?
                            listRecipe.map((listRecipe, i) => {
                                return (
                                    <div key={i}>
                                        <ListRecipeItem
                                            listRecipe={listRecipe}
                                        />
                                    </div>
                                )
                            }) : null)
                    }
                </div>
            </div>
        )
    }
}

export default ListRecipeCarousel;