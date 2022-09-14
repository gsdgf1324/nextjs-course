import Head from "next/head";
// 페이지에서 <head> 태그 사이에 콘텐츠를 추가하고 싶을 때 임포트하여 사용

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import { useEffect } from "react";

function Homepage(props) {
  /*
  Head 태그 사이에 보통 head 태그에 들어갈만한 어떤 HTML 요소든 추가 가능하다.
  meta 태그는 매우 특수한 태그로, 검색엔진에 없어서는 안 될 태그이다. 왜냐하면 검색 엔진에서 검색 결과를 출력할 때 같이 출력되기 때문이다.
  */

  return (
    <div>
      <Head>
        <title>NextJS Events!</title>
        <meta name="description " content="Find a events!" />
      </Head>

      <EventList items={props.featuredEvents} />
    </div>
  );
}

export default Homepage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

/*
e커머스 같은 경우 혹시 다른 사업부문 등에서

시작 페이지는 검색엔진 크롤러가 이해하면 좋다. => 트레픽을 유도해야 하므로
또한 방문자 입장에서는 즉각적으로 보이는 화면이 좋다.
 */
