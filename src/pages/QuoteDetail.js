import { useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Sam", text: "Learning React is fun!" },
//   { id: "q2", author: "Samuel", text: "Learning React is great!" },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">No quote found!</p>;
  }

  return (
    <section>
      <h1>Quote Detail Page</h1>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link className="btn--flat" to="comments">
                Load Comments
              </Link>
            </div>
          }
        />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </section>
  );
};

export default QuoteDetail;
