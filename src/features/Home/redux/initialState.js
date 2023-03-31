const initialState = {
    ingredientList: {
        data   : [],
        loading: false,
    },

    recipeAll: {
        data   : [],
        loading: false,
    },

    recipeByFollowUser: {
        data   : [],
        loading: false,
    },

    recipeByPopular: {
        data   : [],
        loading: false,
    },

    recipeByIngredient: {
        data   : [],
        loading: false,
    },

    recipeBySearch: {
        keyword: "",
        data   : [],
        loading: false,
    },

    recipeByFavorite: {
        data   : [],
        loading: false,
    },

    recipeByUserId: {
        data   : [],
        loading: false,
    },
};

export default initialState;
