import { Dispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import EventList from "components/events/EventList";
import Search from "components/events/Search";
import Loader from "components/shared/Loader";
import EmptyState from "components/shared/EmptyState";

const Home = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const events = useSelector((state: RootState) => state.events.data);
  const usersEvents = useSelector((state: RootState) => state.events.usersCreatedEvents) || [];
  const filteredEvents = useSelector((state: RootState) => state.events.searchedEvents);
  const areEventsLoading = useSelector((rootState: RootState) => rootState.loading.models.events);

  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  useEffect(() => {
    dispatch.events.getEvents();
  }, []);

  const onSearch = () => {
    setIsSearchButtonClicked(true);
  };

  const eventsToShow =
    filteredEvents.length && isSearchButtonClicked ? filteredEvents : !isSearchButtonClicked ? [...events, ...usersEvents] : [];


  return (
    <div>
      <Navigation />
      {areEventsLoading ? (
        <Loader />
      ) : (
        <>
          <Search handleSearch={onSearch} />
          {!eventsToShow.length && isSearchButtonClicked ? <EmptyState /> : null}
          {eventsToShow.length ? <EventList events={eventsToShow} /> : null}
        </>
      )}
    </div>
  );
};

export default Home;
