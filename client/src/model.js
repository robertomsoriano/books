import { action, thunk } from "easy-peasy";
import axios from "axios";

const host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

export default {
  //State
  books: {
    _id: "",
    name: "",
    date: ""
  },
  userBooks: null,
  cart: localStorage.getItem("CartItems")
    ? [...JSON.parse(localStorage.getItem("CartItems"))]
    : [],
  // cart: [],
  authed: false,
  user: { name: "" },
  serverMsg: null,
  loading: true,
  invoice: null,
  // Thunks
  fetchBooks: thunk(async actions => {
    const res = await axios(`${host}/api/books/`);
    const books = await res.data;

    actions.setBooks(books);
  }),
  fetchUserBooks: thunk(async actions => {
    let user = localStorage.getItem("BookStoreTokenUser");
    if (user) {
      const res = await axios.post(
        `${host}/api/books/user/${user}`,
        { userId: user },
        {
          headers: {
            "Content-type": "application/json",
            "x-auth-token": `${localStorage.getItem("BookStoreToken")}`
          }
        }
      );
      const UserBooks = await res.data;

      actions.setUserBooks(UserBooks);
    }
  }),

  // Actions
  setServerMsg: action((state, msg) => {
    state.serverMsg = msg;
  }),
  setBooks: action((state, books) => {
    state.books = books;
  }),
  setUserBooks: action((state, books) => {
    state.userBooks = books;
  }),
  setAuthed: action(state => {
    state.authed = true;
  }),
  setUser: action((state, data) => {
    state.user = data;
  }),
  setLoading: action(state => {
    state.loading = false;
  }),
  setCart: action((state, items) => {
    state.cart = items;
  }),
  setInvoice: action((state, num) => {
    state.invoice = num;
  }),

  removeCartItem: action((state, id) => {
    let items = [...JSON.parse(localStorage.getItem("CartItems"))];
    let newItems = items.filter(item => item._id !== id);
    localStorage.setItem("CartItems", JSON.stringify(newItems));
    state.cart = newItems;
  }),
  emptyCart: action(state => {
    localStorage.removeItem("CartItems");
  }),

  //CRUD
  createBook: action((state, book) => {
    axios
      .post(
        `${host}/api/books/`,
        { book: book },
        {
          headers: {
            "Content-type": "application/json",
            "x-auth-token": `${localStorage.getItem("BookStoreToken")}`
          }
        }
      )
      .then(r => {
        console.log(r.status);
        window.location.reload();
      })
      .catch(e => console.log(e));
    state.books = [...state.books, book];
  }),

  updateBook: action((state, updatedBook) => {
    axios
      .put(
        `${host}/api/books/${updatedBook.id}`,
        { book: updatedBook.book },
        {
          headers: {
            "Content-type": "application/json",
            "x-auth-token": `${localStorage.getItem("BookStoreToken")}`
          }
        }
      )
      .then(r => console.log(r.status))
      .catch(e => console.log(e));
    state.books = state.books.map(book => {
      if (book.id === updatedBook.id) {
        book = updatedBook.book;
      }
      return book;
    });
  }),
  deleteBook: action((state, id) => {
    axios
      .delete(`${host}/api/books/${id}`, {
        headers: {
          "x-auth-token": `${localStorage.getItem("BookStoreToken")}`
        }
      })
      .then(r => {
        console.log(r.status);
        window.location.replace("/");
      })
      .catch(e => console.log(e));
  }),

  //User Authentication
  logUser: thunk(async actions => {
    if (localStorage.getItem("BookStoreToken")) {
      axios
        .get(`${host}/api/auth/user`, {
          headers: {
            "x-auth-token": `${localStorage.getItem("BookStoreToken")}`
          }
        })
        .then(res => {
          if (res.status !== 200) actions.setServerMsg("Invalid Credentials");
          if (res.status === 200) {
            actions.setAuthed();
            actions.setUser(res.data);
            localStorage.setItem("BookStoreTokenUser", res.data._id);
            actions.setLoading();
          } else {
            actions.logOut();
            actions.setServerMsg(
              "You have been logged out! Please login back in:"
            );
          }
        })
        .catch(err => {
          console.log(err.response.data);
          actions.setServerMsg("Invalid Credentials");
        });
    }
  }),
  register: thunk((actions, user) => {
    axios
      .post(`${host}/api/users/`, user, {
        headers: { "Content-type": "application/json" }
      })
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          actions.setUser(res.data.user);
          localStorage.setItem("BookStoreToken", res.data.token);
          actions.logUser();
          window.location.reload();
        }
        return actions.setServerMsg(`${res.status}`);
      })
      .catch(err => {
        console.log(err.response.data);
        actions.setServerMsg(err.response.data.msg);
      });
  }),

  logOut: action(state => {
    if (!localStorage.getItem("BookStoreToken")) {
      return;
    } else {
      localStorage.removeItem("BookStoreTokenUser");
      localStorage.removeItem("BookStoreToken");
      state.authed = false;
      state.userBooks = null;
      window.location.reload();
    }
  })
};
