import { Fragment, useState } from "react";
import { getData } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState(null);

  function detailFunc(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li>
            {item.text}
            <button onClick={detailFunc.bind(null, item.id)}>Details</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default FeedbackPage;

/*
getStaticProps, getServerSideProps 모두 외부 API를 호출하는 것은 전혀 문제가 없지만
자체 API를 사용할 땐 fetch 함수를 사용하지 못한다.
=> 따라서 자체 API데이터를 사용하려면 API 라우트에 있는 코드를 export 하여 가져와서 사용한다. 
 */
export async function getStaticProps(context) {
  const data = getData();

  return {
    props: {
      feedbackItems: data,
    },
  };
}
