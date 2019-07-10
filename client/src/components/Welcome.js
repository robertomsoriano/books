import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Container, Button } from "reactstrap";
import Items from "./Items";
import WelcomeModal from "./users/WelcomeModal";
import WelcomeHero from "./welcome/WelcomeHero";
// import Register from "./users/Register";
const Welcome = () => {
  const [modal, setModal] = useState(false);

  const books = useStoreState(state => state.books);
  const userBooks = useStoreState(state => state.userBooks);
  const authed = useStoreState(state => state.authed);
  const loading = useStoreState(state => state.loading);
  // const user = useStoreState(state => state.user);

  const { fetchBooks, fetchUserBooks, logUser, logOut } = useStoreActions(
    actions => ({
      fetchBooks: actions.fetchBooks,
      fetchUserBooks: actions.fetchUserBooks,
      logUser: actions.logUser,
      logOut: actions.logOut
    })
  );

  // const sendUser = e => {
  //   e.preventDefault();
  //   if (!authed) {
  //     window.location.replace("/register");
  //   } else {
  //     window.location.reload();
  //   }
  // };

  const whereToSend = () => {
    setModal(!modal);
  };

  //make api call, load books.
  useEffect(() => {
    fetchBooks();
    fetchUserBooks();
    if (localStorage.getItem("BookStoreToken")) {
      logUser();
    } else {
      logOut();
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [authed]);

  return !authed ? (
    <>
      <Container>
        <br />
        <WelcomeHero
          welcome={"Welcome to the Book Store!"}
          desc={"Build with The MERN stack"}
        />

        <Button className="btn btn-danger" onClick={() => whereToSend()}>
          Register or Login to add/edit books and make transactions!
        </Button>
        {modal && <WelcomeModal opened={[modal, setModal]} />}
        {(books || userBooks) && <Items books={userBooks || books} />}
      </Container>
    </>
  ) : (
    !loading && (
      <>
        {(books || userBooks) && (
          <Items books={userBooks || books} authed={authed} />
        )}
      </>
    )
  );
};

export default Welcome;
