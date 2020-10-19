const initialState = {
    users: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GETUSERS": {
        return {
          ...state,
          users: [...action.payload.users],
        };
      }
      
      case "DELETEUSER": {
        const id = action.payload;
        return {
          ...state,
          users: [...state.users.filter((user) => user.id !== id)],
        };
      }
      
      default: {
        return state;
      }
    }
  };
  
  export default userReducer;