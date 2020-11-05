export const login = (user) => {
    return {
        type: "LOGIN",
        payload: user,
    };
};

export const logout = () => {
    return {
        type: "LOGOUT",
    };
};

export const getUsers = (users) => {
    return {
        type: "GETUSERS",
        payload: users,
    };
    
};

export const createUser = (user) => {
    return {
        type: "CREATEUSER",
        payload: user,
    };
};

export const deleteUser = (id) => {
    return {
        type: "DELETEUSER",
        payload: id,
    };
};

export const getTasks = (tasks) => {
    return {
        type: "GETTASKS",
        payload: tasks,
    };
};

export const createTask = (task) => {
    return {
        type: "CREATETASK",
        payload: task,
    };
};

export const getNotes = (notes) => {
    return {
        type: "GETNOTES",
        payload: notes,
    };
    
};

export const deleteNote = (id) => {
    return {
        type: "DELETENOTE",
        payload: id,
    };
};