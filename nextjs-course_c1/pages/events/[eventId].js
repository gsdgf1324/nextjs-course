import { Fragment } from "react";
import { useRouter } from "next/router";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);

  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eId = context.params.eventId;
  const event = await getEventById(eId);

  return {
    props: {
      event: event,
    },
  };
}

export async function getStaticPaths() {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map((item) => ({ params: { eventId: item.id } }));

  return {
    paths: paths,
    fallback: true,
    // fallback: false / true / "blocking",
  };
}
