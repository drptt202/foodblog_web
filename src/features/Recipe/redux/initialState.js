const initialState = {
    list         : {
        data   : [],
        loading: false,
    },
    add          : {
        data   : {},
        loading: false,
    },
    detail       : {
        data   : {},
        loading: false,
    },
    update       : {
        data   : {},
        loading: false,
    },
    delete       : {
        data   : {},
        loading: false,
    },
    comments     : {
        data   : [],
        loading: false,
    },
    postComment  : {
        data   : {},
        loading: false,
    },
    updateComment: {
        data   : {},
        loading: false,
    },
    deleteComment: {
        data   : false,
        loading: false,
    },

    likeRecipe  : {
        data   : {},
        loading: false,
        uuid   : null,
    },
    unlikeRecipe: {
        data   : false,
        loading: false,
        uuid   : null,
    },

    addRecipeToList: {
        data   : false,
        loading: false,
        uuid   : null,
    },

    removeRecipeToList: {
        data   : false,
        loading: false,
        uuid   : null,
    },

    switchRecipeStatus: {
        data   : null,
        loading: false,
        uuid   : null,
    },
};

export default initialState;
