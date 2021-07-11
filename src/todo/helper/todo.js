const API = process.env.REACT_APP_BACKEND;

// create a todo
export const createTodo = (userId, token, todo) => {
  return fetch(`${API}/todo/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//get all todos by id
export const getAllTodosById = (userId, token) => {
  return fetch(`${API}/todos/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update todo
export const updateTodo = (todoId, userId, token, todo) => {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete todo
export const deleteTodo = (todoId, userId, token) => {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get todo by todoId
export const getTodoById = (todoId, userId, token) => {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
