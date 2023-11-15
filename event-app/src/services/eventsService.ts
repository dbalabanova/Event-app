import { api, conf } from 'services';
import { Event } from 'models/events';

type EventResponse = {
  data: {
    _embedded: {
      events: Event[];
    };
  };
};

type EventDetailsResponse = {
  data: Event;
};

export async function getEvents() {
  try {
    const response: EventResponse = await api.get(conf.apis.events);
    const events = response.data._embedded.events;
    return events;
  } catch (e) {
    console.log(e);
  }
}

export async function getFilteredEvents(
  searchProperty: string,
  searchValue: string
) {
  const params = { [`${searchProperty}`]: searchValue };
  try {
    const response: EventResponse = await api.get(conf.apis.events, params);
    const events = response.data._embedded.events;
    return events;
  } catch (e) {
    console.log(e);
  }
}

export async function getEventDetails(id: string) {
  try {
    const response: EventDetailsResponse = await api.get(
      `${conf.apis.events}/${id}`
    );
    return response.data;
  } catch (e) {
    console.log('erorr is', e);
  }
}
