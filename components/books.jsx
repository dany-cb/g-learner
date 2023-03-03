import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchform from "./searchform";
import Book from "./book";
import LoadingCard from "./loadingCard";
import { Button } from "react-bootstrap";

const BookDetails = (word) => {
  const [details, setDetails] = useState([]);

  const [term, setTerm] = useState("Ruskin Bond");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    const resources = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`
    );
    setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
  };

  return (
    <>
      <Searchform searchText={(text) => setTerm(text)}></Searchform>

      <h5 className="text-center mt-4">
        Showing results for {`"`}
        {term}
        {`"`}
      </h5>
      {isLoading ? (
        <section className="container" style={{ padding: "2rem 0rem" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details ? (
        <h1
          className="loading-name"
          style={{
            background: "white",
            borderRadius: "1rem",
            color: "#DB4437",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 33,
            fontFamily: "Inria Serif",
            transform: "translate(-50%,-50%)",
            textTransform: "capitalize",
          }}
        >
          😞 Couldn{`'`}t find books about {term}
        </h1>
      ) : (
        <section>
          <section
            className="container text-center d-flex flex-wrap"
            style={{ padding: "2rem 0rem" }}
          >
            {details.map((book, index) => (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-4 col-xl-3 px-3 m-3 card card-body shadow border-0 d-flex align-content-center justify-content-center"
              >
                <Book {...book} />
              </div>
            ))}
          </section>
          <div className="text-center">
            <Button
              onClick={() => loadMore()}
              className="btn btn-grad border-0 px-3 shadow mt-2"
            >
              Load More!
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default BookDetails;
