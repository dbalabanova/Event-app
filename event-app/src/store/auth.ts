import { createModel } from "@rematch/core";
import { RootModel } from "store/index";

type TState = {
  isAuthenticated: string;
};

const initialState: TState = {
  isAuthenticated: "",
};

const auth = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setIsAuthenticated(state, payload: string) {
      return {
        ...state,
        isAuthenticated: payload,
      };
    },
  },
  effects: (dispatch) => ({
    login(credentials) {
      dispatch.auth.setIsAuthenticated(credentials.user.email);
    },
    logout() {
      dispatch.auth.setIsAuthenticated("");
    },
  }),
});

export default auth;
