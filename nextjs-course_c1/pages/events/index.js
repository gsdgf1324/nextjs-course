import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  // const event = getAllEvents();

  const { events } = props;

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
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
