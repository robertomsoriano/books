import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const AddItems = () => {
  const user = useStoreState(state => state.user);

  const { fetchBooks, createBook } = useStoreActions(actions => ({
    fetchBooks: actions.fetchBooks,
    createBook: actions.createBook
  }));
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(modal => !modal);
  };

  const [newName, setNewName] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPic, setNewPic] = useState("");

  return (
    <>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => toggle()}
      >
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Add To Books List</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              console.log(user);
              createBook({
                name: newName,
                subtitle: newSubtitle,
                author: newAuthor,
                description: newDescription,
                price: newPrice,
                quantity: newQuantity,
                pic: newPic,
                user: user._id
              });
              fetchBooks();
            }}
          >
            <FormGroup>
              <Label for="book">Book</Label>
              <Input
                type="text"
                name="name"
                id="book"
                value={newName}
                placeholder="Add title"
                onChange={e => setNewName(e.target.value)}
              />
              <Label for="subtitle">Subtitle</Label>
              <Input
                type="text"
                name="subtitle"
                id="subtitle"
                value={newSubtitle}
                placeholder="Add subtitle"
                onChange={e => setNewSubtitle(e.target.value)}
              />
              <Label for="author">author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={newAuthor}
                placeholder="Add author"
                onChange={e => setNewAuthor(e.target.value)}
              />
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={newDescription}
                placeholder="Add description"
                onChange={e => setNewDescription(e.target.value)}
              />
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={newPrice}
                placeholder="Add price"
                onChange={e => setNewPrice(e.target.value)}
              />
              <Label for="quantity">Quantity</Label>
              <Input
                type="text"
                name="quantity"
                id="quantity"
                value={newQuantity}
                placeholder="Add quantity"
                onChange={e => setNewQuantity(e.target.value)}
              />
              <Label for="pic">Picture</Label>
              <Input
                type="text"
                name="pic"
                id="pic"
                value={newPic}
                placeholder="Add picture url"
                onChange={e => setNewPic(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Book
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddItems;
