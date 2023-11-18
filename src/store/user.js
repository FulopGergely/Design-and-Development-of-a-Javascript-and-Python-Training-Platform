export default {
    state() {
        return {
            currentUser: {}, //jelenlegi user
            users: [], //összes user, ez bejelentkezés gombnál init
        };
    },
    mutations: {
        setCurrentUser: (state, user) => state.currentUser = user,
        setUsers: (state, users) => state.users = users,
        resetUserState(state) {
            state.currentUser = {}
            state.users = []
        },
    },
    getters: {
        getCurrentUser: (state) => state.currentUser,
        getUsers: (state) => state.users,
    },
};