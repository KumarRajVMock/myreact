const initialState = {
    tasks: []
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETTASKS": {
            return {
                ...state,
                tasks: [...action.payload.tasks],
            };
        }
        
        case "CREATETASK": {
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        }
        default: {
            return state;
        }
    }
};

export default taskReducer;