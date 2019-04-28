let _state = {
    user: null,
};

export default {
    getState() {
        return { ..._state };
    },

    setState(newState) {
        _state = { ..._state, ...newState };

    },
};