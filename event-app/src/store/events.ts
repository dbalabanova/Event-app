import { createModel } from "@rematch/core";
import { RootModel } from "store/index";
import { Event, UserEvent } from "models/events";
import { getEventDetails, getEvents, getFilteredEvents } from "services/eventsService";


type TState = {
  data: Event[];
  usersCreatedEvents: Event[];
  currentEvent: Event | undefined;
  searchedEvents: Event[];
};

const initialState: TState = {
  data: [],
  usersCreatedEvents: [],
  currentEvent: undefined,
  searchedEvents: [],
};

const events = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setEvents(state: TState, payload: { data: Event[] }) {
      const { data } = payload;
      return {
        ...state,
        data,
      };
    },
    setCurrentEvent(state: TState, payload: Event | undefined) {
      return {
        ...state,
        currentEvent: payload,
      };
    },
    setSearchedEvents(state: TState, payload: Event[]) {
      return {
        ...state,
        searchedEvents: payload,
      };
    },
    setUsersEvents(state, payload: Event) {
      let usersEvents = [...state.usersCreatedEvents, payload];
      return {
        ...state,
        usersCreatedEvents: usersEvents,
      };
    },
  },
  effects: (dispatch) => ({
    async getEvents() {
      try {
        const events = await getEvents();
        dispatch.events.setEvents({ data: events || [] });
      } catch (e) {
        console.log(e);
      }
    },

    async getEventDetails(id: string, rootState) {
      let event = rootState.events.usersCreatedEvents.find((event) => event.id === id);
      if (!event) event = await getEventDetails(id);
      if (event) dispatch.events.setCurrentEvent(event);
    },

    async getSearchedEvents({ searchProperty, searchValue }: { [key: string]: string }, rootState) {
      const userCreatedEvents: Event[] = rootState.events.usersCreatedEvents;
      let userCreatedSearchedEvents: Event[] = [];
      if (searchProperty === "keyword")
        userCreatedSearchedEvents = userCreatedEvents.filter((event: Event) =>
          event.name.toLowerCase().includes(searchValue)
        );
      if (searchProperty === "segmentName")
        userCreatedSearchedEvents = userCreatedEvents.filter(
          (event: Event) => event.classifications[0].segment.name.toLowerCase() === searchValue
        );
      let apiSearchedEvents = (await getFilteredEvents(searchProperty, searchValue)) || [];
      dispatch.events.setSearchedEvents([...userCreatedSearchedEvents, ...apiSearchedEvents]);
    },

    createEvent(event: UserEvent) {
      const currEvent: Event = {
        name: event.title,
        id: event.id,
        images: [{ url: event.imgLink }],
        dates: {
          start: {
            localDate: event.date,
            localTime: event.hour,
          },
        },
        classifications: [
          {
            segment: {
              name: event.genre,
            },
          },
        ],
        priceRanges: [
          {
            min: event.price,
          },
        ],
      };
      dispatch.events.setUsersEvents(currEvent);
    },
  }),
});

export default events;
