const initialState = {
    notes: [],
};

const noteReducer = (state = initialState, action) => {
switch (action.type) {
    case "GETNOTES": {
    return {
        ...state,
        notes: [...action.payload],
    };
    }
    case "DELETENOTE": {
    const id = action.payload;
    return {
        ...state,
        notes: [...state.notes.filter((note) => note.id !== id)],
    };
    }
    default: {
    return state;
    }
}
};
export default noteReducer;