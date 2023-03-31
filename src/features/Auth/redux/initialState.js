const initialState = {
    user    : {
        id   : null,
        name : null,
        email: null,
    },
    meta    : {
        token      : null,
        role       : null,
        permissions: [],
    },
    configs : {
        homepage: '/'
    },
    login   : {
        loading: false,
    },
    register: {
        loading: false,
        data   : {}
    },
    authUser: {
        userId     : null,
        fullName   : null,
        email      : null,
        introduce  : null,
        avatar     : null,
        dateOfBirth: null,
        address    : null,

        loading: false
    },
    update: {
        data: {},
        loading: false
    }
};

export default initialState;
