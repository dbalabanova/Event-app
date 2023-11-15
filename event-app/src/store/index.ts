import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading"
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import events from 'store/events';
import user from 'store/user';
import auth from 'store/auth'

type FullModel = ExtraModelsFromLoading<RootModel>

export interface RootModel extends Models<RootModel> {
  events: typeof events
  user: typeof user
  auth: typeof auth
}

export const models: RootModel = {
  events,
  user,
  auth
}

const persistConfig = {
  key: "root",
  storage,
};

export const store = init<RootModel, FullModel>({
  models,
  plugins: [persistPlugin(persistConfig),loadingPlugin()],
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel,FullModel>
export default store
