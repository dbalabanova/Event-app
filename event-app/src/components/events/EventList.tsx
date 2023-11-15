import EventCard from "components/events/EventCard";
import EmptyState from "components/shared/EmptyState";
import { Event } from "models/events";

type EventsListProps = {
  events: Event[];
};

//TODO - pagination
const EventList = ({ events }: EventsListProps):JSX.Element => {
  if (!events.length) return <EmptyState />;
  return (
    <div className="flex flex-row flex-wrap justify-center p-20">
      {events.map((event: Event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventList;
