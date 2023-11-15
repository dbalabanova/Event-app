import { createModel } from "@rematch/core";
import { RootModel } from "store/index";
import { Event } from "models/events";
import { User } from "models/user";

type TState = {
  users: User[];
};

type EventToPuchase = {
  tickets: number;
  event: Event;
  email: string;
};

type EventToWishList = {
  email: string;
  event: Event;
};

const InitialState: TState = {
  users: [],
};

const user = createModel<RootModel>()({
  state: InitialState,
  reducers: {
    setUser(state, payload: string) {
      if (!state.users.find((user: User) => user.email === payload)) {
        let user = { email: payload, purchases: [], wishlist: [] };
        return {
          ...state,
          users: [...state.users, user],
        };
      }
    },
    addEventToUserWishlist(state, payload:EventToWishList) {
      const { email, event } = payload;
      let users = state.users.map((user: User) => {
        if (user.email === email) {
          user.wishlist.push(event.id);
        }
        return user;
      });

      return {
        ...state,
        users: users,
      };
    },
    removeEventsFromWishlist(state, payload:EventToWishList) {
      const { email, event } = payload;
      let users = state.users.map((user: User) => {
        if (user.email === email) {
          user.wishlist = user.wishlist.filter((item) => item !== event.id);
        }
        return user;
      });

      return {
        ...state,
        users: users,
      };
    },

    addEventToUserPurchasee(state, payload:EventToPuchase) {
      const { tickets, event, email } = payload;
      let users = state.users.map((user: User) => {
        if (user.email === email) {
          let purchaseExsists = user.purchases.find((purchase) => purchase.event.id === event.id);
          if (purchaseExsists) {
            purchaseExsists.tickets = purchaseExsists.tickets + tickets;
          } else user.purchases.push({ tickets, event });
        }
        return user;
      });
      return {
        ...state,
        users: users,
      };
    },
  },
  effects: (dispatch) => ({
    register(credentials) {
      dispatch.user.setUser(credentials.user.email);
    },
    addToWishList(data) {
      dispatch.user.addEventToUserWishlist(data);
    },
    removeFromWishlist(data) {
      dispatch.user.removeEventsFromWishlist(data);
    },
    addToPurchases(data) {
      dispatch.user.addEventToUserPurchasee(data);
    },
  }),
});

export default user;
