import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    deleteRecipeComment,
    getRecipe,
    getRecipeComments,
    postRecipeComment,
    updateRecipeComment
} from "@features/Recipe/redux/actions";
import {withRouter} from "react-router-dom";
import {reset} from "@common/crud";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: "",
            isEdit     : false
        }
    }

    /**
     * On change comment
     * @param value
     */
    onUpdateComment = (value) => {
        this.setState({
            ...this.state,
            commentText: value,
            isEdit     : true,
        })
    }

    /**
     * On change comment
     * @param value
     */
    onChangeComment = (value) => {
        this.setState({
            ...this.state,
            commentText: value.currentTarget.value
        })
    }

    /**
     * Submit comment
     */
    onSubmitComment = () => {
        let value  = this.state.commentText
        let isEdit = this.state.isEdit
        if (value && value !== "") {
            const {id} = this.props.match.params;
            this.setState({
                ...this.state,
                commentText: "",
                isEdit     : false,
            }, function () {
                if (isEdit) {
                    this.props.updateRecipeComment(id, value)
                } else {
                    this.props.postRecipeComment(id, value)
                }
            })
        }
    }

    /**
     * Delete comment
     */
    onDeleteComment = (recipeId) => {
        this.props.deleteRecipeComment(recipeId)
    }

    render() {
        const {
                  detail,
                  comments,
                  updateComment,
                  postComment
              } = this.props.recipe

        const submitLoading = updateComment.loading || postComment.loading

        const {commentText, isEdit} = this.state
        return (
            <President
                submitLoading={submitLoading}
                detail={detail}
                comments={comments}
                commentText={commentText}
                onChangeComment={this.onChangeComment}
                onSubmitComment={this.onSubmitComment}
                isEdit={isEdit}
                onUpdateComment={this.onUpdateComment}
                onDeleteComment={this.onDeleteComment}
            />
        )
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getRecipe(id)
        this.props.getRecipeComments(id)
    }

    componentDidUpdate(prevProps) {
        const {id}             = this.props.match.params;
        let currentPostComment = this.props.recipe.postComment
        let prevPostComment    = prevProps.recipe.postComment

        let currentDeleteComment = this.props.recipe.deleteComment
        let prevDeleteComment    = prevProps.recipe.deleteComment

        let currentUpdateComment = this.props.recipe.updateComment
        let prevUpdateComment    = prevProps.recipe.updateComment

        if (currentDeleteComment.data !== prevDeleteComment.data) {
            this.props.getRecipeComments(id)
        }

        if (currentPostComment.data.comment !== prevPostComment.data.comment) {
            this.props.getRecipeComments(id)
        }

        if (currentUpdateComment.data.comment !== prevUpdateComment.data.comment) {
            this.props.getRecipeComments(id)
        }
    }

    componentWillUnmount() {
        this.props.reset()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipe: (id) => {
            dispatch(getRecipe(id));
        },

        getRecipeComments: (id) => {
            dispatch(getRecipeComments(id));
        },

        postRecipeComment: (id, value) => {
            dispatch(postRecipeComment(id, value));
        },

        updateRecipeComment: (id, value) => {
            dispatch(updateRecipeComment(id, value));
        },

        deleteRecipeComment: (id) => {
            dispatch(deleteRecipeComment(id));
        },

        reset: () => {
            dispatch(reset());
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))