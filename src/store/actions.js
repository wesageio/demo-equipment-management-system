export const ADD_COUNT_EMAIL = 'ADD_COUNT_EMAIL';
export const ADD_COUNT_IMAP = 'ADD_COUNT_IMAP';

export const changeCountImap = (type, data) => {
    return ({
        type: type,
        payload: data,
    })
};

export const changeCountEmail = (type, data) => {
    return ({
        type: type,
        payload: data,
    })
};