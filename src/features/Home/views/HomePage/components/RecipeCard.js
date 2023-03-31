import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import recipeImgDefault from "@images/recipe-default.jpg";
import {Card, Checkbox, Modal} from "antd";
import {HeartOutlined, HeartFilled, FileAddOutlined, LoadingOutlined} from "@ant-design/icons";
import helpers from "@ultis/helpers";
import {connect} from "react-redux";
import {
    addRecipeToList,
    postLikeRecipe,
    postUnlikeRecipe,
    removeRecipeToList
} from '@src/features/Recipe/redux/actions';
import {Loading} from "@layouts";

class RecipeCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid       : helpers.makeUUID(),
            isModalOpen: false
        }
    }

    /**
     * Click like
     */
    onClickLike = () => {
        this.props.postLikeRecipe(this.state.uuid, this.props.recipe.recipeId)
    }

    /**
     * Click unlike
     */
    onClickUnlike = () => {
        this.props.postUnlikeRecipe(this.state.uuid, this.props.recipe.recipeId)
    }

    /**
     * Click add/remove recipe to list
     */
    onChangeCheckbox = (recipeId, recipeListId, e) => {
        let isAdd = e.target.checked
        let uuid  = this.state.uuid
        if (isAdd) {
            this.props.addRecipeToList(uuid, recipeId, recipeListId)
        } else {
            this.props.removeRecipeToList(uuid, recipeId, recipeListId)
        }
    }

    setIsModalOpen = (value) => {
        this.setState({
            ...this.state,
            isModalOpen: value
        })
    }

    showModal    = () => {
        this.setIsModalOpen(true);
    };
    handleOk     = () => {
        this.setIsModalOpen(false);
    };
    handleCancel = () => {
        this.setIsModalOpen(false);
    };

    /**
     * Redirect to detail page
     */
    redirectToDetail = () => {
        this.props.history.push(`/recipe/${this.props.recipe.recipeId}/detail`)
    }

    /**
     * Redirect to profile page
     */
    redirectToProfile = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    render() {
        const recipe = this.props.recipe;
        let user     = recipe.User ?? {}
        let stateId  = this.state.uuid

        let {
                likeRecipe,
                unlikeRecipe
            } = this.props.recipeReducer

        const listRecipeByUser        = this.props.listRecipe.list.data ?? []
        const listRecipeByUserLoading = this.props.listRecipe.list.loading

        let likeLoading   = likeRecipe.loading && likeRecipe.uuid === stateId
        let unlikeLoading = unlikeRecipe.loading && unlikeRecipe.uuid === stateId

        let listAdded    = getListIds(recipe.DetailLists);
        let checkLoading = this.props.recipeReducer.addRecipeToList.loading || this.props.recipeReducer.removeRecipeToList.loading
        return (
            <Card
                loading={likeLoading || unlikeLoading}
                className="card-recipe"
                hoverable
                cover={
                    <img
                        alt=""
                        src={helpers.generateFullImage(recipe.image) ?? recipeImgDefault}
                        onClick={this.redirectToDetail}
                    />
                }
            >
                <div className="mask-card">
                    <div className="mark-title" onClick={this.redirectToDetail}>
                        {recipe.recipeName}
                    </div>
                    <div className="mask-bottom">
                        <div className="mask-left" onClick={() => {
                            this.redirectToProfile(user.userId)
                        }}>
                            {user.fullName ?? "Không xác định"}
                        </div>
                        <div className="mask-right">
                            {recipe.humanTime ?? "1 giờ trước"}
                        </div>
                    </div>
                </div>
                <div className="like-action">
                    <span className="like-icon">
                        {
                            recipe.isFavorite ?
                                <HeartFilled
                                    onClick={this.onClickUnlike}
                                    style={{
                                        color: 'red'
                                    }}
                                /> : <HeartOutlined
                                    onClick={this.onClickLike}
                                    style={{
                                        //color: 'red'
                                    }}/>
                        }
                    </span>
                    <span className="like-number">
                        {recipe.numberOfLikes}
                    </span>
                </div>
                <span className="bookmark">
                    <FileAddOutlined
                        onClick={this.showModal}
                    />
                    {/*<img
                        src={imgBookmarkOff}
                        alt=""
                    />*/}
                </span>

                <Modal title="Thêm vào danh sách"
                       open={this.state.isModalOpen}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                >
                    {
                        listRecipeByUserLoading ? <Loading/> : null
                    }
                    {
                        listRecipeByUser.map((item, idx) => {
                            let isChecked = listAdded.indexOf(item.recipeListId) !== -1
                            return (
                                <div
                                    key={idx}
                                >
                                    {checkLoading ? <Loading/> : null}
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={(value) => {
                                            this.onChangeCheckbox(recipe.recipeId, item.recipeListId, value)
                                        }}
                                    >
                                        {item.name}
                                    </Checkbox>

                                </div>
                            )
                        })
                    }
                </Modal>
            </Card>
        )
    }

    componentDidUpdate(prevProps) {
        let currentLikeRecipe = this.props.recipeReducer.likeRecipe
        let prevLikeRecipe    = prevProps.recipeReducer.likeRecipe

        let currentUnlikeRecipe = this.props.recipeReducer.unlikeRecipe
        let prevUnlikeRecipe    = prevProps.recipeReducer.unlikeRecipe

        let isClickLike   = this.props.recipeReducer.likeRecipe.uuid === this.state.uuid;
        let isClickUnLike = this.props.recipeReducer.unlikeRecipe.uuid === this.state.uuid;

        if ((currentLikeRecipe.data !== prevLikeRecipe.data) && isClickLike) {
            this.props.callBackRefresh()
        }

        if ((currentUnlikeRecipe.data !== prevUnlikeRecipe.data) && isClickUnLike) {
            this.props.callBackRefresh()
        }

        let currentAddRecipeToList = this.props.recipeReducer.addRecipeToList
        let prevAddRecipeToList    = prevProps.recipeReducer.addRecipeToList

        let currentRemoveRecipeToList = this.props.recipeReducer.removeRecipeToList
        let prevRemoveRecipeToList    = prevProps.recipeReducer.removeRecipeToList

        let isClickAdd    = this.props.recipeReducer.addRecipeToList.uuid === this.state.uuid;
        let isClickRemove = this.props.recipeReducer.removeRecipeToList.uuid === this.state.uuid;

        if ((currentAddRecipeToList.data !== prevAddRecipeToList.data) && isClickAdd) {
            this.props.callBackRefresh()
        }

        if ((currentRemoveRecipeToList.data !== prevRemoveRecipeToList.data) && isClickRemove) {
            this.props.callBackRefresh()
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postLikeRecipe: (uuid, id) => {
            dispatch(postLikeRecipe(uuid, id));
        },

        postUnlikeRecipe: (uuid, id) => {
            dispatch(postUnlikeRecipe(uuid, id));
        },

        addRecipeToList: (uuid, recipeId, recipeListId) => {
            dispatch(addRecipeToList(uuid, recipeId, recipeListId));
        },

        removeRecipeToList: (uuid, recipeId, recipeListId) => {
            dispatch(removeRecipeToList(uuid, recipeId, recipeListId));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipeReducer: state.recipe,
        listRecipe   : state.listRecipe,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard))

const getListIds = (detailLists) => {
    detailLists = detailLists ?? [];
    let ids     = [];
    detailLists.map((item) => {
        ids.push(item.recipeListId)
    })

    return ids
}