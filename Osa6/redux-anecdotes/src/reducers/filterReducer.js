const initialState = '';

export const filterAnecdotes = (searchInput) => {
    return {
        type: 'FILTER',
        payload: {
            filter: searchInput
        }
    }
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export default filterReducer;