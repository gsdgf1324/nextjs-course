import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((dr) => (
        <EventItem
          key={dr.id}
          id={dr.id}
          title={dr.title}
          location={dr.location}
          date={dr.date}
          image={dr.image}
        ></EventItem>
      ))}
    </ul>
  );
};

export default EventList;
