import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();

  const filterdData = router.query.slug;

  if (!filterdData) {
    return <p className="center">Loading...</p>;
  }

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
    return (
      <Fragment>
        <ErrorAlert>
          <p>검색 조건에 오류가 있습니다.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterEvents = getFilteredEvents({ year: year, month: month });

  if (!filterEvents || filterEvents.length === 0) {
    return (
      <Fragment>
        <p>조회 결과가 없습니다.</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);
  return (
    <div>
      <ResultTitle date={date} />
      <EventList items={filterEvents}></EventList>
    </div>
  );
}

export default FilteredEventsPage;
