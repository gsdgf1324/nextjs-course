import { useState, useRef, useEffect } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInput = useRef();
  const feedbackInput = useRef();

  function submitFunc(event) {
    event.preventDefault();
    const enterEmail = emailInput.current.value;
    const enterFeedback = feedbackInput.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: enterEmail, text: enterFeedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function loadFeedbackFunc() {
    fetch("/api/feedback")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFunc}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" ref={emailInput} />
        </div>

        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInput}></textarea>
        </div>

        <button>Send Feedback</button>
      </form>

      <hr />

      <button onClick={loadFeedbackFunc}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item, idx) => (
          <li key={`${item}_${idx}`}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
