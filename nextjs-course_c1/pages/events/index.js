import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";

function AllEventsPage() {
  const event = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const path = `/events/${year}/${month}`;
    /*
    만약 const path = `/events/${year}`; 인 경우 [evnetId].js로 넘어감
    */
    router.push(path);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={event} />
    </Fragment>
  );
}

export default AllEventsPage;
