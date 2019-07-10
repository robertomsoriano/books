import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";

const host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function createBook(book) {
  axios
    .post(
      `${host}/api/books/`,
      { book: book },
      { headers: { "Content-type": "application/json" } }
    )
    .then(r => console.log(r.status))
    .catch(e => console.log(e));
}

function getBooks(url, dispatch) {
  axios.get(`${url}`).then(res => {
    dispatch({ type: "getBooks", value: res.data });
  });
}

function updateName(id, book) {
  axios
    .put(
      `${host}/api/books/${id}`,
      { book: book },
      { headers: { "Content-type": "application/json" } }
    )
    .then(r => console.log(r.status))
    .catch(e => console.log(e));
}

function deleteBook(id, name) {
  axios
    .delete(
      `${host}/api/books/${id}`,
      { name: `${name}` },
      { headers: { "Content-type": "application/json" } }
    )
    .then(r => console.log(r.status))
    .catch(e => console.log(e));
}

const initialState = {
  books: {
    _id: "",
    name: "",
    date: ""
  },
  submitted: false,
  authenticated: true
};

function bookReducer(state, action) {
  switch (action.type) {
    case "createBook":
      createBook(action.value);
      return { ...state, books: [action.value, ...state.books] };
    case "getBooks":
      return { ...state, books: action.value };
    case "updateName":
      updateName(action.value.id, action.value.book);
      return { ...state };
    case "deleteBook":
      deleteBook(action.value.id, action.value.name);
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.value.id)
      };
    case "submitted":
      return { ...state, submitted: false };
    default:
      throw new Error();
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const [url] = useState(`${host}/api/books`);

  useEffect(() => {
    getBooks(url, dispatch);
  }, [url]);
  return (
    <>
      <DispatchContext.Provider value={{ dispatch }}>
        <StateContext.Provider value={{ state }}>
          {children}
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
};

export default Store;
