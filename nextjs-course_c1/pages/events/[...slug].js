import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const { events, dates, hasError } = props;

  if (hasError) {
    return <div>error</div>;
  }

  // const router = useRouter();
  // const filterdData = router.query.slug;
  // if (!filterdData) {
  //   return <p className="center">Loading...</p>;
  // }

  const filterEvents = events;
  const date = new Date(dates.year, dates.month - 1);

  return (
    <div>
      <ResultTitle date={date} />
      <EventList items={filterEvents}></EventList>
    </div>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const filterdData = params.slug;

  const year = +filterdData[0];
  const month = +filterdData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      // 1. 404 페이지
      // notFound: true,

      // 2. 에러 페이지로 이동시키기
      // redirect: {
      //   destination: "/error",
      // },

      props: {
        hasError: true,
      },
    };
  }

  const filterEvents = await getFilteredEvents({ year: year, month: month });

  return {
    props: {
      events: filterEvents,
      dates: {
        year: year,
        month: month,
      },
    },
  };
}
