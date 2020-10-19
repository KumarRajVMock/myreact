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
    console.log(users)
    return {
        type: "GETUSERS",
        payload: users,
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