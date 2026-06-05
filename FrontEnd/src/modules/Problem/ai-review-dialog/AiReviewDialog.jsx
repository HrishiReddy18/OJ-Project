import React, { useEffect, useState } from "react";
import "./AiReviewDialog.scss";
import ReactMarkdown from "react-markdown";

const AiReviewDialog = (props) => {
  const [aiReview, setAiReview] = useState("");
  const { closeDialog, problem, input } = props;
  const getAiReview = async () => {
    var currInput = input;
    console.log(currInput);
    currInput.problemDescription = problem.description;
    console.log(currInput);

    const data = await fetch("http://localhost:3000/ai-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currInput),
      credentials: "include",
    });

    const jsonData = await data.json();
    console.log(jsonData);
    setAiReview(jsonData);
    console.log(typeof jsonData);
  };

  useEffect(() => {
    getAiReview();
  }, []);

  return (
    <div className="ai-review-dialog">
      {aiReview && (
        <div>
          <div className="close-button">
            <button onClick={closeDialog}>close </button>
          </div>
          <div
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {aiReview?.review}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiReviewDialog;
