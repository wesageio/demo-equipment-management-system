const initialState = {
    countEmail: {
        value: 0,
    },
    countImap: {
        value: 0,
    },
}

export default (state = initialState, { type, payload }) => {
    if (type === 'ADD_COUNT_EMAIL') {
        return {
            ...state,
            countEmail: {
                value: payload.value,
            },
        };
    } else if (type === 'ADD_COUNT_IMAP') {
        return {
            ...state,
            countImap: {
                value: payload.value,
            },
        };
    }
    return state;
}