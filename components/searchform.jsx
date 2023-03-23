import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Searchform = ({ searchText }) => {
  const [text, setText] = useState("");
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "" || !text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    searchText(text);
  };

  const onChangevalue = (e) => {
    e.preventDefault();
    setText(e.target.value);
    searchText(e.target.value);
    if (e.target.value === "") {
      setText("Ruskin Bond");
      searchText("Ruskin Bond");
    }
  };

  return (
    <div>
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <Form className="d-flex w-50">
          <Form.Control
            type="search"
            placeholder="Search Chetan Bhagat, Vikram Seth etc.."
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              onChangevalue(e);
            }}
          />
          <Button
            variant="outline-success"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Search
          </Button>
        </Form>
      </div>

      <div
        id="popup1"
        class={showValidTextModal ? "overlay modal-active" : "overlay"}
      >
        <div class="popup">
          <div class="close" onClick={() => setShowValidTextModal(false)}>
            &times;
          </div>
          <h3 class="content">Please Enter the valid text</h3>
        </div>
      </div>
    </div>
  );
};

export default Searchform;
